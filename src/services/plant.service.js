import { httpService } from './http.service';

async function query(filterBy) {
  // const filterBy = {
  //   'priceRange.min': 140,
  //   'priceRange.max': 145
  // };
  console.log('calling plant query frontend', filterBy)
  try {
    if (filterBy === null) {
      return await httpService.get(`plants`)
    } else {
      console.log('query filterBy', filterBy)
      const queryString = Object.keys(filterBy).map(key => {
        if (key === 'priceRange') {
          return Object.keys(filterBy[key]).map(subKey => {
            return `${key}.${subKey}=${filterBy[key][subKey]}`
          }).join('&')
        } else {
          return `${key}=${filterBy[key]}`
        }
      }).join('&')

      console.log('query queryString', `plants/categories?${queryString}`)
      const plants = await httpService.get(`plants/categories?${queryString}`)
      console.log(plants)
      return plants;
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
      savedPlant = await httpService.put(`plants/${plant._id}`, plant)
    } else {
      savedPlant = await httpService.post(`plants`, plant)
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
    const plant = await httpService.get(`plants/${plantId}`)
    return plant
  } catch (error) {
    console.error('Error getting plant by ID:', error);
    throw error;
  }
}

async function remove(plantId) {
  try {
    await httpService.delete(`plants/${plantId}`);
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
