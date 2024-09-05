# contains old code for web scraping for extracting data
from datetime import datetime
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
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
    


