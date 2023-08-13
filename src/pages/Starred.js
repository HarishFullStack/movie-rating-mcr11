import { useContext } from "react";
import { MoviesContext } from "../context.js/MoviesContext";
import {useNavigate} from 'react-router-dom';

export function Starred(){
    const navigate = useNavigate();
    const {starredList, deleteFromStarred} = useContext(MoviesContext);

    const removeFromStarredlist = (id) => {
        deleteFromStarred(id);
    }

    return(
        <div className="container">
            <h1 className="col-md-3 mt-5">Starred Movies</h1>
            <div className="row mt-5">
                {starredList.map((x) => {
                        return(
                            <div className="card" style={{width: "18rem"}}>
                                <img src={x.imageURL} className="card-img-top" alt="not found" onClick={() => navigate(`/movie/${x.id}`)}/>
                                <div className="card-body">
                                    <h3>{x.title}</h3>
                                    <p>{x.summary}</p>
                                    <button className="btn btn-dark" onClick={() => removeFromStarredlist(x.id)}>Unstar</button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}