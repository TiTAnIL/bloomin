import { vaseService } from "../../services/vase.service"



export function loadVases() {
    return async (dispatch, getState) => {
        const { filterBy } = getState() //.accessoryModule
        const vases = await vaseService.query()
        .then(vases => {
            dispatch({ type: 'SET_VASE', vases })
        })
        .catch(err => {
            console.log('err:', err)
        })
    }
}


export function removeVase(vaseId) {
    // return (dispatch, getState) => {
    //     vaseService.remove(vaseId)
    //         .then(() => {
    //             dispatch({ type: 'REMOVE_ROBOT', vaseId })
    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //         })
    // }
    console.log('removeVase')
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY_VASE', filterBy })
    }
}