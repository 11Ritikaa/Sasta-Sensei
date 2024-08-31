from requests_html import HTMLSession
from pymongo import MongoClient
from datetime import datetime


def generate_price_update_query(price: int, max_price: int, min_price: int):
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

    # Conditionally update maxPrice
    if price > max_price:
        query['$set']['maxPrice'] = price

    # Conditionally update minPrice
    if price < min_price:
        query['$set']['minPrice'] = price

    return query



try:
    client = MongoClient('mongodb+srv://superjunkie:1234567899@cluster0.nwirkbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    db = client['amazon_price_tracker']  # Database name
    collection = db['test_products']  # Collection name
    print("MongoDB connection successful")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")


results = collection.find({},{'currentPrice': 1, 'maxPrice':1 , 'minPrice': 1 })


# Start session and create lists
s = HTMLSession()



#Scrape data
for result in results:
    asin = result['_id']
    max_price = result['maxPrice']
    min_price = result['minPrice']
    r = s.get(f'https://www.amazon.in/dp/{asin}/')
    r.html.render(sleep=1)
    try: 
      price = r.html.find('.a-price-whole')[0].text.replace('₹','').replace(',','').rstrip('.')
      price = int(price)
      query = generate_price_update_query(price, max_price, min_price)
      response = collection.update_one({'_id': asin}, query)
      if response.acknowledged:
        print(f'Updated price for ASIN {asin}')
      else:
        print(f'Price not found for ASIN {asin}')
    except Exception as e:
        print(str(e))
    
