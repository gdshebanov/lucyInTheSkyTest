import {Product} from '../types/'

const imageLoader = ({src, width}: {src: string, width: number}) => `${src}?w=${width}`
const getPriceStyle = (item: Product) => item.special ? {textDecoration: 'line-through'} : {}
const isEqual = (p1: Product, p2: Product) => p1.id === p2.id && p1.size === p2.size

export const product = {
    imageLoader,
    getPriceStyle,
    isEqual
}

