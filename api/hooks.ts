import { useState, useEffect } from "react"
import {Product, Cart} from '../types/'
import { utils } from "../utils"

const usePageState = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    return {
        currentPage,
        setCurrentPage,
        pageCount,
        setPageCount
    }
}

const useCart = () : Cart => {
    const [productsInCart, setProductsInCart] = useState<Product []>([])
    const [quantity, setQuantity] = useState<number>(0)
    const [visible, setVisible] = useState(false)
    
    const updateQuantity = (products: Product []) => {
        let count = 0
        products.forEach(pr => {
            count = count + pr.quantity
        })
        setQuantity(count)
    }

    const add = (product: Product) => {
        const updProducts = productsInCart.map(item => {
            let quantity = item.quantity
            if (utils.product.isEqual(item, product)) {
                quantity++
            }
            return {...item, quantity}
        })
        if (!isInCart(product)) updProducts.push({...product, quantity: 1})
        updateQuantity(updProducts)
        setProductsInCart(updProducts)
    }
    const remove = (product: Product) => {
        const updProducts = productsInCart.map(item => {
            if (utils.product.isEqual(item, product)) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }   
            else return item
        }).filter(item => item.quantity > 0)
        updateQuantity(updProducts)
        setProductsInCart(updProducts)
    }

    const updateSize = (size: string) => {
        return {
            to: (itemIndex: number) => {
                const withUpdated = productsInCart.map((item, index) => {
                    if (index === itemIndex) return {...item, size}
                    return item
                })
                setProductsInCart(withUpdated)
            }
        }        
    }

    const isInCart = (item: Product) => Boolean(productsInCart.find(product => utils.product.isEqual(item, product)))

    const toggleVisible = () => setVisible(!visible)

    const clear = () => setProductsInCart([])

    return {
        productsInCart,
        add,
        remove,
        quantity,
        updateSize,
        isInCart,
        modalState: {
            visible,
            toggleVisible
        },
        clear
    }
}

const useProduct = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const show = (id: number) => {
        setId(id)
        setVisible(Boolean(id))
    }

    const getId = () => id

    return {
        visible: visible && Boolean(id),
        show,
        getId
    }
}

export const hooks = {
    usePageState,
    useCart,
    useProduct
}