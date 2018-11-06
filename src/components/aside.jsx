import React from 'react';
import { Link } from 'react-router-dom';

const Aside = (props) => {
  return (
    <div className="aside">
      <div className="illustration" style={{ backgroundImage: `url("../../assets/images/mechanic.jpg")` }}></div>
      <img className="logo" src="../../assets/images/logo.svg" alt="" />
      <h1>{props.garageName}</h1>
      <p>Our garage is the best, reasonable prices, always on time, we are the best (and fictional)</p>
      {props.children}
    </div>
  );
}

export default Aside;
