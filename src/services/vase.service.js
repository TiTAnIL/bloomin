import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'
// import { userService } from './user.service.js'
import {
  removeVase,
//   getActionAddStay,
//   getActionUpdateStay,
} from '../store/actions/vase.actions.js'

const STORAGE_KEY = 'vases'
const vaseChannel = new BroadcastChannel('vaseChannel')


; (() => {
  vaseChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
  })
})()

function insertDemoData() {
  storageService.postMany(STORAGE_KEY, demoVases)
}

export const vaseService = {
  query,
  getById,
  // save,
  // remove,
    // getEmptyAccessory,
  }

  window.cs = vaseService
  
async function query(filterBy) {

    var vases = await storageService.query(STORAGE_KEY)
    if (!vases || !vases.length) {
        insertDemoData()
    }
 
    return vases


function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

const demoVases = [{
    "_id": "36dece17-fcfb-4ede-8950-50cab02b28f8",
    "name": "vase1",
    "price": "16.68",
    "pic": "https://iili.io/H1x5UDx.png",
        // "quantity": null
  }, {
    "_id": "f9364362-9931-4b67-b83b-e1fb05b36b90",
    "name": "vase2",
    "price": "8.39",
    "pic": "https://iili.io/H1x5SNj.png",
        // "quantity": null
  }, {
    "_id": "c4e41ae4-2109-4485-9e50-888a8df05922",
    "name": "vase3",
    "price": "12.16",
    "pic": "https://iili.io/H1x58Ab.png",
        // "quantity": null
  }, {
    "_id": "7862fae6-afe9-4d4a-98d6-81dabde7d86c",
    "name": "vase4",
    "price": "8.12",
    "pic": "https://iili.io/H1x5vHu.png",
        // "quantity": null
  }, {
    "_id": "1c1a2300-d928-4858-9de4-7f83a4373759",
    "name": "vase5",
    "price": "16.31",
    "pic": "https://iili.io/H1x5roQ.png",
        // "quantity": null
  }, {
    "_id": "6864878b-b113-421e-98c8-0b0400f20be6",
    "name": "vase6",
    "price": "1.04",
    "pic": "https://iili.io/H1x54VV.png",
        // "quantity": null
  }, {
    "_id": "b8348a89-5fa9-4075-8cd3-7ed0bd08381a",
    "name": "vase7",
    "price": "4.20",
    "pic": "https://iili.io/H1x56iB.png",
        // "quantity": null
  }, {
    "_id": "2428ea62-ea1b-425d-8a9c-f29914a02c38",
    "name": "vase8",
    "price": "10.07",
    "pic": "https://iili.io/H1x5iKP.png",
        // "quantity": null
  }, {
    "_id": "3b652f4b-4e96-4e0d-a6be-dcd611b11c67",
    "name": "vase9",
    "price": "18.14",
    "pic": "https://iili.io/H1x5sl1.png",
        // "quantity": null
  }, {
    "_id": "5ac24976-301d-41a2-912b-ee99b71f7201",
    "name": "vase10",
    "price": "7.86",
    "pic": "https://iili.io/H1x5LUF.png",
        // "quantity": null
  }, {
    "_id": "791c5b78-ea10-4a0c-ad74-f08835053d83",
    "name": "vase11",
    "price": "9.43",
    "pic": "https://iili.io/H1x5ZHg.png",
        // "quantity": null
  }, {
    "_id": "514e6f29-bd02-4147-b200-b4ad3a7de953",
    "name": "vase12",
    "price": "3.02",
    "pic": "https://iili.io/H1x5tRa.png",
        // "quantity": null
  }]  
