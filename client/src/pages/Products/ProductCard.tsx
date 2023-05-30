import "./style.scss";
import { useSaveProductMutation } from "../../app/slices/productSlice";
import { toast } from "react-toastify";
import { Tabs } from 'antd';
import {AiOutlineHeart} from "react-icons/ai"
import "../../styles/components/ProductCard.scss"

export interface Props {
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

const {TabPane} = Tabs

function ProductCard({ product }: Props) {
    
    const [saveProduct , {isLoading}] = useSaveProductMutation()

    const saveToWishlist = async() => {
        try {
            const res = await saveProduct(product.id)
            console.log(res)
            toast.success("Product saved to wishlist.")
        } catch (error) {
            toast.success("Product failed to save to wishlist.")
        }
    }
            //<p>{`${product.stock} left`}</p>
    
  return (
    <div className="productcard">
        <div className="product-card-image">
            <img src={product.images[0]} alt="image" className="productcardimage" />
        </div>
        <div className="productcarddetails">
        <div className="product-card">
            <p className="product-card-category">{product.category}</p>
            <p className="product-card-title">{product.title}</p>
            <p className="product-card-description">{product.description}</p>
            <div className="product-card-price-and-discount">
                <p className="product-card-price">{`$${product.price}`}</p>
                <p className="product-card-discount">{`${product.discountPercentage} off`}</p>
            </div>
        </div>
 
        <button onClick={saveToWishlist} className="product-card-button-wishlist">
        <AiOutlineHeart />
        Add to Wishlist
        </button>
        </div>
    </div>
  )
}

export default ProductCard

