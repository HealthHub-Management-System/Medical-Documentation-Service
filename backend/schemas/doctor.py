from pydantic import BaseModel


class Doctor(BaseModel):
    """Class represents the schema of a doctor.

    Attributes:
        firstName: First name of the doctor.
        lastName: Last name of the doctor.
    """

    firstName: str
    lastName: str

    class Config:
        orm_mode = True
