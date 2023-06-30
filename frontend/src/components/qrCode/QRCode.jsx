import React from 'react';
import {QRCodeSVG} from 'qrcode.react';


function QRCode() {
  return (
    <div>
      <h6>Your Code is here</h6>
      <QRCodeSVG value="http://localhost:3000/profile" />,
    </div>
  )
}

export default QRCode
