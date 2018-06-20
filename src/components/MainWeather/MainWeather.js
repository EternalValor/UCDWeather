import React from 'react';

import classes from "./MainWeather.css";
import Triangle from "../Triangle/Triangle";

const mainWeather = (props) => {

  return (
    <div className={props.className} >
      <h1 className={classes.Title}>{props.title.toUpperCase()}</h1>
      <div className={classes.MainFlex} >
        <div className={classes.LeftFlex} >
          <div className={classes.MainTemp}>{`${props.temp}°`}</div>
          <div className={classes.HighLow}>
            <div className={classes.LowTemp}><Triangle rotate='180'/> {`${props.low}°`}</div>
            <div className={classes.HighTemp}><Triangle /> {`${props.high}°`}</div>
          </div>
        </div>
        <div className={classes.RightFlex}>
          <div className={classes.Details} >Details</div>
          <div className={classes.MainDetails}>
            <div>
                <span className={classes.MainDetailsLeft}>FEELS LIKE</span> 
                <span className={classes.MainDetailsRight}>{`${props.feels}°`}</span>
            </div>
            <div>
                <span className={classes.MainDetailsLeft}>PRECIPITATION</span> 
                <span className={classes.MainDetailsRight}>{`${props.precip}%`}</span>
              </div>
            <div>
              <span className={classes.MainDetailsLeft}>WIND</span> 
              <span className={classes.MainDetailsRight}>{`${props.wind} km/h`}</span>
            </div>
            <div>
              <span className={classes.MainDetailsLeft}>VISIBILITY</span> 
              <span className={classes.MainDetailsRight}>{`${props.visibility} km`}</span>
            </div>
          </div>
        </div>
      </div>
      <h3 className={classes.Condition}>{props.condition}</h3>
    </div>
  );

}

export default mainWeather;