import React from 'react';
import QrReader from 'react-qr-reader';

const QRScreen = ({ onReturn, ...props }) => {
  function handleScan(articul) {
    if (articul) {
      this.props.onScan(articul);
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <div
      className="row align-items-center h-100"
      style={{ 'background-color': 'black' }}
    >
      <div className="col-12 mx-auto">
        <h4 className="text-center">Наведите камеру на QR код с ценника</h4>
        <QrReader
          delay={500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />

        <h5
          className="text-center"
          style={{ 'margin-top': 50 }}
          onClick={onReturn}
        >
          Вернуться
        </h5>
      </div>
    </div>
  );
};

export default QRScreen;
