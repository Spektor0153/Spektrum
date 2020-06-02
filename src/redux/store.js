import {createStore} from "redux";
import {rootReducer} from './rootReducer.js'
import {compose, applyMiddleware} from "redux";

import thunkMiddleWare from 'redux-thunk';



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleWare))
    //enhancers
);



export default store;