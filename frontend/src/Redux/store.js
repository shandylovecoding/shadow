import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {authReducer} from "./reducers/authReducer"
import { cardReducer } from './reducers/cardReducer';
import { classroomReducer } from './reducers/classroomReducer';
import { setReducer } from './reducers/setReducer';
import { tagReducer } from './reducers/tagReducer';
import { userReducer } from './reducers/userReducer';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authStore: authReducer,
    cardStore: cardReducer,
    classroomStore: classroomReducer,
    setStore: setReducer,
    tagStore: tagReducer,
    userStore: userReducer
})


const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store  = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);