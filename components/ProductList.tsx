import {Product, Cart} from '../types/'
import Image from 'next/image'
import {utils} from '../utils/'
import styles from '../styles/Size.module.css'
import React from 'react'

export const ProductList = ({
    products = [],
    cart,
    productState
}: {
    products: Product[],
    cart: Cart,
    productState: any
}) => {
    const [items, setItems] = React.useState(products)
    React.useEffect(() => {
        if (products) {
            setItems(products)
        }
    }, [products])

    React.useEffect(() => {
        if (items) setItems(items)
    }, [items])

    return (
        <div>
            {items.map((item: Product, index: number) => {
                return (
                    <div
                        key={index}
                        style={{paddingBottom: '2em'}}
                        >
                        <div
                            onClick={() => {productState.show(item.id)}}
                            style={{cursor: 'pointer'}}
                        >
                            <Image
                                src={item.image}
                                alt='product'
                                width={100}
                                height={150}
                                loader={utils.product.imageLoader}
                            />                 
                        </div>
                        <div>
                            <b>
                                {item.name}
                            </b>
                        </div>
                        <div>
                            model: {item.model}
                        </div>
                        <div style={utils.product.getPriceStyle(item)}>
                            {item.special ? 'old price:' : 'price'} {item.price}
                        </div>
                        {item.special &&
                        <div>
                            price for you: <b>{item.special}</b>
                        </div>
                        }
                        <div>
                            size: <span>{item.sizes.map((size, index) => (
                               <span
                                    key={index}
                                    className={(item.size === size) ? styles.selectedSize : styles.notSelectedSize}
                                    onClick={() => {
                                        const updItems = items.map((curItem) => {
                                            if (curItem.id === item.id) return {...curItem, size}
                                            return curItem
                                        })
                                        setItems(updItems)
                                    }}
                                >
                                    {size}
                                </span> 
                            ))}</span>
                        </div>                        
                        <div>
                            <button
                                disabled={!item.size}
                                onClick={() => cart.add(item)}
                            >
                                addToCart
                            </button>
                        </div>
                        {cart.isInCart(item) &&
                            <button
                                onClick={() => cart.remove(item)}
                            >
                                removeFromCart
                            </button>
                        }
                    </div>
                )
            })}
        </div>
    )
}