import React from 'react';
import classes from './Button.css';
import {NavLink} from 'react-router-dom';

const button = (props) => {

  let render;

  props.link ? 
    render = (
      <NavLink
      to={props.link}
      exact={props.exact}
       >
      <button 
        className={classes.Button} 
        style={{color: props.color}}
        onClick={props.clicked}>{props.name}</button>
    </NavLink>
    ) :
    render = (
      <button 
          className={classes.Button} 
          style={{color: props.color}}
          onClick={props.clicked}>{props.name}</button>
    )


  return render;
}

export default button;