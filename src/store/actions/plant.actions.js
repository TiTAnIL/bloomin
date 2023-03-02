import { plantService } from "../../services/plant.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function getActionRemovePlant(plantId) {
  return {
    type: 'REMOVE_PLANT',
    plantId: plantId,
  }
}

export function getActionAddPlant(plant) {
  return {
    type: 'ADD_PLANT',
    plant,
  }
}

export function getActionUpdatePlant(plant) {
  return {
    type: 'UPDATE_PLANT',
    plant,
  }
}

export function loadPlants() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().plantModule
    const plants = await plantService.query(filterBy)
    dispatch({ type: 'SET_PLANTS', plants })
    dispatch({ type: 'SET_LOADING', isLoading: false })
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function removePlant(plantId) {
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
  return async (dispatch) => {
    try {
      const savedPlant = await plantService.save(plant)
      dispatch(getActionAddPlant(savedPlant))
      showSuccessMsg('plant added')
    } catch (err) {
      showErrorMsg('Cannot add plant')
      console.log('cannot add plant', err)
    }
  }
}

export function updatePlant(plant) {
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

