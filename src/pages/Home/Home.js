import React, {useState} from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Box, Grid, Typography, CardActions} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import BookingModal from '../../components/Modal/BookingModal/BookingModal';
import SuccessModal from '../../components/Modal/BookingModal/SuccessModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import QrReader from '../../components/QrReader/QrReader';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress'; 

import { useQuery } from "react-query";
import axios from "axios";

let images = [
  "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/05/08/20/19/pomegranate-3383814_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/04/02/04/14/bell-peppers-1302126_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/12/06/18/27/cheese-1887233_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/23/18/31/pasta-1854245_960_720.jpg"
];
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#000', // Card background color
  color: '#fff', // Text color
  textAlign: 'center',
  borderRadius: theme.spacing(2), // Adjust border radius as needed
  // If you have an image, add it here
  backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column', // Stack children vertically
  justifyContent: 'center', // Center children horizontally in the flex container
  alignItems: 'center', // Align items in the center along the cross axis (horizontally)
  height: '100%'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800], // Adjust button background color
  color: '#fff', // Button text color
  '&:hover': {
    backgroundColor: theme.palette.grey[700], // Button hover color
  },
  margin: theme.spacing(2),
}));

const isMobile = () => {
  // Patterns to detect mobile devices
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  // Check if any of the patterns match the user agent string
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export default function Home() {
  const {isLoggedIn, user, session, userData} = useSelector(state => state.auth)
    const [openBookingModal, setOpenBookingModal] = useState(false);
    const [scanningModal, setOpenScanningModal] = useState(false);
    const [alertData, setAlertData] = useState(null);
 

    const retrieveEvents = async () => {
      const response = await axios.get("https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/event/available");
      // console.log(response?.data?.data);
      return response?.data?.data;
    };

    const verifyQRData = async(qrData, eventId) => {
      // alert(qrData)
      // alert(typeof qrData)
      const response = await axios.get(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/event/${eventId}/payments`, {params: {userEmail: qrData.userEmail, id: qrData.id, secretKey: qrData.secretKey},
      headers: {
        'Authorization': `Bearer ${session?.AccessToken}`,
        // ... any other headers
      }}).then((result) => {
        setAlertData({type: "success", msg: "User Is Authorized"})
      }).catch(e => {
        setAlertData({type: "warning", msg: "User is Not Authorized"})
      });
      // alert(response);
      // console.log(response)
    }


    const { data, error, isLoading } = useQuery("postsData", retrieveEvents);
    // console.log(data)
    let hasTickets = false;
    let maxTickets = 0;
    if(data?.length > 0 && data[0]?.availableTickets > 0)
      hasTickets = true;
    if(data?.length > 0){
      maxTickets = data[0]?.maxTickets;
      if(data[0].overFlowAllowed){
        maxTickets += data[0]?.overFlowMax
      }
    }
    // console.log(userData)
    return (
      <div>  
        <SuccessModal/>
        {isLoading && 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
                </div>}
        {!isLoading && !error && data?.length > 0 && <BookingModal open={openBookingModal} ticketPrice={data[0].ticketPrice}eventId={data[0].id} onClose={() => setOpenBookingModal(false)}/>}
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
        {scanningModal && isMobile() && userData && userData["cognito:groups"]?.includes("Admin") && <QrReader
        checkValid={(qrData) => {
          verifyQRData(qrData, data[0].id)
          setOpenScanningModal(false);
        }}
          />}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                {!isLoading && !error && data?.length > 0 && <StyledCard>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data[0]?.name}
                    </Typography>
                    <Typography variant="body2" >
                      {data[0]?.date} {data[0]?.time}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="140" // Adjust the height as needed
                      image={images[0]} // Replace with the path to your image
                      alt="Dinner Image"
                    />
                    <Typography variant="body2" >
                      {data[0]?.location}
                    </Typography>
                    <Typography variant="body2" >
                      {data[0]?.address}
                    </Typography>
                    <Typography variant="body2" >
                      {data[0]?.availableTickets} / {maxTickets}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" >
                      {data[0]?.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {!hasTickets && 
                    <StyledButton disabled size="large" variant="contained">
                      Sold Out
                    </StyledButton>}
                    {hasTickets && <StyledButton onClick={() => setOpenBookingModal(!openBookingModal)}size="large" variant="contained">
                      Buy Ticket - ${data[0]?.ticketPrice}
                    </StyledButton>}
                    {session && isMobile() && <StyledButton onClick={async () =>{
                      await navigator.mediaDevices.getUserMedia({ video: true })
                      setOpenScanningModal(!scanningModal)
                      }}size="large" variant="contained">
                      Scan Ticket
                    </StyledButton>}
                    {/* <StyledButton onClick={() => verifyQRData({"index":10,"userEmail":"shaivkamat@gmail.com","secretKey":"eefa692d-25de-4776-b3a9-64ab1196c82a","id":"c9ac916c-ba4d-4edc-bb48-d02359757d57-10"}, data[0]?.id)}size="large" variant="contained">
                      Test Ticket Verification
                    </StyledButton> */}
                  </CardActions>
                </StyledCard>}
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  {images.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <img
                        alt="Event photograph"
                        className="rounded-lg brightness-90 transition group-hover:brightness-110"
                        src={item}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
      </div>
    )
}
