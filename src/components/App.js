import { useState } from "react";
import useMovies from "../hooks/useMovies";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { Message } from "./Message";
import { MovieDetails } from "./MovieDetails";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Box } from "./Box";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Main } from "./Main";
import { MovieList } from "./MovieList";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovieList } from "./WatchedMovieList";
const KEY = '7183f468';

export const average = (arr) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const {isLoading, error, movies} = useMovies(query);
   
   function handleSelectMovie(id){
         setSelectedId(curId => curId === id ? null : id)
   }

   function handleCloseMovie(){
       setSelectedId(null);
   }

   function handleAddWatch(movie){
        setWatched(wathced => [...watched, movie]);
        // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
   }

  function handleDeleteWatched(movie){
    setWatched(watched => watched.filter(watchedMovie => watchedMovie.imdbID !== movie.imdbID));
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }


  return (
    <>
      <NavBar>
        <Logo /> 
        <Search query={query} setQuery={setQuery} /> 
        <NumResults movies = {movies}/> 
      </NavBar>
      <Main>
        <Box>
        {
          query.length < 3 && <Message />
        }
        {
          isLoading && <Loader />
        }
         {   
           !isLoading && !error && <MovieList movies = {movies} onSelectMovie = {handleSelectMovie}/>
        }

        {
          error && <ErrorMessage error = {error}/> 
        }
        </Box> 
        <Box>
          {
              selectedId ? 
                <MovieDetails 
                  selectedId={selectedId} 
                  onCloseMovie = {handleCloseMovie} 
                  onAddWatched = {handleAddWatch} 
                  watched = {watched}
                /> 
              : 
              <>
                <WatchedSummary watched = {watched} /> 
                <WatchedMovieList watched = {watched} onDeleteWatched = {handleDeleteWatched}/> 
              </>
          }
        </Box> 
      </Main>
    </>
  );
}

