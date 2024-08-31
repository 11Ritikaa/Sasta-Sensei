from json import dumps
from pymongo import MongoClient, errors
from flask import jsonify
from bson import json_util
from helpers import create_standard_response

# Initialize MongoDB connection
try:
    client = MongoClient('mongodb+srv://superjunkie:1234567899@cluster0.nwirkbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    db = client['amazon_price_tracker']  # Database name
    collection = db['products']  # Collection name
    print("MongoDB connection successful")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")


def check_product_exists(asin):
        doc = collection.find_one({'_id': asin})
        if not doc:
            return False
        else:
            return create_standard_response('success', 200, doc)

def save_product_to_db(product_data):
    try:
        # Define the product document using the original structure
        product_document = {
            "_id": product_data['id'],  
            "productTitle": product_data['productTitle'],
            "currentPrice": product_data['currentPrice'],
            "maxPrice": product_data['maxPrice'],
            "minPrice": product_data['minPrice'],
            "avgPrice": product_data['avgPrice'],
            "image_url": product_data['imageUrl'],
            "rating": product_data['rating'],
            "priceHistory": product_data['priceHistory']
        }

        # Insert the product document into the database
        result = collection.insert_one(product_document)

        if result.acknowledged:
            return create_standard_response('success', 201, product_document, 'Product inserted successfully')
        else:
            return create_standard_response('error', 500,None,'DB error')

    except errors.DuplicateKeyError as e:
        print(f"DuplicateKeyError: {str(e)}")
        return create_standard_response('error', 400, None, 'Product already exists')

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return create_standard_response('error', 500, None, str(e))


def get_all_products_from_db():
    try:
        cursor = collection.find()  # Retrieve all documents
        products = list(cursor)  # Convert cursor to a list of dictionaries
        if products: 
            return jsonify(products)
        else:
            return create_standard_response('success',404,None,'error aa gyi beti re baap')

    except Exception as e:
        return create_standard_response('error', 500, None, str(e))
