/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';

/**
 * use All Media Function
 * @param {string} url
 * @return {Array} [data,loading]
 */
function useAllMedia(url) {
  const [data, setData] = useState([]);

  /**
   * use load media function
   */
  async function loadMedia() {
    const response = await fetch(url);
    const json = await response.json();
    Promise.all(
        json.map((item) => {
          return fetch(
              url +'/'+ item.file_id,
          )
              .then((response) => response.json())
              .then((item) => {
                console.log(item);
                return item;
              });
        }),
    ).then((response) => setData(response));
  }
  useEffect(() => {
    loadMedia();
  }, []);
  return data;
}

/**
 * use All Media Function
 * @param {string} url
 * @return {Array} [data,loading]
 */
function useSingleMedia(url) {
  const [data, setData] = useState([]);

  /**
   * use load media function
   */
  async function loadMedia() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }
  useEffect(() => {
    loadMedia();
  }, []);
  return data;
}

export {useAllMedia, useSingleMedia};
