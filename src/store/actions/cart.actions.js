import { cartService } from "../../services/cart.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveItem(itemId) {
    return { type: 'REMOVE_FROM_CART', itemId }
}

export function getActionAddItem(item) {

    return {
        type: 'ADD_TO_CART',
        item,
    }
}

export function getActionUpdateItem(item) {

    return {
        type: 'UPDATE_ITEM_IN_CART',
        item,
    }
}

export function loadCart() {
    return async (dispatch) => {
        const items = await cartService.query()
            .then(items => {
                dispatch({ type: 'SET_CART', items })
            })
            .catch(err => {
                console.log('err:', err)
            })
        }
    }

export function addItem(item) {
    return async (dispatch) => {
        try {
            const savedCart = await cartService.save(item)
            dispatch(getActionAddItem(savedCart))
            showSuccessMsg('Added to cart!')
        } catch (err) {
            showErrorMsg('Cannot add item')
            console.log('Cannot add item', err)
        }
    }
}

export function updateItem(item) {
    return async (dispatch) => {
        try {
            const savedItem = await cartService.save(item)
            dispatch(getActionUpdateItem(savedItem))
            showSuccessMsg('Cart updated')
        } catch (error) {
            showUserMsg('cant update cart')
        }
    }
}

export function removeItem(itemId) {
    return (dispatch, getState) => {
        cartService.remove(itemId)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_CART', itemId })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

