import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import CenterPage from './containers/CenterPage/CenterPage';
import Backdrop from './containers/Backdrop/Backdrop';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Results from './containers/Results/Results';

class App extends Component {

  state = {
    currentPage: '',
    search: '',
    backColors: {
      home: 'linear-gradient(to left bottom, #ffc88a, #dfab78, #bf9067, #9f7656, #805d45)',
      about: 'linear-gradient(to left bottom, #8ab9ff, #78a1de, #668abe, #55739e, #455d80)'
    },
    historyData: {}
  }

  updateSearchHandler = (newSearch) => {
    if(this.state.search !== newSearch) { 
      this.setState({search: newSearch});
    }
  }

  updatePageHandler = (page, historyData) => {
    if(this.state.currentPage !== page) this.setState({currentPage: page});
    if(this.state.historyData !== historyData) this.setState({historyData: historyData});
    
  }

  render() {
    let backColor;
    switch(this.state.currentPage) {
      case '/':
        backColor = this.state.backColors.home;
        break;
      case '/about':
        backColor = this.state.backColors.about;
        break;
      default:
        backColor = this.state.backColors.home;
    }
    console.log(this.state.search);
    console.log(this.state.historyData);

    return (
      <Backdrop color={backColor} >
        <CenterPage home={this.state.atHome} updateSearch={this.updateSearchHandler} history={this.state.historyData.history}>
          <Switch>
            <Route path="/results" render={(props) => <Results {...props}  updatePage={this.updatePageHandler} />} />
            <Route path="/about" render={(props) => <About {...props}  updatePage={this.updatePageHandler} />} />
            <Route path="/" render={(props) => <Home {...props}  updatePage={this.updatePageHandler} />} />
          </Switch>
        </CenterPage>
      </Backdrop>
    );
  }
}

export default App;
