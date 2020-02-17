import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import {bookingRelated} from './bookingRelated';

const rootReducer = combineReducers({
  authentication,
  registration,
  bookingRelated
});

export default rootReducer;