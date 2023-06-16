# E-COMMERCE STOREFRONT

A React-based front end for an e-commerce store. Log in and out, add and remove products from your cart, view individual product pages, and search products based on title, description, or rating.

## HOW TO USE:

In the project directory, run `npm install` to ensure that all dependancies are up to date.

The app is now ready to run locally. Run the command `npm run start` in the project directory to open a local instance for testing and further development or `npm run build` to build for production.

### Logging in:

To view the store you must first log in. Upon loading the app you will be presented with a login page with fields for a username and password. Currently neither is needed to access the page and you can simply click the login button to proceed. Your login state will persist across page reloads.

If you wish to log out simply click the log out button in the header element to return to the login screen.

### Searching products:

After logging in a list of products will be fetched from the FakeStore API. You may temporarily see a loading screen (denoted by a rotating blue ring) while the request is made. Once loaded you will be able to select categories of products using the buttons at the bottom of the header element. Clicking one of these buttons will prompt the app to fetch another list from the API consisting only of the category selected.

To search through the list of products, type a query into the input field and either click the 'search' button to the right of the input, or press the 'enter' key if using a keyboard. You can select a search type from the dropdown menu to the right of the 'search' button. The search type options allow for searching the title, description, or rating of the products. To the right of the search type dropdown menu allows you to choose whether results are displayed in ascending or descending order. 

Products are displayed in a vertical list. Initially only 5 products will be shown per page. At the bottom of the list a series of buttons allows you to select which page of products you wish to view. The number of products per page can be changed by selecting a value of 5, 10, or 15 from the dropdown menu to the right of the page buttons.  

If the app is unable to receive a response from the API an error message will be displayed.

### Viewing a product:

Clicking on a product's element will load a new page containing a larger image of the product and all its relevant details, including a full description. A button at the bottom of the page will allow you to return to the product list.

### Adding a product to the cart:

Each product element on the product list contains an 'add to cart' button. Clicking this button will add it to the cart. Subsequent clicks will increase the quantity of that product in the cart.

Each product page also contains an 'add to cart' button with the same functionality.

The cart can be viewed at any time by hovering over (or clicking on mobile) the cart button in the header element. This will display a modal along the right-hand side of the screen containing a list of all products currently in the cart. This list will display the products in the cart, their price, their quantity, and the option to increase, or decrease their quantity. Decreasing a product's quantity to 0 will remove it from the cart entirely. 

The cart modal also displays a total price (in GBP) for all items in the cart.

The bottom of the cart modal contains buttons that load the cart page or take you straight to the order confirmation screen. 

### Completing a purchase

Currently the app allows for the user to confirm an order by clicking the 'checkout' button in the cart modal or the 'go to checkout' button in the cart screen.

## HOW IT WORKS:

### Managing global state:

Redux 'Provider' components wrap the other app components in the 'index.js' file. By importing the 'store' object and passing it to the 'Provider' component, the wrapped components are given access to the store and its contents.

The 'store' directory contains 4 files, each managing a separate part of the app's global state. 

#### Auth-slice
The 'auth-slice' file uses the Redux Toolkit 'createSlice' API to handle the initial state, reducers, and action related to login and authorization features. The initial state is an object with a single property: 'isLoggedIn'; a boolean set to 'false'. 
The slice contains 2 reducers, 'login', and 'logout'.
When the action related to 'login' is dispatched, the reducer will set 'isLoggedIn' to 'true' and create an item in the browser's session storage that records the current 'isLoggedIn' value. 
When the action related to 'logout' is dispatched, the reducer will set 'isLoggedIn' to 'false' and update the item in the browser's session storage or create it if it does not exist.
'createSlice' auto-generates the action types associated with these reducers and exports them, ready to be used in the app.

#### Cart-slice
The 'cart-slice' file uses the Redux Toolkit 'createSlice' API to handle the initial state, reducers, and actions related to adding and removing items from the cart. The initial state is an object with three properties: 'list'; an empty array, 'totalPrice'; an integer set to 0, and 'totalQuantity'; an integer set to 0. 
The slice contains 2 reducers, 'addToCart', and 'removeFromCart'. 
When the action related to 'addToCart' is dispatched, the reducer will round the price of the newly added item down to 2 decimal places and search through the contents of the 'list' array to find an entry with an 'id' property matching the newly added item. If one exists, the 'quantity' property for that item, and the 'totalQuantity' property for the 'cart' state will both be incremented by 1 to reflect the item being added to the cart. If an entry matching the 'id' property of the newly added item does not exist, then an object representing that item and its properties will be pushed to the 'list' array with a 'quantity' property of 1 and the 'totalQuantity' property for the 'cart' state will be incremented by 1. In both cases the 'totalPrice' property of the 'cart' state will be increased by the amount of the newly added item's price.
When the action related to 'removeFromCart' is dispatched, the reducer will round the price of the removed item down to 2 decimal places and search through the contents of the 'list' array to find an entry with an 'id' property matching the removed item. Once found, if more than 1 of the item exists in the cart  (its 'quantity' property is greater than 1), the 'quantity' property for that item, and the 'totalQuantity' property for the 'cart' state will both be decremented by 1 to reflect one of the items being removed from the cart. If only 1 of the item exists in the cart (its 'quantity' property is 1 or somehow fewer) the item will be removed from the 'list' array completely. In both cases the 'totalPrice' property of the 'cart' state will be decreased by the amount of the removed item's price and rounded down to 2 decimal places to ensure it is correctly formatted for display in the cart.
'createSlice' auto-generates the action types associated with these reducers and exports them, ready to be used in the app.

#### Product-slice
The 'product-slice' file uses the Redux Toolkit 'createSlice' API to handle the initial state, reducers, and actions related to fetching and managing the list of products on offer. The initial state is an object with three properties: 'products'; an empty array, 'status'; a string set to 'idle', and 'error'; a string set to 'null'.
The slice contains 1 reducer, 'addProducts'. 
When the action related to 'addProducts' is dispatched, the reducer will populate the 'products' array with the action's payload.
The slice also contains a thunk; 'fetchProductData' and related extraReducers.
When the action related to 'fetchProductData' is dispatched, it will send an asynchronous request to the FakeStore API. This request contains two parameters; 'category' and 'sort'. Both parameters are defined by user input. If the 'category' parameter is 'all' then the request is made without a category. If the 'category' parameter is any other value then that value will be included in the request. In either case the response is then parsed into JSON and handled by the extraReducers depending on the status of the request. 
While the request is 'pending' the state's 'status' property will be set to 'loading'.
If the request returns as 'fulfilled', the state's 'status' property will be set to 'succeeded'. Each object within the response array will be given a new 'display' property and the state's  'products' array will be replaced with the response array. 
If the request returns as 'rejected', the state's 'status' property will be set to 'failed' and the state's 'error' property will be updated with the contents of the error message returned by the API.
'selectProducts' is exported as an action which returns the 'products' array.
'createSlice' auto-generates the action types associated with the reducers and exports them, ready to be used in the app.

#### Index
The 'index.js' file configures and exports the 'store' to be used by the other components in the app. It imports the reducers from the slice files and combines them.

### Routing:

In 'index.js' the 'BrowserRouter' component stores the browser's current location, allowing it to navigate along the routes contained inside. 
Wrapped inside the 'BrowserRouter' component, the 'Routes' component contains the routes and handles finding the relevant route for the browser's location. It contains a single 'Route' component that itself contains a series of other, nested 'Route' components.
The initial 'Route' component is set to the root path '/' and the 'LayoutPage' page element.  The 'LayoutPage' contains the UI of the header and navigation bar as well as an 'Outlet' which displays the nested 'Route' components when the browser's location corresponds to their path. This ensures that the header and navigation bar UI elements will render on all other pages.
Nested inside the initial 'Route' component, the 'index' route is set to the 'ShopPage' page element, making it the default component rendered in its parent's 'Outlet'.
The 'Cart' and 'Confirmation' nested 'Route' components contain specific paths and page elements that will display separate components when the browser's location corresponds to their path.
The 'ProductPage' nested 'Route' component contains a dynamic segment; ':id' which allows the url to display the correct product id when a specific 'productPage' is displayed.
The ''ErrorPage' nested 'Route' component is a catchall segment that catches any urls not matching the existing Routes. This will redirect the user to an error message.

'Link' components on each page provide a 'to' prop with the relevant path to render, allowing users to navigate along the Routes.

### Pages

#### Layout
The 'Layout' page contains a single piece of state; 'isLoggedIn', a boolean which keeps track of the user's login state. It is set to false by default.
Upon the page's first render, a 'useEffect' hook will attempt to retrieve the 'login' item from the sessionStorage. If this item exists and its value is set to 'true' then the 'isLoggedIn' state will be updated to 'true'.
The 'loginHandler' function will update the 'isLoggedIn' state to 'true' when called and dispatch an action to the 'auth-slice' state, causing an item to be set in the sessionStorage with the key 'login' and the value 'true'.
The 'logoutHandler' function will update the 'isLoggedIn' state to 'false' when called and dispatch an action to the 'auth-slice' state, causing an item to be set in the sessionStorage with the key 'login' and the value 'false'.
The 'Header' and 'Navbar' components are always rendered. 'Header' is passed the current 'isLoggedIn' state and a reference to the 'logoutHandler' function  to allow it to call the function and log the user out.
If 'isLoggedIn' is true, the 'Outlet' component will be displayed. If  'isLoggedIn' is false,  the 'Login' component will be displayed. 'Login' is passed a reference to the 'loginHandler' function to allow it to call the function and log the user in.

#### Cart
The 'Cart' page accesses the 'cart' state from the global state using the 'useSelector' hook.
The 'cart' state is then mapped to individual 'CartPageItem' components. These components are passed a 'key' and 'id' prop allowing them to identify which product's information they should display.
The total price of items contained in the cart is calculatd using the 'toLocaleString' method, displaying the price in pounds to 2 decimal places.
'Link' components provide a 'to' prop with the relevant path to render, allowing users to navigate along the Routes.

#### Shop
The 'Shop' page simply renders the 'ProductList' component.

#### Confirmation
The 'Confirmation' page renders a message confirming the user's order.
a 'Link' component provides a 'to' prop with the relevant path to render, allowing users to navigate along the Route back to the product list.

#### Error
The 'Error' page renders a message informing the user that there has been an error with their request. If an error message is provided (such as those provided with a failed fetch request), it will be displayed to the user.
a 'Link' component provides a 'to' prop with the relevant path to render, allowing users to navigate along the Route back to the product list.

#### Product
The 'Product' page contains a single piece of state, 'selectedProduct', an object which contains all the relevant data for the product to be displayed on the page. These values are empty strings or '0' by default.
The page accesses the 'products' state from the global state using the 'useSelector' hook. The 'useParams' hook will take the product id provided in the url and allow it to be used as a variable, 'productId'.
A useEffect hook then uses the 'productId' variable to search through the array of product objects retrieved from the global state. When it finds an entry with the matching id property it will update the page's local state with the product object from the global state.
The 'addProductToCart' function will loop through the array of products retrieved from the global state until it finds an entry with a matching id property and dispatch the 'addToCart' action, pushing the selected product to the array of products in the cart global state.
The total price of items contained in the cart is calculatd using the 'toLocaleString' method, displaying the price in pounds to 2 decimal places.

## CREDITS:

FakeStore API courtesy of https://fakestoreapi.com/

## [](https://github.com/GJMShrigley/Spotify-Player#links)LINKS:

For a live example, please visit my online portfolio (https://gs-storefront.netlify.app/)
