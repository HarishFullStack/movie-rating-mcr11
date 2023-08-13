import { Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import { Movies } from './pages/Movies';
import { WatchList } from './pages/WatchList';
import { Starred } from './pages/Starred';
import { MovieDetails } from './pages/MovieDetails';
import { AddMovie } from './pages/AddMovie';

function App() {
  return (
    <div className="App">
      <div>
        <NavLink to='/'>Movies</NavLink>
        <NavLink to='/watchlist'>Watchlist</NavLink>
        <NavLink to='/starred-movies'>Starred Movies</NavLink>
      </div>
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
