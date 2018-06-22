import React, { Component } from 'react';
import moment from 'moment';
import Slider from 'react-slick';

import Hour from '../../components/Hour/Hour';
import Day from '../../components/Day/Day';
import classes from './Results.css';
import MainWeather from '../../components/MainWeather/MainWeather';
import Spinner from '../../components/Spinner/Spinner';
import Icon from '../../components/Icon/Icon';
import fire from '../../config/Fire';

class Results extends Component {
  state = {
    weatherData: null,
    windowWidth: 1440,
    fillColors: {
      snow: 'rgba(132, 132, 132, 0.6)',
      sleet: 'rgba(132, 132, 132, 0.6)',
      clearDay: 'rgba(142, 172, 255, 0.5)',
      cloudy: 'rgba(149, 149, 149, 0.5)',
      fog: 'rgba(149, 149, 149, 0.5)',
      partlyCloudyDay: 'rgba(86, 146, 249, 0.6)',
      partlyCloudyNight: 'rgba(255, 255, 255, 0.3)',
      rain: 'rgba(94, 94, 94, 0.6)',
      wind: 'rgba(98, 225, 119, 0.5)',
      clearNight: 'rga(70, 70, 70, 0.5)'
    },
    database: fire.database(),
    faved: false,
    favorites: {}
  }

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.weatherData !== nextProps.weatherData)
      this.setState({ weatherData: nextProps.weatherData });
    let favIcon = document.querySelector(`.${classes.Favorite} svg path`);
    if (favIcon) {
      if (favIcon.getAttribute('fill') === 'red' && !nextState.faved) {
        this.setState({ faved: true });
      } else if (favIcon.getAttribute('fill') === 'white' && nextState.faved) {
        this.setState({ faved: false });
      }
      // console.log("[GETTTIIING COOLOR]", favIcon.getAttribute('fill'));
    }
  }

  componentDidMount() {
    if (this.props.user) {
      if (this.props.user.uid) {
        this.state.database.ref('users/' + this.props.user.uid + '/favorites').on('value', snap => {
          this.setState({ favorites: snap.val() });
        });
        let favIcon = document.querySelector(`.${classes.Favorite} svg path`);
        if (favIcon) {
          if (favIcon.getAttribute('fill') === 'red') {
            this.setState({ faved: true });
          } else if (favIcon.getAttribute('fill') === 'white') {
            this.setState({ faved: false });
          }
          // console.log("[GETTTIIING COOLOR]", favIcon.getAttribute('fill'));
        }
      }
    }
  }


  addFavHandler = () => {
    if(this.state.faved){
      // console.log("clicked");
      this.state.database.ref(`users/${this.props.user.uid}/favorites/${this.props.geoData.city}${this.props.geoData.country}${this.props.geoData.location.lat.toFixed()}${this.props.geoData.location.lng.toFixed()}`).remove();
      this.setState((prevState) => {
        return { faved: !prevState.faved }
      });

    } else {

      const favorite = {
        city: this.props.geoData.city,
        country: this.props.geoData.country,
        location: {
          lat: this.props.geoData.location.lat,
          lng: this.props.geoData.location.lng
        },
        temp: this.state.weatherData.currently.temperature.toFixed(),
        icon: this.state.weatherData.currently.icon,
        summary: this.state.weatherData.currently.summary,
        humidity: (this.state.weatherData.currently.humidity * 100 ).toFixed(),
        wind: this.state.weatherData.currently.windSpeed.toFixed(),
        time: this.state.weatherData.currently.time
      }
      this.state.database.ref(`users/${this.props.user.uid}/favorites/${this.props.geoData.city}${this.props.geoData.country}${this.props.geoData.location.lat.toFixed()}${this.props.geoData.location.lng.toFixed()}`).set(favorite);
      this.setState((prevState) => {
        return { faved: !prevState.faved }
      });
    }
  }



  render() {

    // console.log("[Result WeatherData]", this.state.weatherData);
    let favorites = this.state.favorites;
    // console.log("[RESULT GEODATA]", this.props.geoData);

    if (this.props.user) {
      if (this.props.user.uid) {
        this.state.database.ref('users/' + this.props.user.uid + '/favorites').on('value', snap => {
          favorites = snap.val();
          // console.log(snap.val());
        });
      }
    }

    // console.log("[RESULTS FAVORITES]", favorites);
    // console.log(this.state.weatherData);
    let renderBoi;

    if (this.props.loading) renderBoi = <div className={classes.MainContainer} style={{ padding: '15px' }} ><Spinner /></div>

    let hourlyCount = 11;
    let dailyCount = 5;

    if (window.innerWidth < 1440) {
      // console.log(window.innerWidth);
      hourlyCount = Math.ceil((0.84 * window.innerWidth) / 112);
      dailyCount = ((0.84 * window.innerWidth) / 251).toFixed();
      // console.log("hourlyCount " + Math.ceil(hourlyCount));
    }

    if (this.state.weatherData) {
      if (this.state.weatherData.currently.time !== 0) {


        renderBoi = (
          <div className={classes.MainContainer}>
            {
              this.props.user ?
                (
                  favorites ? 
                    <span className={classes.Favorite} onClick={this.addFavHandler}>
                      <Icon
                        name="heart"
                        color={favorites[`${this.props.geoData.city}${this.props.geoData.country}${this.props.geoData.location.lat.toFixed()}${this.props.geoData.location.lng.toFixed()}`] ? "red" : "white"}
                        width="24"
                        height="24" />
                    </span> :
                    <span className={classes.Favorite} onClick={this.addFavHandler}>
                      <Icon
                        name="heart"
                        color="white"
                        width="24"
                        height="24" />
                    </span>
                ) : null
            }
            <MainWeather
              className={classes.MainWeather}
              title={this.props.title}
              temp={this.state.weatherData.currently.temperature.toFixed()}
              low={this.state.weatherData.daily.data[0].temperatureLow.toFixed()}
              high={this.state.weatherData.daily.data[0].temperatureHigh.toFixed()}
              feels={this.state.weatherData.currently.apparentTemperature.toFixed()}
              precip={this.state.weatherData.currently.precipProbability * 100}
              wind={this.state.weatherData.currently.windSpeed.toFixed()}
              visibility={this.state.weatherData.currently.visibility.toFixed()}
              condition={this.state.weatherData.currently.summary}
            />
            <div className={classes.Hourly}>Hourly</div>
            <Slider className={classes.HourlySlider} slidesToShow={hourlyCount} slidesToScroll={4} infinite={false}>
              {this.state.weatherData.hourly.data.map((hour, index) => {
                if (index >= 24) return null;
                else return <Hour
                  className={classes.Hour}
                  key={index}
                  icon={hour.icon}
                  temp={hour.temperature.toFixed()}
                  summary={hour.summary}
                  precip={(hour.precipProbability * 100).toFixed()}
                  wind={hour.windSpeed.toFixed()}
                  time={moment.unix(hour.time + this.state.weatherData.offset * 3600).format('h a')} />;
              })}
            </Slider>
            <div className={classes.Daily}>Daily</div>
            <Slider className={classes.DailySlider} slidesToShow={dailyCount} infinite={false}>
              {this.state.weatherData.daily.data.map((day, index) => {
                if (index >= 7) return null;
                else return <Day
                  key={index}
                  date={moment.unix(day.time + this.state.weatherData.offset * 3600).format('ddd D')}
                  icon={day.icon}
                  summary={day.summary}
                  low={day.temperatureLow.toFixed()}
                  high={day.temperatureHigh.toFixed()}
                  precip={(day.precipProbability * 100).toFixed()}
                  wind={day.windSpeed.toFixed()} />
              })}
            </Slider>
          </div>
        )


      }
    }

    const resultClass = [classes.Results];
    if (this.state.weatherData !== null) {
      resultClass.push(classes[this.state.weatherData.currently.icon]);
    }
    let fillColor = this.state.fillColors.clearDay;
    if (this.state.weatherData !== null) {
      switch (this.state.weatherData.currently.icon) {
        case 'clear-night':
          fillColor = this.state.fillColors.clearNight;
          break;
        case 'clear-day':
          fillColor = this.state.fillColors.clearDay;
          break;
        case 'partly-cloudy-night':
          fillColor = this.state.fillColors.partlyCloudyNight;
          break;
        case 'partly-cloudy-day':
          fillColor = this.state.fillColors.partlyCloudyDay;
          break;
        default:
          fillColor = this.state.fillColors[this.state.weatherData.currently.icon];
          break;
      }
    }

    return (
      <div className={resultClass.join(' ')} >
        <div className={classes.Fill} style={{ background: fillColor }}></div>
        {renderBoi}
      </div>
    )
  }

}

export default Results;