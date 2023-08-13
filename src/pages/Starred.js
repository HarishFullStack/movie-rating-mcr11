import { useContext } from "react";
import { MoviesContext } from "../context.js/MoviesContext";

export function Starred(){
    const {movies, watchlist, starredList, addMovies, addToWatchList, addToStarredList, deleteFromWatchList, deleteFromStarred} = useContext(MoviesContext);

    const removeFromStarredlist = (id) => {
        deleteFromStarred(id);
    }

    return(
        <div className="row">
            {starredList.map((x) => {
                    return(
                        <div className="card" style={{width: "18rem"}}>
                            <img src={x.imageURL} className="card-img-top" alt="not found"/>
                            <div className="card-body">
                                <h3>{x.title}</h3>
                                <p>{x.summary}</p>
                                <button className="btn btn-dark" onClick={() => removeFromStarredlist(x.id)}>Unstar</button>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}