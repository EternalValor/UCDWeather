import React from 'react';

import classes from './Favorite.css';
import moment from 'moment';
import fire from '../../config/Fire';

const favorite = (props) => {

  const favDeleteHandler = () => {
    const fave = `${props.data.city}${props.data.country}${props.data.location.lat.toFixed()}${props.data.location.lng.toFixed()}`;
    fire.database().ref('users/' + props.user.uid + '/favorites/' + fave).remove();
  }


  const clickedHandler = () => {
    props.clicked(props.data);
  }


  return (
    <div className={classes.Favorite} >
      <div className={classes.Delete} onClick={favDeleteHandler}>x</div>
      <div className={classes.Left} onClick={clickedHandler}>
        <div className={classes.Temp} >{`${props.data.temp}°C`}</div>
        <div className={classes.Summary} >{props.data.summary}</div>
        <div className={classes.BottomLeft} onClick={clickedHandler}>
          <div className={classes.Humidity}>HUMIDITY<br />{props.data.humidity}%</div>
          <div className={classes.Wind}>WIND<br />{props.data.wind} km/h</div>
        </div>
      </div>
      <div className={classes.Right} onClick={clickedHandler}>
        <div className={classes.City}>{`${props.data.city}, ${props.data.country}`}</div>
        <div className={classes.Time}>Created on: {moment.unix(props.data.time).format("MMM Do")}</div>
      </div>
    </div>
  )
}

export default favorite;