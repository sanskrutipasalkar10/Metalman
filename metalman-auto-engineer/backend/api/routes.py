from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Form
import os
import shutil
import uuid
import json
import re
import pandas as pd
from services.pfd_renderer import render_sub_assy_index, render_sub_assy_sheet, render_sheetmetal_sheet, render_bop_sheet
from services.cad_service import export_step_to_stl
from services.bom_generator import generate_bom_excel
from services.tooling_generator import generate_tooling_list

router = APIRouter()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
TASKS_FILE = "tasks_db.json"
PFD_TEMPLATE_PATH = os.path.join("assets", "pfd template.xlsx")
BOM_TEMPLATE_PATH = os.path.join("assets", "BLANK_BOM_TEMPLATE.xlsx")
TOOLING_TEMPLATE_PATH = os.path.join("assets", "tooling list temp.xlsx")

# Task tracking
TASKS = {} # task_id -> {status, progress, stl_url, files: [], message, error}

def load_tasks():
    global TASKS
    if os.path.exists(TASKS_FILE):
        try:
            with open(TASKS_FILE, "r") as f:
                TASKS = json.load(f)
        except:
            TASKS = {}

def save_tasks():
    try:
        with open(TASKS_FILE, "w") as f:
            json.dump(TASKS, f, indent=2)
    except:
        pass

load_tasks()

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_engineering_task(task_id: str, cad_path: str, feasibility_path: str, drawings_dir: str, requested_outputs: dict):
    """Full pipeline: 3D -> BOM -> PFD -> Tooling."""
    try:
        print(f"\n[TASK {task_id}] Starting engineering pipeline...")
        TASKS[task_id]["status"] = "processing"
        TASKS[task_id]["files"] = []
        save_tasks()
        
        # 0. Extract Part Number from Feasibility for proper naming
        print(f"[TASK {task_id}] Extracting Part Number for naming convention...")
        part_no = "UNKNOWN"
        try:
            # 🛡️ PRIORITY 1: Filename (usually contains the Master Part Number)
            match = re.search(r'\d{8,9}', os.path.basename(feasibility_path))
            if match:
                part_no = match.group(0)
            else:
                # PRIORITY 2: Inside Excel (might be a sub-part, so secondary)
                df_temp = pd.read_excel(feasibility_path, sheet_name=0, skiprows=3)
                col_match = [c for c in df_temp.columns if 'PART NO' in str(c).upper()]
                if col_match:
                    val = df_temp[col_match[0]].dropna().iloc[0]
                    part_no = str(val).replace('.0', '').strip()
                else:
                    # PRIORITY 3: Any digits in filename
                    match = re.search(r'\d+', os.path.basename(feasibility_path))
                    if match: part_no = match.group(0)
        except Exception as e:
            print(f"   [WARN] Could not extract part number: {e}")
            
        print(f"[TASK {task_id}] Target Part Number: {part_no}")
        
        # 1. Export 3D STL
        TASKS[task_id]["progress"] = 5
        TASKS[task_id]["message"] = "Initializing CAD geometry..."
        print(f"[TASK {task_id}] Exporting STEP to STL: {cad_path}")
        stl_filename = f"model_{part_no}.stl"
        stl_path = os.path.join(OUTPUT_DIR, stl_filename)
        if export_step_to_stl(cad_path, stl_path):
            TASKS[task_id]["stl_url"] = f"/outputs/{stl_filename}"
            TASKS[task_id]["progress"] = 15
            save_tasks()
            print(f"[TASK {task_id}] STL export successful.")
        
        # 2. BOM Generation
        if requested_outputs.get("bom"):
            print(f"[TASK {task_id}] Starting BOM generation...")
            TASKS[task_id]["message"] = "Generating Bill of Materials..."
            TASKS[task_id]["progress"] = 20
            bom_filename = f"BOM_Result_{part_no}.xlsx"
            bom_path = os.path.join(OUTPUT_DIR, bom_filename)
            
            tmp_img_dir = os.path.join(UPLOAD_DIR, f"tmp_imgs_{task_id}")
            os.makedirs(tmp_img_dir, exist_ok=True)
            
            generate_bom_excel(
                feasibility_path, 
                BOM_TEMPLATE_PATH, 
                drawings_dir, 
                tmp_img_dir, 
                bom_path
            )
            TASKS[task_id]["files"].append({"name": "Bill of Materials", "url": f"/outputs/{bom_filename}", "type": "xlsx"})
            TASKS[task_id]["progress"] = 45
            save_tasks()
            print(f"[TASK {task_id}] BOM generation complete.")

        # 3. PFD Generation
        if requested_outputs.get("pfd"):
            print(f"[TASK {task_id}] Starting PFD generation pipeline...")
            TASKS[task_id]["message"] = "Generating Progressive Flow Diagrams..."
            excel_filename = f"PFD_Result_{part_no}.xlsx"
            excel_path = os.path.join(OUTPUT_DIR, excel_filename)
            
            shutil.copy(PFD_TEMPLATE_PATH, excel_path)
            
            print(f"[TASK {task_id}] Rendering PFD Sheet 1 (Sub-Assy Index)...")
            render_sub_assy_index(feasibility_path, cad_path, excel_path, excel_path, OUTPUT_DIR)
            TASKS[task_id]["progress"] = 60
            
            print(f"[TASK {task_id}] Rendering PFD Sheet 2 (Sub-Assy Flow)...")
            render_sub_assy_sheet(feasibility_path, excel_path, excel_path)
            TASKS[task_id]["progress"] = 70
            
            print(f"[TASK {task_id}] Rendering PFD Sheet 3 (Sheetmetal Flow)...")
            render_sheetmetal_sheet(feasibility_path, excel_path, excel_path)
            TASKS[task_id]["progress"] = 80
            
            print(f"[TASK {task_id}] Rendering PFD Sheet 4 (BOP List)...")
            render_bop_sheet(feasibility_path, excel_path, excel_path)
            
            TASKS[task_id]["files"].append({"name": "Engineering PFD (Excel)", "url": f"/outputs/{excel_filename}", "type": "xlsx"})
            TASKS[task_id]["progress"] = 90
            print(f"[TASK {task_id}] PFD generation complete.")

        # 4. Tooling Analysis (Fixture Master List)
        if requested_outputs.get("tooling"):
            print(f"[TASK {task_id}] Starting Tooling List generation...")
            TASKS[task_id]["message"] = "Generating Tooling Master List..."
            TASKS[task_id]["progress"] = 92
            save_tasks()
            
            tool_filename = f"Tooling_List_{part_no}.xlsx"
            tool_path = os.path.join(OUTPUT_DIR, tool_filename)
            tool_img_dir = os.path.join(UPLOAD_DIR, f"tool_imgs_{task_id}")
            
            if generate_tooling_list(feasibility_path, TOOLING_TEMPLATE_PATH, tool_path, tool_img_dir):
                TASKS[task_id]["files"].append({"name": "Tooling Master List", "url": f"/outputs/{tool_filename}", "type": "xlsx"})
            
            TASKS[task_id]["progress"] = 98
            save_tasks()
            print(f"[TASK {task_id}] Tooling List generation complete.")

        TASKS[task_id]["progress"] = 100
        TASKS[task_id]["status"] = "completed"
        TASKS[task_id]["message"] = "Generation complete"
        save_tasks()
        print(f"[TASK {task_id}] ALL TASKS COMPLETED SUCCESSFULLY.\n")
        
    except Exception as e:
        print(f"[TASK {task_id}] FATAL ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        TASKS[task_id]["status"] = "error"
        TASKS[task_id]["error"] = str(e)
        TASKS[task_id]["message"] = f"Error: {str(e)}"

@router.post("/analyze")
async def start_analysis(
    background_tasks: BackgroundTasks,
    cad_file: UploadFile = File(...),
    feasibility_file: UploadFile = File(...),
    drawings: list[UploadFile] = File(default=[]),
    outputs: str = Form("{}")
):
    task_id = str(uuid.uuid4())[:8]
    requested_outputs = json.loads(outputs)
    
    # Initialize task tracking
    TASKS[task_id] = {
        "status": "queued",
        "progress": 0,
        "message": "Task queued...",
        "stl_url": None,
        "files": [],
        "error": None
    }
    save_tasks()
    
    # Save files
    cad_path = os.path.join(UPLOAD_DIR, f"{task_id}_{cad_file.filename}")
    feas_path = os.path.join(UPLOAD_DIR, f"{task_id}_{feasibility_file.filename}")
    
    with open(cad_path, "wb") as f:
        shutil.copyfileobj(cad_file.file, f)
    with open(feas_path, "wb") as f:
        shutil.copyfileobj(feasibility_file.file, f)
        
    # Save drawings if any
    drawings_dir = os.path.join(UPLOAD_DIR, f"{task_id}_drawings")
    os.makedirs(drawings_dir, exist_ok=True)
    for drawing in drawings:
        d_path = os.path.join(drawings_dir, drawing.filename)
        with open(d_path, "wb") as f:
            shutil.copyfileobj(drawing.file, f)
            
    # Start background task
    background_tasks.add_task(process_engineering_task, task_id, cad_path, feas_path, drawings_dir, requested_outputs)
    
    return {
        "message": "Analysis started",
        "task_id": task_id
    }

@router.get("/status/{task_id}")
async def get_analysis_status(task_id: str):
    if task_id in TASKS:
        return TASKS[task_id]
    return {"status": "not_found"}
