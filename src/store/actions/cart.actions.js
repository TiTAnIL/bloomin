import { cartService } from "../../services/cart.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveItem(itemId) {
    console.log('reducer remove', itemId)
    return { type: 'REMOVE_FROM_CART', itemId }
}

export function getActionAddItem(item) {
    console.log('getActionAddItem')
    console.log(item)
    return {
        type: 'ADD_TO_CART',
        item,
    }
}

export function getActionUpdateItem(item) {
    console.log('getActionUpdateItem')
    console.log(item)
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
    console.log('addCart(item):', item)
    return async (dispatch) => {
        try {
            const savedCart = await cartService.save(item)
            console.log(savedCart)
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
            console.log('updated cart:', savedItem)
            dispatch(getActionUpdateItem(savedItem))
            showSuccessMsg('Cart updated')
        } catch (error) {
            showUserMsg('cant update cart')
            console.log('cannot update cart', error)
        }
    }
}

export function removeItem(itemId) {
    console.log(itemId)
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

