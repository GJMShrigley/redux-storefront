# E-COMMERCE STOREFRONT

A React-based front end for an e-commerce store. Log in and out, add and remove products from your cart, view individual product pages, and search products based on title, description, or rating.

## [](https://github.com/GJMShrigley/redux-storefront#how-to-use)HOW TO USE:

In the project directory, run `npm install` to ensure that all dependancies are up to date.

The app is now ready to run locally. Run the command `npm run start` in the project directory to open a local instance for testing and further development or `npm run build` to build for production.

### [](https://github.com/GJMShrigley/redux-storefront#logging-in)Logging in:

To view the store you must first log in. Upon loading the app you will be presented with a login page with fields for a username and password. Currently neither is needed to access the page and you can simply click the login button to proceed. Your login state will persist across page reloads.

If you wish to log out simply click the log out button in the header element to return to the login screen.

### [](https://github.com/GJMShrigley/redux-storefront#searching-products)Searching products:

After logging in a list of products will be fetched from the FakeStore API. You may temporarily see a loading screen (denoted by a rotating blue ring) while the request is made. Once loaded you will be able to select categories of products using the buttons at the bottom of the header element. Clicking one of these buttons will prompt the app to fetch another list from the API consisting only of the category selected.

To search through the list of products, type a query into the input field and either click the 'search' button to the right of the input, or press the 'enter' key if using a keyboard. You can select a search type from the dropdown menu to the right of the 'search' button. The search type options allow for searching the title, description, or rating of the products. To the right of the search type dropdown menu allows you to choose whether results are displayed in ascending or descending order.

Products are displayed in a vertical list. Initially only 5 products will be shown per page. At the bottom of the list a series of buttons allows you to select which page of products you wish to view. The number of products per page can be changed by selecting a value of 5, 10, or 15 from the dropdown menu to the right of the page buttons.

If the app is unable to receive a response from the API an error message will be displayed.

### [](https://github.com/GJMShrigley/redux-storefront#viewing-a-product)Viewing a product:

Clicking on a product's element will load a new page containing a larger image of the product and all its relevant details, including a full description. A button at the bottom of the page will allow you to return to the product list.

### [](https://github.com/GJMShrigley/redux-storefront#adding-a-product-to-the-cart)Adding a product to the cart:

Each product element on the product list contains an 'add to cart' button. Clicking this button will add it to the cart. Subsequent clicks will increase the quantity of that product in the cart.

Each product page also contains an 'add to cart' button with the same functionality.

The cart can be viewed at any time by hovering over (or clicking on mobile) the cart button in the header element. This will display a modal along the right-hand side of the screen containing a list of all products currently in the cart. This list will display the products in the cart, their price, their quantity, and the option to increase, or decrease their quantity. Decreasing a product's quantity to 0 will remove it from the cart entirely.

The cart modal also displays a total price (in GBP) for all items in the cart.

The bottom of the cart modal contains buttons that load the cart page or take you straight to the order confirmation screen.

### [](https://github.com/GJMShrigley/redux-storefront#completing-a-purchase)Completing a purchase

Currently the app allows for the user to confirm an order by clicking the 'checkout' button in the cart modal or the 'go to checkout' button in the cart screen.

## [](https://github.com/GJMShrigley/redux-storefront#how-it-works)HOW IT WORKS:

### [](https://github.com/GJMShrigley/redux-storefront#managing-global-state)Managing global State:

Redux 'Provider' Components wrap the other app Components in the 'index.js' file. By importing the 'store' object and passing it to the 'Provider' Component, the wrapped Components are given access to the store and its contents.

The 'store' directory contains 4 files, each managing a separate part of the app's global State.

- The 'auth-slice.js' file uses the Redux Toolkit 'createSlice' API to handle the initial State, Reducers, and Actions related to login and authorization features. The initial State is an Object with a single Property: 'isLoggedIn' set to 'false'. The Slice contains a 'login' Reducer which, when dispatched, will set 'isLoggedIn' to 'true' and set an item in the browser's session storage that records the current 'isLoggedIn' value. The Slice also contains a 'logout' Reducer which, when dispatched, will set 'isLoggedIn' to 'false' and update the item in the browser's session storage.

The 'index.js' file configures and exports the 'store' to be used by the other Components in the app.