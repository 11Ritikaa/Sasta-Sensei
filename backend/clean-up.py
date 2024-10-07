from pymongo import MongoClient
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

load_dotenv()

log_directory = os.path.join(os.getcwd(), 'logs')  
if not os.path.exists(log_directory):
    os.makedirs(log_directory)  

# Initialize logging
current_date = datetime.now().strftime('%Y-%m-%d')  # Get the current date
log_filename = os.path.join(log_directory, f'cleanup_script_{current_date}.log')  # Full path for the log file
logging.basicConfig(filename=log_filename, level=logging.INFO, format='%(asctime)s %(message)s')

def cleanup_notifications():
    try:
        client = MongoClient(os.getenv('MONGO_URI'))
        db = client['amazon_price_tracker']
        notifications_collection = db['notifications']

        logging.info("Cleanup started...")

        while True:
            result = notifications_collection.delete_many({"emails": {"$size": 0}})
            if result.deleted_count == 0:
                logging.info("No more documents with empty emails array found.")
                break 
            logging.info(f"Deleted {result.deleted_count} documents with empty emails array.")
        logging.info("Cleanup completed successfully.")
    except Exception as e:
        logging.error(f"An error occurred during cleanup: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    cleanup_notifications()
