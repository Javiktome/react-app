/* eslint-disable max-len */
import React, {useState} from 'react';
// import {login} from '../hooks/ApiHooks';
// import {Link} from 'react-router-dom';
// import {useLoginHook} from '../hooks/LoginHook';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import {Paper, Button, Grid, Tooltip} from '@material-ui/core';
import {WbSunny, BrightnessMedium, WbIncandescentSharp, InvertColors, Brush} from '@material-ui/icons';
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

const UploadMedia = () => {
  const classes = useStyles();
  const router = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sepia: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    warmth: 0,
  });

  /**
   * use Register
   * @param {Event} e
   */
  function uploadFile(e) {
    setProgress(true);
    const desc = {
      desc: description,
      filters: filters,
    };
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('title', title);
    formData.append('description', JSON.stringify(desc));
    console.log('-------------', ...formData, progress);

    const options = {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      body: formData,
    };
    const url = 'https://media-new.mw.metropolia.fi/wbma/media';
    /**
     * upload file function
     */
    async function uploadFileFetch() {
      let response = await fetch(url, options);
      response = await response.json();
      console.log(response);
      if (response && response.message && response.file_id) {
        setProgress(false);
        setError(null);
        setTimeout(() => {
          setTitle(null);
          setDescription(null);
          setSelectedImage(null);
          setSelectedImageBase64(null);
          setFilters({
            sepia: 0,
            brightness: 1,
            contrast: 1,
            saturation: 1,
            warmth: 0,
          });
          router.push('/home');
        }, 2000);
      } else {
        setProgress(false);
        setError('Error while uploading file');
      }
    }
    uploadFileFetch();
    e.preventDefault();
  }

  // console.log(setFilters);
  const handleChange = (event, value, key) => {
    console.log('--', key, value);
    setFilters({
      ...filters,
      [key]: value,
    });
  };

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
              validators={['required', 'matchRegexp:^[a-zA-Z ]{6,}$']}
              errorMessages={[
                'Username is required',
                'Title must be greater than 6 characters.',
              ]}
            />
          </div>
          <div>
            <TextValidator
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              validators={['required', 'matchRegexp:^[a-zA-Z ]{15,255}$']}
              errorMessages={[
                'Username is required',
                'Description must be greater than 15 chars and less than 255 chars.',
              ]}
            />
          </div>
          <div>
            <input
              required
              style={{
                margin: '20px 0',
              }}
              onChange={(e) => {
                e.persist();
                console.log(e.target.files);
                setSelectedImage(e.target.files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  // console.log(reader.result);
                  setSelectedImageBase64(reader.result);
                };
                reader.onerror = (err) => {
                  console.log(err);
                };
              }}
              type="file"
            />
          </div>
          {progress ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Upload
            </Button>
          )}
        </ValidatorForm>
        {selectedImage && selectedImage.type.includes('image') ? (
          <>
            <div className={classes.imageDiv}>
              <img
                width="500px"
                height="500px"
                style={{
                  filter: `brightness(${filters.brightness}) sepia(${filters.sepia}) contrast(${filters.contrast}) saturate(${filters.saturation}) hue-rotate(${filters.warmth}deg)`,
                  width: 'inherit',
                  height: 'inherit',
                }}
                src={selectedImageBase64}
                alt=""
              />
            </div>
            <div className={classes.slider}>
              <Grid container style={{flexGrow: 1, margin: '20px 0'}}>
                <Grid item xs={2}>
                  <Tooltip title="Brightness">
                    <WbSunny />
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={filters.brightness}
                    onChange={(e, v) => handleChange(e, v, 'brightness')}
                    min={0}
                    max={4}
                    step={0.01}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item xs={2} style={{transform: 'scale(1.3)'}}>
                  <Tooltip title="Brightness">
                    <WbSunny />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container style={{flexGrow: 1, margin: '20px 0'}}>
                <Grid item xs={2}>
                  <Tooltip title="Contrast">
                    <BrightnessMedium />
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={filters.contrast}
                    onChange={(e, v) => handleChange(e, v, 'contrast')}
                    min={0}
                    max={4}
                    step={0.01}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item xs={2} style={{transform: 'scale(1.3)'}}>
                  <Tooltip title="Contrast">
                    <BrightnessMedium />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container style={{flexGrow: 1, margin: '20px 0'}}>
                <Grid item xs={2}>
                  <Tooltip title="Saturation">
                    <InvertColors />
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={filters.saturation}
                    onChange={(e, v) => handleChange(e, v, 'saturation')}
                    min={0}
                    max={4}
                    step={0.01}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item xs={2} style={{transform: 'scale(1.3)'}}>
                  <Tooltip title="Saturation">
                    <InvertColors />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container style={{flexGrow: 1, margin: '20px 0'}}>
                <Grid item xs={2}>
                  <Tooltip title="Hue">
                    <WbIncandescentSharp />
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={filters.warmth}
                    onChange={(e, v) => handleChange(e, v, 'warmth')}
                    min={0}
                    max={360}
                    step={0.1}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item xs={2} style={{transform: 'scale(1.3)'}}>
                  <Tooltip title="Hue">
                    <WbIncandescentSharp />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container style={{flexGrow: 1, margin: '20px 0'}}>
                <Grid item xs={2}>
                  <Tooltip title="Sepia">
                    <Brush />
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={filters.sepia}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(e, v) => handleChange(e, v, 'sepia')}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item xs={2} style={{transform: 'scale(1.3)'}}>
                  <Tooltip title="Sepia">
                    <Brush />
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </>
        ) : null}
        {selectedImage && selectedImage.type.includes('audio') ? (
          <div className={classes.audio}>
            <audio src={selectedImageBase64} controls></audio>
          </div>
        ) : null}
        {selectedImage && selectedImage.type.includes('video') ? (
          <div className={classes.video}>
            <video src={selectedImageBase64} controls width='500px' ></video>
          </div>
        ) : null}
      </Paper>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default UploadMedia;
