It is to explain the solution to the shopping cart coding challenge

1) 
The development environment is set up by Create React App, as I have tried to install the react and typescript on the existing code repository, but it always gives error once it is installed. It took
quite a long time without success, then I decide to use Create React App which is easy to set up react typescript development environment.

2) 
The landing page contains three main components: Drawer component which is to display the cart contents in a Navigation Drawer provided by material-ui;
shopping cart Badget component which is to do show the shopping basket icon with a total item number, and is also provided by material-ui; the last is Grid component provided by material-ui which
is to display all the products in a responsive grid layout.

3) 
In the cart component, it shows each chosen product info with increase and decrease item amount buttons and the total price of the products. Two functions are passed via props from App.tsx to cart component: addItem and removeItem.
when user add or remove an item from cart, a request will be sent to server to fetch the updated product information, for some reason the three request (POST /cart/:id,
PUT /cart/:id, and DELETE /cart/:id) do not return the full updated cart, it only returns the update product information sent from frontend, I had a look of the server code, it could be each request will create `cart = new Cart();`
so rather than using the POST response to handle the added products, the code directly update the cart based on the product being sent to the backend. only PUT and DELETE request handle the response and update the cart from response data.

4) 
In the products display component, add one product to the cart is handled by the addItem function as well. Once the products in cart is changed, the useEffect will
trigger GET /cart api call, but response always contains zero items, so the code does not have any effect, just to show it is purpose there.

5) The products images are copied from Avensia API Sample Server to the public/images folder, I tried to look for the correct image url to the backend, but did not make it.

6) further improvement could be sorting products list based on price or name using a dropdown select and fix the api call, so it can update the cart based on different response. 

7) run the program: yarn start