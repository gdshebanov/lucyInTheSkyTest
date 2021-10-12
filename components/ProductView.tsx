import { useEffect, useState, useCallback } from "react"
import { server } from "../api/server"
import { Product } from "../types"
import Image from 'next/image'
import { utils } from "../utils"
import sizeStyles from '../styles/Size.module.css'
import { Cart } from "../types"
import modalStyles from '../styles/Modal.module.css'


export const ProductView = ({productState, cart} : {cart: Cart, productState: any}) => {
    if (!productState.visible) return null
    const productId = productState.getId()
    const [id, setId] = useState<number | null>(null)
    const [product, setProduct] = useState<null | Product>(null)

    useEffect(() => {
        setId(productId)
    }, [productId])

    const fetchProduct = useCallback(async() => {
        if (productId) {
            const data: Product = await server.getProductById(productId)
            setProduct(data)
        }
    }, [id])

    useEffect(() => {
        fetchProduct()
    }, [fetchProduct])

    if (!product) return (<div>...loading...</div>)

    return (
        <div className={modalStyles.modal}>
            <div className={modalStyles.content}>
                <span
                    className={modalStyles.close}
                    onClick={() => productState.show(null)}
                >
                    &times;
                </span>  

            
                <div>
                    <Image
                        src={product.image}
                        alt='product'
                        width={300}
                        height={450}
                        loader={utils.product.imageLoader}
                    />                  
                </div>

                <div>
                    <b>{product.name}</b>
                </div>

                <div dangerouslySetInnerHTML={{__html: utils.html.decode(product.description)}} />

                <div>
                    size: <span>{product.sizes.map((size, index) => (
                        <span
                            key={index}
                            className={product.size === size ? sizeStyles.selectedSize : sizeStyles.notSelectedSize}
                            onClick={() => {
                                setProduct({...product, size, quantity: product.quantity + 1})
                            }}
                        >
                            {size}
                        </span> 
                    ))}</span>
                </div>  

                <div>
                    <button
                        disabled={!product.size}
                        onClick={() => {
                            cart.add(product)
                            productState.show(null)
                            cart.modalState.toggleVisible()
                        }}
                    >
                        Buy
                    </button>                    
                </div>

            </div>


        </div>
    )
}