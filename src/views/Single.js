/* eslint-disable max-len */
import React from 'react';
import {useParams} from 'react-router-dom';
import {useSingleMedia} from '../hooks/ApiHooks';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  container: {
    width: '80%',
    margin: '50px auto',
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 500,
  },
});

const mediaUrl =
  'https://media-new.mw.metropolia.fi/wbma/uploads/';

const Single = () => {
  const classes = useStyles();
  const url = 'https://media-new.mw.metropolia.fi/wbma/media';
  const {id} = useParams();
  const file = useSingleMedia(url + '/' + id);
  console.log('--file--', file);
  return (
    <div className={classes.container}>
      <Typography variant="h3" gutterBottom>
        {file?.title}
      </Typography>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              mediaUrl + file?.filename
            }
            title={file?.title}
          />

        </CardActionArea>

      </Card>

    </div>
  );
};

// TODO: add propTypes

export default Single;
