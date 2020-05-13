import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import {bookingRelated} from './bookingRelated';
import {pharmacyRelated} from './pharmacyRelated';

const rootReducer = combineReducers({
  authentication,
  registration,
  bookingRelated,
  pharmacyRelated
});

export default rootReducer;