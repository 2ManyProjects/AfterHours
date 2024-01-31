 
import "./QrStyles.css";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800], // Adjust button background color
    color: '#fff', // Button text color
    '&:hover': {
      backgroundColor: theme.palette.grey[700], // Button hover color
    },
    margin: theme.spacing(2),
  }));


    function writeCameraIDToLocalStorage(cameraID) {
        try {
            localStorage.setItem('CameraID', cameraID);
            console.log('Camera ID saved to localStorage.');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Function to read the camera ID from localStorage
    function readCameraIDFromLocalStorage() {
        try {
            const cameraID = localStorage.getItem('CameraID');
            if (cameraID === null) {
            console.log('No camera ID found in localStorage.');
            return null;
            } else {
            console.log('Camera ID retrieved from localStorage:', cameraID);
            return cameraID;
            }
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

const QrReader = ({ checkValid }) => {
  const videoEl = useRef(null);
  const [alertData, setAlertData] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [activeCameraId, setActiveCameraId] = useState(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = async (result) => {
    let codes = result?.data.split('#');
    if (codes.length < 4) return;
    let codeObj = {
      index: codes[0],
      userEmail: codes[1],
      secretKey: codes[2],
      id: codes[3],
    };
    writeCameraIDToLocalStorage(activeCameraId);
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
    let camId = readCameraIDFromLocalStorage();
    if(camId){
        setAlertData({type: "success", msg: `ID: ${camId}`})
        setActiveCameraId(camId);
    }
  }, [cameras]);

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
    <Snackbar open={!!alertData} autoHideDuration={6000} onClose={() => setAlertData(null)}>
      <Alert
        onClose={() => setAlertData(null)}
        severity={alertData?.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertData?.msg}
      </Alert>
    </Snackbar>
        {cameras.length > 1 && <StyledButton onClick={toggleCamera} size="large" variant="contained">
            Switch Camera
        </StyledButton>}
        <video ref={videoEl}></video>
    </div>
  );
};

export default QrReader;
