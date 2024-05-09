from fastapi import APIRouter, Depends, Header, HTTPException
from models.database import SessionLocal
from sqlalchemy.orm import Session, joinedload
import models.referral as model
import schemas.referral as schema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/referrals")
async def get_prescription(patient_id = Header(1), db: Session = Depends(get_db)):
    response = db.query(model.Referral).filter(model.Referral.patient_id == patient_id).first()
    if response is None:
        raise HTTPException(status_code=404, detail="No referals found for this patient")
    else:
        return response
    
@router.get("/referals/{referal_id}")
async def get_prescription(referal_id: int, db: Session = Depends(get_db)):
    referal = db.query(model.Referral).filter(model.Referral.id == referal_id).first()
    if referal is None:
        raise HTTPException(status_code=404, detail="Referal not found")
    return referal

@router.post("/referal")
async def add_prescription(referal: schema.Referral, patient_id = Header(1), doctor_id = Header(1), db: Session = Depends(get_db)):
    entry = model.Referral(**referal.model_dump(),patient_id = patient_id, doctor_id = doctor_id)
    db.add(entry)
    db.commit()
    return entry


@router.delete("/referal/{referal_id}")
async def remove_presription(referal_id: int, db: Session = Depends(get_db)):
    entry = db.query(model.Referral).filter(model.Referral.id == referal_id).first()
    db.delete(entry)
    db.commit()
    return entry