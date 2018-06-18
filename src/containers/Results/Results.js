import React, {Component} from 'react';
import classes from './Results.css';

class Results extends Component {
  state = {

  }

  componentWillMount() {
    this.props.updatePage(this.props.location.pathname, this.props);
  }

  render() {
    
    return (
      <div className={classes.Results} >
        Results
      </div>
    )
  }

}

export default Results;