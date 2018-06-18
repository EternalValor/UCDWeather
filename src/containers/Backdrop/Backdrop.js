import React, { Component } from 'react';
import classes from './Backdrop.css';

class Backdrop extends Component {
  state = {

  }

  render() {
    return (
      <div className={classes.Backdrop} style={{backgroundImage: this.props.color}}> {this.props.children} </div>
    )
  }
}

export default Backdrop;