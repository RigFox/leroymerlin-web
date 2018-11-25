import React, {Component} from "react";

import '../css/LoadScreen.css';
import QRScreen from "./QRScreen";
import data from "../data/data"
import ProductScreen from "./ProductScreen";

import scan from "../images/scan-icon.png"

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "products": [],
            "showQR": false,
            "showProduct": false,
            "productToAdd": false,
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
            "productToAdd": true,
            "product": this.getProductByArticul(articul)
        });
    };

    getSumByProducts = (products) => {
        let sum = 0;

        products.map((product) => {
            sum += parseFloat(product.price)
        });

        return sum;
    };

    render() {
        if (this.state.showQR) {
            return (<QRScreen onScan={this.onScan} onReturn={() => {
                this.setState({"showQR": false})
            }}/>)
        } else if (this.state.showProduct) {
            return (<ProductScreen product={this.state.product} toAdd={this.state.productToAdd} onReturn={() => {
                this.setState({"showProduct": false, "productToAdd": false, "product": undefined})
            }} onAdd={() => {
                this.setState({
                    "showProduct": false,
                    "product": undefined,
                    "productToAdd": false,
                    "products": [...this.state.products, this.state.product]
                })
            }} onRemove={() => {
                let array = [...this.state.products];
                let index = this.state.products.indexOf(this.state.product);

                array.splice(index, 1);

                this.setState({
                    "showProduct": false,
                    "product": undefined,
                    "products": array
                })
            }}
            />)
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-12 mx-auto text-center" style={{
                            height: 25,
                            backgroundColor: "#66c05d",
                            color: "white",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 999
                        }}>
                            <h5>Ваш список</h5>
                        </div>

                        <div style={{marginTop: 25}}>
                            {this.state.products.map((product) =>
                                <div className="container" style={{borderTop: "1px solid"}} onClick={() => {
                                    this.setState({"showProduct": true, "product": product})
                                }}>
                                    <div className="row" style={{padding: 10}}>
                                        <div className="col-4">
                                            <img width="100%" src={product.image}/>
                                        </div>
                                        <div className="col-8" style={{"font-size": "10pt"}}>
                                            <p>{product.name}</p>
                                            <p><i>{product.price}р</i> / за штуку</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-12 mx-auto" style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        background: "#fbfbf3",
                        height: 20,
                        fontSize: "10pt"
                    }}>
                        Итог: {this.getSumByProducts(this.state.products)}р
                    </div>

                    <div style={{
                        position: "fixed",
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
