import { plantService } from "../../services/plant.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function getActionRemovePlant(plantId) {
  return {
    type: 'REMOVE_PLANT',
    plantId: plantId,
  }
}

export function getActionAddPlant(plant) {
  console.log(plant)
  return {
    type: 'ADD_PLANT',
    plant,
  }
}

export function getActionUpdatePlant(plant) {
  console.log(plant)
  return {
    type: 'UPDATE_PLANT',
    plant,
  }
}

export function resetFilters() {
  return {
    type: 'RESET_FILTERS',
  }
}

export function setChanged(isChanged) {
  return {
    type: 'SET_CHANGED',
    isChanged,
  }
}

export function loadPlants(filterBy = null) {
  console.log('plant.actions.js: loadPlants(filterBy)', filterBy);
  return async (dispatch, getState) => {
    try {
      const filterByParam = filterBy || getState().plantModule.filterBy;
      console.log(filterByParam)
      let filterQuery = { ...filterByParam }; // Create a new variable to store filtered values
      Object.keys(filterQuery).forEach((key) => {
        if (key !== 'priceRange') {
          const val = filterQuery[key];
          if (!val) {
            delete filterQuery[key]; // Remove key if the value is falsy
          }
        } else {
          const { min, max } = filterQuery.priceRange;
          if (min === 0 && max === 1000) {
            delete filterQuery.priceRange; // Remove priceRange key if min and max are default
          }
        }
      })
      if (Object.keys(filterQuery).length === 0 ) {
        filterQuery = null; // Set filterBy to null if all filters are falsy and priceRange is default
      }
      // console.log(filterQuery)
      const plants = await plantService.query(filterQuery)
      // console.log('plant.actions.js: loadPlants(filterBy) - plants', plants)
      dispatch({ type: 'SET_PLANTS', plants });
      dispatch({ type: 'SET_LOADING', isLoading: false })
    } catch (error) {
      console.error('Error loading plants:', error)
    }
  };
}


export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function removePlant(plantId) {
  console.log('plant.actions.js: removePlant(plantId)', plantId)
  return async (dispatch) => {
    try {
      await plantService.remove(plantId)
      console.log('Deleted Succesfully!')
      showSuccessMsg('Plant removed')
      dispatch(getActionRemovePlant(plantId))
    } catch (err) {
      showErrorMsg('Cannot remove plant')
      console.log('Cannot remove plant', err)
    }
  }
}

export function addPlant(plant) {
  console.log('plant.actions.js: addPlant(plant)', plant)
  return async (dispatch) => {
    try {
      const savedPlant = await plantService.save(plant)
      console.log(savedPlant)
      dispatch(getActionAddPlant(savedPlant))
      showSuccessMsg('plant added')
    } catch (err) {
      showErrorMsg('Cannot add plant')
      console.log('cannot add plant', err)
    }
  }
}

export function updatePlant(plant) {
  console.log('plant.actions.js: updatePlant(plant)', plant)
  return async (dispatch) => {
    try {
      const savedPlant = await plantService.save(plant)
      console.log('Updated plant', savedPlant)
      dispatch(getActionUpdatePlant(savedPlant))
      showSuccessMsg('Plant updated')
    } catch (err) {
      showErrorMsg('Cannot update plant')
      console.log('Cannot update plant', err)
    }
  }
}