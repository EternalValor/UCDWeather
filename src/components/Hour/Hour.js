import React from 'react';

import classes from './Hour.css';
import Icon from '../Icon/Icon';

const hour = (props) => {
  return (
    <div className={props.className} >
      <Icon 
        name={props.icon}
        color="white"
        width="24"
        height="24" />
        <div className={classes.Temp}>{ `${props.temp}°` }</div>
        <div className={classes.Summary}>{ props.summary }</div>
        <div className={classes.Precip}>
          <Icon 
            name="umbrella"
            color="white"
            width="14"
            height="14" /> { `${props.precip}%` }
        </div>
        <div className={classes.Wind}>
          <Icon 
            name="wind"
            color="white"
            width="14"
            height="14" /> { `${props.wind} km/h` }
        </div>
        <div className={classes.Time}> { `${props.time}` }</div>
    </div>
  )
}


export default hour;