import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { MoviesContext } from "../context.js/MoviesContext"

export function Movies(){

    const navigate = useNavigate();

    const {movies, watchlist, starredList, addToWatchList, addToStarredList} = useContext(MoviesContext);

    const starMovie = (movie) => {
        addToStarredList(movie);
    }

    const watchlistMovie = (movie) => {
        addToWatchList(movie);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    return(
        <div className="container">
            <div className="row mt-5 m-auto">
            <h1 className="col-md-3">Movies </h1>
            <select className="col-md-2 mx-2">
                <option>All Genre</option>
            </select>
            <select className="col-md-2 mx-2">
                <option>Release Year</option>
            </select>
            <select className="col-md-2 mx-2">
                <option>Rating</option>
            </select>
            <button className="btn btn-dark col-md-2 mx-2" onClick={() => navigate('/add-movie')}>Add a Movie</button>
            </div>
            <div className="row mt-5">
            {
                movies.map((x) => {
                    return(
                        <div className="card m-auto" style={{width: "18rem"}}>
                            <img src={x.imageURL} className="card-img-top" alt="not found"  onClick={() => navigate(`/movie/${x.id}`)}/>
                            <div className="card-body">
                                <h3>{x.title}</h3>
                                <p>{x.summary}</p>
                                <button className="btn btn-dark float-start" onClick={() => starMovie(x)}>{ starredList.filter((y) => y.id === x.id).length > 0 ? 'Starred' : 'Star'}</button>
                                <button className="btn btn-dark float-end" onClick={() => watchlistMovie(x)}>{ watchlist.filter((y) => y.id === x.id).length > 0 ? 'Added to Watchlist' : 'Add to Watchlist'}</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}