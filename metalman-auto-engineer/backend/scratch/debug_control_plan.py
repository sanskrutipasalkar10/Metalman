import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.control_plan_generator import generate_control_plan_excel
from services.pfd_renderer import extract_feasibility_data

task_id = "5902feed"
part_no = "92187158"

UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads"))
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "outputs"))

feasibility_path = os.path.join(UPLOAD_DIR, "5902feed_Door Feasbility 92187158_new (2).xlsx")
CONTROL_PLAN_TEMPLATE_PATH = os.path.join("assets", "CONTROL_PLAN_TEMPLATE.xlsx")
CONTROL_PLAN_DICT_DIR = os.path.join("assets", "control_plan_dicts")
pfd_out_path = os.path.join(OUTPUT_DIR, "PFD_Result_92187158.xlsx")
tmp_img_dir = os.path.join(UPLOAD_DIR, "tmp_imgs_5902feed")
cp_path = os.path.join(OUTPUT_DIR, "Control_Plan_92187158_debug.xlsx")

try:
    _, assy_data = extract_feasibility_data(feasibility_path)
except Exception as e:
    print(f"Failed to extract sub assy: {e}")
    assy_data = []

print("Starting debug execution...")
generated = generate_control_plan_excel(
    feasibility_path=feasibility_path,
    template_path=CONTROL_PLAN_TEMPLATE_PATH,
    output_path=cp_path,
    dict_dir=CONTROL_PLAN_DICT_DIR,
    pfd_output_path=pfd_out_path,
    img_dir=tmp_img_dir,
    assy_data=assy_data,
    pfd_img_dir=OUTPUT_DIR,
)

print(f"Generated control plan: {generated}")
