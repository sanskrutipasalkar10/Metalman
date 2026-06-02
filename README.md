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
