import React from 'react';
import './stats.css';

const Stats = () => {
  return (
    <div className="stats-container">
      <div className="stat">
        <span className="number">2+</span>
        <span className="label ml-2">Years</span>
      </div>
      <div className="stat">
        <span className="number">20+</span>
        <span className="label ml-2">Employees</span>
      </div>
      <div className="stat">
        <span className="number">200+ </span>
        <span className="label ml-2">Satisfied Customers</span>
      </div>
      <div className="stat">
        <span className="number">100+</span>
        <span className="label ml-2">Reviews</span>
      </div>
    </div>
  );
};

export default Stats;