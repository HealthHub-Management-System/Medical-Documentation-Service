from ..database import Base
from sqlalchemy import String, Integer, Boolean, Column


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)
    isPatient = Column(Boolean)
