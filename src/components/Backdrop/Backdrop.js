import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => {
  let attachedClasses = [classes.Backdrop];

  props.className ? attachedClasses = [classes.Backdrop, props.className] : attachedClasses = [classes.Backdrop];

  return props.show ? <div className={attachedClasses.join(' ')} onClick={props.clicked}></div> : null

}

export default backdrop;