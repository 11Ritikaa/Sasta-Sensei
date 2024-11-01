import os
import logging
from email.mime.multipart import MIMEMultipart
from pymongo import MongoClient
from smtplib import SMTP
from email.mime.text import MIMEText
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Directory for log files
log_directory = os.path.join(os.getcwd(), 'logs')
if not os.path.exists(log_directory):
    os.makedirs(log_directory)

# Log file path
current_date = datetime.now().strftime('%Y-%m-%d')
log_filename = os.path.join(log_directory, f'email_service_{current_date}.log')

# Initialize logging
logging.basicConfig(filename=log_filename, level=logging.INFO, format='%(asctime)s %(message)s')

def create_email_body(product_name, current_price, last_notified_price, image_url, product_link, product_id):
    email_template = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f9f9f9;
            }}
            .container {{
                max-width: 600px;
                margin: auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background-color: #6B21A8;
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }}
            .content {{
                padding: 20px;
            }}
            .footer {{
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
            }}
            .price {{
                font-size: 24px;
                color: #d9534f;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://res.cloudinary.com/nextgen-ecommerce/image/upload/v1727877285/nibuykq4ok2rdzsotoyb.png" alt="Logo" style="width: 100px; height: auto;">
                <h1>Price Drop Alert!</h1>
            </div>
            <div class="content">
                <h2>Good news!</h2>
                <center>
                 <img src={image_url} alt="product image" style="width: 200px; height: auto;">
                </center> 
                 <br />
                <p>The price for <strong>{product_name}</strong> has dropped!</p>
                <p><span class="price">Current Price: &#8377; {current_price:.2f}</span></p>
                <p>Last Notified Price: <del>&#8377; {last_notified_price:.2f}</del></p>
                <strong>Check it out here: <a href="{product_link}"> Go To Amazon</a></strong>
                <br/>
                <p>want to stop tracking this product <a href="{os.getenv('BASE_URL')}/unsubscribe?asin={product_id}">Click Here!</a></p>
            </div>
            <div class="footer">
                <p>Happy shopping!</p>
                <p>Best Regards, Sasta Sensei Team</p>
            </div>
        </div>
    </body>
    </html>
    """  
    return email_template

def send_batch_email(emails, subject, body):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = os.getenv('SMTP_USER')
    msg.attach(MIMEText(body, 'html'))

    try:
        with SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(os.getenv('SMTP_USER'), os.getenv('SMTP_PASSWORD'))
            smtp.sendmail(os.getenv('SMTP_USER'), emails, msg.as_string())
            logging.info(f"Batch email sent to {len(emails)} users.")
    except Exception as e:
        logging.error(f"Failed to send batch email: {e}")

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client[os.getenv('DBNAME')]  
    notification_collection = db[os.getenv('NOTIFICATIONS')] 
    logging.info("MongoDB connection successful")

    result_list = notification_collection.aggregate([
        {
            "$lookup": {
                "from": os.getenv('PRODUCTS'), 
                "localField": "_id",  
                "foreignField": "_id", 
                "as": "productDetails" 
            }
        },
        {
            "$project": {
                "_id": 1, 
                "emails": 1, 
                "lastNotifiedPrice": 1, 
                "productDetails._id": 1,  
                "productDetails.productTitle": 1, 
                "productDetails.currentPrice": 1,
                "productDetails.pageUrl": 1,
                "productDetails.imageUrl": 1
            }
        }
    ])

    for notification in result_list:
        if not notification['productDetails']:
            continue
        product = notification['productDetails'][0]
        productTitle = product['productTitle']
        current_price = product['currentPrice']
        product_link = product['pageUrl']
        image_url = product['imageUrl']
        last_notified_price = notification['lastNotifiedPrice']
        emails = notification['emails']
        product_id = notification['_id']

        if current_price < last_notified_price:
            if emails:
                subject = f"Price Drop Alert"
                body = create_email_body(productTitle, current_price, last_notified_price, image_url, product_link, product_id)
                send_batch_email(emails, subject, body)
            notification_collection.update_one(
                {"_id": notification['_id']},
                {"$set": {"lastNotifiedPrice": current_price}}
            )
            logging.info(f"Updated lastNotifiedPrice for product {product['_id']} to {current_price}")
        else:
            logging.info(f"No price drop for product {product['_id']} ({product['productTitle']}).")

except Exception as e:
    logging.error(f"An error occurred: {str(e)}")
finally:
    if 'client' in locals():
        client.close()
        logging.info("MongoDB connection closed.")
