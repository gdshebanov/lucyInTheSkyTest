
import { Product } from "../types"

const SERVER_URL = 'http://localhost:3000'

const validateResponse = (response: object) => {
    // TODO validate response here
    return true
}

const getProductsByPage = async (page: number) => {
    const url = `${SERVER_URL}/product?page=${page}`
    const resp = await fetch(url)
    if (validateResponse(resp)) {
        const data = await resp.json()
        return data
    }
}

const getProductById = async (id: number) => {
    const url = `${SERVER_URL}/product/${id}`
    const resp = await fetch(url)
    if (validateResponse(resp)) {
        const data = await resp.json()
        return data
    }
}

type checkoutItem = {
    id: number,
    size: string
}

const checkout = async (items: Product[])=> {
    const url = `${SERVER_URL}/checkout/placeOrder`
    const productsExpandedByQuantity: Array<checkoutItem> = []
    items.forEach(item => { // TODO: this is to be done on server!
        if (item.size) {
            let quantity = item.quantity
            while(quantity > 0) {
                productsExpandedByQuantity.push({
                    id: item.id,
                    size: item.size                
                })
                quantity--
            }
        }
    })
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({products: productsExpandedByQuantity})
    })
    if (validateResponse(resp)) {
        const data = await resp.json()
        return data
    }
}

export const server = {
    getProductsByPage,
    checkout,
    getProductById
}