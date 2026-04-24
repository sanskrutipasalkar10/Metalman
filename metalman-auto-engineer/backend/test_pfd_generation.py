import os
from services.pfd_renderer import (
    render_sub_assy_index,
    render_sub_assy_sheet,
    render_sheetmetal_sheet,
    render_bop_sheet
)
import shutil

# Master Paths
FEASIBILITY_FILE = os.path.join("assets", "test_inputs", "Door Feasbility 92187158.xlsx")
TEMPLATE_FILE = os.path.join("assets", "pfd template.xlsx")
OUTPUT_FILE = os.path.join("assets", "test_inputs", "PFD_Completed_TEST_v6.xlsx")
OUTPUT_DIR_IMG = os.path.join("assets", "test_inputs", "pfd_images")

# The step file doesn't exist yet but testing robust orchestration
MASTER_STEP_FILE = os.path.join("assets", "test_inputs", "92187158_asm.stp")

def test_pfd():
    print(f"Creating pristine copy of template -> {OUTPUT_FILE}")
    shutil.copy(TEMPLATE_FILE, OUTPUT_FILE)
    
    print("\n==================================")
    print("PFD SHEET 1: SUB-ASSEMBLY INDEX")
    print("==================================")
    render_sub_assy_index(FEASIBILITY_FILE, MASTER_STEP_FILE, OUTPUT_FILE, OUTPUT_FILE, OUTPUT_DIR_IMG)

    print("\n==================================")
    print("PFD SHEET 2: SUB_ASSY DETAILS")
    print("==================================")
    render_sub_assy_sheet(FEASIBILITY_FILE, OUTPUT_FILE, OUTPUT_FILE)

    print("\n==================================")
    print("PFD SHEET 3: SHEETMETAL PARTS")
    print("==================================")
    render_sheetmetal_sheet(FEASIBILITY_FILE, OUTPUT_FILE, OUTPUT_FILE)

    print("\n==================================")
    print("PFD SHEET 4: BOP & HARDWARE")
    print("==================================")
    render_bop_sheet(FEASIBILITY_FILE, OUTPUT_FILE, OUTPUT_FILE)

    print(f"\nALL TESTS COMPLETED. PFD SAVED AT: {OUTPUT_FILE}")

if __name__ == "__main__":
    test_pfd()
