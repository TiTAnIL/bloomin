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

export function loadPlants(filterBy = null) {
  console.log(
    'plant.actions.js: loadPlants(filterBy)', filterBy
  )
  return async (dispatch, getState) => {
    // const { filterBy } = getState().plantModule
    const plants = await plantService.query(filterBy)
    dispatch({ type: 'SET_PLANTS', plants })
    dispatch({ type: 'SET_LOADING', isLoading: false })
  }
}

export function setFilterBy(filterBy) {
  console.log('plant.actions.js: setFilterBy(filterBy)', filterBy)
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