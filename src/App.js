/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './App.css';

/**
 * App Function
 * @return {string}
 */
function App() {
  return (
    <div className="App">
      <MediaTable />
    </div>
  );
}

/**
 * MediaTable Function
 * @return {string}
 */
function MediaTable() {
  const [picArray, setPicArray] = useState(null);
  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(
          'https://media-new.mw.metropolia.fi/wbma/media',
      );
      const json = await response.json();
      console.log(json);
      Promise.all(
          json.map((item) => {
            return fetch(
                'https://media-new.mw.metropolia.fi/wbma/media/' + item.file_id,
            )
                .then((response) => response.json())
                .then((item) => {
                  return item;
                });
          }),
      ).then((response)=> setPicArray(response));
    };
    loadMedia();
  }, []);
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
          target="_blank"
          rel="noreferrer"
          href={
            'http://media-new.mw.metropolia.fi/wbma/uploads/' + item.filename
          }
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

export default App;
