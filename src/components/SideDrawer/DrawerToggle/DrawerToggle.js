import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
  return (
    <div onClick={props.clicked} className={classes.DrawerToggle} >
      <div className={props.home ? '' : classes.NotHome} ></div>
     </div>
  )
}

export default drawerToggle;