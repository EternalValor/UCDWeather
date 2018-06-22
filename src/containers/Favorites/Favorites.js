import React from 'react';

import classes from './Favorites.css';
import fire from '../../config/Fire';
import Favorite from '../../components/Favorite/Favorite';
import Spinner from '../../components/Spinner/Spinner';
import Auxx from '../../hoc/Auxx/Auxx';

class Favorites extends React.Component {

  state = {
    database: fire.database(),
    favorites: null
  }



  componentDidMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
    this.state.database.ref('users/' + this.props.user.uid + '/favorites').on('value', snap => {
      this.setState({favorites: snap.val()});
    });
  }

  favClickHandler = (fave) => {
    this.props.updateGeo(fave);
    this.props.history.push('/results');
  }


 

  render() {


    let favorites = this.state.favorites;

    if (this.props.user) {
      if (this.props.user.uid) {
        this.state.database.ref('users/' + this.props.user.uid + '/favorites').on('value', snap => {
          favorites = snap.val();
        });
      }
    }



    return (
      <div className={classes.Favorites}> 
        <div className={classes.Title}>Your Favorite Weather</div>
        <hr className={classes.Line} />
        <div className={classes.Favs} >

        { favorites ? 
          <Auxx> 
            {
              Object.keys(favorites).map((fave, index) => {
                return <Favorite 
                          clicked={this.favClickHandler}
                          key={index} 
                          data={favorites[fave]}
                          user={this.props.user} />
              })
            }  
          </Auxx> : 
          <Auxx>
            <Spinner />
            <div style={{
              position: 'absolute',
              bottom: '15%'
            }}>
              If this operation is taking too long, try adding some favorites.
            </div>
          </Auxx>}
        </div>
      </div>
    )
  }
}


export default Favorites;