import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
// import {
//     removeAccessory,
// } from '../store/actions/accessory.actions'
import { store } from '../store/index'

// import axios from "axios"

const STORAGE_KEY = 'accessories'
const accessoryChannel = new BroadcastChannel('accessoryChannel')


; (() => {
    accessoryChannel.addEventListener('message', (ev) => {
        store.dispatch(ev.data)
    })
})()

function insertDemoData() {
    storageService.postMany(STORAGE_KEY, demoData)
}

export const AccessoryService = {
    query,
    getById,
    // save,
    // remove,
    // getEmptyPlant,
}

window.cs = AccessoryService

async function query(filterBy) {

    var accessories = await storageService.query(STORAGE_KEY)
    if (!accessories || !accessories.length) {
        insertDemoData()
    }
    accessories = accessories.map(accessory => {
        accessory.rate = (utilService.getRandomIntInclusive(11, 39) / 10)
        return accessory
    })
    return accessories
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

const demoData = [
    {
        "_id": "36dece17-fcfb-4ede-8950-50cab02b28f8",
        "name": "10 liter stainless steel funnel",
        "price": "14.99",
        "pic": "https://iili.io/H1x5bDv.png",
    },
    {
        "_id": "f9364362-9931-4b67-b83b-e1fb05b36b90",
        "name": "spritzer",
        "price": "8.39",
        "pic": "https://iili.io/H1x5DOJ.png",
    },
    {
        "_id": "c4e41ae4-2109-4485-9e50-888a8df05922",
        "name": "bottom",
        "price": "12.16",
        "pic": "https://iili.io/H1x5pxR.png",
    },
    {
        "_id": "7862fae6-afe9-4d4a-98d6-81dabde7d86c",
        "name": "fertilizer 200gm",
        "price": "8.12",
        "pic": "https://iili.io/H1x5yVp.png",
    }
]