from pydantic import BaseModel


class Doctor(BaseModel):
    firstName: str
    lastName: str
