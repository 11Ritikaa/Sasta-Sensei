from pymongo import MongoClient
import os 

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['amazon_price_tracker']  # Database name
    #collection = db['products']  # Collection name
    collection = db['test_products']
    print("MongoDB connection successful")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")

def get_all_products_db():
    cursor = collection.find()  # Retrieve all documents
    products = list(cursor)  # Convert cursor to a list of dictionaries
    return products

def get_random_products_db():
    pipeline = [
        { "$sample": { "size": 10 } },
        { "$project": { "priceHistory": 0 } }  # Exclude the priceHistory field
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