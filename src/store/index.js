
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { plantReducer } from './reducers/plant.reducer'
import { userReducer } from './reducers/user.reducer'
import { vaseReducer } from './reducers/vase.reducer'
import { accessoryReducer } from './reducers/accessory.reducer'
import { cartReducer } from './reducers/cart.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    cartModule: cartReducer,
    plantModule: plantReducer,
    vaseModule: vaseReducer,
    accessoryModule: accessoryReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.gStore = store