# Start Cropper Backend
Write-Host "Starting Cropper Backend on port 8001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python main.py" -WindowStyle Normal

# Start Cropper Frontend
Write-Host "Starting Cropper Frontend on port 5188..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

Write-Host "Services are starting up. Please wait a few seconds before refreshing the Cropper tab in the Metalman app." -ForegroundColor Green
