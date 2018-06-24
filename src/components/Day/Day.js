import React from 'react';

import classes from './Day.css';
import Icon from '../Icon/Icon';
import Triangle from '../Triangle/Triangle';

const day = (props) => {
  return (
    <div className={classes.Day}>
      <div className={classes.Date}>{props.date}</div>
      <Icon
        name={props.icon}
        color="white"
        width="81"
        height="81" />
      <div className={classes.Summary}>{props.summary}</div>
      <div className={classes.HighLow}>
        <div className={classes.Low}><Triangle rotate="180" /> {`${props.low}°C`}</div>
        <div className={classes.High}><Triangle /> {`${props.high}°C`}</div>
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Precip}>
          <Icon
            name="umbrella"
            color="white"
            width="14"
            height="14" /> {!props.precip ? '0' : props.precip}%
        </div>
        <div className={classes.Wind}>
          <Icon
            name="wind"
            color="white"
            width="14"
            height="14" /> {props.wind} km/h
        </div>
      </div>
    </div>
  )
}

export default day;