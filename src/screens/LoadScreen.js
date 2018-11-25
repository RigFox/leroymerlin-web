import React, {Component} from "react";

import '../css/LoadScreen.css';
import logo from '../images/leroymerlin-logo.png';

class LoadScreen extends Component {
    constructor(props) {
        super(props);
        setTimeout(this.load.bind(this), 100)
    }

    load = () => {
        this.props.load();
    };

    render() {
        return (
            <div className="row align-items-center h-100">
                <div className="col-10 mx-auto">
                    <img src={logo} alt="LeroyMerlin" style={{width: "100%"}}/>
                    <h2 className="text-center" style={{"margin-top": 30}}>Низкие цены каждый день</h2>
                </div>
            </div>
        );
    }
}

export default LoadScreen;
