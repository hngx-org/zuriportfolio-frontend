BASE_URL = "https://zuri-cart-checkout.onrender.com/api/checkout"
NAME = "CARTS AND CHECKOUT"
SHOP_ID = "0a740bda-f077-4268-8304-d3fc2dd9199c"
PRODUCT_ID = "a4f661db-112b-421f-aa9b-b9f3f5c6665e"
```
ENDPOINTS_CONFIG = [
    {
        "url": "/api/order",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/order",
        "method": "PUT",
        "path_params": None,
        "body_params": {tx_ref: string, status: string},
        "auth_required": True 
    },
    {
        "url": "/api/order",
        "method": "POST",
        "path_params": None,
        "body_params": {redirect_url: string, payment_method:string},
        "auth_required": True 
    },
    {
        "url": "/api/order/:orderId",
        "method": "GET",
        "path_params": {orderId: string},
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/order/merchant-summary/:merchantId",
        "method": "GET",
        "path_params": {merchantId: string},
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/order/order_items/:orderId",
        "method": "GET",
        "path_params": {orderId: string},
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/order",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    },


    //**********CART ROUTE*********//
    {
        "url": "/api/carts/cart-summary",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/carts/count",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/carts",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/carts",
        "method": "POST",
        "path_params": None,
        "body_params": {product_ids: string[]},
        "auth_required": True 
    },
    {
        "url": "/api/carts/:itemId",
        "method": "DELETE",
        "path_params": {itemId: string},
        "body_params": None,
        "auth_required": True 
    },
    {
        "url": "/api/carts/guest-cart-summary",
        "method": "POST",
        "path_params": None,
        "body_params": {product_ids: string[]},
        "auth_required": True 
    },
]    
    //***********************//
    {
        "url": "/api/order",
        "method": "GET",
        "path_params": None,
        "body_params": None,
        "auth_required": True 
    }
]
```