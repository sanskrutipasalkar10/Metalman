import cadquery as cq
import os

def export_step_to_stl(step_path: str, output_path: str):
    """
    Converts a STEP file to STL for browser-based 3D visualization.
    """
    try:
        print(f"Converting {step_path} to STL...")
        # Import STEP
        result = cq.importers.importStep(step_path)
        # Export STL
        cq.exporters.export(result, output_path)
        print(f"STL exported to {output_path}")
        return True
    except Exception as e:
        print(f"Error converting STEP to STL: {e}")
        return False
