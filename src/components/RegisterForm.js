/* eslint-disable react/no-string-refs */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {register} from '../hooks/ApiHooks';
import {Link} from 'react-router-dom';
import {useRegisterHook} from '../hooks/RegisterHooks';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Paper, Snackbar} from '@material-ui/core';
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
  snackbar: {
    '& >div': {
      background: '#2196f3',
    },
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [snackBar, setSnackBar] = useState(false);
  const {inputs, handleInputChange, handleSubmit, errors} = useRegisterHook(register);
  // console.log(inputs.password);
  useEffect(() => {
    if (errors && errors?.message) {
      setSnackBar(true);
    }
  }, [errors]);
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      // console.log('---password--------', value, inputs.password);
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  }, [inputs]);
  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Register Form
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
              label="Full Name"
              name="full_name"
              onChange={handleInputChange}
              value={inputs.full_name}
              validators={['required', 'matchRegexp:^[a-zA-Z ]{3,}$']}
              errorMessages={[
                'Full Name is required',
                'Full Name must be greater than 3 characters.',
              ]}
            />
          </div>
          <div>
            <TextValidator
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
              validators={['required', 'isEmail']}
              errorMessages={['Email is required', 'Email is not Valid.']}
            />
          </div>
          <div>
            <TextValidator
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              type='password'
              validators={['required', 'matchRegexp:^[a-zA-Z0-9 ]{6,}$']}
              errorMessages={[
                'Password is required',
                'Password must be greater than 5 characters.',
              ]}
            />
          </div>
          <div>
            <TextValidator
              type='password'
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={inputs.confirmPassword}
              validators={['isPasswordMatch', 'required']}
              errorMessages={['Password does not match.', 'Confirm Password is required']}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </ValidatorForm>
        <Link to="/">
          Already an account? <u>Login here.</u>
        </Link>
        <Snackbar
          className={classes.snackbar}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={snackBar}
          onClose={() => setSnackBar(false)}
          message={errors?.message}
        />
      </Paper>
    </>
  );
};

export default RegisterForm;
