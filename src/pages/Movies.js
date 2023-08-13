import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { MoviesContext } from "../context.js/MoviesContext"

export function Movies(){

    const navigate = useNavigate();

    const {movies, addMovies, addToWatchList, addToStarredList} = useContext(MoviesContext);

    const starMovie = (movie) => {
        addToStarredList(movie);
    }

    const watchlistMovie = (movie) => {
        addToWatchList(movie);
    }

    return(
        <div className="row">
            <h1>Movies  </h1>
            <select>
                <option>All Genre</option>
            </select>
            <select>
                <option>Release Year</option>
            </select>
            <select>
                <option>Rating</option>
            </select>
            <button className="btn btn-dark" onClick={() => navigate('/add-movie')}>Add a Movie</button>
            {
                movies.map((x) => {
                    return(
                        <div className="card" style={{width: "18rem"}}>
                            <img src={x.imageURL} className="card-img-top" alt="not found"/>
                            <div className="card-body">
                                <h3>{x.title}</h3>
                                <p>{x.summary}</p>
                                <button className="btn btn-dark" onClick={() => starMovie(x)}>Star</button>
                                <button className="btn btn-dark" onClick={() => watchlistMovie(x)}>Add to Watchlist</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}