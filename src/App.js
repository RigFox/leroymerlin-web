import React, {Component} from 'react';

import LoadScreen from "./screens/LoadScreen";

import './css/App.css';
import ListScreen from "./screens/ListScreen";

class App extends Component {
    state = {
       path: load   
    }

    handleLoad = () => {
        this.setState({path: "list"});
    }

    render() {
        {this.state.path === 'load' 
            ? <LoadScreen load={this.handleLoad}/>
            : <ListScreen/>
        }
    }
}

export default App;
