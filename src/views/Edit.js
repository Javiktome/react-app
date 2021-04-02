/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useParams} from 'react-router-dom';
import {useSingleMedia} from '../hooks/ApiHooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Paper, Button} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '41ch',
      margin: '0 auto',
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
    width: '500px',
    margin: '20px auto',
    textAlign: 'center',
  },
  imageDiv: {
    width: '350px',
    height: '350px',
    margin: '40px auto',
    boxShadow: '0 3px 6px #00000029',
  },
  slider: {
    width: '41ch',
    margin: '0 auto',
  },
  audio: {
    'margin': '50px 0',
    '& > audio': {
      width: '100%',
    },
  },
  video: {
    margin: '50px 0',
  },
}));

const EditMedia = () => {
  const classes = useStyles();
  const router = useHistory();
  const {id} = useParams();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [progress, setProgress] = useState(false);
  const url = 'https://media-new.mw.metropolia.fi/wbma/media';
  const file = useSingleMedia(url + '/' + id);
  console.log('--file--', file);


  useEffect(() => {
    if (file) {
      setTitle(file?.title);
      let descriptionfile = file?.description;
      try {
        descriptionfile = JSON.parse(file?.description);
      } catch (e) {
        // console.log(e);
      }
      console.log(descriptionfile);
      if (descriptionfile && descriptionfile.desc) {
        setDescription(descriptionfile.desc);
      } else {
        setDescription(descriptionfile);
      }
    }
  }, [file]);

  console.log(title, description, '----');

  /**
   * use Register
   * @param {Event} e
   */
  function uploadFile(e) {
    setProgress(true);
    let descriptionfile = file?.description;
    try {
      descriptionfile = JSON.parse(file?.description);
    } catch (e) {
      // console.log(e);
    }
    console.log(descriptionfile, '----------------');
    const desc = {
      desc: description,
      filters: descriptionfile.filters,
    };
    const data = {
      title,
      description: desc,
    };
    console.log(data, '--------------data-------------');

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: data,
    };
    /**
     * upload file function
     */
    async function uploadFileFetch() {
      let response = await fetch(url+'/'+id, options);
      console.log(url, options);
      response = await response.json();
      console.log(response);
      try {
        if (response && response.message) {
          setTimeout(() => {
            setTitle(null);
            setDescription(null);
            router.push('/myFiles');
          }, 2000);
        }
      } catch (e) {
        console.log('e--', e);
      }
      setProgress(false);
    }
    uploadFileFetch();
    e.preventDefault();
  }


  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <ValidatorForm
          className={classes.root}
          onSubmit={uploadFile}
          onError={(errors) => console.log('error', errors)}
        >
          <div>
            <TextValidator
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              validators={['matchRegexp:^[a-zA-Z ]{6,}$']}
              errorMessages={[
                'Title must be greater than 6 characters.',
              ]}
            />
          </div>
          <div>
            <TextValidator
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              validators={['matchRegexp:^[a-zA-Z ]{15,}$']}
              errorMessages={[
                'Description must be greater than 15 chars and less than 255 chars.',
              ]}
            />
          </div>
          {progress ? (
            <CircularProgress />
          ) : (
            <Button style={{margin: '30px 0'}} variant="contained" color="primary" type="submit">
              Update
            </Button>
          )}
        </ValidatorForm>
      </Paper>
    </>
  );
};

export default EditMedia;
