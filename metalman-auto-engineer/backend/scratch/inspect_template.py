import openpyxl
import os

wb_path = r"c:\Users\it\Desktop\Projects\metalman_app\metalman-auto-engineer\backend\assets\CONTROL_PLAN_TEMPLATE.xlsx"
if os.path.exists(wb_path):
    wb = openpyxl.load_workbook(wb_path)
    for sheetname in wb.sheetnames:
        ws = wb[sheetname]
        print(f"Sheet: {sheetname}")
        print(f"  Number of images: {len(ws._images)}")
        for idx, img in enumerate(ws._images):
            try:
                if isinstance(img.anchor, str):
                    anchor_str = img.anchor
                else:
                    anchor_str = f"Col={img.anchor._from.col}, Row={img.anchor._from.row}"
            except Exception as e:
                anchor_str = f"Error: {e}"
            print(f"    Image {idx}: anchor={anchor_str}, size={img.width}x{img.height}")
else:
    print("File not found")
