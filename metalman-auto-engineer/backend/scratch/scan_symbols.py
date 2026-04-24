import openpyxl
wb = openpyxl.load_workbook(r'assets\pfd template.xlsx')
sheet = wb['SUB_ASSY']
found = False
for r in range(1, 100):
    vals = [sheet.cell(row=r, column=c).value for c in range(2, 6)]
    if any(v is not None for v in vals):
        print(f"Row {r}: {vals}")
        found = True
if not found:
    print("No values found in columns B-E")
