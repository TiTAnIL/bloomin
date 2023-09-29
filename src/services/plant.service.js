import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'
import { getActionAddPlant, getActionRemovePlant, getActionUpdatePlant } from "../store/actions/plant.actions.js";


// const STORAGE_KEY = 'plants'
// const plantChannel = new BroadcastChannel('plantChannel')

//   ; (() => {
//     plantChannel.addEventListener('message', (ev) => {
//       store.dispatch(ev.data)
//     })
//   })()


// function insertDemoData() {
//   storageService.postMany(STORAGE_KEY, demoData)
// }

// export const plantService = {
//   query,
//   getById,
//   save,
//   remove,
//   getEmptyPlant,
// }

// window.cs = plantService

// async function query(filterBy) {
//   var plants = await storageService.query(STORAGE_KEY)
//   if (!plants || !plants.length) {
//     insertDemoData()
//   }
//   if (filterBy) {
//     const {name,  priceRange, watering, lightning, difficulty, locations } = filterBy
//     if (name) {
//       const regex = new RegExp(name, 'i')
//       plants = plants.filter((plant) => regex.test(plant.name))
//     }

//     if (priceRange) {
//       plants = plants.filter((plant) => plant.price >= priceRange.min && plant.price <= priceRange.max)
//     }
//     if (watering) {
//       plants = plants.filter((plant) => plant.watering === watering)
//       }
//       if (lightning) {
//       plants = plants.filter((plant) => plant.lightning === lightning)
//     }
//     if (difficulty) {
//       plants = plants.filter((plant) => plant.difficulty === difficulty)
//     }
//     if (locations) {
//       const selectedLocations = Object.keys(locations).filter(location => locations[location])
//       if (selectedLocations.length > 0) {
//         plants = plants.filter((plant) => selectedLocations.includes(plant.location))
//       }
//     }
//   }
//   return plants
// }

// async function save(plant) {
//   var savedPlant
//   if (plant._id) {
//     savedPlant = await storageService.put(STORAGE_KEY, plant)
//     plantChannel.postMessage(getActionUpdatePlant(savedPlant))
//   } else {
//     // TODO: owner is set by the beckend
//     // plant.owner = userService.getLoggedinUser()
//     plant._id = utilService.makeId()
//     savedPlant = await storageService.post(STORAGE_KEY, plant)
//     plantChannel.postMessage(getActionAddPlant(savedPlant))
//   }
//   return savedPlant
// }

// function getById(plantId) {
//   return storageService.get(STORAGE_KEY, plantId)
// }

// async function remove(plantId) {
//   await storageService.remove(STORAGE_KEY, plantId)
//   plantChannel.postMessage(getActionRemovePlant())
// }

// function getEmptyPlant() {
//   return {
//     about: "",
//     "price": 0,
//     "height": 0,
//     "diameter": 0,
//     "pic": [
//       "https://iili.io/HlATEwQ.png",
//       "http://dummyimage.com/195x229.png/ff4444/ffffff",
//       "http://dummyimage.com/178x185.png/5fa2dd/ffffff"
//     ],
//     "location": "Office",
//     "difficulty": "Survivor",
//     "lightning": "Low",
//     "watering": "Low",
//   }
// }

import { httpService } from './http.service';

const STORAGE_KEY = 'plants';

async function query(filterBy) {
  console.log('calling plant query frontend', filterBy)
  try {
    if (filterBy === null) {
      return await httpService.get(`api/plants`)
    } else {
      console.log('query filterBy', filterBy)
      const queryString = Object.keys(filterBy)
        .map((key) => `${key}=${encodeURIComponent(filterBy[key])}`)
        .join('&')
      return await httpService.get(`api/plants${queryString}`)
    }
  } catch (error) {
    console.error('Error querying plants:', error)
    throw error
  }
}

async function save(plant) {
  console.log('calling plant save frontend', plant)
  try {
    let savedPlant
    if (plant._id) {
      savedPlant = await httpService.put(`api/plants/${plant._id}`, plant)
    } else {
      savedPlant = await httpService.post(`api/plants`, plant)
    }
    return savedPlant
  } catch (error) {
    console.error('Error saving plant:', error)
    throw error
  }
}

async function getById(plantId) {
  try {
    console.log('calling plant getById frontend', plantId)
    const plant = await httpService.get(`api/plants/${plantId}`)
    return plant
  } catch (error) {
    console.error('Error getting plant by ID:', error);
    throw error;
  }
}

async function remove(plantId) {
  try {
    await httpService.delete(`api/plants/${plantId}`);
  } catch (error) {
    console.error('Error removing plant:', error);
    throw error;
  }
}

function getEmptyPlant() {
  return {
    about: "",
    price: 0,
    height: 0,
    diameter: 0,
    pic: [
      "https://iili.io/HlATEwQ.png",
      "http://dummyimage.com/195x229.png/ff4444/ffffff",
      "http://dummyimage.com/178x185.png/5fa2dd/ffffff",
    ],
    location: "Office",
    difficulty: "Survivor",
    lightning: "Low",
    watering: "Low",
  };
}

export const plantService = {
  query,
  getById,
  save,
  remove,
  getEmptyPlant,
};
