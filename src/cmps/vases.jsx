import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadVases } from '../store/actions/vase.actions.js'
import LoadingScreen from "react-loading-screen"

import addSym from '../assets/imgs/main/addSym.png'
import subSym from '../assets/imgs/main/subSym.png'
import { addItem } from '../store/actions/cart.actions'


export function Vases(props) {

    const { vases, isLoading } = useSelector(state => state.vaseModule)
    const dispatch = useDispatch()

    const [selectedVase, setSelectedVase] = useState(null)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        dispatch(loadVases())
    }, [])


    function handleChosenVase(vase) {
        setSelectedVase(vase)
        if (quantity < 1) setQuantity(1)
    }

    const onAddToCart = async () => {
        await dispatch(addItem({ ...selectedVase, quantity }))
        await dispatch(addItem({ ...props.plant, quantity }))
    }

    if (!vases) return <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.5)"
        spinnerColor="#4850b9"
        textColor="#676767"
        logoSrc="../logo.png"
        text="Loading"
    >
        {" "}
    </LoadingScreen>

    return <>
        <div className='vases-container'>
            {vases.map(vase => {
                return (
                    <img
                        src={vase.pic}
                        alt={vase.name}
                        key={vase.name}
                        onClick={() => handleChosenVase(vase)}
                        className={vase === selectedVase ? 'checked' : 'unchecked'}
                    />
                )
            })}
        </div>
        <div className='quantity-counter flex'>
            <p>quantity</p>
            <img alt='+' src={addSym} onClick={() => setQuantity(quantity + 1)} />
            <p>{quantity}</p>
            {
                quantity > 1 ? <img alt='-' src={subSym} onClick={() => setQuantity(quantity - 1)} /> :
                    <p></p>
            }
        </div>
        <button onClick={onAddToCart}>Add to cart</button>
    </>
}
