from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import create_standard_response,is_url_valid,extract_asin_from_url
from db import get_all_products_db, get_random_products_db,check_product_exists,save_product_to_db, get_all_categoriesDB, get_products_by_categoryDB
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
    return create_standard_response('error',500,None,'oops!! something went wrong!! Try Again Later')

@app.route('/api/categories',methods=['GET'])
def get_all_categories():
    try:
        categories =  get_all_categoriesDB()
        if categories: 
            return create_standard_response('success',200,categories)
        else:
            return create_standard_response('error',404,None, 'no categories found')
    except Exception as e:
        return create_standard_response('error',500,None,str(e))

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

@app.route('/api/product',methods=['GET', 'POST'])
def get_product_by_id():
    if request.method == 'GET':
        try:
            product_id = request.args.get('id')
            if product_id:
                product = check_product_exists(product_id)
                return create_standard_response('success', 200, product)
            else:
                return create_standard_response('error',404,None,'no products found!!')
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500
    if request.method == 'POST':
        data = request.get_json()
        product_url = data.get('product_url')
        if not is_url_valid(product_url):
            return jsonify({'status': 'error', 'message': 'Invalid URL'}), 400
        try:
            asin = extract_asin_from_url(product_url)
            response = check_product_exists(asin)
            if response:
                return create_standard_response('succcess',200,response)
            else:
                return get_data_amazon(asin)
        except Exception as e:
            return create_standard_response('Error!', 500, None, str(e))
    
    return jsonify({'msg': 'unauthorized access'}),401
    
@app.route('/api/products/cat',methods=['GET'])
def get_products_by_cat():
    category_name = request.args.get('category')
    if not category_name: 
        return create_standard_response('error', 400,None,'category not found')
    try:
        products = get_products_by_categoryDB(category_name)
        if products:
            return create_standard_response('success', 200, products)
        return jsonify({'data': 'no products found for this category'}),404
    except Exception as e:
        return create_standard_response('Error',500,None,str(e))


if __name__ == '__main__':
    app.run(debug=True)