import { useContext } from "react";
import { MoviesContext } from "../context.js/MoviesContext";
import {useNavigate} from 'react-router-dom';


export function WatchList(){
    const navigate = useNavigate();

    const {watchlist,deleteFromWatchList} = useContext(MoviesContext);

    const removeFromWatchlist = (id) => {
        deleteFromWatchList(id);
    }

    return(
        <div className="container">
            <h1 className="col-md-3 mt-5">Watchlist </h1>
            <div className="row mt-5 m-auto">
                {watchlist.map((x) => {
                        return(
                            <div className="card" style={{width: "18rem"}}>
                                <img src={x.imageURL} className="card-img-top" alt="not found" onClick={() => navigate(`/movie/${x.id}`)}/>
                                <div className="card-body">
                                    <h3>{x.title}</h3>
                                    <p>{x.summary}</p>
                                    <button className="btn btn-dark float-start" onClick={() => removeFromWatchlist(x.id)}>Remove from Watchlist</button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}