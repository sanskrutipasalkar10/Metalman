from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api import routes

app = FastAPI(
    title="Metalman Auto-Engineer API",
    description="The Python FastAPI Brain for Lights-Out Engineering Automation",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(routes.router, prefix="/api")

# Serve generated outputs statically
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Metalman Auto-Engineer API is operational",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    # Set reload=False by default to avoid recursive 'spawn' crashes on Windows 
    # during long-running background tasks that modify files.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
