import React from 'react';
import {login} from '../hooks/ApiHooks';
import {useLoginHook} from '../hooks/LoginHook';
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

const LoginFrom = () => {
  const classes = useStyles();
  const {inputs, handleInputChange, handleSubmit} = useLoginHook(login);
  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Login Form
        </Typography>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-basic"
              label="username"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default LoginFrom;
