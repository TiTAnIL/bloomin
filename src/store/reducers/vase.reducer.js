
const INITIAL_STATE = {
    vases: null,
    filterBy: null,
    isLoading: true
}


// action = {type: SET_accessories, vases: [...]}
export function vaseReducer(state = INITIAL_STATE, action) {

    // var vases

    switch (action.type) {
        case 'SET_VASE':
            return {
                ...state,
                vases: action.vases
            }

        case 'ADD_VASE':
            return {
                ...state,
                vases: [...state.vases, action.vase]
            }

        case 'REMOVE_VASE':
            return {
                ...state,
                vases: state.vases.filter(vase => vase._id !== action.plantId)
            }

        case 'UPDATE_VASE':
            return {
                ...state,
                vases: state.vases.map(vase => vase._id === action.vase._id ? action.vase : vase)
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

        default:
            return state;
    }
}