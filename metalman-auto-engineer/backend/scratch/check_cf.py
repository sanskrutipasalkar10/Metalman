import openpyxl
wb = openpyxl.load_workbook(r'assets\pfd template.xlsx')
sheet = wb['SUB_ASSY']
for cf in sheet.conditional_formatting:
    print(f"Cells: {cf.sqref}")
    for rule in cf.rules:
        print(f"  Type: {rule.type}, Formula: {rule.formula}")
