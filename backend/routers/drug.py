from fastapi import APIRouter, Depends, HTTPException
from models.database import SessionLocal
from sqlalchemy.orm import Session
from models.drug import Drug


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/drugs")
async def get_prescription(name: str = "", count: int = 5, db: Session = Depends(get_db)):
    try:
        drugs = db.query(Drug).filter(Drug.name.startswith(name)).all()
        if not drugs:
            raise HTTPException(status_code=404, detail="No drugs found with the given name.")
        return drugs[0:count]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))