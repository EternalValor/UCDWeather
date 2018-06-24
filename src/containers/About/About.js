import React, { Component } from 'react';
import classes from './About.css';

class About extends Component {
  state = {

  };

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }


  render() {
    return (
      <div className={classes.About} >
        <h3 className={classes.Title}>About Us</h3>
        <div className={classes.Content}>
          UCD Weather was created as a Final Year Project to obtain a Bachelor's Degree from the University of Chouaib Doukkali.
          <br /><br />
          Designer and programmer: Othmane Tayab <br />
          Email: otayab97@gmail.com
          <br /><br />
          Supervisor: Prof. Salwa Belaqeziz
        </div>
      </div>
    )
  }

}

export default About;