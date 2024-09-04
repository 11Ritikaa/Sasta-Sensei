from datetime import datetime
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from helpers import extract_asin_from_url, extract_ratings, create_standard_response, create_response, is_url_valid
from db import get_all_products_from_db, save_product_to_db, check_product_exists
from flask_cors import CORS
from dotenv import load_dotenv
import os 

load_dotenv()

app = Flask(__name__)
CORS(app)

def scrape_store_and_send(asin):
    product_data = scrape_amazon(asin)
    try:
        if product_data:
            return save_product_to_db(product_data)
        else:
            return create_standard_response('error', 500, None, 'Scraping Failed')
    except Exception as e:
        return create_standard_response('error', 500, None, f'Scraping Failed: {str(e)}')

def scrape_amazon(asin):
    amazon_url = f'https://www.amazon.in/dp/{asin}/'
    prefs = {
        "profile.managed_default_content_settings.javascript": 2,  # Disable javascript
        "profile.managed_default_content_settings.stylesheets": 1,
        "profile.managed_default_content_settings.cookies": 2,  # Disable cookies
        "profile.managed_default_content_settings.geolocation": 2,  # Disable geolocation
        "profile.managed_default_content_settings.notifications": 2,  # Disable notifications
    }
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_experimental_option('prefs', prefs)
    driver = webdriver.Chrome(options=options)

    driver.get(amazon_url)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    try:
        # Extracting useful info
        price_element = soup.select_one(".a-price-whole")
        product_title = soup.select_one("#productTitle").get_text().strip()
        product_rating = soup.find("span", {"class": "a-size-medium a-color-base"}).get_text()
        product_rating = extract_ratings(product_rating)
        product_image_url = soup.find("img", {"id": "landingImage"})

        if product_image_url:
            product_image_url = product_image_url['src']

        if price_element:
            price = price_element.get_text()
            price = price.replace(',', '').rstrip('.')
            price = int(price)
            price_history = [
                {"price": price, "date": datetime.now().date().isoformat()}
            ]
            response_data = create_response(asin, product_title, price, product_image_url, product_rating, price_history)
        driver.quit()
        return response_data

    except Exception as e:
        driver.quit()
        print(f"Scraping failed: {str(e)}")
        return None

@app.route('/api/product', methods=['POST'])
def get_product_details():
    data = request.get_json()

    if 'product_url' not in data or not data['product_url']:
        return jsonify({'status': 'error', 'message': 'Product URL is required'}), 400
    
    product_url = data.get('product_url')
    
    if not product_url:
        return jsonify({'status': 'error', 'message': 'Product URL is required'}), 400
    
    if not is_url_valid(product_url):
        return jsonify({'status': 'error', 'message': 'Invalid URL'}), 400
    
    asin = extract_asin_from_url(product_url)
    response = check_product_exists(asin)
    
    if response:
        return response
    else:
        return scrape_store_and_send(asin)
    
@app.route('/api/getallproducts', methods=['GET'])
def get_all_products():
    try:
        products = get_all_products_from_db()
        if products:
            return jsonify(products), 200
        else:
            return create_standard_response('success',404,None,'no products found!!')
    except Exception as e:
        app.logger.error(f"Error fetching products: {str(e)}")  # Log the error
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route("/api/get_product", methods=['GET'])
def get_Product():
    asin = request.args.get('id')
    product = check_product_exists(asin)
    if product:
        return product
    else:
        return create_standard_response('error', 404, None, 'Product not found')

if __name__ == '__main__':
    app.run(debug=True)