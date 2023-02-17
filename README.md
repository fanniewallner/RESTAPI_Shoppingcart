# REST-API-SHOPPINGCART

## ROUTES

### PRODUCT-ROUTES

**getAllProducts**
http://localhost:5001/api/v1/products
body: none
**getProductById**
http://localhost:5001/api/v1/products/:productId
body: none

### CART-ROUTES

**getCartById**
http://localhost:5001/api/v1/carts/:cartId
body: none
**createNewCart**
http://localhost:5001/api/v1/carts/
body: none
**addItemToCart**
http://localhost:5001/api/v1/carts/:cartId/addProduct
body:

```
{
    “productId”: String,
    “quantity”: Number,
}
```

**deleteItemFromCart**
http://localhost:5001/api/v1/carts/:cartId/deleteProduct
body:

```
{
    “productId”: String,
    “quantity”: Number,
}
```

**deleteCartById**
http://localhost:5001/api/v1/carts/:cartId/deleteCart
body: none
