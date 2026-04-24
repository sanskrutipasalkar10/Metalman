import requests
import time
import os

BASE_URL = "http://127.0.0.1:8000/api"
CAD_FILE = r"assets\test_inputs\92187158_asm.stp" 
FEASIBILITY_FILE = r"assets\test_inputs\Door Feasbility 92187158.xlsx"

def test_api():
    print("--- 1. Starting Analysis ---")
    with open(CAD_FILE, 'rb') as cad, open(FEASIBILITY_FILE, 'rb') as feas:
        files = {
            'cad_file': ('92187158.step', cad),
            'feasibility_file': ('feasibility.xlsx', feas)
        }
        response = requests.post(f"{BASE_URL}/analyze", files=files)
    
    if response.status_code != 200:
        print(f"Error starting analysis: {response.text}")
        return

    task_id = response.json()['task_id']
    print(f"Task ID: {task_id}")

    print("\n--- 2. Monitoring Status ---")
    while True:
        status_resp = requests.get(f"{BASE_URL}/status/{task_id}")
        data = status_resp.json()
        
        status = data.get('status')
        progress = data.get('progress', 0)
        stl = data.get('stl_url')
        
        print(f"Status: {status} | Progress: {progress}% | STL: {stl}")
        
        if status == 'completed':
            print("\n--- 3. Generation Success! ---")
            print(f"Excel URL: {data.get('result_url')}")
            print(f"PDF URL: {data.get('pdf_url')}")
            break
        elif status == 'error':
            print(f"Error: {data.get('error')}")
            break
            
        time.sleep(2)

if __name__ == "__main__":
    # Check files exist
    if not os.path.exists(CAD_FILE) or not os.path.exists(FEASIBILITY_FILE):
        print("Test files missing. Please ensure they are in assets/test_inputs/")
    else:
        test_api()
