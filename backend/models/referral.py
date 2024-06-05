from models.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class Referral(Base):
    __tablename__ = "referalls"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("users.id"))
    doctor_id = Column(String, ForeignKey("doctors.id"))
    description = Column(String)
