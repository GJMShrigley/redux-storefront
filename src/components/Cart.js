import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "../cart.css";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const [cartItems, totalPrice, totalQuantity] = [
        cart.list,
        cart.totalPrice,
        cart.totalQuantity,
    ];
    const [display, setDisplay] = useState(false);
    let modal;
    let content = cartItems.map((item) => (
        <CartItem
            key={item.id}
            id={item.id}
        />
    ));

    // switch the cart modal on/off when entering/leaving the modal or when clicking onto new page
    function mouseHandler() {
        setDisplay(!display);
    }

    // display the modal Element if 'display' is true
    if (display) {
        modal = (
            <div className="cart-modal">
                <div className="cart-modal__list"> {content} </div>
                <div className="cart-modal__total" >
                    Total &#58;&nbsp;
                    {totalPrice.toLocaleString("en-GB", { //convert 'totalPrice' into currency
                        style: "currency",
                        currency: "GBP",
                        minimumFractionDigits: 2,
                    })}
                </div>

                <div className="cart-modal__buttons-container" >
                    <Link to="/cart"
                        className="link__cartPage button"
                    >
                        GO TO CART
                    </Link>
                    <Link to="/confirmation"
                        className="link__submit button"
                    >
                        CHECKOUT
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart"
            onMouseEnter={mouseHandler}
            onMouseLeave={mouseHandler} >
            <div to="/cart"
                className="cart__btn" >
                CART &#40;{totalQuantity}&#41;
            </div>
            {modal}
        </div>
    );
}