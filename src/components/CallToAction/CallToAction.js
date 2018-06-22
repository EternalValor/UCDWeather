import React from 'react';
import classes from './CallToAction.css';


const callToAction = (props) => {
  return (
    <div 
      className={classes.Button} 
      style={{color: props.color, backGround: props.background}}
      onClick={props.clicked} >
      {props.name}
    </div>
  )
}

export default callToAction;