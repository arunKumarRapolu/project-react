import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import {bookingRelated} from './bookingRelated';
import {pharmacyRelated} from './pharmacyRelated';
import {productRelated} from './productRelated';
import {doctorRelated} from './doctorRelated';
import {loader} from './loader';

const rootReducer = combineReducers({
  authentication,
  registration,
  bookingRelated,
  pharmacyRelated,
  loader,
  productRelated,
  doctorRelated
});

export default rootReducer;