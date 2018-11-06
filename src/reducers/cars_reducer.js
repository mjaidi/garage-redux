import { FETCH_CARS, CAR_CREATED, FETCH_CAR, CAR_DELETED } from '../actions/index';

export default function carsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload;
    case FETCH_CAR:
      return [ action.payload ];
    case CAR_CREATED:
      return state;
    case CAR_DELETED:
      return state;
    default:
      return state;
  }
}
