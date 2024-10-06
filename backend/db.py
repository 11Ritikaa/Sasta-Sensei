from pymongo import MongoClient
import os 
from utils import create_notify_data

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['amazon_price_tracker']
    collection = db['test_products']
    notification_collection = db['notifications'] 
    print("MongoDB connection successful")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")

def get_all_products_db():
    cursor = collection.find()  
    products = list(cursor) 
    return products

def get_random_products_db():
    pipeline = [
        { "$sample": { "size": 10 } },
        { "$project": { "priceHistory": 0 } } 
    ]
    random_products = list(collection.aggregate(pipeline))
    return random_products

def check_product_exists(product_id):
    doc = collection.find_one({'_id': product_id})
    if not doc:
        return False
    else:
        return doc

def save_product_to_db(product_data):
    result = collection.insert_one(product_data)
    if result.acknowledged:
        return result.inserted_id
    else:
        return None

def get_all_categoriesDB():
    distinct_categories = collection.distinct('categoryNames')
    list(distinct_categories)
    return distinct_categories

def get_products_by_categoryDB(category_name: str):
    query = {"categoryNames": category_name}
    products = collection.find(query)
    products_list = list(products)
    return products_list

def check_notification_list(product_id):
    doc = notification_collection.find_one({'_id': product_id})
    return doc is not None 
    
def create_notify_doc(email, asin, price):
    notfiy_data = create_notify_data(asin,email,price)
    result = notification_collection.insert_one(notfiy_data)
    if result.acknowledged:
        return result.inserted_id
    else:
        return None
    
def already_trackng(email, asin):
    result = notification_collection.find_one({'_id': asin, "emails": { "$in": [email] }})
    if result is not None:
        return True
    return False

def remove_email_tracking(email, asin):
    result =  notification_collection.update_one(
            {'_id': asin},
            {'$pull': {'emails': email}}
        )
    if result.modified_count > 0:
        return True
    return False
def add_for_notification(email, asin, price):
    result = notification_collection.update_one(
            {'_id': asin},
            { "$addToSet": { "emails": email },
               "$min": { "lastNotifiedPrice": price }
            })
    if result.modified_count > 0:
        return result
    return None