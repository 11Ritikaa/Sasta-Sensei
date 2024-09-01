import json
import re
from flask import jsonify;

def extract_asin_from_url(url):
    # RegEx to match the ASIN 
    match = re.search(r'/([A-Z0-9]{10})(?:/|\?|$)', url)
    if match:
        return match.group(1)
    return None

def extract_ratings(rating_str):
    rating = rating_str.split()[0]  
    if '.' not in rating:  
        return f"{rating}.0"  
    return rating

def create_response(asin: str, product_title: str, curr_price: str|int, image_url: str ,rating: str|float, price_history ):
    return {
        'id': asin,
        'productTitle': product_title,
        'currentPrice': curr_price,
        'maxPrice': curr_price,
        'minPrice': curr_price,
        'avgPrice': curr_price,
        "imageUrl": image_url,
        'rating': rating,
        'priceHistory': price_history
    }

def create_standard_response(status, status_code, data=None, message=None):
    response = {
        'status': status,
        'status_code': status_code
    }
    if data:
        response['data'] = data
    if message:
        response['message'] = message
        
    return jsonify(response), status_code

def is_url_valid(url:str)-> bool:
    # Regular expression to match the required pattern
    pattern = r"^https://www\.amazon\.[a-z]{2,3}(?:\.[a-z]{2})?/(?:[a-zA-Z0-9-_~%]+/)*dp/([A-Z0-9]{10})(?:/|\?|$).*"

    match = re.match(pattern, url)

    if match:
        return True  # The link is valid
    else:
        return False  # The link is invalid