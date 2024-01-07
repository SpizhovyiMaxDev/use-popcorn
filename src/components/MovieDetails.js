import { useState, useEffect, useRef } from "react";
import StarRaing from "./StarRating";
import useKey from "../hooks/useKey";
import { Loader } from "./Loader";
const KEY = '7183f468';

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map(m => m.imdbID).includes(movie.imdbID);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedId)?.userRating;
  const countRating = useRef(0);

  useEffect(function () {
    if (userRating)
      countRating.current++;
  }, [userRating]);

  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Deirector: director, Genre: genre,
  } = movie;

  useKey('Escape', onCloseMovie);

  useEffect(function () {

    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        if (!response.ok)
          throw new Error('Something wrong with the movie server');

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();

  }, [selectedId]);

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split(' ').at(0),
      userRating,
      countRatingDecision: countRating.current,
    };


    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ?
        <Loader />
        :
        <>
          <header>

            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={'Post of' + movie} />


            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p><span>⭐️</span> {imdbRating} IMDB Rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRaing maxRating={10} size={window.innerWidth > 450 ? 24 : 16} onSetRating={setUserRating} />
                  {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+  Add to list</button>}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} <span>⭐️</span></p>
              )}
            </div>

            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  );
}
