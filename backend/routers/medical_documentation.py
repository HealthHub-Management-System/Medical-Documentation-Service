from fastapi import APIRouter, Depends, Header, HTTPException
from typing import Annotated
from models.database import SessionLocal
import models.medical_documentation as models
import schemas.medical_documentation as schemas
from sqlalchemy.orm import Session, joinedload

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def create_medical_documentation_if_not_exists(db: Session, user_id : int = 1) -> models.MedicalDocumentation:
    medical_documentation = db.query(models.MedicalDocumentation).filter(models.MedicalDocumentation.patient_id == user_id).first()
    if medical_documentation is None:
        medical_documentation = models.MedicalDocumentation(patient_id=user_id)
        db.add(medical_documentation)
        db.commit()
        print("DOne")
        
    return medical_documentation
    
@router.get("/medical_documentation")
async def get_medical_documentation(user_id: int = Header(1), db: Session = Depends(get_db)):
    if db.query(models.MedicalDocumentation).filter(models.MedicalDocumentation.patient_id == user_id).first() is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db.query(models.MedicalDocumentation).filter(models.MedicalDocumentation.patient_id == user_id).options(joinedload(models.MedicalDocumentation.medical_documentation_entries)).first()

@router.get("/medical_documentation/{medical_documentation_entry_id}")
async def get_medical_documentation(medical_documentation_entry_id: int, db: Session = Depends(get_db)):
    medical_documentation = db.query(models.MedicalDocumentationEntry).filter(models.MedicalDocumentationEntry.id == medical_documentation_entry_id).first()
    if medical_documentation is None:
        raise HTTPException(status_code=404, detail="Medical Documentation not found")
    return medical_documentation

@router.post("/medical_documentation/medical_documentation_entry")
async def create_medical_documentation_entry(
    medical_documentation_entry: schemas.MedicalDocumentationEntry, user_id:int = Header(1), db: Session = Depends(get_db)):
    medical_documentation =  await create_medical_documentation_if_not_exists(db, user_id)
    entry = models.MedicalDocumentationEntry(**medical_documentation_entry.model_dump(), medical_documentation_id=medical_documentation.id)
    db.add(entry)
    db.commit()
    return entry   

@router.delete("/medical_documentation/medical_documentation_entry/{medical_documentation_entry_id}")
async def delete_medical_documentation_entry(medical_documentation_entry_id: int, db: Session = Depends(get_db)):
    medical_documentation_entry = db.query(models.MedicalDocumentationEntry).filter(models.MedicalDocumentationEntry.id == medical_documentation_entry_id).first()
    db.delete(medical_documentation_entry)
    db.commit()
    return medical_documentation_entry
