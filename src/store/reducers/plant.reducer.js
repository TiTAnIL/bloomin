
const INITIAL_STATE = {
    plants: [],
    filterBy: {},
    isLoading: true
}


export function plantReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_PLANTS':
            return {
                ...state,
                plants: action.plants
            }

        case 'ADD_PLANT':
            return {
                ...state,
                plants: [...state.plants, action.plant]
            }

        case 'REMOVE_PLANT':
            return {
                ...state,
                plants: state.plants.filter(plant => plant._id !== action.plantId)
            }

        case 'UPDATE_PLANT':
            return {
                ...state,
                plants: state.plants.map(plant => plant._id === action.plant._id ? action.plant : plant)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            break
        default:
            return state;
    }
}