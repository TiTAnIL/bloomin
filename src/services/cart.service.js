import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'

// import { userService } from './user.service.js'
import {
    getActionRemoveItem,
    getActionAddItem,
    getActionUpdateItem,
} from '../store/actions/cart.actions.js'

const STORAGE_KEY = 'cart'
const cartChannel = new BroadcastChannel('cartChannel')

    // import axios from "axios"

    ; (() => {
        cartChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()



export const cartService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
}
window.cs = cartService

async function query() {
    return storageService.query(STORAGE_KEY)
}

async function remove(itemId) {
    console.log(itemId)
    await storageService.remove(STORAGE_KEY, itemId)
    cartChannel.postMessage(getActionRemoveItem(itemId))
}

async function save(item) {
    var savedCart
    console.log('item,', item)
    // if (item._id) {
    // savedCart = await storageService.put(STORAGE_KEY, item)
    // cartChannel.postMessage(getActionUpdateItem(savedCart))
    // } else {
    // TODO: owner is set by the beckend
    // plant.owner = userService.getLoggedinUser()
    savedCart = await storageService.post(STORAGE_KEY, item)
    cartChannel.postMessage(getActionAddItem(savedCart))
    // }
    return savedCart
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function getEmptyOrder() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

const demoData = []