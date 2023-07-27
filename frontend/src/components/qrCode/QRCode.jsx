import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APP_URL } from '../../constants/constants';

function QRCode({userId}) {
  return (
    <>
      <h5 style={{width:"100%", display:"flex", justifyContent:"center"}}>QR code</h5>
      <div style={{display:"flex", justifyContent:"center"}}>
        <QRCodeSVG value={`${APP_URL}/friends/profile/${userId}/`} />,
      </div>
    </>
  )
}

export default QRCode
