from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import create_standard_response,is_url_valid,extract_asin_from_url, is_email_valid
from db import get_all_products_db, get_random_products_db,check_product_exists,save_product_to_db, get_all_categoriesDB, get_products_by_categoryDB, check_notification_list, create_notify_doc, already_trackng, add_for_notification
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
    /api/product_url -POST fetch a product by URL -done
    /api/products/cat -GET  fetch products of specified category
    /api/notify-me -POST add user to the notification list
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

@app.route('/api/product',methods=['GET'])
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
    return jsonify({'msg': 'unauthorized access'}),401

@app.route('/api/product_url',methods=['POST'])
def get_product_from_url():
    data = request.get_json()
    product_url = data.get('product_url')
    if not is_url_valid(product_url):
        return jsonify({'status': 'error', 'message': 'Invalid URL'}), 400
    try:
        asin = extract_asin_from_url(product_url)
        response = check_product_exists(asin)
        if response:
            return create_standard_response('succcess',200,asin)
        else:
            return get_data_amazon(asin)
    except Exception as e:
        return create_standard_response('Error!', 500, None, str(e))


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




@app.route('/api/notify-me', methods=['POST'])
def notify_me():
    ''''
        1. get user's email and product id for which user is subscribed
        2. check if product is already on notify list 
            2.1 if the product is already on the notify list add user email to email array
            2.2 if not then create a decided with product and user's email and with products current price
        3. start tracking for price and notify users of any price change
    '''

    body = request.get_json()
    email = body.get('email')
    asin = body.get('asin')
    price = body.get('price')

    valid_email = is_email_valid(email)
    if not valid_email: 
        return create_standard_response('error', 400, None, 'invalid email address')
    
    product_exists = check_notification_list(asin)
    if(product_exists):
        is_tracking = already_trackng(email, asin)
        if(is_tracking):
            return create_standard_response('success',200,None,'already tracking the product for you')
        response = add_for_notification(email,asin,price)
        if response is not None:
            return create_standard_response('success',200,None,'tracking the product for you')
    else:
        result = create_notify_doc(email=email, asin=asin,price=price)
        if result is not None:
            return create_standard_response('success', 201, result)
    return create_standard_response('error',500,None,'Something went wrong')

@app.route('/api/stop-tracking',methods=['POST'])
def stop_tracking():
    '''
        take the product id and user email 
        check if the product is in the notification list
            if it is then 
                remove the email if present
                return success the email is removed
            else
                error you're not tracking this product
    '''

if __name__ == '__main__':
    app.run(debug=True)