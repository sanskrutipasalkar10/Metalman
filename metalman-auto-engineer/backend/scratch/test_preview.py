import os
import io
from xlsx2html import xlsx2html

file_path = "outputs/Fitment_Checksheet_92187158.xlsx"
if not os.path.exists(file_path):
    print("File not found")
else:
    print(f"Converting {file_path}...")
    try:
        output_io = io.StringIO()
        xlsx2html(file_path, output_io)
        print("Success! HTML length:", len(output_io.getvalue()))
    except Exception as e:
        print("Error:", e)
