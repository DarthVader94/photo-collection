import React, {useState, useEffect} from 'react';
import './index.scss';
import {Collection} from './Collection';

const collects = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];

function App() {
  
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [collections, setColections] = useState([]);
  const [searchValue, setSerchValue] = useState('');

  useEffect(() => {

    setLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://6748b5e85801f5153591ed33.mockapi.io/colection-photo?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then((json) => {
        setColections(json)
      })
      .catch((err) => {
        console.warn(err);
        alert('Error data')
      }).finally(() => setLoading(false));
  }, [categoryId, page]);

  

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            collects.map((obj, i) =>
              <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active': ''}
              key={obj.name}>
              {obj.name}
            </li>)
          }
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSerchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">

        {
          isLoading
            ? (<h2>loading</h2>)
            : (collections
            .filter(obj => {
              return obj.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />)
          ))
        }
        
      </div>
      <ul className="pagination">

        {[...Array(5)].map((_, i) =>
        (<li onClick={() => setPage(i + 1)}
          className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)
        )}

      </ul>
    </div>
  );
}

export default App;
