import React, {Component} from 'react';

import LoadScreen from "./screens/LoadScreen";
import QRScreen from "./screens/QRScreen";

import './css/App.css';
import ListScreen from "./screens/ListScreen";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {"path": "load"};
    }

    load = () => {
        this.setState({"path": "list"});
    };

    render() {
        switch (this.state.path) {
            case "load":
                return (
                    <LoadScreen load={this.load}/>
                );
            case "list":
                return (
                    <ListScreen/>
                );
            default:

        }
    }
}

export default App;
