import React, {Component} from "react";

class ProductScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buttons = this.props.toAdd ?
            <button type="button" className="btn btn-success btn-block" onClick={this.props.onAdd}>Добавить в
                список
            </button>
            :
            <button type="button" className="btn btn-danger btn-block" onClick={this.props.onRemove}>Удалить из
                списка
            </button>;

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

                    <div style={{padding: 10}}>
                        <div className="text-center">
                            <img width={"50%"} src={this.props.product.image}/>
                            <h4>{this.props.product.name}</h4>
                            <p>Стоимость: {this.props.product.price}р</p>
                            <a href={"http://leroymerlin.ru" + this.props.product.link} target="_blank"
                               rel="noopener noreferrer">Ссылка на сайте (в
                                новом окне)</a>
                        </div>

                        {buttons}
                        <button type="button" className="btn btn-secondary btn-block"
                                onClick={this.props.onReturn}>Отмена
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductScreen;
