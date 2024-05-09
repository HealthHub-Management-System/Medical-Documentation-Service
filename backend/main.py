from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from models.medical_documentation import MedicalDocumentation, MedicalDocumentationEntry
from models.database import SessionLocal
from models.user import User
from models.doctor import Doctor
from models.prescription import Prescription
from contextlib import asynccontextmanager
from routers import medical_documentation, prescription, referral

        
async def init_db_values(db: Session):
    # Create some initial values in the database
    if db.query(User).first() is None:
        user = User(first_name="John", last_name="Doe", isPatient=True)
        db.add(user)
        db.commit()
        medical_documentation = MedicalDocumentation(patient_id=user.id)
        db.add(medical_documentation)
        db.commit()
        medical_documentation_entry = MedicalDocumentationEntry(date="2021-01-01", diagnose="Headache", recommendations="Rest", medical_documentation_id=medical_documentation.id)
        db.add(medical_documentation_entry)
        db.commit()

    if db.query(Doctor).first() is None:
        doctor = Doctor(first_name="DocJohn", last_name="DocDoe")
        db.add(doctor)
        db.commit()
        user = db.query(User).first()
        prescription = Prescription(doctor_id = doctor.id, patient_id = user.id, description = "Painkillers")
        db.add(prescription)
        db.commit()
        
    db.close()

    
        
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the database
    db = SessionLocal()
    await init_db_values(db)
    yield
    # Close the database connection
    SessionLocal.close_all()
    
app = FastAPI(lifespan=lifespan)
app.include_router(medical_documentation.router)
app.include_router(prescription.router)
app.include_router(referral.router)

@app.get("/")
def read_root():
    # Use the db session to interact with the database
    return {"Hello": "World"}
