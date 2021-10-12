import { useRouter } from 'next/router'
import Link from 'next/link'

const Confirmation = () => {
    const router = useRouter()
    const orderId = router.query.orderId
    return (
        <div>
            <h1>Your order {orderId} has been confirmed!</h1>
            <Link href={'/'}>More beautiful things!</Link>
        </div>
    )
}

export default Confirmation