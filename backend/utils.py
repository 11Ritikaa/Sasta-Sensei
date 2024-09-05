import re
from flask import jsonify;

def is_url_valid(url:str)-> bool:
    # Regular expression to match the required pattern
    pattern = r"^https://www\.amazon\.in/(?:[a-zA-Z0-9-_~%]+/)?(?:dp|gp/[A-Z0-9]{10})(?:/|\?|$).*"
    match = re.match(pattern, url)
    if match:
        return True  
    return False  

def extract_asin_from_url(url):
    # RegEx to match the ASIN 
    match = re.search(r'/([A-Z0-9]{10})(?:/|\?|$)', url)
    if match:
        return match.group(1)
    return None

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

def create_product_data(asin: str|None, 
                        productTitle: str|None, 
                        price: int| None, 
                        image_url, 
                        MRP, 
                        percent,
                        pageUrl,
                        cat_name, 
                        cat_id,
                        price_history):
     return {
        '_id': asin,
        'productTitle': productTitle,
        'currentPrice': price,
        'maxPrice': price,
        'minPrice': price,
        "imageUrl": image_url,
        'MRP': MRP,
        'discountPercent': percent,
        'pageUrl': pageUrl,
        'categoryName': cat_name,
        'categoryId': cat_id,
        'priceHistory': price_history
    }