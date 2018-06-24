import React from 'react';

import classes from './Marker.css';
import Icon from '../Icon/Icon';
import { NavLink } from 'react-router-dom';

const marker = (props) => {

  return (
    <NavLink
      to="/results"
      style={{ color: 'black', textDecoration: 'none' }}
      exact >
      <div className={classes.Marker}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Mid}>
          <div className={classes.Temp}>{props.temp ? `${props.temp}°` : ''}</div>
          <div className={classes.Icon}>
            {
              props.icon ?
                <Icon
                  name={props.icon}
                  color="black"
                  width="24"
                  height="24" />
                : ''
            }
          </div>
        </div>
        <div className={classes.Bottom}>
          <Icon
            name="umbrella"
            color="black"
            width="11"
            height="11" /> {props.precip ? `${props.precip}%` : ''}
        </div>
      </div>
    </NavLink>
  );

}

export default marker;