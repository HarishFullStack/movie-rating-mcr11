import { createContext, useEffect, useState } from "react";
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

useEffect(() => {
    addYear();
}, [])

    return(
        <MoviesContext.Provider value={{movies, genres, year, watchlist, starredList, addMovie, addToWatchList, addToStarredList, deleteFromWatchList, deleteFromStarred}}>{children}</MoviesContext.Provider>
    )
}