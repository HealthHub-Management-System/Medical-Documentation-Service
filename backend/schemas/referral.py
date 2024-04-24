from pydantic import BaseModel
from .user import User
from .doctor import Doctor


class Referral(BaseModel):
    patient: User
    doctor: Doctor
    description: str
