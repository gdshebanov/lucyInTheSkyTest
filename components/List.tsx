import React from 'react'
import { server } from '../api/server'
import {Product, Products, Cart} from '../types/'
import { ProductList } from './ProductList'

export const List = ({pageState, cart, productState}: {pageState: any, cart: Cart, productState: any}) => {
    const { // TODO make interface
        currentPage,
        setPageCount
    } = pageState
    const [products, setProducts] = React.useState<Product[]>([])

    const fetchData = React.useCallback(async() => {
        if (currentPage) {
            const data: Products = await server.getProductsByPage(currentPage)
            setProducts(data.data.map(product => ({...product, quantity: 0})))
            setPageCount(data.pageCount)
        }
    }, [currentPage])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div>
            <ProductList products={products} cart={cart} productState={productState}/>
        </div>
    )
}