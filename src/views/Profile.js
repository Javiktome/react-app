/* eslint-disable max-len */
import React, {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {update, useCurrentUserFileDetails} from '../hooks/ApiHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useUpdateHook} from '../hooks/UpdateHooks';


const useStyles = makeStyles({
  container: {
    width: '80%',
    margin: '50px auto',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  root: {
    '& > *': {
      width: '41ch',
    },
    '& > * > *': {
      width: '-webkit-fill-available',
    },
    '& > * > * > *': {
      width: '-webkit-fill-available',
    },
  },
  button: {
    margin: '20px 0',
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const fileDetails = useCurrentUserFileDetails();
  const {inputs, handleInputChange, handleSubmit, errors} = useUpdateHook(update);
  console.log('--user--', user, fileDetails, errors, inputs);
  useEffect(() => {
    handleInputChange({target: {name: 'username', value: user.username}});
    handleInputChange({target: {name: 'email', value: user.email}});
  }, [fileDetails]);
  return (
    <>
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  'http://media-new.mw.metropolia.fi/wbma/uploads/' +
                  fileDetails[0]?.filename
                }
                title={fileDetails[0]?.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Name : {user.full_name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
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
                    label="Change Password"
                    name="password"
                    onChange={handleInputChange}
                    value={inputs.password}
                    type="password"
                    validators={['matchRegexp:^[a-zA-Z0-9 ]{6,}$']}
                    errorMessages={[
                      'Password must be greater than 5 characters.',
                    ]}
                  />
                </div>
                <Button className={classes.button} variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </ValidatorForm>
            </CardActions>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
