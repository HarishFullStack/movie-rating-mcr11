import { useContext, useEffect, useReducer } from "react";
import {useNavigate} from 'react-router-dom';
import { MoviesContext } from "../context.js/MoviesContext"

export function Movies(){

    const navigate = useNavigate();

    const {movies, genres, year, watchlist, starredList, addToWatchList, addToStarredList} = useContext(MoviesContext);

    const starMovie = (movie) => {
        addToStarredList(movie);
    }

    const watchlistMovie = (movie) => {
        addToWatchList(movie);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const setState = (state) => {
        let sortedData = state.initialMovies

        // GENRE
        sortedData = state.genre !== undefined && state.genre !== "" ? sortedData.filter((item) => item.genre.includes(state.genre)) : sortedData;
    
        // YEAR
        sortedData = state.year > 0
            ? sortedData.filter((item) => item.year === Number(state.year))
            : sortedData;
        
        //RATINGS
        sortedData = state.ratings > 0
            ? sortedData.filter((item) => item.rating === Number(state.ratings))
            : sortedData;
    
        return { ...state, filteredMovies: sortedData };
        };


        useEffect(() => {
            dispatch({type: "INITIAL", value: movies});
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

    const reducer = (state, action) => {

        switch (action.type) {
            case "INITIAL":
                    return setState({
                        ...state,
                        initialMovies: action.value,
                        filteredMovies: action.value
                    });

            case "GENRE":
                return setState({...state, genre: action.value});
        
            case "YEAR":
                return setState({...state, year: action.value});

            case "RATING":
                return setState({
                    ...state, ratings: action.value
            });

            default:
                return state;
        }
    };

    const [state, dispatch]= useReducer(reducer, {
        genre: "",
        year: 0,
        ratings: 0,
        initialMovies: [],
        filteredMovies: []
    });

    return(
        <div className="container">
            <div className="row mt-5 m-auto">
            <h1 className="col-md-3">Movies </h1>
            <select className="col-md-2 mx-2" onChange={(event) => dispatch({type: "GENRE", value: event.target.value})}>
                <option>All Genre</option>
                {
                    genres && genres.map((x) => {
                        return (
                            <option value={x}>{x}</option>
                        )
                    })
                }

            </select>
            <select className="col-md-2 mx-2" onChange={(event) => dispatch({type: "YEAR", value: event.target.value})}>
                <option>Release Year</option>
                {
                    year && year.map((x) => {
                        return (
                            <option value={x}>{x}</option>
                        )
                    })
                }
            </select>
            <select className="col-md-2 mx-2" onChange={(event) => dispatch({type: "RATING", value: event.target.value})}>
                <option value="">Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                    
            </select>
            <button className="btn btn-dark col-md-2 mx-2" onClick={() => navigate('/add-movie')}>Add a Movie</button>
            </div>
            <div className="row mt-5">
            {
                state.filteredMovies.map((x) => {
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