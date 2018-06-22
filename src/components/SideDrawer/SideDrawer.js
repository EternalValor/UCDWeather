import React from 'react';
import fire from '../../config/Fire';

import classes from './SideDrawer.css';
import Auxx from '../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';
import Icon from '../Icon/Icon';
import { NavLink } from 'react-router-dom';

const sideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  const logoutHandler = () => {
    fire.auth().signOut();
    props.closed();
  }

  return (
    <Auxx>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.BackButton} onClick={props.closed} >
          <div></div>
        </div>
        <h3 className={classes.Title} >Menu</h3>
        <hr className={classes.TitleLine} />
        <div className={classes.Username} >{props.user ?
          props.user.email ?
          (<Auxx>
            <span style={{ background: '#2cff2c' }}></span>
            {props.user.email.substr(0, props.user.email.indexOf('@'))}
          </Auxx>) : null 
          :
          (<Auxx>
            <span style={{ background: '#ff3333' }}></span> Offline
          </Auxx>)
        }
        </div>
        <ul className={classes.List} >
          {
            !props.user ?
              (
                <li onClick={props.loginToggleClicked} style={{ cursor: 'pointer' }} >
                  <Icon
                    name="account"
                    color="#707070"
                    width="24"
                    height="24" />
                  <span>Login</span>
                </li>
              ) :
              (
                <li onClick={logoutHandler} style={{ cursor: 'pointer' }} >
                  <Icon
                    name="logout"
                    color="#707070"
                    width="24"
                    height="24" />
                  <span>Log out</span>
                </li>
              )
          }

          <NavLink
            to="/maps"
            exact
            style={{ color: 'transparent' }} >
            <li onClick={props.closed}>
              <Icon
                name="map-marker"
                color="#707070"
                width="24"
                height="24" />
              <span>Maps</span>
            </li>
          </NavLink>

          {
            props.user ?
              (
                <NavLink
                  to="/favorites"
                  exact
                  style={{ color: 'transparent' }} >
                  <li onClick={props.closed}>
                    <Icon
                      name="heart"
                      color="#707070"
                      width="24"
                      height="24" />
                    <span>Favorites</span>
                  </li>
                </NavLink>
              ) :
              null
          }

          {/* <li>
            <Icon 
                name="heart"
                color="#707070"
                width="24"
                height="24" />
                <span>Favorites</span>
            </li> */}


          <NavLink
            to="/"
            exact
            style={{ color: 'transparent' }} >
            <li onClick={props.closed}>
              <Icon
                name="home"
                color="#707070"
                width="24"
                height="24" />
              <span>Home</span>
            </li>
          </NavLink>

          <NavLink
            to="/about"
            exact
            style={{ color: 'transparent' }} >
            <li onClick={props.closed}>
              <Icon
                name="information"
                color="#707070"
                width="24"
                height="24" />
              <span>About</span>
            </li>
          </NavLink>

        </ul>
      </div>

    </Auxx>
  );
}

export default sideDrawer;