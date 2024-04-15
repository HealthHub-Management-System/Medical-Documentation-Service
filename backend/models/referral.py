from ..database import Base
from sqlalchemy import Column, Integer, String


class Referral(Base):
    __tablename__ = "referalls"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, foreign_key="patients.id")
    doctor_id = Column(Integer, foreign_key="doctors.id")
    description = Column(String)
