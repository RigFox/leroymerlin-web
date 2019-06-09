import React, { Component, Fragment } from 'react';
import LoadScreen from './screens/LoadScreen';
import './css/App.css';
import ListScreen from './screens/ListScreen';

export default class App extends Component {
  state = {
    path: 'load'
  };

  handleLoad = () => {
    this.setState({ path: 'list' });
  };

  render() {
    return this.state.path === 'load' ? (
      <LoadScreen load={this.handleLoad} />
    ) : (
      <ListScreen />
    );
  }
}
