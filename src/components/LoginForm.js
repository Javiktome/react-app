/* eslint-disable max-len */
import React from 'react';
import {login} from '../hooks/ApiHooks';
import {Link} from 'react-router-dom';
import {useLoginHook} from '../hooks/LoginHook';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Paper} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '41ch',
    },
    '& > * > *': {
      width: '-webkit-fill-available',
    },
    '& > * > * > *': {
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

const LoginFrom = () => {
  const classes = useStyles();
  const {inputs, handleInputChange, handleSubmit, errors} = useLoginHook(login);
  console.log('-', errors);
  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Login Form
        </Typography>
        <ValidatorForm
          className={classes.root}
          onSubmit={handleSubmit}
          onError={(errors) => console.log('error', errors)}
        >
          <div>
            <TextValidator
              onChange={handleInputChange}
              label="Username"
              name="username"
              value={inputs.username}
              validators={['required', 'matchRegexp:^[a-zA-Z ]{3,}$']}
              errorMessages={[
                'Username is required',
                'Username must be greater than 3 characters.',
              ]}
            />
          </div>
          <div>
            <TextValidator
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              type="password"
              validators={['required', 'matchRegexp:^[a-zA-Z0-9 ]{6,}$']}
              errorMessages={[
                'Password is required',
                'Password must be greater than 5 characters.',
              ]}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          {errors && errors.message ? <p style={{color: 'red'}}>{errors.message}</p> : null}
        </ValidatorForm>
        <Link to="/register">
          Not an account yet? <u>Sign up here</u>.
        </Link>
      </Paper>
    </>
  );
};

export default LoginFrom;
