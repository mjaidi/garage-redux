import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// import { bindActionCreators } from 'redux';
import Aside from '../components/aside';

import { createCar } from '../actions';

const required = value => value ? undefined : 'Required';
const plate = value => value && !/^[0-9A-Z]{3}\-[0-9A-Z]{4}$/.test(value) ? 'Invalid plate' : undefined;

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, (car) => {
      this.props.history.push('/'); // Navigate home after submit
      return car;
    });
  }

  renderField({label, type, placeholder, input, meta: { touched, error, warning }}) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          {...input}
        />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }

  render() {
    return (
      <div className="view-container">
        <Aside garageName={this.props.garageName} >
          <Link to="/">
            Back to List
          </Link>
        </Aside>
        <div className="form-container" style={{ backgroundImage: "url(../../assets/images/form.jpg)" }}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
            <Field
              label="Brand"
              name="brand"
              type="text"
              placeholder="Aston Martin"
              component={this.renderField}
              validate={required}
            />
            <Field
              label="Model"
              name="model"
              type="text"
              placeholder="DB Mark III"
              component={this.renderField}
              validate={required}
            />
            <Field
              label="Owner"
              name="owner"
              type="text"
              placeholder="James Bond"
              component={this.renderField}
              validate={required}
            />
            <Field
              label="Plate"
              name="plate"
              type="text"
              placeholder="EGU-503H"
              component={this.renderField}
              validate={[plate, required ]}
            />
            <button type="submit" disabled={this.props.pristine || this.props.submitting}>
              Create Car
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garageName: state.garageName,
  };
}

export default reduxForm({ form: 'newCarForm' })(connect(mapStateToProps, { createCar })(CarsNew));
