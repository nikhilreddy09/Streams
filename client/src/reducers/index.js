import {combineReducers} from 'redux'
//import reducer for forms
import {reducer} from 'redux-form';
import AuthReducer from './AuthReducer'
export default combineReducers({
    auth: AuthReducer,
    form: reducer
})