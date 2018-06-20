import React from 'react';
import classes from './Triangle.css';

const triangle = (props) => {

  return (
    <div className={classes.Triangle} style={{transform: `rotate(${props.rotate}deg)`}} >
      <div></div>
    </div>
  );

}

export default triangle;