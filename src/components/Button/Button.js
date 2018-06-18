import React from 'react';
import classes from './Button.css';
import {NavLink} from 'react-router-dom';

const button = (props) => {
  return (
    <NavLink
      to={props.link}
      exact={props.exact}
       >
      <button 
        className={classes.Button} 
        style={{color: props.color}}>{props.name}</button>
    </NavLink>
  )
}

export default button;