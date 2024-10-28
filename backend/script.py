import time
from pymongo import MongoClient
from datetime import datetime
from api import get_price_info
import os

def generate_price_update_query(price: int, max_price: int, min_price: int, discountPercent):
    price_history_entry = {
        'price': price,
        'date': datetime.now().date().isoformat()
    }
    query = {
        '$set': {
            'currentPrice': price,
        },
        '$push': {
            'priceHistory': price_history_entry
        }
    }

    if discountPercent is not None:
        query['$set']['discountPercent'] = discountPercent

    if price > max_price:
        query['$set']['maxPrice'] = price

    # Conditionally update minPrice
    if price < min_price:
        query['$set']['minPrice'] = price

    return query

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client[os.getenv('DBNAME')] 
    collection = db[os.getenv('PRODUCTS')] 
    print("MongoDB connection successful")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")

results = collection.find({},{'currentPrice': 1, 'maxPrice':1 , 'minPrice': 1 })
result_list = list(results)

ids = [result['_id'] for result in result_list]

for i in range(0, len(ids), 10):

    current_batch = ids[i:i + 10]
    if i != 0:
        time.sleep(1.5)
    print(f"Processing batch: {current_batch}")
    price_info_list = get_price_info(current_batch)

    for item in price_info_list: # type: ignore
        for obj in result_list: 
            if obj.get('_id') == item['id']:
                asin = item['id']
                if 'discount_key' not in item:
                    item['discount_percent'] = None
                query = generate_price_update_query(item['price'], obj['maxPrice'], obj['minPrice'], item['discount_percent'])
                response = collection.update_one({'_id': obj.get('_id')}, query)
                if response.acknowledged:
                    print(f'Updated price for ASIN {asin}')
                else:
                    print(f'Price not found for ASIN {asin}')
            else:
                continue
    

    
