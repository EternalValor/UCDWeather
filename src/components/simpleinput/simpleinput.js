import React, { Component } from 'react';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import classes from './simpleinput.css';

const SimpleInput = createGeoInput(DefaultGeoInput);

class Example extends Component {
  state = {
    address: '',
    geoDestination: '',
  }
  onAddressChange = value => this.setState({ address: value })
  onGeoDestinationChange = value => this.setState({ geoDestination: value })

  componentWillUpdate(nextProps, nextState) {
    if(nextState.geoDestination !== this.state.geoDestination){
      this.props.changed(nextState.geoDestination);
      this.props.history.push('/results');
    }
  }

  render() {
    
    const inp = document.getElementsByClassName('react-geoinput___GeoAddressInput__predictiveInput react-geoinput___PredictiveInput__input');
    if(inp[0]) inp[0].setAttribute("placeholder", "Search");
    return (

      <div>
        <SimpleInput
          addressInput={{
            onChange: this.onAddressChange,
            value: this.state.address,
          }}
          geoDestinationInput={{
            onChange: this.onGeoDestinationChange,
            value: this.state.geoDestination,
          }}
          className={classes.SimpleInput}
          geoDestinationClassName={classes.geo}
          loadingElement={null}
        />
      </div>
    );
  }
}
 
export default Example;