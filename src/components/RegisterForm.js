// import React from 'react';
import {register} from '../hooks/ApiHooks';
import {useRegisterHook} from '../hooks/RegisterHooks';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '41ch',
    },
    '& > * > *': {
      width: '-webkit-fill-available',
    },
  },
  paper: {
    padding: '20px',
    width: '400px',
    margin: '20px auto',
    textAlign: 'center',
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const {inputs, handleInputChange, handleSubmit} = useRegisterHook(register);
  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Register Form
        </Typography>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-basic"
              label="Username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Full Name"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default RegisterForm;
