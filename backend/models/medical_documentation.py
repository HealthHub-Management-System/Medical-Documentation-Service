from models.database import Base
from sqlalchemy import String, Integer, Column


class MedicalDocumentation(Base):
    __tablename__ = "medical_documentation"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    diagnose = Column(String, nullable=False)
    recommendations = Column(String, nullable=False)
