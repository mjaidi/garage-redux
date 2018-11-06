import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import Aside from '../components/aside';
import { fetchCars } from '../actions/index';

class CarsIndex extends Component {
  componentWillMount() {
    this.props.fetchCars();
  }

  renderCars() {
    return this.props.cars.map((car) => {
      return (
        <Link to={`/car/${car.id}`}>
          <div className="car-smallad" key={car.id}>
            <img className="car-logo" src="../../assets/images/logo_square.svg" alt="" />
            <div className="car-details">
              <span>{car.brand} -  {car.model}</span>
              <ul>
                <li>Owner: <strong>{car.owner}</strong></li>
              </ul>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    if (this.props.cars === []) {
      return (
        <div className="view-container">
          <Aside garageName={this.props.garageName} >
            <Link to="/cars/new">
              Add a Car
            </Link>
          </Aside>
          <div className="no-car">There are no cars yet</div>
        </div>
      );
    }

    return (
      <div className="view-container">
        <Aside garageName={this.props.garageName} >
          <Link to="/cars/new">
              Add a Car
            </Link>
          </Aside>
        <div className="list-container">
          {this.renderCars()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garageName: state.garageName,
    cars: state.cars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCars },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
