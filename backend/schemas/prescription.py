from pydantic import BaseModel
from .user import User
from .doctor import Doctor


class Prescritpion(BaseModel):
    """Class represents the schema of a prescription.

    Attributes:
        patient: Model of a user.
        doctor: Model of a doctor.
        description: Descritpion for a prescription (quantity, dosage, etc.).
    """

    patient: User
    doctor: Doctor
    description: str

    class Config:
        orm_mode = True
