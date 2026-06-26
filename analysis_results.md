# Metalman Auto-Engineer Project Explanation

The **Metalman Auto-Engineer** is a "Lights-Out Engineering Automation" platform designed to automate the generation of industrial engineering documents (BOM, PFD, PFMEA, Control Plans) from CAD data (STEP files) and feasibility studies.

## 🚀 Tech Stack
- **Backend**: Python 3.11+, FastAPI (Web Framework), SQLAlchemy (ORM), Celery (Background Tasks), Redis (Task Queue), OpenCV/Pillow (Image Processing), Win32Com (Excel-to-PDF conversion).
- **Frontend**: Vite + React + TypeScript, Tailwind CSS, Shadcn UI, React Query, Lucide Icons, Three.js (3D visualization).

---

## 📁 Folder Structure & Functionality

### 1. Root Directory
- `backend/`: The heart of the automation engine.
- `frontend/`: The user interface for engineers to upload files and download reports.
- [docker-compose.yml](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/docker-compose.yml): Configuration for running the entire stack (including Redis) in containers.

---

### 2. Backend (`/backend`)
Contains the FastAPI server and the heavy-duty engineering logic.

- **[main.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/main.py)**: The entry point. Initializes database, seeds default users (`admin`, [engineer](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/api/routes.py#131-352)), configures CORS, and mounts static folders like `/outputs` and `/stitch-demo`.
- **`api/`**:
    - [auth.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/api/auth.py): Handles user login, registration, and JWT token generation.
    - [routes.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/api/routes.py): The main API controller. Defines endpoints like `/analyze` (starts the pipeline), `/status` (tracks progress), `/preview` (Excel preview), and `/save-crop` (welding tool).
- **`services/` (The Automation Brain)**:
    - [bom_generator.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/bom_generator.py): Extracts parts and quantities from feasibility studies and drawings to generate the Bill of Materials.
    - [pfd_renderer.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/pfd_renderer.py): Logic for creating Process Flow Diagrams (PFD) with multiple sheets (Sub-Assy, Sheetmetal, BOP).
    - [pfmea_generator.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/pfmea_generator.py): Automatically generates risk analysis documents using predefined logic dictionaries.
    - [control_plan_generator.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/control_plan_generator.py): Links PFD and PFMEA data to create the final production Control Plan.
    - [cad_service.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/cad_service.py): Interfaces with geometry kernels to export/process 3D CAD data.
    - [tooling_generator.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/tooling_generator.py): Generates the Tooling Master List.
    - [correction_service.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/services/correction_service.py): A bulk-update engine that applies manual corrections to generated Excel documents.
- **`assets/`**: Contains Excel templates (`PFD_TEMPLATE.xlsx`, `BOM_TEMPLATE.xlsx`) and JSON logic dictionaries for PFMEA/Control Plans.
- **[database.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/database.py) & [models.py](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/models.py)**: SQLite database setup and User/Role table definitions.
- **`outputs/`**: Temporary storage for generated Excel reports, PDFs, and STL files.
- **`uploads/`**: Stores uploaded CAD files, feasibility studies, and drawing images.

---

### 3. Frontend (`/frontend`)
A modern React application built for high performance and visual excellence.

- **[src/App.tsx](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/frontend/src/App.tsx)**: Defines application routes such as Dashboard, Login, Correction, and the Welding Cropper.
- **`src/pages/`**:
    - `Dashboard.tsx`: The main workspace where engineers upload files and monitor task progress.
    - `Cropper.tsx`: A specialized UI for cropping welding details from drawing PDFs.
    - `Correction.tsx`: An interface for checking and correcting generated documentation errors.
    - `StitchDemo.tsx`: Integration with the wider Stitch Manufacturing Suite.
- **`src/components/`**: Reusable UI components (Modals, Progress Bars, 3D Viewers, etc.).
- **`src/lib/`**: Contains shared logic and API client configurations (Axios).

---

## 🛠️ Key Functionalities

### A. The Engineering Pipeline ([process_engineering_task](file:///c:/Users/it/Desktop/Projects/metalman_app/metalman-auto-engineer/backend/api/routes.py#131-352))
When a user uploads a CAD file and a Feasibility study:
1. **CAD Extraction**: Converts STEP to STL for 3D visualization in the browser.
2. **BOM Syncing**: Cross-references feasibility data with drawing names.
3. **PFD Generation**: Renders complex process flows into multi-sheet Excel files.
4. **Logic Synthesis**: Generates PFMEA and Control Plans by matching process names to a predefined "Brain" (JSON dictionaries).

### B. High-Fidelity Preview
The app uses **Win32Com** (native Excel) on the server to convert generated `.xlsx` reports into `.pdf` files. This ensures that what the user sees in the browser preview is exactly what they will get when they download the file.

### C. Welding Cropper
A secondary tool that allows engineers to "clip" specific regions from technical drawings and insert them directly into organized rows in a "Welding Report" Excel file.

### D. Stitch Integration
The application serves as a bridge to the "Stitch Demo" suite, allowing for a unified "Manufacturing Execution" experience.
