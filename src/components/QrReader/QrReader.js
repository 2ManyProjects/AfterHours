import "./QrStyles.css";
import { useEffect, useRef, useState } from "react";
// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";

const QrReader = ({checkValid}) => {

    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

  const [scannedResult, setScannedResult] = useState("");
    // Success
    const onScanSuccess = async (result) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        checkValid(JSON.parse(result?.data));
        setScannedResult( result?.data);
      };
      const getCams = async() => {

        let cams = await QrScanner.listCameras(true);
        // alert(JSON.stringify(cams))
        let camera = cams.find(item => item.label.includes("back"));
        
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: camera.id,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
        });
        // alert(camera.id)
        await scanner.current.setCamera(camera.id)
        // 🚀 Start QR Scanner
        scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
            if (err) setQrOn(false);
        });
      }
      // Fail
      const onScanFail = (err) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
      };
    
      useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            getCams();
          // 👉 Instantiate the QR Scanner
        }
    
        
        return () => {
          if (!videoEl?.current) {
            scanner?.current?.stop();
          }
        };
      }, []);
    
      
      useEffect(() => {
        if (!qrOn)
          alert(
            "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
          );
      }, [qrOn]);
    
      return (
        <div className="qr-reader">
          {/* QR */}
          <video ref={videoEl}></video>
          {scannedResult && (
            <p
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 99999,
                color: "white",
              }}
            >
              Scanned Result: {scannedResult}
            </p>
          )}
        </div>
      );
}

export default QrReader;