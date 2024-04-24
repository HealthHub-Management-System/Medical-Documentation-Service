from pydantic import BaseModel


class MedicalDocumentation(BaseModel):
    date: str
    diagnose: str
    recommendations: str
