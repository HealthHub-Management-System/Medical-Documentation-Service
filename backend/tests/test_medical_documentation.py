




# from fastapi.testclient import TestClient
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.pool import StaticPool
# from models.user import User
# from models.database import Base
# from pytest_postgresql import factories
# from main import app
# import pytest
# from sqlalchemy.orm import scoped_session
# from models.medical_documentation import MedicalDocumentation
# from routers.medical_documentation import create_medical_documentation_if_not_exists, get_db

# pytest_plugins = ('pytest_asyncio',)

# def load_database(**kwargs):
#     connection = f"postgresql+psycopg2://{kwargs['user']}:@{kwargs['host']}:{kwargs['port']}/{kwargs['dbname']}"
#     engine = create_engine(connection)
#     Base.metadata.create_all(engine)
#     session = scoped_session(sessionmaker(bind=engine))
#     # add things to session
#     session.commit()

# postgresql_proc = factories.postgresql_proc(load=[load_database])

# postgresql = factories.postgresql('postgresql_proc') # still need to check if this is actually needed or not

# @pytest.fixture
# def dbsession(postgresql):
#     connection = f'postgresql+psycopg2://{postgresql.info.user}:@{postgresql.info.host}:{postgresql.info.port}/{postgresql.info.dbname}'
#     engine = create_engine(connection)

#     session = scoped_session(sessionmaker(bind=engine))
#     yield session
#     # 'Base.metadata.drop_all(engine)' here specifically does not work. It is also not needed. If you leave out the session.close()
#     # all the tests still run, but you get a warning/error at the end of the tests.
#     session.close()

# def override_get_db(dbsession):
#     try:
#         db = dbsession
#         yield db
#     finally:
#         db.close()
    
# app.dependency_overrides[get_db] = override_get_db
# client = TestClient(app=app)

# def add_user(session):
#     user = User(id=2, first_name="Test", last_name="User")
#     session.add(user)
#     session.commit()

# async def test_create_medical_documentation_if_not_exists(dbsession):
#     add_user(dbsession)
#     assert dbsession.query(MedicalDocumentation).filter(MedicalDocumentation.patient_id == 2).first() is None
#     medical_documentation = await create_medical_documentation_if_not_exists(dbsession(), user_id=2)
#     assert isinstance(medical_documentation, MedicalDocumentation)
    
# async def test_get_medical_documentation(dbsession):
#     add_user(dbsession)
#     response = client.get("/medical_documentation?user_id=131")
#     assert response.status_code == 404
#     assert response.json() == {"detail": "User not found"}
#     response_correct = client.get("/medical_documentation?user_id=2")
#     assert response_correct.status_code == 200
    
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from models.medical_documentation import MedicalDocumentation, MedicalDocumentationEntry
from models.user import User
from models.database import Base
from main import app
from routers.medical_documentation import get_db, create_medical_documentation_if_not_exists
from unittest.mock import ANY

SQLALCHEMY_DATABASE_URL = 'sqlite:///:memory:'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.rollback()
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

async def test_create_medical_documentation_if_not_exists():
    db = next(override_get_db())
    user = User(id=2, first_name="Test", last_name="User")
    db.add(user)
    db.commit() 
    assert db.query(MedicalDocumentation).filter(MedicalDocumentation.patient_id == user.id).first() is None
    medical_documentation = await create_medical_documentation_if_not_exists(db, user.id)
    assert isinstance(medical_documentation, MedicalDocumentation)
    assert medical_documentation.patient_id == 2

async def test_get_medical_documentation():
    db = next(override_get_db())
    user = User(id=3, first_name="Test", last_name="User")
    db.add(user)
    db.commit() 
    response = client.get("/medical_documentation")
    assert response.status_code == 400
    assert response.json() == {'detail': 'ID not provided'}
    response = client.get("/medical_documentation?user_id=12323")
    assert response.status_code == 404
    assert response.json() == {'detail': 'User not found'}
    await create_medical_documentation_if_not_exists(db, user.id)
    response = client.get("/medical_documentation?user_id=3")
    assert response.status_code == 200
    
def test_get_entry():
    db = next(override_get_db())
    user = User(id=5, first_name="Test", last_name="User")
    db.add(user)
    db.commit() 
    medical_documentation = MedicalDocumentation(patient_id=5)
    db.add(medical_documentation)
    db.commit()
    entry = MedicalDocumentationEntry(medical_documentation_id=medical_documentation.id, date="2021-01-01", diagnose="Test", recommendations="Test")
    db.add(entry)
    db.commit()
    response = client.get(f"/medical_documentation/{entry.id}")
    assert response.status_code == 200

def test_post_entry():
    db = next(override_get_db())
    user = User(id=6, first_name="Test", last_name="User")
    db.add(user)
    db.commit() 
    response = client.post("/medical_documentation/medical_documentation_entry", headers={"user_id": "6"}, json={"date": "2021-01-01", "diagnose": "Test", "recommendations": "Test"})
    print(response.json())
    assert response.status_code == 200
    assert response.json() == {'date': '2021-01-01', 'diagnose': 'Test', 'id': 1, 'medical_documentation_id': 1, 'recommendations': 'Test'}
    
def test_delete_entry():
    db = next(override_get_db())
    user = User(id=7, first_name="Test", last_name="User")
    db.add(user)
    db.commit() 
    medical_documentation = MedicalDocumentation(patient_id=7)
    db.add(medical_documentation)
    db.commit()
    entry = MedicalDocumentationEntry(medical_documentation_id=medical_documentation.id, date="2021-01-01", diagnose="Test", recommendations="Test")
    db.add(entry)
    db.commit()
    response = client.delete(f"/medical_documentation/medical_documentation_entry/{entry.id}")
    assert response.status_code == 200
    assert response.json() == {'date': '2021-01-01', 'diagnose': 'Test', 'id': ANY, 'medical_documentation_id': ANY, 'recommendations': 'Test'}
    response = client.delete(f"/medical_documentation/medical_documentation_entry/{entry.id}")
    assert response.status_code == 404
    assert response.json() == {'detail': 'Entry not found'}