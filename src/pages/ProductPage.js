import "../App.css";
import React from "react";
import { useLocation, Link } from 'react-router-dom'

function ProductPage() {
    const location = useLocation();
    const { title, description, price, rating, image, id } = location.state;
    return (
        <div className="product-page">
            {title}
            {description}
            {price}
            {rating}
            {image}
            {id}
            <Link to="/" className="link-home"> RETURN HOME</Link>
        </div>
    )
}

export default ProductPage;