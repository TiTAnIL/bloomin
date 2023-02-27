import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadAccessories } from '../store/actions/accessory.actions.js'
import { addItem } from '../store/actions/cart.actions.js';


export function Accessories() {

    const { accessories, isLoading } = useSelector(state => state.accessoryModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadAccessories())
    }, []);

    const onAddToCart = (accessory) => {
        dispatch(addItem({ ...accessory, quantity: 1 }))
    }

    if (!accessories) return <h2>loading accessories</h2>

    return <>

        <section className='accessories-container'>
            <h2>Suggestion</h2>
            <div className='accessory'>
                {accessories.map(accessory => <div key={accessory.name}>
                    <img src={accessory.pic} alt={accessory.name} key={accessory.name}></img>
                    <p>{accessory.name}</p>
                    <p>{accessory.price}</p>
                    <button onClick={() => onAddToCart(accessory)}>Add to cart</button>
                </div>
                )}
            </div>
        </section>
    </>
}

