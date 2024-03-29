import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Reducers/RootReducer';
import thunk from 'redux-thunk';


const middleware = [thunk];

const initialState = {};
const store = createStore(rootReducer,
    initialState, 
    compose (applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));



export default store;