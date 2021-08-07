import React from 'react';

const HeadingThree = ({ title, className, color }) => {
  return <h3 className={className} style={{color: color}}>{title}</h3>
}

export default HeadingThree;

