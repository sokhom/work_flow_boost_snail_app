import {compose, applyMiddleware, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { processColor } from 'react-native'
import customer from './reducers/Customer'
import item from './reducers/Item'
import category from './reducers/Category'

const reducer = combineReducers({
    customer: customer,
    item: item,
    category: category
})

const persistConfig = {
    key: 'root',
    storage: storage
}

const middlewares = [thunk]
// const { logger } = require(`redux-logger`)
// middlewares.push(logger);

export default function configureStore() {
    const enhancer = compose(applyMiddleware(...middlewares));
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(persistedReducer, enhancer);
    const persistor = persistStore(store);
    return { store, persistor };
}