// React Redux and Middleware
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

// Redux-form reducer
import { reducer as formReducer } from 'redux-form';

// StyleSheets
import '../assets/stylesheets/application.scss';

// Reducers
import garageNameReducer from './reducers/garage_name_reducer';
import carsReducer from './reducers/cars_reducer';

// Route Components
import CarsIndex from './containers/cars_index';
import CarsNew from './containers/cars_new';
import CarShow from './containers/car_show';


const reducers = combineReducers({
  garageName: garageNameReducer,
  cars: carsReducer,
  form: formReducer
});

// Set initial State
const initialState = {
  garageName: "Majid's Garage",
  cars: [
    { id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
    { id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
    { id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
    { id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' }
  ]
};

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CarsIndex} />
        <Route path="/cars/new" exact component={CarsNew} />
        <Route path="/car/:id" component={CarShow} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
