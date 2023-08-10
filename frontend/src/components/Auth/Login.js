import React, { useEffect } from 'react';
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
import {loginApi} from '../API/Services'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  const [auth,setAuth] = React.useState({"email": "","password": ""})
  const [errorMail,setError]=React.useState("")
  const classes = useStyles();


  const emailValidation= () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!auth.email || regex.test(auth.email) === false){
        setError("Email is not valid")
        return false;
    }
    return true;
}

  const onChangeinput=(event)=>{
    setAuth({...auth,[event.target.name]:event.target.value})
  }

  const onClickLogin = async()=>{
        if(emailValidation()){
          try{
            const data = await loginApi({"user":auth})
          if(data.status===200){
            localStorage.setItem('token', data.headers.authorization);
            localStorage.setItem('user', JSON.stringify(data.data.status.data));
            navigate("/")
            
          }
          }
          catch(error){
            setError(error.response.data)
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={auth.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>onChangeinput(event)}
          />
          
          <TextField
            value={auth.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>onChangeinput(event)}
          />
          <span style={{color:'red',paddingBottom:'10px'}}>{errorMail}</span>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickLogin}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup">
                Already have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}