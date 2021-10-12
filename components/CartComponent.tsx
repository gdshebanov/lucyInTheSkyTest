import {Product, Cart} from '../types/'
import Image from 'next/image'
import {utils} from '../utils/'
import sizeStyles from '../styles/Size.module.css'
import React, { useEffect } from 'react'
import modalStyles from '../styles/Modal.module.css'
import { server } from '../api/server'
import { useRouter } from 'next/router'

export const CartComponent = ({cart}: {cart: Cart}) => {
    if (!cart.modalState.visible) return null
    const router = useRouter()
    const quantity = cart.quantity

    useEffect(() => {
        if (quantity === 0) cart.modalState.toggleVisible()
    }, [quantity])

    const leave = (orderId: string) => {
        if (orderId) {
            cart.clear()
            router.push(`/order/Confirmation?orderId=${orderId}`)
        }
        else {
            router.push('/order/Error')
        }        
    }

    return (
        <div className={modalStyles.modal}>
            <div className={modalStyles.content}>
                <h2>Your cart</h2>
                <span
                    className={modalStyles.close}
                    onClick={cart.modalState.toggleVisible}
                >
                    &times;
                </span>                

                {cart.productsInCart.map((item: Product, index: number) => {
                return (
                    <div key={index} style={{paddingBottom: '2em'}}>
                        <div>
                            <Image
                                src={item.image}
                                alt='product'
                                width={100}
                                height={150}
                                loader={utils.product.imageLoader}
                            />
                        </div>                        
                        <div>
                            <b>{item.name}</b>
                        </div>
                        <div>
                            model: {item.model}
                        </div>
                        <div>
                            price: <b>{item.special}</b>
                        </div>
                        <div>
                            size: <span className={sizeStyles.selectedSize}>
                                    {item.size}
                                </span>
                        </div>
                        <div>
                            quantity: {item.quantity}
                        </div>                     
                        <div>
                            <button
                                disabled={!item.size}
                                onClick={() => cart.add(item)}
                            >
                                add
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                cart.remove(item)
                            }}
                        >
                            remove
                        </button>
                    </div>
                )
            })}

                <div style={{marginBottom: '2em', paddingBottom: '2em'}}>
                    <div>total price: <b>{utils.cart.calcTotalAndStringify(cart.productsInCart)}</b></div>
                    <button style={{}} onClick={
                    () => {
                        server.checkout(cart.productsInCart)
                            .then(result => {
                                leave(result.orderId)
                            })
                            .finally(cart.modalState.toggleVisible)
                    }
                }>
                    proceedCheckout
                    </button>                    
                </div>
            </div>
        </div>
    )
}