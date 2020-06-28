import { combineReducers } from 'redux';
import juniper from './juniper';
import score from './score';

export default combineReducers({
    juniper : juniper,
    score : score
});