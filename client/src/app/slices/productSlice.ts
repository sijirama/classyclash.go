import {apiSlice} from "./apiSlice"

const PRODUCT_URL = "/api/products"

export const productSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        saveProduct:builder.mutation({
            query:(data) =>({
                url:`${PRODUCT_URL}/saveproduct`,
                method: "POST",
                body: {"productId":data}
            })
        }),
        unsaveProduct:builder.mutation({
            query:(data) => ({
                url:`${PRODUCT_URL}/unsaveproduct`,
                method: "POST",
                body: data
            })
        }),
        getProduct:builder.mutation({
            query:() => ({
                url:"https://dummyjson.com/products",
                method:"GET",
            })
        })
    })
})

export const {useSaveProductMutation , useUnsaveProductMutation , useGetProductMutation} = productSlice
