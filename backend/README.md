# Product-Price-Scraper-from-Amazon-and-Flipkart

Product Price Scraper is a web application that allows users to enter the name of a product and fetches the prices of the product from both Flipkart and Amazon websites. The backend of the application is built using Python with Flask, and web scraping is done using BeautifulSoup and Selenium.

## Features

- User-friendly web interface to enter the product name and fetch prices.
- Scrapes prices from both Flipkart and Amazon websites.
- Displays the fetched prices on the web page.

## Prerequisites

- Python 3.x
- Flask
- pyMongo
- CORS
- Amazon PAAPI

## How to Run

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your_username/product-price-scraper.git
   ```

2. Install the required Python packages:

   ```
   pip install -r requirements.txt
   ```

3. Run the Flask application:

   ```
   python app.py
   ```

4. Open your web browser and access the application at `http://127.0.0.1:5000/`.

5. Enter the URL of the product in the input field and click "Search" to view the product with its price history from Amazon.

6. The products will be added to the database as when you search for them. 

7. You can also sort the products by their category in category navbar.

## How It Works

The Flask application (`app.py`) serves as the backend of the web application. When the user submits the product name through the web form, the backend fetches the prices from Amazon websites.
