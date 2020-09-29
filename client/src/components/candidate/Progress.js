import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage , style }) => {
  return (
    <div className='progress' style={{display:style}}>
      <div
        className='progress-bar progress-bar-striped bg-success'
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
