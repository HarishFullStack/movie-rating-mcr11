import { useContext } from "react";
import { MovieDetails } from "./MovieDetails";
import { MoviesContext } from "../context.js/MoviesContext";

export function WatchList(){

    const {movies, watchlist, addMovies, addToWatchList, addToStarredList, deleteFromWatchList} = useContext(MoviesContext);

    const removeFromWatchlist = (id) => {
        deleteFromWatchList(id);
    }

    return(
        <div className="row">
            {watchlist.map((x) => {
                    return(
                        <div className="card" style={{width: "18rem"}}>
                            <img src={x.imageURL} className="card-img-top" alt="not found"/>
                            <div className="card-body">
                                <h3>{x.title}</h3>
                                <p>{x.summary}</p>
                                <button className="btn btn-dark" onClick={() => removeFromWatchlist(x.id)}>Remove from Watchlist</button>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}