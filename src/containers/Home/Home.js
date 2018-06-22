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

  clickedHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
     
      const geodata = {
        city: 'Home',
        country: '',
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
      this.props.updateGeo(geodata);
      this.props.history.push('/results');
    });
  }

  render() {
    
    return (
      <div className={classes.Home} >
        <h1 className={classes.Header} >Welcome to UCD Weather</h1>
        <h2>Authentic Weather Reports</h2>
        <ul className={classes.ButtonContainer} >
          <li><CallToAction 
                  name="Use Your Location" 
                  clicked={this.clickedHandler}/></li>

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