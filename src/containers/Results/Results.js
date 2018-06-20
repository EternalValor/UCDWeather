import React, {Component} from 'react';
import moment from 'moment';
import Slider from 'react-slick';

import Hour from '../../components/Hour/Hour';
import Day from '../../components/Day/Day';
import classes from './Results.css';
import MainWeather from '../../components/MainWeather/MainWeather';

class Results extends Component {
  state = {
    weatherData: null,
    windowWidth: 1440
  }

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    if ( this.state.weatherData !== nextProps.weatherData ) 
      this.setState({weatherData: nextProps.weatherData});
  }

  


  render() {
    
    console.log("[Result WeatherData]", this.state.weatherData);

    // console.log(this.state.weatherData);
    let renderBoi;

    if(this.props.loading) renderBoi = <div className={classes.MainContainer} style={{padding: '15px'}} >loading</div>

    let hourlyCount = 11;
    let dailyCount = 5;

    if(window.innerWidth < 1440) {
      console.log(window.innerWidth);
      hourlyCount = Math.ceil((0.84 * window.innerWidth)/112);
      dailyCount = ((0.84 * window.innerWidth)/251).toFixed();
      console.log("hourlyCount " + Math.ceil(hourlyCount) );
    }

    if(this.state.weatherData) {
      if(this.state.weatherData.currently.time !== 0){


        renderBoi = (
          <div className={classes.MainContainer}>
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
                {this.state.weatherData.hourly.data.map( (hour, index) => {
                  if(index >= 24) return null;
                  else return <Hour 
                                className={classes.Hour}
                                key={index}
                                icon={hour.icon}
                                temp={hour.temperature.toFixed()}
                                summary={hour.summary}
                                precip={(hour.precipProbability * 100).toFixed()}
                                wind={hour.windSpeed.toFixed()}
                                time={moment.unix(hour.time).format('h a')} />;
                })}
               </Slider>
               <div className={classes.Daily}>Daily</div>
               <Slider className={classes.DailySlider} slidesToShow={dailyCount} infinite={false}>
                  {this.state.weatherData.daily.data.map( (day, index) => {
                    if(index >= 7) return null;
                    else return <Day
                                  key={index}
                                  date={moment.unix(day.time).format('ddd D')}
                                  icon={day.icon}
                                  summary={day.summary}
                                  low={day.temperatureLow.toFixed()}
                                  high={day.temperatureHigh.toFixed()}
                                  precip={(day.precipProbability * 100).toFixed()}
                                  wind={day.windSpeed.toFixed()} />
                  })}
               </Slider>
               
            {/* {this.props.title}
            {this.state.weatherData.daily.summary} */}
          </div>
        )

        
      }
    }
    

    return (
      <div className={classes.Results} >
        <div className={classes.Fill} style={{background: 'rgba(86, 146, 249, 0.6)'}}></div>
        {renderBoi}
      </div>
    )
  }

}

export default Results;