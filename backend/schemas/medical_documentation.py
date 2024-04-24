from pydantic import BaseModel


class MedicalDocumentation(BaseModel):
    """Class represents the schema of a medical documentation.

    Attributes:
        date: Date of the note in documentation.
        diagnose: Diagnose of the patient.
        recommendations: Recommendations for the patient.
    """

    date: str
    diagnose: str
    recommendations: str

    class Config:
        orm_mode = True
