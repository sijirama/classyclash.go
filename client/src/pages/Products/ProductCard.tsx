import "./style.scss";
import { useSaveProductMutation } from "../../app/slices/productSlice";
import { toast } from "react-toastify";
import { Tabs } from 'antd';
import {Description , details} from "./utils"

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
    
  return (
    <div className="productcard">
        <img src={product.images[0]} alt="image" className="productcardimage" />
        <div className="productcarddetails">
        <div>
            <p>{product.title}</p>
            <p>{`$${product.price}`}</p>
            <p>{`${product.stock} left`}</p>
            <p>{`${product.discountPercentage} off`}</p>
        </div>
 
            <button onClick={saveToWishlist}>Add to Wishlist</button>
        </div>
    </div>
  )
}

export default ProductCard

