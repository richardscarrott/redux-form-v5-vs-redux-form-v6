import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import posts from './posts';

const rootReducer = combineReducers({
    posts,
    routing: routerReducer,
    form: formReducer
});

export default rootReducer;
