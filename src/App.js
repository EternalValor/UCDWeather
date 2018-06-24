import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CenterPage from './containers/CenterPage/CenterPage';
import Backdrop from './containers/Backdrop/Backdrop';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Results from './containers/Results/Results';
import Maps from './containers/Maps/Maps';
import Favorites from './containers/Favorites/Favorites';
import classes from './App.css';
import fire from './config/Fire';

class App extends Component {

  state = {
    currentPage: '',
    search: '',
    backColors: {
      home: 'linear-gradient(to left bottom, #ffc88a, #dfab78, #bf9067, #9f7656, #805d45)',
      about: 'linear-gradient(to left bottom, #8ab9ff, #78a1de, #668abe, #55739e, #455d80)',
      snow: 'linear-gradient(to left bottom, #ffffff, #dbdae8, #b5b6d2, #8e95bd, #6375a8)',
      sleet: 'linear-gradient(to left bottom, #ffffff, #dbdae8, #b5b6d2, #8e95bd, #6375a8)',
      clearDay: 'linear-gradient(to left bottom, #ebf0ff, #cbd8ff, #abbfff, #8aa7ff, #668fff)',
      cloudy: 'linear-gradient(to left bottom, #e1e1e1, #c8c8c8, #b0b0b0, #989898, #818181)',
      fog: 'linear-gradient(to left bottom, #e1e1e1, #c8c8c8, #b0b0b0, #989898, #818181)',
      partlyCloudyDay: 'linear-gradient(to left bottom, #8ab9ff, #78a1de, #668abe, #55739e, #455d80)',
      partlyCloudyNight: 'linear-gradient(to left bottom, #979797, #818181, #6c6c6c, #585858, #444444)',
      rain: 'linear-gradient(to left bottom, #b9b9b9, #a1a1a1, #8a8a8a, #747474, #5e5e5e)',
      wind: 'linear-gradient(to left bottom, #beffc9, #a8f8b5, #92f0a1, #7be98c, #62e177)',
      clearNight: 'linear-gradient(to left bottom, #b5b5b5, #989898, #7b7b7b, #606060, #464646)'
    },
    buttonColors: {
      home: '#FFFFFF',
      about: '#5F88F9',
      snow: '#707070',
      sleet: '#707070',
      clearDay: '#8EACFF',
      cloudy: '#959595',
      fog: '#959595',
      partlyCloudyDay: '#5F88F9',
      partlyCloudyNight: '#444444',
      rain: '#5E5E5E',
      wind: '#62E177',
      clearNight: '#464646'
    },
    historyData: {},
    geoData: '',
    oldGeoData: '',
    weatherData: {
      currently: {
        time: 0
      }
    },
    loading: true,
    user: {},
    database: fire.database()
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    })
  }


  getWeatherData = () => {
    fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/705db75b1f2da0d706739510f0b5ef12/" + this.state.geoData.location.lat
      + "," + this.state.geoData.location.lng + "?units=si&exclude=minutely,alerts,flags")
      .then(response => response.json())
      .then(data => {
        if (!this.state.loading) this.setState({ loading: true });
        if (this.state.weatherData.currently.time !== data.currently.time) this.setState({ weatherData: data });
      });
  }

  updateGeoDataHandler = (newData) => {
    if (this.state.geoData !== newData) {
      this.setState({ oldGeoData: this.state.geoData });
      this.setState({ geoData: newData });
    }
  }

  updatePageHandler = (page, historyData) => {
    if (this.state.currentPage !== page) this.setState({ currentPage: page });
    if (this.state.historyData !== historyData) this.setState({ historyData: historyData });

  }

  stopLoadingHandler = (bool) => {
    if (this.state.loading !== bool) this.setState({ loading: bool });
  }



  render() {
    let backColor = this.state.backColors.home;
    let buttonColor = this.state.buttonColors.about;
    switch (this.state.currentPage) {
      case '/':
        backColor = this.state.backColors.home;
        buttonColor = this.state.buttonColors.home;
        break;
      case '/about':
        backColor = this.state.backColors.about;
        buttonColor = this.state.buttonColors.about;
        break;
      case '/results':
        if (this.state.weatherData.currently.time !== 0) {
          switch (this.state.weatherData.currently.icon) {
            case 'clear-night':
              backColor = this.state.backColors.clearNight;
              buttonColor = this.state.buttonColors.clearNight;
              break;
            case 'clear-day':
              backColor = this.state.backColors.clearDay;
              buttonColor = this.state.buttonColors.clearDay;
              break;
            case 'partly-cloudy-night':
              backColor = this.state.backColors.partlyCloudyNight;
              buttonColor = this.state.buttonColors.partlyCloudyNight;
              break;
            case 'partly-cloudy-day':
              backColor = this.state.backColors.partlyCloudyDay;
              buttonColor = this.state.buttonColors.partlyCloudyDay;
              break;
            default:
              backColor = this.state.backColors[this.state.weatherData.currently.icon];
              buttonColor = this.state.buttonColors[this.state.weatherData.currently.icon];
              break;
          }
        }
        break;
      case '/favorites':
        backColor = this.state.backColors.about;
        break;
      default:
        backColor = this.state.backColors.home;
        buttonColor = this.state.buttonColors.about;
    }

    let shouldDisplay = "none"

    if (this.state.currentPage !== '/') shouldDisplay = '';

    if (this.state.oldGeoData !== this.state.geoData) {
      this.getWeatherData();
    }





    return (
      <Backdrop color={backColor} >
        <CenterPage
          home={this.state.atHome}
          history={this.state.historyData.history}
          updateGeo={this.updateGeoDataHandler}
          shouldDisplay={shouldDisplay}
          buttonColor={buttonColor}
          user={this.state.user} >
          <Switch>
            <Route
              path="/favorites"
              render={(props) => <Favorites {...props} updatePage={this.updatePageHandler}
                user={this.state.user}
                updateGeo={this.updateGeoDataHandler} />} />
            <Route
              path="/maps"
              render={(props) => <Maps {...props} updatePage={this.updatePageHandler}
                updateGeo={this.updateGeoDataHandler}
                weatherData={this.state.weatherData} />} />
            <Route
              path="/results"
              className={classes.Results}
              render={(props) => <Results {...props} updatePage={this.updatePageHandler}
                weatherData={this.state.weatherData}
                loading={this.state.loading}
                stop={this.stopLoadingHandler}
                title={`${this.state.geoData.city}, ${this.state.geoData.country}`}
                user={this.state.user}
                geoData={this.state.geoData} />} />
            <Route
              path="/about"
              render={(props) => <About {...props} updatePage={this.updatePageHandler} />} />
            <Route
              path="/"
              render={(props) => <Home {...props} updatePage={this.updatePageHandler}
                updateGeo={this.updateGeoDataHandler} />} />
          </Switch>
        </CenterPage>
      </Backdrop>
    );
  }
}

export default App;
