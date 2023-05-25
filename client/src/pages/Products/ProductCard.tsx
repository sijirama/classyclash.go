import React from "react";
import "./style.scss";

interface Props {
  product: {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  };
}

    // <div >
    // </div>
function ProductCard({ product }: Props) {
  return (
    <div className="productcard">
        <img src={product.images[0]} alt="image" className="productcardimage" />
        <div className="productcarddetails">
            <p>{product.title}</p>
            <p>{`$${product.price}`}</p>
            <p>{`${product.stock} left`}</p>
            <p></p>
        </div>

    </div>
  )
}

export default ProductCard
