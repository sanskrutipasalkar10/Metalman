import requests
import json

try:
    # Just a dummy request to see if we can get anything
    # Since there is no list_tasks endpoint, we can't easily find them if we don't know the ID.
    # But I can check if the server is up.
    resp = requests.get("http://localhost:8000/api/status/1a828803")
    print(f"Task 1a828803: {resp.json()}")
except Exception as e:
    print(f"Error: {e}")
