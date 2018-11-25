import React, {Component} from "react";

import '../css/LoadScreen.css';

import scan from "../images/scan-icon.png"
import QRScreen from "./QRScreen";
import data from "../data/parse"
import ProductScreen from "./ProductScreen";

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "products": [],
            "showQR": false,
            "showProduct": false,
            "product": undefined,
        }
    }

    getProductByArticul = (articul) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i]["articul"] === articul) {
                return data[i]
            }
        }

        return "Null"
    };

    onScan = (articul) => {
        this.setState({
            "showQR": false,
            "showProduct": true,
            "product": this.getProductByArticul(articul)
        });
    };

    render() {
        if (this.state.showQR) {
            return (<QRScreen onScan={this.onScan} onReturn={() => {
                this.setState({"showQR": false})
            }}/>)
        } else if (this.state.showProduct) {
            return (<ProductScreen product={this.state.product} onReturn={() => {
                this.setState({"showProduct": false, "product": undefined})
            }} onAdd={() => {
                this.setState({
                    "showProduct": false,
                    "product": undefined,
                    "products": [...this.state.products, this.state.product]
                })
            }}/>)
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-12 mx-auto text-center" style={{
                            height: 40,
                            "background-color": "#66c05d",
                            color: "white",
                        }}>
                            <h3>Ваш список</h3>
                        </div>

                        <ul>
                            {this.state.products.map((product) =>
                                <li>{product.name} {product.price}</li>
                            )}
                        </ul>
                    </div>

                    <div style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        background: "#66c05d",
                        "border-radius": 100,
                        padding: 5
                    }} onClick={() => {
                        this.setState({"showQR": true})
                    }}>
                        <img style={{
                            width: 40
                        }} src={scan}/>
                    </div>
                </div>
            );
        }
    }
}

export default ListScreen;
