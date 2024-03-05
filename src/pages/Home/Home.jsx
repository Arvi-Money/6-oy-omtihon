import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

import icon from '../../assets/Path.svg';
import user from '../../assets/Oval.svg';
import bookmark from '../../assets/Bookmark.svg';
import white_bookmark from '../../assets/Bookmark1.svg';
import red_bookmark from '../../assets/Bookmark2.svg';
import tv from '../../assets/tv.svg';
import white_tv from '../../assets/tv1.svg';
import red_tv from '../../assets/tv2.svg';
import square from '../../assets/Shape.svg';
import white_square from '../../assets/Shape1.svg';
import red_square from '../../assets/Shape2.svg';
import movie from '../../assets/Shape (1).svg';
import white_movie from '../../assets/Shape (2).svg';
import red_movie from '../../assets/Shape (3).svg';
import movie2 from '../../assets/Shape 2.svg';
import search from '../../assets/search.svg';
import bookmark1 from '../../assets/Group 27.svg';
import bookmark2 from '../../assets/Group 27 (1).svg';
import play from '../../assets/Group 3.svg';

function Home() {
  const [searching, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState([]);
  const [films, setFilms] = useState([]);
  const [hoveredItem, setHoveredItem] = useState();
  const [focusedItem, setFocusedItem] = useState();

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleFocus = (key) => {
    setFocusedItem(key);
  };

  const handleBlur = () => {
    setFocusedItem(null);
  };

  const navigationItems = [
    { key: "", normal: square, hovered: red_square, focused: white_square },
    { key: "movies", normal: movie, hovered: red_movie, focused: white_movie },
    { key: "series", normal: tv, hovered: red_tv, focused: white_tv },
    { key: "bookmarked", normal: bookmark, hovered: red_bookmark, focused: white_bookmark },
  ];

  const handleSave = (filmId) => {
    setBookmarked((prevSavedFilms) => {
      const isFilmSaved = prevSavedFilms.includes(filmId);
      return isFilmSaved
        ? prevSavedFilms.filter((id) => id !== filmId)
        : [...prevSavedFilms, filmId];
    });
  };

  useEffect(() => {
    fetch('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=100', {
      method: 'GET',
      headers: {
        'X-API-KEY': 'AGPEA25-VEH4588-Q3GQE56-MANT57B'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.docs && Array.isArray(data.docs)) {
          setFilms(data.docs.map((film) => ({ ...film, bookmarked: bookmarked.includes(film.id) })));
        } else {
          console.error('API response does not contain an array of movies:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [bookmarked]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=1&query=${searching}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '8JAEE38-MWQ446K-MMHGH5Z-WCQ7JNB'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.docs && Array.isArray(data.docs)) {
          setFilms(data.docs.map((film) => ({ ...film, bookmarked: bookmarked.includes(film.id) })));
        } else {
          console.error('API response does not contain an array of movies:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [searching]);

  return (
    <>
      <div className="all">
        <div className="leftside">
          <div className="icons">
            <img src={icon} alt="" width="32px" height="25px" />
            {navigationItems.map((item) => (
              <NavLink to={`/${item.key}`} key={item.key} onFocus={() => handleFocus(item.key)} onBlur={handleBlur}>
                <img
                  onMouseEnter={() => handleMouseEnter(item.key)} onMouseLeave={handleMouseLeave} className="navImg"
                  src={hoveredItem === item.key ? item.hovered : focusedItem === item.key ? item.focused : item.normal}
                  alt=""
                />
              </NavLink>
            ))}
          </div>
          <div className="user">
            <img src={user} alt="" />
          </div>
        </div>
        <div className="main">
          <div className="search">
            <img src={search} alt="" />
            <input type="search" placeholder='Search for movies or TV series' onChange={handleChange} />
          </div>
          <h1>Recommended for you</h1>
          <div className="cards">
            {
              films.map((film) => (
                <div className="card" key={film.id}>
                  <div className="photo">
                    <img src={film.backdrop.url} alt="" />
                    <img src={film.bookmarked ? bookmark2 : bookmark1} alt="" className='bkm' onClick={() => handleSave(film.id)} />
                    <img src={play} alt="" className='play' />
                  </div>
                  <div className="information">
                    <div className="info">
                      <p>{film.year}</p>
                      <p>•</p>
                      <img src={movie2} alt="" />
                      <p>{film.type}</p>
                      <p>•</p>
                      <p>PG</p>
                    </div>
                    <div className="name">
                      <h1>{film.name}</h1>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
