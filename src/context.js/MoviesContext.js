import { createContext, useEffect, useReducer, useState } from "react";
import { movies as moviesData } from "../db/movies";

export const MoviesContext = createContext();


export function MoviesProvider({children}){

    const [movies, setMovies] = useState(moviesData);
    const [watchlist, setWatchlist] = useState([]);
    const [starredList, setStarredList] = useState([]);
    const genres = ['Crime', 'Drama', 'Action', 'Adventure', 'Fantasy', 'Romance', 'Sci-Fi', 'Biography'];
    const [year, setYear] = useState([]);

    const addMovie = (movie) => {
        setMovies([...movies, movie]);
    }

    const addToWatchList = (movie) => {
        setWatchlist([...watchlist, movie]);
    }

    const addToStarredList = (movie) => {
        setStarredList([...starredList, movie]);
    }

    const deleteFromWatchList = (id) => {
        let newWatchlist = watchlist.filter((x) => x.id !== id);
        setWatchlist(newWatchlist);
    }

    const deleteFromStarred = (id) => {
        let newStarredlist = starredList.filter((x) => x.id !== id);
        setStarredList(newStarredlist);
    }

    const addYear = () => {
        let years = [];
        const todaysYear = new Date().getFullYear();
        for(let i=todaysYear-100; i<=todaysYear+1; i++){
            years.push(i);
        }
        setYear(years);

    }

    const setState = (state) => {
        let sortedData = state.initialMovies

        //SEARCH
        sortedData = state.searchTerm !== "" ? sortedData.filter((item) => item.title.toLowerCase().includes(state.searchTerm.toLowerCase())) : sortedData;

        // GENRE
        sortedData = state.genre !== undefined && state.genre !== "" && state.genre !== "0" ? sortedData.filter((item) => item.genre.includes(state.genre)) : sortedData;
    
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
            
            case "SEARCH":
                return setState({...state, searchTerm: action.value})

            case "GENRE":
                return setState({...state, genre: action.value});
        
            case "YEAR":
                return setState({...state, year: Number(action.value)});

            case "RATING":
                return setState({
                    ...state, ratings: Number(action.value)
            });

            default:
                return state;
        }
    };

    const [state, dispatch]= useReducer(reducer, {
        searchTerm: "",
        genre: "",
        year: 0,
        ratings: 0,
        initialMovies: [],
        filteredMovies: []
    });

    useEffect(() => {
        addYear();
    }, [])

        return(
            <MoviesContext.Provider value={{movies, genres, year, watchlist, starredList, state, dispatch, addMovie, addToWatchList, addToStarredList, deleteFromWatchList, deleteFromStarred}}>{children}</MoviesContext.Provider>
        )
    }