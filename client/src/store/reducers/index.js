
import { combineReducers } from 'redux';

import error from './error';
import cvData from './cvData';
import auth from './auth';

export default combineReducers({
  error,
  cvData,
  auth


});