import React,{useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate,Link } from "react-router-dom";
import {signUpApi} from '../API/Services'


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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const userToken = localStorage.getItem('token');
  const [auth,setAuth] = React.useState({"email": "","password": ""})
  const [confirm,setConfirm] =React.useState("")
  const [errorMail,setError]=React.useState("")
  const [pass,setpass]=useState("")
  const classes = useStyles();
  const navigate = useNavigate();

  const onChangeinput=(event)=>{
    setAuth({...auth,[event.target.name]:event.target.value})
  }
  const onConfirm =(event)=>{
    setConfirm(event.target.value)
    setpass("")
  }
  const emailValidation= () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!auth.email || regex.test(auth.email) === false){
        setError("Email is not valid")
        return false;
    }
    return true;
}

  const onClickSignup = async()=>{
    if(emailValidation()){
        if(auth.password === confirm ){
          if((auth.password).length>5){
            try{
              const data = await signUpApi({"user":auth})
              if(data?.status===200){
                navigate("/login")
              }
            }
            catch(error){
              setError(error.response.data)
            }
            
          }
          else{
            setpass("Password must be min 6 character")
          }
          
        }
        else{
          setpass("Password not matched")
        }
        
    }
    
} 



useEffect(()=>{
  if (userToken !== null) {
      navigate('/');
  }
},[userToken])


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              value={auth.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event)=>onChangeinput(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              value={auth.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event)=>onChangeinput(event)}
              />
            </Grid>
            <Grid item xs={12} style={{marginBottom:"10px"}}>
              <TextField
                value={confirm}
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                onChange={(event)=>onConfirm(event)}
              />
            </Grid>
            <span style={{color:'red',paddingBottom:'15px'}}>{pass}</span>
            <span style={{color:'red',paddingBottom:'15px'}}>{errorMail}</span>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickSignup}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}