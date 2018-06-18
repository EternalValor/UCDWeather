import React, {Component} from 'react';
import classes from './Home.css';
import CallToAction from '../../components/CallToAction/CallToAction';

class Home extends Component {
  state = {

  }

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  render() {
    
    return (
      <div className={classes.Home} >
        <h1 className={classes.Header} >Welcome to UCD Weather</h1>
        <h2>Authentic Weather Reports</h2>
        <ul className={classes.ButtonContainer} >
          <li><CallToAction name="Use Your Location" /></li>
          <li style={{margin: 0}} ><CallToAction name="Weather Map" /></li>
        </ul>
      </div>
    )
  }

}

export default Home;