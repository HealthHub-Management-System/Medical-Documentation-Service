from pydantic import BaseModel


class User(BaseModel):
    """Class represents the schema of a user.

    Attributes:
        first_name: First name of the user.
        last_name: Last name of the user.
        isPatient: Flag if the user is a patient.
    """

    first_name: str
    last_name: str
    isPatient: bool

    class Config:
        orm_mode = True
