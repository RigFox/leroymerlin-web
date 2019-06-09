import React, { Component } from 'react';
import QRCode from 'qrcode.react';

export default class ShareScreen extends Component {
  state = {
    url: this.getBase64(this.props.products)
  };

  getBase64 = products => {
    let articules = [];

    products.map(product => {
      articules.push(product.articul);
    });

    return 'https://leroy.ml/#' + btoa('b64:' + articules.join(','));
  };

  render() {
    const { url } = this.state;
    return (
      <div className="row align-items-center h-100">
        <div className="col-10 mx-auto text-center">
          <QRCode value={url} />
          <br />
          <a href={url}>Ссылка</a>

          <h5
            className="text-center"
            style={{ 'margin-top': 50 }}
            onClick={this.props.onReturn}
          >
            Вернуться
          </h5>
        </div>
      </div>
    );
  }
}
