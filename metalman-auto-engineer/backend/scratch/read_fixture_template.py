import openpyxl

wb = openpyxl.load_workbook("c:/Users/it/Desktop/fixture plan template.xlsx")
ws = wb.active

print("Merged cell ranges:")
for r in sorted(list(ws.merged_cells.ranges), key=lambda x: (x.min_row, x.min_col)):
    print(r)
