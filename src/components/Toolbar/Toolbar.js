import React from 'react';
import classes from './Toolbar.css';
import Button from '../Button/Button';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Icon from '../Icon/Icon';
import { NavLink } from 'react-router-dom';
import Input from '../../components/simpleinput/simpleinput';
import fire from '../../config/Fire';

const toolbar = (props) => {

  let home;

  if (window.location.pathname !== '/') {
    home = false;
  } else {
    home = true;
  }

  let currentClass = classes.Toolbar;

  if (!home) {
    currentClass = classes.WhiteToolbar;
  } else {
    currentClass = classes.Toolbar;
  }

  const logoutHandler = () => {
    fire.auth().signOut();
  }

  return (
    <div className={currentClass} >
      <DrawerToggle home={home} clicked={props.drawerToggleClicked} />
      <NavLink
        to="/"
        exact>
        <span style={{ color: home ? 'white' : '#707070' }} className={classes.Logo}>UCD Weather</span>
      </NavLink>
      {/* <input className={classes.Searchbar} type="text" name="search" placeholder="Search" onKeyPress={props.changed} /> */}
      <Input history={props.history} changed={props.changed} />
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
            color={props.color} />
        </li>

        {
          props.user ?
            (
              <li>
                <Button
                  name="LOGOUT"
                  color={props.color}
                  clicked={logoutHandler} />
              </li>
            ) :
            (
              <li>
                <Button
                  name="LOGIN"
                  color={props.color}
                  clicked={props.loginToggleClicked} />
              </li>
            )
        }

      </ul>

    </div>
  )
}

export default toolbar;