import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { MoviesContext } from '../context.js/MoviesContext';

export function MovieDetails(){

    const {id} = useParams()

    const {movies} = useContext(MoviesContext);

    const [movie, setMovie] = useState({});

    const getMovieById = () => {

        const movie = movies.find((x) => x.id === Number(id));
        setMovie(movie);
    }

    useEffect(() => {
        getMovieById();
                // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        movie && <div className='row mt-5'>
            <div className="card mb-3 m-auto" style={{width: "50%"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={movie.imageURL} className="img-fluid rounded-start" alt="not found"/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{movie.title}</h2>
                        <p className="card-text">{movie.summary}</p>
                        <p className="card-text"><small className="text-body-secondary">Year: {movie.year}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Genre: {movie.genre}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Rating: {movie.rating}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Director: {movie.director}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Writer: {movie.writer}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Cast: {movie.cast}</small></p>


                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}