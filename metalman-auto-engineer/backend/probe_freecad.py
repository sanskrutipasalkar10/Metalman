import subprocess
import os
import glob

FREECAD_CMD = glob.glob(r"C:\Program Files\FreeCAD*\bin\FreeCADCmd.exe")[0]
MASTER_STEP = os.path.abspath("assets/test_inputs/92187158_asm.stp")
WORKER = "assets/test_inputs/tmp_part_probe.py"
OUTPUT_FILE = os.path.abspath("assets/test_inputs/probe_output.txt")

# Write results to a file inside FreeCAD - bypasses stdout capture
worker_code = r'''
import FreeCAD
import Import
import sys

output_file = r"''' + OUTPUT_FILE.replace("\\", "\\\\") + r'''"
master_file = r"''' + MASTER_STEP.replace("\\", "\\\\") + r'''"

results = []

try:
    # Method 1: Import.insert with OCAF
    param = FreeCAD.ParamGet("User parameter:BaseApp/Preferences/Mod/Import")
    param.SetBool("ExpandCompound", True)
    param.SetBool("UseOCAF", True)
    param.SetBool("ImportHidden", False)
    
    doc = FreeCAD.newDocument("Doc")
    Import.insert(master_file, doc.Name)
    doc.recompute()
    
    results.append("=== Method 1: Import.insert ===")
    results.append(f"Total objects: {len(doc.Objects)}")
    for obj in doc.Objects:
        label = getattr(obj, 'Label', 'NO_LABEL')
        shape_type = ""
        if hasattr(obj, 'Shape'):
            try:
                shape_type = obj.Shape.ShapeType
            except:
                pass
        results.append(f"  [{obj.TypeId}] Label='{label}' Shape='{shape_type}'")
    
    FreeCAD.closeDocument(doc.Name)
    
except Exception as e:
    results.append(f"Method 1 error: {e}")

try:
    # Method 2: Part.read to check raw sub-shapes names
    import Part
    shape = Part.read(master_file)
    results.append("")
    results.append("=== Method 2: Part.read ===")
    results.append(f"Top-level ShapeType: {shape.ShapeType}")
    results.append(f"Num Solids: {len(shape.Solids)}")
    results.append(f"Num Compounds: {len(shape.Compounds)}")
    results.append(f"Num Shells: {len(shape.Shells)}")
    
    # Try to get sub-shape names from STEP
    for i, sub in enumerate(shape.SubShapes[:20]):
        results.append(f"  SubShape[{i}]: Type={sub.ShapeType}")
    
except Exception as e:
    results.append(f"Method 2 error: {e}")

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(results))

sys.exit(0)
'''

with open(WORKER, "w", encoding="utf-8") as f:
    f.write(worker_code)

print(f"Probing: {MASTER_STEP}")
result = subprocess.run([FREECAD_CMD, WORKER], capture_output=True, text=True, timeout=120)
print(f"Exit code: {result.returncode}")

if os.path.exists(WORKER):
    os.remove(WORKER)

# Read and print the file output
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r") as f:
        print(f.read())
else:
    print("OUTPUT FILE NOT CREATED!")
    print("STDERR:", result.stderr[-500:])
