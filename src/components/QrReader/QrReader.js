 
import "./QrStyles.css";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Modal, Box, Typography,  useTheme, useMediaQuery } from '@mui/material';

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

  const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  `;

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: { xs: '90vw', sm: '33vw' },  
    width: fullScreen ? '90%' : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    animation: `${fadeIn} 500ms ease-out`
  };
  return (
  <Modal open={true}>
    <div className="qr-reader">
      <video ref={videoEl}></video>
      {cameras.length > 1 && <StyledButton onClick={toggleCamera} size="large" variant="contained">
                                Switch Camera
                             </StyledButton>}
    </div>
    </Modal>
  );
};

export default QrReader;
