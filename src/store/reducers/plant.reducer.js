
const INITIAL_STATE = {
    plants: [],
    filterBy: {
        name: false,
        Home: false,
        Office: false,
        Balcony: false,
        Garden: false,
        difficulty: false,
        lightning: false,
        watering: false,
        priceRange: {
            min: 0,
            max: 1000,
        }
    },
    isChanged: false,
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
        case 'RESET_FILTERS':
            return {
                ...state,
                filterBy: { ...INITIAL_STATE.filterBy },
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