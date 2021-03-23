/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const picArray = [
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    title: 'Title 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/162',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    title: 'Title 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/163',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

/**
 * App Function
 * @return {string}
 */
function App() {
  return (
    <div className="App">
      <MediaTable picArray={picArray} />
    </div>
  );
}

/**
 * MediaTable Function
 * @return {string}
 */
function MediaTable({picArray}) {
  return (
    <table>
      <tbody>
        {picArray.map((item, index) => (
          <MediaRow key={index} item={item} />
        ))}
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
