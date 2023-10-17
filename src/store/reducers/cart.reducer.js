const INITIAL_STATE = {
    items: [],
    lastRemovedItem: null,
    isLoading: false
}

export function cartReducer(state = INITIAL_STATE, action) {
    var updatedItem
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                items: action.items
            }
            case 'ADD_TO_CART':
                const existingItem = state.items.find((item) => item._id === action.item._id);
                if (existingItem) {
                  return {
                    ...state,
                    items: state.items.map((item) =>
                      item._id === existingItem._id ? { ...item, quantity: existingItem.quantity } : item
                    ),
                  };
                } else {
                  return {
                    ...state,
                    items: [...state.items, action.item],
                  }
                }
        case 'REMOVE_FROM_CART':
            const lastRemovedStay = state.items.find(
                (item) => item._id === action.itemId
            )
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.itemId)
            }
        case 'UNDO_REMOVE':
            if (state.lastRemovedPlant) {
                return {
                    ...state,
                    items: [...state.items, state.lastRemovedPlant],
                    lastRemovedPlant: null,
                }
            }
            return state;
        case 'UPDATE_ITEM_IN_CART':
            updatedItem = state.items.map((item) =>
                item._id === action.item._id ? action.item : item
            )
            return {
                ...state,
                items: updatedItem
            }
        case 'CLEAR_CART':
            return { ...state, items: [] }
            break
        default:
            return state;
    }
}

