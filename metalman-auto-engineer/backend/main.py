from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api import routes, auth
from database import engine, SessionLocal
import models
from passlib.context import CryptContext

# Create tables
models.Base.metadata.create_all(bind=engine)

# Seed Data
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
db = SessionLocal()
try:
    # Roles
    admin_role = db.query(models.Role).filter(models.Role.name == "Admin").first()
    if not admin_role:
        admin_role = models.Role(name="Admin")
        db.add(admin_role)
    
    engineer_role = db.query(models.Role).filter(models.Role.name == "Engineer").first()
    if not engineer_role:
        engineer_role = models.Role(name="Engineer")
        db.add(engineer_role)
    
    db.commit()

    # Admin User
    admin_user = db.query(models.User).filter(models.User.email == "admin@metalman.io").first()
    if not admin_user:
        admin_user = models.User(
            username="admin",
            email="admin@metalman.io",
            hashed_password=pwd_context.hash("admin123"),
            role_id=admin_role.id
        )
        db.add(admin_user)
    
    # Engineer User
    eng_user = db.query(models.User).filter(models.User.email == "demo@metalman.io").first()
    if not eng_user:
        eng_user = models.User(
            username="engineer",
            email="demo@metalman.io",
            hashed_password=pwd_context.hash("password123"),
            role_id=engineer_role.id
        )
        db.add(eng_user)
    
    db.commit()
finally:
    db.close()

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
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

# Serve generated outputs statically
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

# Serve Stitch Demo statically
app.mount("/stitch-demo", StaticFiles(directory="stitch_suite"), name="stitch-demo")

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
