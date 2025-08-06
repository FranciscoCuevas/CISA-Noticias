from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


#Database Configuration
DATABASE_URL = "postgresql://mi_usuario:mi_password@localhost:5432/mi_app_db"

#SQLAlchemy Engine
engine = create_engine(DATABASE_URL)

#LocalSession for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#Model base
Base = declarative_base()

#Function to obtain database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()