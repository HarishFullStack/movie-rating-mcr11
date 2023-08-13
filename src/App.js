import { Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import { Movies } from './pages/Movies';
import { WatchList } from './pages/WatchList';
import { Starred } from './pages/Starred';
import { MovieDetails } from './pages/MovieDetails';
import { AddMovie } from './pages/AddMovie';
import { useContext } from 'react';
import { MoviesContext } from './context.js/MoviesContext';

function App() {
  const {setSearchTerm, dispatch} = useContext(MoviesContext);

  return (
    <div className="App">
            <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand co" href="/">IMDB</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex m-auto col-md-4" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(event) => dispatch({type: "SEARCH", value: event.target.value})}/>
            </form>
            <ul class="navbar-nav mb-2 mb-lg-0 float-end">
              <li class="nav-item">
                <NavLink className="nav-link" to='/'>Movies</NavLink>
              </li>
              <li class="nav-item">
              <NavLink className="nav-link" to='/watchlist'>Watchlist</NavLink>
              </li>
              <li class="nav-item">
              <NavLink className="nav-link" to='/starred-movies'>Starred Movies</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        
        
        
      <div>
      <Routes>
        <Route path='/' element={<Movies/>}></Route>
        <Route path='/watchlist' element={<WatchList/>}></Route>
        <Route path='/starred-movies' element={<Starred/>}></Route>
        <Route path='/movie/:id' element={<MovieDetails/>}></Route>
        <Route path='/add-movie' element={<AddMovie/>}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
