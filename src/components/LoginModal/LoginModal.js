import React, { Component } from 'react';
import fire from '../../config/Fire';

import classes from './LoginModal.css';
import Auxx from '../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';
import Icon from '../Icon/Icon';

class LoginModal extends Component {

  state = {
    email: '',
    password: '',
    signup: false,
    error: false,
    errorMessage: null,
    database: fire.database(),
    favorites: {}
  }

  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(u => {

    }).catch(error => {
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });

    }).then(() => {
      if (!this.state.error) {
        this.setState({ errorMessage: null });
        this.props.closed();
      } else {
        this.setState({ error: false });
      }
    });
    this.setState({ email: '', password: '' });
  }

  signup = (e) => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({ error: true });
        this.setState({ errorMessage: error.message });

      }).then(() => {
        if (!this.state.error) {
          this.setState({ errorMessage: null });
          this.props.closed();
        } else {
          this.setState({ error: false });
        }
      });
    this.setState({ email: '', password: '' });
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  signupToggleHandler = (event) => {
    event.preventDefault();
    let prevSignup = this.state.signup;
    this.setState({ signup: !prevSignup });
  }




  render() {


    let attachedClasses = [classes.LoginModal, classes.Close];
    if (this.props.open) {
      attachedClasses = [classes.LoginModal, classes.Open];
    }

    const user = document.getElementsByClassName(classes.Username);
    if (user[0]) user[0].placeholder = 'Email';
    const pass = document.getElementsByClassName(classes.Password);
    if (pass[0]) pass[0].placeholder = 'Password';

    return (
      <Auxx>
        <Backdrop show={this.props.open} clicked={this.props.closed} className={classes.Backdrop} />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Login}>{this.state.signup ? 'SIGNUP' : 'LOGIN'}</div>
          <form className={classes.Form} >
            <label className={classes.UsernameIcon} >
              <Icon
                name="account"
                color="#707070"
                width="28"
                height="28" />
            </label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className={classes.Username} />

            <label className={classes.PasswordIcon} >
              <Icon
                name="key"
                color="#707070"
                width="28"
                height="28" />
            </label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className={classes.Password} />

            {
              !this.state.signup ?
                (
                  <Auxx>
                    <button type="submit" onClick={this.login} className={classes.LoginButton} >
                      LOG IN
                  </button>
                    <button onClick={this.signupToggleHandler} className={classes.SignupButton} >
                      SIGN UP
                  </button>
                  </Auxx>
                ) :
                (
                  <Auxx>
                    <button type="submit" onClick={this.signup} className={classes.LoginButton} >
                      SIGN UP
                  </button>
                    <button onClick={this.signupToggleHandler} className={classes.SignupButton} >
                      LOG IN
                  </button>
                  </Auxx>
                )
            }

            {
              this.state.errorMessage ?
                (
                  <span className={classes.ErrorMessage}>{this.state.errorMessage}</span>
                ) : null
            }

          </form>

        </div>
      </Auxx>

    )
  }


}

export default LoginModal;