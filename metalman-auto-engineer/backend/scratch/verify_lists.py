import openpyxl
wb = openpyxl.load_workbook(r'assets\test_inputs\PFD_Completed_TEST_v3.xlsx', data_only=True)
sheet = wb['Q-SHEETMETAL_PARTS']
for r in range(1, 150):
    val = sheet.cell(row=r, column=8).value
    if val:
        val_str = str(val).replace('\n', ' ')
        if 'Straightening Parts List' in val_str:
            print("Row " + str(r) + " (Straighten): " + val_str)
        if 'Chamfering Parts List' in val_str:
            print("Row " + str(r) + " (Chamfer): " + val_str)
