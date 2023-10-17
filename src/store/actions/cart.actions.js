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
    return async (dispatch, getState) => {
        try {
            const { cartModule: { items } } = getState();
            const existingItem = items.find((existingItem) => existingItem._id === item._id)

            if (existingItem) {
                existingItem.quantity += item.quantity;
                const updatedCart = items.map((cartItem) =>
                    cartItem._id === existingItem._id ? existingItem : cartItem
                )

                await cartService.update(updatedCart)

                dispatch(getActionUpdateItem(existingItem))
                showSuccessMsg('Cart updated!')
            } else {
                const savedCart = await cartService.save(item)
                dispatch(getActionAddItem(savedCart))
                showSuccessMsg('Added to cart!')
            }
        } catch (err) {
            showErrorMsg('Cannot add item')
            console.log('Cannot add item', err)
        }
    }
}

export function updateItem(item) {
    return async (dispatch, getState) => {
        try {
            const { cartModule: { items } } = getState()
            const existingItem = items.find((existingItem) => existingItem._id === item._id)

            if (existingItem) {
                existingItem.quantity += item.quantity;
                const updatedCart = items.map((cartItem) =>
                    cartItem._id === existingItem._id ? existingItem : cartItem
                )

                await cartService.update(updatedCart)

                dispatch(getActionUpdateItem(existingItem))
                showSuccessMsg('Cart updated!')
            } else {
                showErrorMsg('Item not found in the cart.')
            }
        } catch (err) {
            showErrorMsg('Cannot update item')
            console.log('Cannot update item', err)
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

