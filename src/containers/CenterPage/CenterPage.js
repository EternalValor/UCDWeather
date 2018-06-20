import React, { Component } from 'react';
import classes from './CenterPage.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Auxx from '../../hoc/Auxx/Auxx';

class CenterPage extends Component {

  state = {
    showSideDrawer: false,
    name: 'nothing',
    geoData: {}
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }


  inputChangedHandler = (event) => {
    let updatedInput = this.state.name;
    updatedInput = event.target.value;
    if(event.charCode === 13) {
      this.setState({name: updatedInput});
      event.target.value = '';
      this.props.history.push('/results');
    }
  }

  onGeoLocationUpdateHandler = (data) => {
    this.setState({geoData: data});
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.geoData !== this.state.geoData){
      this.props.updateGeo(nextState.geoData);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.props.updateSearch(nextState.name);
  //   return true;
  // }


  render() {
    return (
        <div className={classes.CenterPage}> 
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: '-1',
          display: this.props.shouldDisplay
        }} ></div>
        <Toolbar 
          drawerToggleClicked={this.drawerToggleHandler} 
          updateName={this.updateNameHandler} 
          changed={this.onGeoLocationUpdateHandler}
          history={this.props.history}
          color={this.props.buttonColor} />

          <SideDrawer 
            closed={this.sideDrawerClosedHandler}
            open={this.state.showSideDrawer} />
          <Auxx>
            {this.props.children} 
          </Auxx>
        </div>
    )
  }

}

export default CenterPage;
