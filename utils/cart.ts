import { Product } from "../types";

const calcTotalPriceInCents = (products: Product[]): number => products.reduce((price, product) => {
    const cents = product.specialInCents || product.priceInCents
    if (product.quantity > 0) price = price + product.quantity * cents
    else price = price + cents
    return price
}, 0)

const priceInCentsToString = (cents: number): string => '$' + cents/100

const calcTotalAndStringify = (products: Product[]): string => {
    const totalCents = calcTotalPriceInCents(products)
    const priceStr = priceInCentsToString(totalCents)
    return priceStr
}

export const cart = {
    calcTotalAndStringify
}