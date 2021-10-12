import Link from 'next/link'
import {Cart} from '../types/'

const itemStyle = {
    margin: '1rem',
    cursor: 'pointer'
}

export const Menu = ({cart}: {cart: Cart}) => {
    return (
        <div style={{
            display: 'flex',
            flex: 1
        }}>
            <div style={itemStyle}>
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </div>

            {cart.productsInCart.length > 0 &&
                <div style={itemStyle} onClick={cart.modalState.toggleVisible}>
                    Cart ({cart.quantity})
                </div>
            }
        </div>
    )
}