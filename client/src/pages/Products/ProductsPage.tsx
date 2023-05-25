import React from 'react'
import "./style.scss"
import {useGetProductMutation} from "../../app/slices/productSlice"

import ProductCard from './ProductCard'

function ProductsPage() {
    
  const [getProduct , {isLoading} ] = useGetProductMutation()
  const [products , setProducts] = React.useState([])

   React.useEffect(() => {
    const getTheProducts = async () =>{
        const allProducts:any = await getProduct(null)
        setProducts(allProducts.data.products)
    }
    getTheProducts()
    console.log("the",products)
    } , [getProduct])


    if(isLoading){
        return (<p>Loading...</p>)
    }

  return (
    <main className='productsmainpage'>
        {products.map((product:any) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </main>
  )
}

export default ProductsPage
