import React, { Component } from 'react';
import classes from './CenterPage.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Auxx from '../../hoc/Auxx/Auxx';

class CenterPage extends Component {

  state = {
    showSideDrawer: false,
    name: 'nothing'
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

  shouldComponentUpdate(nextProps, nextState) {
    this.props.updateSearch(nextState.name);
    return true;
  }


  render() {
    
    return (
        <div className={classes.CenterPage}> 
        <Toolbar drawerToggleClicked={this.drawerToggleHandler} 
          updateName={this.updateNameHandler} changed={event => this.inputChangedHandler(event)} />

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