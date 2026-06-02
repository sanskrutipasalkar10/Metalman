# Metalman Auto-Engineering System

An automated engineering document generation pipeline designed for Metalman. This application streamlines the creation of Control Plans, Process Flow Diagrams (PFD), and Fixture Master Plans from feasibility and CAD data.

## 🚀 Key Features

- **Automated Document Generation**: Create professional Excel and PDF documents (Control Plan, PFD, Fixture Plan) in seconds.
- **CAD Integration**: Automatically extract part-specific images from 3D STEP files using FreeCAD and CadQuery.
- **Smart Filtering**: Intelligent keyword-based filtering to segregate child sheetmetal parts from assemblies.
- **Sequential Process Binding**: Dynamic PFD generation that automatically inherits sub-assembly references from preceding operations.
- **Fresh Workbook Architecture**: Optimized PDF generation that ensures clean, single-page-friendly exports without "ghost" formatting.

## 🛠 Tech Stack

### Backend
- **Core**: Python 3.x
- **API**: Flask / FastAPI
- **Excel Manipulation**: `openpyxl`, `pandas`
- **CAD Processing**: `FreeCAD`, `CadQuery`
- **PDF Export**: `win32com` (Windows only)

### Frontend
- **Framework**: React / Vite
- **Styling**: Vanilla CSS with modern aesthetics (Glassmorphism, Dark Mode support)
- **State Management**: React Hooks

## 📋 Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **FreeCAD** (configured in system path or project settings)
- **Microsoft Excel** (required for `win32com` PDF export functionality)

## ⚙️ Installation & Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd metalman-auto-engineer/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd metalman-auto-engineer/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

Internal use only.

<img width="1912" height="953" alt="image" src="https://github.com/user-attachments/assets/9a110892-f2d3-4eb7-adb2-478d4d9e3397" />

<img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/ee19d8b2-a5f2-41d8-826e-b1aecae3d20d" />

<img width="1914" height="870" alt="image" src="https://github.com/user-attachments/assets/654a9fe7-5a19-414b-8dda-982775b2355d" />

<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/6af922f3-04b0-47d9-a781-4fc206918bff" />

<img width="1890" height="1066" alt="image" src="https://github.com/user-attachments/assets/d171ad68-8c1c-436d-bdc4-6695e0d7aaad" />

<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/c4f8cad0-83c7-42c7-8640-bdc0f94e196c" />

<img width="1909" height="996" alt="image" src="https://github.com/user-attachments/assets/1c2d6e41-174c-4b31-8def-e9a3700525c8" />


