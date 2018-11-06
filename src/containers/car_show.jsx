import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import Aside from '../components/aside';
import { fetchCar, deleteCar } from '../actions/index';

class CarShow extends Component {
  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleClick = () => {
    this.props.deleteCar(this.props.match.params.id, (car) => {
      this.props.history.push('/'); // Navigate home after submit
      return car;
    });
  }

  renderCar(car) {
    return (
      <div className="car-card" key={car.id}>
        <img className="car-picture" src="../../assets/images/logo_square.svg" alt="" />
        <div className="car-details">
          <span>{car.brand} -  {car.model}</span>
          <ul>
            <li>Owner: <strong>{car.owner}</strong></li>
          </ul>
          <div className="plate">{car.plate}</div>
        </div>
        <button className="delete" onClick={this.handleClick}>Delete </button>
      </div>
    );
  }

  render() {
    if (!this.props.car) {
      return <p>Loading...</p>;
    }

    return (
      <div className="view-container">
        <Aside garageName={this.props.garageName} >
          <Link to="/">
            Back to List
          </Link>
        </Aside>
        <div className="car-container">
          {this.renderCar(this.props.car)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const garageName = state.garageName;
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const car = state.cars.find(c => c.id === idFromUrl);
  return { car, garageName };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCar, deleteCar },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow);
