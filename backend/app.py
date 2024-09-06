from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import create_standard_response,is_url_valid,extract_asin_from_url
from db import get_all_products_db, get_random_products_db,check_product_exists,save_product_to_db
from dotenv import load_dotenv
from api import get_items
import os 
load_dotenv()

app = Flask(__name__)
CORS(app)
'''
    /api/products -GET Fetch all products -done
    /api/products/random -GET  fetch 10 random products -done
    /api/products/<product_id> -GET  fetch a product by ID -done
    /api/products/by-url -POST fetch a product by URL -done
    /api/products/category/<category name> -GET  fetch products of specified category
'''
def get_data_amazon(asin):
    product_data = get_items(asin)
    response =  save_product_to_db(product_data)
    if(response):
        return create_standard_response('success',201,response)
    return create_standard_response('error',500,None,'Oops!! something went wrong!! Try Again Later')
     
@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        products = get_all_products_db()
        if products:
            return create_standard_response('success', 200, products)
        else:
            return create_standard_response('error',404,None,'no products found!!')
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route('/api/products/random', methods=['GET'])
def get_random_products():
    try:
        products = get_random_products_db()
        if products:
            return create_standard_response('success', 200, products)
        else:
            return create_standard_response('error',404,None,'no products found!!')
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500   


@app.route('/api/products/<product_id>',methods=['GET'])
def get_product_by_id(product_id):
    try:
        product = check_product_exists(product_id)
        if product:
            return create_standard_response('success', 200, product)
        else:
            return create_standard_response('error',404,None,'no products found!!')
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route('/api/products/by-url',methods=['POST'])
def get_product_url():
    data = request.get_json()

    if 'product_url' not in data or not data['product_url'] :
        return jsonify({'status': 'error', 'message': 'Product URL is required'}), 400
    
    product_url = data.get('product_url')
    
    if not is_url_valid(product_url):
        return jsonify({'status': 'error', 'message': 'Invalid URL'}), 400
    try:
        asin = extract_asin_from_url(product_url)
        response = check_product_exists(asin)
        if response:
            return create_standard_response('Succcess',200,response)
        else:
            return get_data_amazon(asin)
    except Exception as e:
        return create_standard_response('Error!', 500, None, str(e))

if __name__ == '__main__':
    app.run(debug=True)