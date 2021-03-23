/* eslint-disable max-len */
import React from 'react';
import {useParams} from 'react-router-dom';
import {useSingleMedia} from '../hooks/ApiHooks';

const mediaUrl =
  'https://media-new.mw.metropolia.fi/wbma/uploads/';

const Single = () => {
  const url = 'https://media-new.mw.metropolia.fi/wbma/media';
  const {id} = useParams();
  const file = useSingleMedia(url + '/' + id);
  console.log('--file--', file);
  return (
    <React.Fragment>
      <h1>{file?.title}</h1>
      <img src={mediaUrl + file?.filename} alt={file?.title} />
    </React.Fragment>
  );
};

// TODO: add propTypes

export default Single;
