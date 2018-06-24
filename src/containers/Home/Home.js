import React, { Component } from 'react';
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
      this.func(position.coords.latitude, position.coords.longitude, geodata);
      this.props.history.push('/results');
    });
  }

  func = (lat, lng, geodata) => {
    const mapDiv = document.getElementById("maper");
    let map = new window.google.maps.Map(mapDiv);
    let geocoder = new window.google.maps.Geocoder();
    this.geocodeLatLng(geocoder, map, lat, lng, geodata);
  }


  geocodeLatLng = (geocoder, map, lat, lng, geodata) => {
    var latlng = { lat: lat, lng: lng };
    let city;
    let country;
    geodata.location.lat = lat;
    geodata.location.lng = lng;
    let that = this;

    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          for (let i = 0; i < results[1].address_components.length; i++) {
            if (!parseInt(results[1].address_components[i].long_name, 10)) {

              city = results[1].address_components[i].long_name;
              geodata.city = city;
              break;
            }
          }
          for (let i = results[1].address_components.length - 1; i >= 0; i--) {
            if (!parseInt(results[1].address_components[i].long_name, 10)) {

              country = results[1].address_components[i].long_name;
              geodata.country = country;
              that.props.updateGeo(geodata);
              break;
            }
          }
          return geodata;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  render() {

    return (
      <div className={classes.Home} >
      <span id="maper"></span>
        <h1 className={classes.Header} >Welcome to UCD Weather</h1>
        <h2>Authentic Weather Reports</h2>
        <ul className={classes.ButtonContainer} >
          <li><CallToAction
            name="Use Your Location"
            clicked={this.clickedHandler} /></li>

          <NavLink
            to="/maps"
            exact >
            <li style={{ margin: 0 }} ><CallToAction name="Weather Map" /></li>
          </NavLink>

        </ul>
      </div>
    )
  }

}

export default Home;