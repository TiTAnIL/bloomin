import { httpService } from './http.service';

async function query(filterBy) {
  console.log('calling plant query frontend', typeof(filterBy), filterBy)
  try {
    if (filterBy === null) {
      console.log('query no filterBy')
      return await httpService.get(`plants`)
    } else {
      console.log('query filterBy', filterBy)
      const queryString = Object.keys(filterBy)
        .map((key) => `${key}=${encodeURIComponent(filterBy[key])}`)
        .join('&')
      return await httpService.get(`plants/categories?${queryString}`)
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
