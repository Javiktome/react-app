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
      const response = await fetch('test.json');
      const json = await response.json();
      setPicArray(Object.values(json));
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
        <img src={item.thumbnails.w160} alt={item.title} />
      </td>
      <td>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </td>
      <td>
        <a target="_blank" rel="noreferrer" href={item.filename}>
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
