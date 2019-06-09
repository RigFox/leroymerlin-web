import React, { Component } from 'react';

import QRScreen from './QRScreen';
import data from '../data/data';
import ProductScreen from './ProductScreen';

import scan from '../images/scan-icon.png';
import share from '../images/share-icon.png';
import ShareScreen from './ShareScreen';

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showQR: false,
      showProduct: false,
      productToAdd: false,
      product: undefined,
      showShare: false
    };
  }

  componentDidMount = () => {
    if (window.location.hash) {
      let str = atob(window.location.hash.substr(1));
      let articules = str.split(':')[1];

      let array = articules.split(',');

      array.map(articul => {
        let product = this.getProductByArticul(articul);
        this.addProduct(product);
      });
    }
  };

  setInitialState = () => {
    this.setState({
      showQR: false,
      showProduct: false,
      productToAdd: false,
      product: undefined,
      showShare: false
    });
  };

  getProductByArticul = articul => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['articul'] === articul) {
        return data[i];
      }
    }

    return 'Null';
  };

  addProduct = product => {
    let index = this.state.products.findIndex(element => {
      return element.articul === product.articul;
    });

    if (index === -1) {
      product['count'] = 1;
      this.setState({ products: [...this.state.products, product] });
    } else {
      let array = [...this.state.products];
      array[index]['count'] += 1;
      this.setState({ products: array });
    }
  };

  deleteProduct = product => {
    let index = this.state.products.indexOf(product);

    if (index !== -1) {
      let array = [...this.state.products];
      array.splice(index, 1);
      this.setState({ products: array });
    }
  };

  getSumByProducts = products => {
    let sum = 0;

    products.map(product => {
      sum += parseFloat(product.price) * product.count;
    });

    return sum;
  };

  onScan = articul => {
    this.setState({
      showQR: false,
      showProduct: true,
      productToAdd: true,
      product: this.getProductByArticul(articul)
    });
  };

  render() {
    if (this.state.showQR) {
      return <QRScreen onScan={this.onScan} onReturn={this.setInitialState} />;
    } else if (this.state.showProduct) {
      return (
        <ProductScreen
          product={this.state.product}
          toAdd={this.state.productToAdd}
          onReturn={this.setInitialState}
          onAdd={() => {
            this.addProduct(this.state.product);
            this.setInitialState();
          }}
          onRemove={() => {
            this.deleteProduct(this.state.product);
            this.setInitialState();
          }}
        />
      );
    } else if (this.state.showShare) {
      return (
        <ShareScreen
          products={this.state.products}
          onReturn={this.setInitialState}
        />
      );
    } else {
      let share_button =
        this.state.products.length !== 0 ? (
          <div
            style={{
              position: 'fixed',
              bottom: 80,
              right: 20,
              background: '#66c05d',
              'border-radius': 100,
              padding: 5
            }}
            onClick={() => {
              this.setState({ showShare: true });
            }}
          >
            <img
              style={{
                width: 40
              }}
              src={share}
            />
          </div>
        ) : (
          ''
        );

      return (
        <div>
          <div className="row">
            <div
              className="col-12 mx-auto text-center"
              style={{
                height: 25,
                backgroundColor: '#66c05d',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 999
              }}
            >
              <h5>Ваш список</h5>
            </div>

            <div style={{ marginTop: 25 }}>
              {this.state.products.map(product => (
                <div
                  className="container"
                  style={{ borderTop: '1px solid' }}
                  onClick={() => {
                    this.setState({ showProduct: true, product: product });
                  }}
                >
                  <div className="row" style={{ padding: 10 }}>
                    <div className="col-4">
                      <img width="100%" src={product.image} />
                    </div>
                    <div className="col-8" style={{ 'font-size': '10pt' }}>
                      <p>{product.name}</p>
                      <p>
                        <i>{product.price}р</i> / за штуку ({product.count})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="col-12 mx-auto"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              background: '#fbfbf3',
              height: 20,
              fontSize: '10pt'
            }}
          >
            Итог: {this.getSumByProducts(this.state.products)}р
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              background: '#66c05d',
              'border-radius': 100,
              padding: 5
            }}
            onClick={() => {
              this.setState({ showQR: true });
            }}
          >
            <img
              style={{
                width: 40
              }}
              src={scan}
            />
          </div>

          {share_button}
        </div>
      );
    }
  }
}

export default ListScreen;
