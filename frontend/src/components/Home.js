import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {getEmailApi,logOutApi,sendEmailApi} from "./API/Services"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  icon:{
    display:'flex',
    justifyContent:'end'
  },
  icondiv:{
    margin:'15px',
    padding:'5px 10px',
    borderRadius: '15px',
    cursor:'pointer'
  },
  mainContainer:{
    display:'flex',
    justifyContent:'center',
    width:"100%"
  },
  innerContainer:{
    width:'50%', 
    padding:'50px'
  },
  buttoncontain:{
    display:'flex',
    justifyContent:'center',
    paddingTop:"20px"
  },
  referList:{
    display:'flex',
    justifyContent:'center'
  },
  emailList:{
    overflow:'auto',
    maxHeight:'80%'
  }
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home = () => {
  const classes = useStyles();
  const dataUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [errorMail,setError]= useState("")
  const [emailList,setList] = useState([])
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const emailValidation= () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!email || regex.test(email) === false){
        setError("Email is not valid")
        return false;
    }
    return true;
}

const onChangeEmail = (event)=>{
  setEmail(event.target.value)
  setError("")
}

const sendEmail= async()=>{
  if(emailValidation()){
    const data2 ={
      "sender_email": dataUser.email,
      "recipient_email": email
    }
    const data = await sendEmailApi(data2)
    if(data.status===200){
      handleList()
      handleClick()
    }
    setEmail("")
}
}

const handleList=async()=>{
  try{
    const data = await getEmailApi()
    setList(data.data.referred_emails)
  }
  catch(error){
    localStorage.clear()
    navigate('/login')
  }

}

const handleLogout= async()=>{
  const data = await logOutApi()
  if(data.status === 200){
    navigate('/login')
    localStorage.clear()
  }
}

useEffect(()=>{
  setTimeout(()=>{
    handleList()
  },1000)
},[])

    return (                        
        <div> 
        <Grid className={classes.icon}><div onClick={handleLogout} className={classes.icondiv}><ExitToAppIcon/></div></Grid>            
            <Grid className={classes.mainContainer}> 
            
            <Grid className={classes.innerContainer}>      
                <Grid >                    
                <TextField type='text' style={{width:'100%'}} value={email} id="outlined-basic" label="Email Address" variant="outlined" onChange={(event)=>onChangeEmail(event)} />
                <span style={{color:'red'}}>{errorMail}</span>
                </Grid>
                <Grid className={classes.buttoncontain} >                    
                <Button variant="contained" disabled={email.length>5 ? false : true} color="primary" onClick={sendEmail}>Send Mail</Button>
                </Grid>
                </Grid>
              </Grid>
            <Grid item xs={12} md={6}>
                     
    </Grid> 
    <Grid className={classes.referList}>
    <div style={{width:'40%'}}>
          <Typography variant="h6" style={{paddingBottom:'10px'}}>
            Referral Emails
          </Typography>
          <div className={classes.emailList}>
            <List >
            {!emailList.length>0 ? <ListItem >
                  <ListItemText>No Referral Email Found... </ListItemText>
                </ListItem> 
                :
                emailList.map((item,index)=>(
              <ListItem key={index}>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
            ))}
            </List>
          </div>
          </div>
          </Grid>   
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> Successfully Delivered Mail</Alert>
      </Snackbar>                                           
        </div>
    );
}
export default Home
