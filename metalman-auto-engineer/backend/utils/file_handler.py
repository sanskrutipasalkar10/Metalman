import shutil
import os

def save_uploaded_file(upload_file, destination_dir: str):
    """
    Saves an uploaded file to a local directory and returns the full path.
    """
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)
        
    file_path = os.path.join(destination_dir, upload_file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return file_path

def cleanup_temp_files(file_paths: list):
    """
    Deletes temporary files from the local filesystem.
    """
    for path in file_paths:
        if os.path.exists(path):
            os.remove(path)
