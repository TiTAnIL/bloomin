import { AccessoryService } from "../../services/accessories.service.js"


export function loadAccessories() {
    return async (dispatch, getState) => {
        const { filterBy } = getState() //.accessoryModule
        const accessories = await AccessoryService.query()
        .then(accessories => {
            dispatch({ type: 'SET_ACCESSORY', accessories })
        })
        .catch(err => {
            console.log('err:', err)
        })
    }
}


export function removeAccessory(accessoryId) {
    return (dispatch, getState) => {
        AccessoryService.remove(accessoryId)
            .then(() => {
                dispatch({ type: 'REMOVE_ACCESSORY', accessoryId })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY_ACCESSORY', filterBy })
    }
}