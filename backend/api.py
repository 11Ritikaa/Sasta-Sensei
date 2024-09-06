from utils import create_product_data
from paapi5_python_sdk.api.default_api import DefaultApi
from paapi5_python_sdk.condition import Condition
from paapi5_python_sdk.get_items_request import GetItemsRequest
from paapi5_python_sdk.get_items_resource import GetItemsResource
from paapi5_python_sdk.partner_type import PartnerType
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()
import os

#parses the api response dict for easier data extractions
def parse_response(item_response_list):
    mapped_response = {}
    for item in item_response_list: 
        mapped_response[item.asin] = item
    return mapped_response


def extract_category_name_and_id(data):
    browse_nodes =  data
    if(hasattr(browse_nodes, 'ancestor') and browse_nodes.ancestor.ancestor):
        return  extract_category_name_and_id(browse_nodes.ancestor)
    return browse_nodes.ancestor.display_name,browse_nodes.ancestor.id
    

def get_items(asins: str|list):
    access_key = os.getenv('AMAZON_ACCESS_KEY')
    secret_key = os.getenv('AMAZON_SECRET_KEY')
    partner_tag = os.getenv('PARTNER_TAG')
    host = os.getenv('HOST')
    region = os.getenv('REGION')

    #API declaration
    default_api = DefaultApi(
        access_key=access_key, secret_key=secret_key, host=host, region=region
    )

    #what items to search and resources to fetch
    item_ids = [asins]
    get_items_resource = [
        GetItemsResource.BROWSENODEINFO_BROWSENODES_ANCESTOR,
        GetItemsResource.IMAGES_PRIMARY_LARGE,
        GetItemsResource.ITEMINFO_TITLE,
        GetItemsResource.OFFERS_LISTINGS_PRICE,
    ]

    #forming request 
    try:
        get_items_request = GetItemsRequest(
            partner_tag=partner_tag,
            partner_type=PartnerType.ASSOCIATES,
            marketplace="www.amazon.in",
            condition=Condition.NEW,
            item_ids=item_ids,
            resources=get_items_resource,
        )
    except ValueError as exception:
        print("Error in forming GetItemsRequest: ", exception)
        return None
    
    asin = title = imageURL = MRP = discountPercent = pageURL = cat_name = cat_id = price = None
    response = default_api.get_items(get_items_request)
    """ Parse response """
    if response.items_result is not None: # type: ignore
        print("Printing all item information in ItemsResult:")
        response_list = parse_response(response.items_result.items) # type: ignore
        for item_id in item_ids:
            print("Printing information about the item_id: ", item_id)
            if item_id in response_list:
                item = response_list[item_id]
                if item is not None:
                    cat_name, cat_id = extract_category_name_and_id(item.browse_node_info.browse_nodes[0].ancestor)
                    cat_id = int(cat_id)
                    if item.asin is not None:
                        asin = item.asin
                    if item.detail_page_url is not None:
                        pageURL = item.detail_page_url
                    if (
                        item.item_info is not None
                        and item.item_info.title is not None
                        and item.item_info.title.display_value is not None
                    ):
                        title = item.item_info.title.display_value
                    if (
                        item.images.primary is not None
                    ):
                        imageURL = item.images.primary.large.url
                    if (
                        item.offers is not None
                        and item.offers.listings is not None
                        and item.offers.listings[0].price is not None
                        and item.offers.listings[0].price.display_amount is not None
                    ):

                        price = item.offers.listings[0].price.amount
                        MRP = item.offers.listings[0].price.amount + item.offers.listings[0].price.savings.amount
                        discountPercent = item.offers.listings[0].price.savings.percentage
            else:
                print("Item not found, check errors")
                return None
    if response.errors is not None: # type: ignore
        return None
    price_history = [
                {"price": price, "date": datetime.now().date().isoformat()}
            ]
    return create_product_data(asin,title,price,imageURL,MRP,discountPercent,pageURL,cat_name,cat_id,price_history)
