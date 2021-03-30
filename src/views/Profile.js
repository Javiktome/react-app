import React, {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
  container: {
    width: '80%',
    margin: '50px auto',
  },
  card: {
    maxWidth: 345,
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  return (
    <>
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Name : {user.full_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Username : {user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Email : {user.email}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
