import React from 'react';
import classes from './Toolbar.css';
import Button from '../Button/Button';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Icon from '../Icon/Icon';
import {NavLink} from 'react-router-dom';

const toolbar = (props) => {

  let home;

  const colors = {
    blue: '#5F88F9'
  }

  if(window.location.pathname !== '/'){
    home = false;
  } else {
    home = true;
  }

  let currentClass = classes.Toolbar;

  if(!home) {
    currentClass = classes.WhiteToolbar;
  } else {
    currentClass = classes.Toolbar;
  }

  return (
    <div className={currentClass} >
    <DrawerToggle home={home} clicked={props.drawerToggleClicked}/>
    <NavLink
      to="/"
      exact>
     <span style={{color: home ? 'white' : '#707070'}} className={classes.Logo}>UCD Weather</span>
    </NavLink>
     <input className={classes.Searchbar} type="text" name="search" placeholder="Search" onKeyPress={props.changed} />
     <Icon 
      name="magnify"
      color="#707070"
      height="32"
      width="32"
      className={classes.SearchIcon} />
     <ul>
       <li>
         <Button 
          link='/about'
          exact
          name="ABOUT" 
          color= {home ? 'white' : colors.blue} />
       </li>
       <li>
        <Button 
          link='/'
          name="LOGIN" 
          color= {home ? 'white' : colors.blue} />
       </li>
     </ul>
     
    </div>
  )
}

export default toolbar;