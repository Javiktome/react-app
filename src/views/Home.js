/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {useAllMedia} from '../hooks/ApiHooks';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <MediaTable />
    </>
  );
};


/**
 * MediaTable Function
 * @return {string}
 */
function MediaTable() {
  const picArray = useAllMedia('https://media-new.mw.metropolia.fi/wbma/media');
  console.log(picArray);
  return (
    <table>
      <tbody>
        {picArray &&
          picArray.map((item, index) => <MediaRow key={index} item={item} />)}
      </tbody>
    </table>
  );
}

MediaTable.propTypes = {
  picArray: PropTypes.array,
};


/**
 * MediaRow Function
 * @return {string}
 */
function MediaRow({item}) {
  return (
    <tr>
      <td>
        <img
          src={
            'http://media-new.mw.metropolia.fi/wbma/uploads/' +
            item.thumbnails.w160
          }
          alt={item.title}
        />
      </td>
      <td>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </td>
      <td>
        <a
          href={`/media/${item.file_id}`}
        >
          View
        </a>
      </td>
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.object,
};


export default Home;
