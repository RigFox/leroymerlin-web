import React, {Component} from "react";

import '../css/LoadScreen.css';
import no_image_icon from '../images/no-image-icon.png';

class ProductScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 mx-auto text-center" style={{
                        height: 40,
                        "background-color": "#66c05d",
                        color: "white",
                    }}>
                        <h3>Товар</h3>
                    </div>

                    <div className="text-center">
                        <img width={"70%"} src={no_image_icon}/>
                        <h4>{this.props.product.name}</h4>
                        <p>Стоимость: {this.props.product.price}р</p>
                        <a href={"http://leroymerlin.ru" + this.props.product.link} target="_blank" rel="noopener noreferrer">Ссылка на сайте (в
                            новом окне)</a>
                    </div>

                    <button type="button" className="btn btn-primary btn-block" onClick={this.props.onAdd}>Добавить в
                        список
                    </button>
                    <button type="button" className="btn btn-secondary btn-block" onClick={this.props.onReturn}>Отмена
                    </button>
                </div>
            </div>
        );
    }
}

export default ProductScreen;
