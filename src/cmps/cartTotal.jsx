import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import cart from '../assets/imgs/cart.png'

export function CartTotal() {
    const items = useSelector(state => state.cartModule.items)
    const total = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <NavLink className="cart-icon"
            to='/cart'><img src={cart}
                alt="cart" />
                <span className='cart-ico-total'>{total}</span>
        </NavLink>
    )
}
