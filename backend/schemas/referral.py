from pydantic import BaseModel
from backend.schemas.user import User
from backend.schemas.doctor import Doctor


class Referral(BaseModel):
    """Class represents the schema of a referral.

    Attributes:
        patient: Model of a user.
        doctor: Model of a doctor.
        description: Descritpion for a referral.
    """

    patient: User
    doctor: Doctor
    description: str

    class Config:
        orm_mode = True
