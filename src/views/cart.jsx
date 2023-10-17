import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadCart, updateItem } from '../store/actions/cart.actions'
import React, { useCallback } from 'react';
import LoadingScreen from "react-loading-screen"

import addSym from '../assets/imgs/main/addSym.png'
import subSym from '../assets/imgs/main/subSym.png'
import trash from '../assets/imgs/main/ic-actions-trash.png'

import { Accessories } from '../cmps/accessories'
import { CartSummery } from '../cmps/cart-summary'
import { utilService } from '../services/util.service'
import { removeItem } from '../store/actions/cart.actions'
import { GreetingModal } from '../cmps/greetingModal.jsx'

export function Cart() {

    const { items, isLoading } = useSelector(state => state.cartModule)
    const { accessories } = useSelector(state => state.accessoryModule)
    const [quantities, setQuantities] = useState(
        items.reduce((acc, item) => ({ ...acc, [item.name]: item.quantity }), {})
    )
    const [total, setTotal] = useState(0)
    const [isModalOpen, setModalOpen] = useState(false);
    const [greetingText, setGreetingText] = useState('');

    const [id, setID] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch, loadCart])

    useEffect(() => {
        let newTotal = 0
        items.forEach((item) => {
            newTotal += item.quantity
        })
        setTotal(newTotal)
    }, [items, setTotal])


    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleSaveGreeting = (greeting) => {
        setGreetingText(greeting)
    }

    const onRemoveItem = useCallback(async (id) => {
        setID(id)
        dispatch(removeItem(id))
    }, [dispatch, id])


    if (!items) return <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.5)"
        spinnerColor="#4850b9"
        textColor="#676767"
        logoSrc="../logo.png"
        text="Loading"
    >
        {" "}
    </LoadingScreen>
    return (
        <section>
            <h2>Shopping Cart</h2>
            <div className='cart-container'>
                <div className='cart-summery'>
                    <CartSummery items={items} quantities={quantities} setQuantities={setQuantities} />
                </div>
                <table className='shopping-cart'>
                    <thead>
                        <tr className='cart-headings'>
                            <th>Product</th>
                            <th className='item-name'></th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item.name + utilService.makeId()}>
                                    <td ><img className='cart-item-img' src={item.pic} alt={item.name} /></td>
                                    <td className='item-name'>{item.name}</td>
                                    <td >
                                        <div className='item-qunatity no-border'>
                                            {quantities[item.name] > 1 ?
                                                <img className='pointer' alt='-' src={subSym} onClick={() => {
                                                    const newQuantity = quantities[item.name] - 1
                                                    setQuantities({ ...quantities, [item.name]: newQuantity })
                                                }} /> : <img className='deactive-btn' src={subSym} alt='-' />}
                                            <p
                                                onChange={(event) => {
                                                    const newQuantity = Number(event.target.value)
                                                    setQuantities({ ...quantities, [item.name]: newQuantity })
                                                }}>{quantities[item.name]}</p>
                                            <img alt='+' className='pointer' src={addSym} onClick={() => {
                                                const newQuantity = quantities[item.name] + 1
                                                setQuantities({ ...quantities, [item.name]: newQuantity })
                                            }} />
                                        </div>
                                    </td>
                                    <td >${item.price}</td>
                                    <td >${item.price * quantities[item.name]}</td>
                                    <td ><img src={trash} className='remove-item' alt='remove-item' onClick={() => onRemoveItem(item._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='cart-footer-buttons'>
                <div>
                    <button onClick={handleOpenModal}>Add Greeting</button>

                    <GreetingModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveGreeting} />

                    {greetingText && <p>Selected Greeting: {greetingText}</p>}
                </div>
                <button className='cart-buy-btn'>Buy</button>
            </div>
            <Accessories />
        </section>
    )
}
