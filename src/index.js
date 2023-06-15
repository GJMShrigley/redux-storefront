import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage.tsx";
import ProductPage from "./pages/ProductPage";
import LayoutPage from "./pages/LayoutPage";
import ShopPage from "./pages/ShopPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./layout.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:id" element={<ProductPage />} loader={({ params }) => { console.log(params.id); }} action={({ params }) => { }} />
          <Route path="confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
