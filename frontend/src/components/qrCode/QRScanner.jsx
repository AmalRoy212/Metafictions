import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function QRScanner() {

  const [scanResult, setScanResult] = useState('');
  const [mounted, setMounted] = useState(false);
  const [url,setUrl] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true); // Component is now mounted

    return () => {
      setMounted(false); // Component is unmounting
    };
  }, []);

  useEffect(() => {

    if (scanResult) {
      const url = new URL(scanResult);
      const relativePath = url.pathname;

      setUrl(relativePath);
    }
  }, [scanResult, navigate]);



  useEffect(() => {
    if (mounted) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 200,
          height: 200,
        },
        fps: 5,
      });

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanResult(result);
      }

      function error(err) {
        console.warn(err);
      }
    }
  }, [mounted]);

  return (
    <>
      <div>
        <h5 style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Scan code</h5>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {
            scanResult
              ?( 
                navigate(`${url}`)
                // <Button variant='dark' onClick={() => navigate(`${url}`)}><h6>Go to Profile</h6></Button>
              )
              : <div id='reader'></div>
          }
        </div>
      </div>
    </>
  )
}

export default QRScanner
