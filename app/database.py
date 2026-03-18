import os
import mysql.connector
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

def get_db():
    """Yields a database connection and safely closes it afterward."""
    conn = None
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        yield conn
    finally:
        if conn and conn.is_connected():
            conn.close()
       
    

