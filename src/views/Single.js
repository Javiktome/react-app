/* eslint-disable max-len */
import React from 'react';
import {useParams} from 'react-router-dom';
import {useSingleMedia} from '../hooks/ApiHooks';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


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
  let description;
  let userDescription;
  if (file) {
    description = file?.description;
    let filters = null;
    try {
      description = JSON.parse(file?.description);
      filters = description.filters;
      description = description.desc;
      console.log(description);
      console.log(filters, typeof filters);
    } catch (e) {
      // console.log(e);
    }
  }
  console.log('=====user desc=====', userDescription);
  return (
    <div className={classes.container}>
      <Typography variant="h3" gutterBottom>
        {file?.title}
      </Typography>
      <Card className={classes.card}>
        <CardActionArea>
          {file?.media_type === 'image' ? (
            <CardMedia
              className={classes.media}
              image={mediaUrl + file?.filename}
              title={file?.title}
            />
          ) : file?.media_type === 'audio' ? (
            <audio src={mediaUrl + file?.filename} controls></audio>
          ) : (
            <video controls src={mediaUrl + file?.filename}></video>
          )}
        </CardActionArea>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Uploaded By : {file?.full_name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Username : {file?.username}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// TODO: add propTypes

export default Single;
