import os
from services.bom_generator import generate_bom_excel
from dotenv import load_dotenv

load_dotenv()

def run_test():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    feasibility_file = os.path.join(base_dir, "assets", "test_inputs", "Door Feasbility 92187158.xlsx")
    template_path = os.path.join(base_dir, "assets", "BLANK_BOM_TEMPLATE.xlsx")
    pdf_directory = os.path.join(base_dir, "assets", "test_inputs")
    tmp_image_directory = os.path.join(base_dir, "assets", "test_inputs", "tmp_images")
    output_path = os.path.join(base_dir, "assets", "test_inputs", "BOM_Completed_TEST.xlsx")
    
    if not os.path.exists(tmp_image_directory):
        os.makedirs(tmp_image_directory)
        
    print(f"Starting test with OLLAMA_BASE_URL: {os.getenv('OLLAMA_BASE_URL')}")
    
    result = generate_bom_excel(
        feasibility_file=feasibility_file,
        template_path=template_path,
        pdf_directory=pdf_directory,
        tmp_image_directory=tmp_image_directory,
        output_path=output_path,
        force_rewrite=True
    )
    
    print(f"Test Result: {result}")

if __name__ == "__main__":
    run_test()
