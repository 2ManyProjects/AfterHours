 
import "./QrStyles.css";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';



const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800], // Adjust button background color
    color: '#fff', // Button text color
    '&:hover': {
      backgroundColor: theme.palette.grey[700], // Button hover color
    },
    margin: theme.spacing(2),
  }));

const QrReader = ({ checkValid }) => {
  const videoEl = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [activeCameraId, setActiveCameraId] = useState(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = async (result) => {
    alert(result);
    let codes = result?.data.split('#');
    if (codes.length < 4) return;
    let codeObj = {
      index: codes[0],
      userEmail: codes[1],
      secretKey: codes[2],
      id: codes[3],
    };
    checkValid(codeObj);
    setScannedResult(result?.data);
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  const toggleCamera = () => {
    const currentCameraIndex = cameras.findIndex(camera => camera.id === activeCameraId);
    const nextCameraIndex = (currentCameraIndex + 1) % cameras.length;
    const nextCameraId = cameras[nextCameraIndex].id;
    setActiveCameraId(nextCameraId);
  };

  useEffect(() => {
    QrScanner.listCameras(true).then(setCameras);
  }, []);

  useEffect(() => {
    if (activeCameraId && videoEl.current) {
      const qrScanner = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: activeCameraId,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      
      qrScanner.start().then(() => {
        setQrOn(true);
        return () => qrScanner.stop();
      }).catch((err) => {
        console.error(err);
        setQrOn(false);
      });

      return () => qrScanner.destroy();
    }
  }, [activeCameraId]);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
    }
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      {scannedResult && <p style={{ position: "absolute", top: 0, left: 0, zIndex: 99999, color: "white" }}>
        Scanned Result: {scannedResult}
      </p>}
      {cameras.length > 1 && <StyledButton onClick={toggleCamera} size="large" variant="contained">
                                Switch Camera
                             </StyledButton>}
    </div>
  );
};

export default QrReader;
