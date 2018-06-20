import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import CenterPage from './containers/CenterPage/CenterPage';
import Backdrop from './containers/Backdrop/Backdrop';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Results from './containers/Results/Results';
import Maps from './containers/Maps/Maps';

class App extends Component {

  state = {
    currentPage: '',
    search: '',
    backColors: {
      home: 'linear-gradient(to left bottom, #ffc88a, #dfab78, #bf9067, #9f7656, #805d45)',
      about: 'linear-gradient(to left bottom, #8ab9ff, #78a1de, #668abe, #55739e, #455d80)'
    },
    historyData: {},
    geoData: '',
    oldGeoData: '',
    weatherData: {
      currently: {
        time: 0
      }
    },
    loading: true
  }

  // updateSearchHandler = (newSearch) => {
  //   if(this.state.search !== newSearch) { 
  //     this.setState({search: newSearch});
  //   }
  // }

    getWeatherData = () => {
      console.log("starting fetch.");
      fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/705db75b1f2da0d706739510f0b5ef12/" + this.state.geoData.location.lat 
        + "," + this.state.geoData.location.lng + "?units=si&exclude=minutely,alerts,flags")
        .then(response => response.json())
        .then(data => {
          if(!this.state.loading) this.setState({loading: true});
          if(this.state.weatherData.currently.time !== data.currently.time) this.setState({weatherData: data});
        });
        console.log("finished fetch");
    }

    updateGeoDataHandler = (newData) => {
      if(this.state.geoData !== newData) {
        this.setState({oldGeoData: this.state.geoData});
        this.setState({geoData: newData});
      }
    }

  updatePageHandler = (page, historyData) => {
    if(this.state.currentPage !== page) this.setState({currentPage: page});
    if(this.state.historyData !== historyData) this.setState({historyData: historyData});
    
  }

  stopLoadingHandler = (bool) => {
    if(this.state.loading !== bool) this.setState({loading: bool});
  }



  render() {
    let backColor = this.state.backColors.home;
    switch(this.state.currentPage) {
      case '/':
        backColor = this.state.backColors.home;
        break;
      case '/about':
        backColor = this.state.backColors.about;
        break;
      case '/results':
        if(this.state.weatherData.currently.time !== 0) {
          switch (this.state.weatherData.currently.icon) {
            case 'clear-night':
              backColor = this.state.backColors.about;
              break;
            default:
              backColor = this.state.backColors.home;
              break;
          }
        }
        break;
      default:
        backColor = this.state.backColors.home;
    }

    
    if(this.state.oldGeoData !== this.state.geoData) {
      this.getWeatherData();
    }
    console.log("[App GeoData]", this.state.geoData);
    console.log("[APP WEATHER DATA]", this.state.weatherData);
    

    return (
      <Backdrop color={backColor} >
        <CenterPage 
          home={this.state.atHome} 
          history={this.state.historyData.history} 
          updateGeo={this.updateGeoDataHandler}>
          <Switch>
            <Route 
                path="/maps" 
                render={(props) => <Maps {...props}  updatePage={this.updatePageHandler}
                updateGeo={this.updateGeoDataHandler}
                weatherData={this.state.weatherData} />} />
            <Route 
              path="/results" 
              render={(props) => <Results {...props}  updatePage={this.updatePageHandler}
              weatherData={this.state.weatherData} 
              loading={this.state.loading} 
              stop={this.stopLoadingHandler}
              title={`${this.state.geoData.city}, ${this.state.geoData.country}`} />} />
            <Route 
              path="/about" 
              render={(props) => <About {...props}  updatePage={this.updatePageHandler} />} />
            <Route 
              path="/" 
              render={(props) => <Home {...props}  updatePage={this.updatePageHandler}  />} />
          </Switch>
        </CenterPage>
      </Backdrop>
    );
  }
}

export default App;
