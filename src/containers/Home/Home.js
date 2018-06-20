import React, {Component} from 'react';
import classes from './Home.css';
import CallToAction from '../../components/CallToAction/CallToAction';

import { NavLink } from 'react-router-dom';

class Home extends Component {
  state = {

  }

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  render() {
    
    return (
      <div className={classes.Home} >
        <h1 className={classes.Header} >Welcome to UCD Weather</h1>
        <h2>Authentic Weather Reports</h2>
        <ul className={classes.ButtonContainer} >
          <li><CallToAction name="Use Your Location" /></li>

          <NavLink 
            to="/maps"
            exact >
            <li style={{margin: 0}} ><CallToAction name="Weather Map" /></li>
          </NavLink>
          
        </ul>
      </div>
    )
  }

}

export default Home;