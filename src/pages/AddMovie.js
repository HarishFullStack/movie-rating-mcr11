import { useContext, useEffect, useReducer, useState } from "react"
import { MoviesContext } from "../context.js/MoviesContext";

export function AddMovie(){

    const {movies, genres, addMovie, addToWatchlist, addToStarredList} = useContext(MoviesContext);

    const [year, setYear] = useState([]);
    const [rating, setRating]= useState (0);

    const addYear = () => {
        let years = [];
        const todaysYear = new Date().getFullYear();
        for(let i=todaysYear-100; i<=todaysYear+1; i++){
            years.push(i);
        }
        setYear(years);

    }

    const reducer = (state, action) => {
        switch(action.type){
            case "TITLE":
                return {...state, title: action.value}
            case "SUMMARY":
                return {...state, summary: action.value}
            case "YEAR":
                return {...state, year: Number(action.value)}
            case "CAST":
                return {...state, cast: action.value}
            case "GENRE":
                return {...state, genre: action.checked ? [...state.genre, action.value] : [state.genre.filter((x) => x !== action.value)]}
            case "RATINGS":
                return {...state, ratings: Number(action.value)}
            case "DIRECTOR":
                return {...state, director: action.value}
            case "WRITER":
                return {...state, writer: action.value}
            case "IMAGE":
                return {...state, imageUrl: action.value}
            default:
                return {...state}
        }
    }

    const [state, dispatch]= useReducer(reducer, {
        title: "",
        summary: "",
        year: 0,
        cast: "",
        genre: [],
        ratings: 0,
        director: "",
        writer: "",
        image: ""
    });

    const handleAddMovie = () => {
        addMovie({...state, id:movies.length+1})
    }

    useEffect(() => {
        addYear();
    }, [])

    return(
        <div>
            <h1>Add New Movie</h1>
            <div className="col-sm-12 col-md-4 col-lg-4 col-12">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Title" onChange={(event) => dispatch({ type: "TITLE", value: event.target.value})}/>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="summary" rows={6} placeholder="Summary" onChange={(event) => dispatch({ type: "SUMMARY", value: event.target.value})}/>
                    <label htmlFor="summary">Summary</label>
                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(event) => dispatch({ type: "YEAR", value: event.target.value})}>
                        <option selected>Select Year</option>
                        {
                            year && year.map((x) => {
                                return(
                                    <option key={x} value={x}>{x}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="floatingSelect">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="cast" placeholder="Cast" onChange={(event) => dispatch({ type: "CAST", value: event.target.value})}/>
                    <label htmlFor="cast">Cast</label>
                </div>
                
                <label>Genres</label>
                <div class="btn-group mb-3" role="group" aria-label="Basic checkbox toggle button group">
                {
                    genres && genres.map((x) => {
                        return(
                            <>
                                <input type="checkbox" class="btn-check" id={x} autocomplete="off" onChange={(event) => dispatch({ type: "GENRE", checked: event.target.checked, value: x})}/>
                                <label class="btn btn-outline-primary" for={x}>{x}</label>
                            </>
                        )
                    })
                }
                </div>
                
                <label>Ratings</label>
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03" onClick={() => rating>= 1 ? setRating(rating-1) : rating}>-</button>
                    <input type="text" class="form-control" value={rating} max={5} id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(event) => dispatch({ type: "RATINGS", value: event.target.value})}/>
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={() => rating< 10 ? setRating(rating+1) : rating}>+</button>
                </div>


                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="director" placeholder="Director" onChange={(event) => dispatch({ type: "DIRECTOR", value: event.target.value})}/>
                    <label htmlFor="director">Director</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="writer" placeholder="Writer" onChange={(event) => dispatch({ type: "WRITER", value: event.target.value})}/>
                    <label htmlFor="writer">Writer</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="imageUrl" placeholder="Image URL" onChange={(event) => dispatch({ type: "IMAGE", value: event.target.value})}/>
                    <label htmlFor="imageUrl">Image URL</label>
                </div>
            </div>
            <div className=""><button className="btn btn-primary" onClick={handleAddMovie}>Add Movie</button></div>
        </div>
    )
}