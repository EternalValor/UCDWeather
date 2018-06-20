import React, { Component } from 'react';

import classes from './Maps.css';
import GoogleMapReact from 'google-map-react';
import Marker from '../../components/Marker/Marker';

class Maps extends Component {

  state = {
    center: {
      lat: 33.5731,
      lng: -7.5898
    },
    clickLocation: {
      lat: '',
      lng: ''
    },
    geoData: {
      city: '',
      county: '',
      location: {
        lat: '',
        lng: ''
      }
    }
  }


  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  componentDidMount() {
    console.log("[COMPONENT MOUNT]")
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.geoData !== this.state.geoData) {
      this.props.updateGeo(nextState.geoData);
    }
  }

  changeGeoStateHandler = (newGeo) => {
    if (newGeo !== this.state.geoData) this.setState({ geoData: newGeo });
  }

  onMapClickHandler(event) {
    console.log(event);
    this.setState({
      clickLocation: {
        lat: event.lat,
        lng: event.lng
      }
    })

  }


  render() {

    let newGeo = {
      city: '',
      country: '',
      location: {
        lat: '',
        lng: ''
      }
    }

    const func = (lat, lng) => {
      const mapDiv = document.getElementById("map");
      let map = new window.google.maps.Map(mapDiv);
      let geocoder = new window.google.maps.Geocoder();
      geocodeLatLng(geocoder, map, lat, lng);
    }


    const geocodeLatLng = (geocoder, map, lat, lng) => {
      var latlng = { lat: lat, lng: lng };
      console.log(latlng);
      let city;
      let country;
      newGeo.location.lat = lat;
      newGeo.location.lng = lng;
      let that = this;

      geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            for (let i = 0; i < results[1].address_components.length; i++) {
              if (!parseInt(results[1].address_components[i].long_name, 10)) {
                console.log("CITY NAME: " + results[1].address_components[i].long_name);
                city = results[1].address_components[i].long_name;
                newGeo.city = city;
                break;
              }
            }
            for (let i = results[1].address_components.length - 1; i >= 0; i--) {
              if (!parseInt(results[1].address_components[i].long_name, 10)) {
                console.log("COUNTRY NAME: " + results[1].address_components[i].long_name);
                country = results[1].address_components[i].long_name;
                newGeo.country = country;
                console.log("[INSIDE THE GEOCODE FUNC]", newGeo);
                that.changeGeoStateHandler(newGeo);
                break;
              }
            }
            console.log(results);
            return newGeo;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    let marker = <Marker lat={this.state.clickLocation.lat} lng={this.state.clickLocation.lng} title="loading" />

    if (this.props.weatherData.currently.time) {
      marker = <Marker
        lat={this.state.clickLocation.lat}
        lng={this.state.clickLocation.lng}
        title={this.state.geoData.city}
        temp={this.props.weatherData.currently.temperature.toFixed()}
        icon={this.props.weatherData.currently.icon}
        precip={(this.props.weatherData.currently.precipProbability * 100).toFixed()} />
    }

    return (
      <div className={classes.Maps}>
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={7}
          onClick={(event) => {
            this.onMapClickHandler(event);
            console.log("[LATITUDE]", event.lat);
            document.getElementById("map") ?
              func(event.lat, event.lng)
              : console.log("still nothing!!!!!");
          }} >

          {marker}

        </GoogleMapReact>
        <span id="map"></span>
      </div>

    );
  }

}

export default Maps;