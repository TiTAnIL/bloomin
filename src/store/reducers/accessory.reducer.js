
const INITIAL_STATE = {
    accessories: null,
    filterBy: null,
    isLoading: true
}


// action = {type: SET_accessories, accessories: [...]}
export function accessoryReducer(state = INITIAL_STATE, action) {

    // var accessories

    switch (action.type) {
        case 'SET_ACCESSORY':
            return {
                ...state,
                accessories: action.accessories
            }

        case 'ADD_ACCESSORY':
            return {
                ...state,
                accessories: [...state.accessories, action.accessory]
            }

        case 'REMOVE_ACCESSORY':
            return {
                ...state,
                accessories: state.accessories.filter(accessory => accessory._id !== action.plantId)
            }

        case 'UPDATE_ACCESSORY':
            return {
                ...state,
                accessories: state.accessories.map(accessory => accessory._id === action.accessory._id ? action.accessory : accessory)
            }

        case 'SET_FILTER_BY_ACCESSORY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state;
    }
}