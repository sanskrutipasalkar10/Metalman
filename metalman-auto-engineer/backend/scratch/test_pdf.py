import os
import pythoncom
import win32com.client

excel_path = os.path.abspath("outputs/Tooling_List_92187158.xlsx")
pdf_path = os.path.abspath("outputs/Tooling_List_92187158.pdf")

print(f"Excel Path: {excel_path}")
print(f"PDF Path: {pdf_path}")

try:
    pythoncom.CoInitialize()
    excel = win32com.client.Dispatch("Excel.Application")
    excel.Visible = False
    excel.DisplayAlerts = False
    try:
        print("Opening workbook...")
        wb = excel.Workbooks.Open(excel_path)
        print("Exporting as PDF...")
        wb.ExportAsFixedFormat(0, pdf_path)
        print("Closing workbook...")
        wb.Close(False)
        print("Success!")
    finally:
        excel.Quit()
except Exception as e:
    print(f"Failed: {e}")
