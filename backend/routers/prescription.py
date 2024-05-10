from fastapi import APIRouter, Depends, Header, HTTPException
from models.database import SessionLocal
from sqlalchemy.orm import Session, joinedload
import models.prescription as model
import schemas.prescription as schema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/prescriptions")
async def get_prescription(patient_id: int, db: Session = Depends(get_db)):
    response = db.query(model.Prescription).filter(model.Prescription.patient_id == patient_id).all()
    return response
    
@router.get("/prescriptions/{prescription_id}")
async def get_prescription(prescription_id: int, db: Session = Depends(get_db)):
    prescription = db.query(model.Prescription).filter(model.Prescription.id == prescription_id).first()
    if prescription is None:
        raise HTTPException(status_code=404, detail="Presription not found")
    return prescription

@router.post("/prescription")
async def add_prescription(prescription: schema.Prescritpion, db: Session = Depends(get_db)):
    entry = model.Prescription(**prescription.model_dump())
    db.add(entry)
    db.commit()
    return entry


@router.delete("/prescription/{prescription_id}")
async def remove_presription(prescription_id: int, db: Session = Depends(get_db)):
    prescription = db.query(model.Prescription).filter(model.Prescription.id == prescription_id).first()
    if prescription is None:
        raise HTTPException(status_code=404, detail="Referal not found")
    else:
        db.delete(prescription)
        db.commit()
        return prescription