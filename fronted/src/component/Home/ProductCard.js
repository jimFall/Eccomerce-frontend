import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css";

const ProductCard = ({ product }) => {
  const Options = {
    //edit false means jo product rating ke star hai bo abhi select ni ho payge
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomoto",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };


  

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...Options} />
        <span>({product.numofReviews}Reviews)</span>
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
