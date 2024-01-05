import { useEffect, useState } from "react";
const KEY = '7183f468';

export default function useMovies(query){
    const[movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,  setError] = useState("");

  useEffect(function(){
    const controller = new AbortController();

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie();
      (async function(){
        try{
          setIsLoading(true);
          setError("");
           const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query.trim()}`, {signal:controller.signal});
  
            if(!response.ok)
              throw new Error('Something went wrong with fetching Movies')
             
           const data = await response.json();

           if(data.Response === 'False')
              throw new Error('The movie wasn\' find')

           setMovies(data.Search)
        } catch(err){
          if(err.name !== "AbortError"){
            setError(err.message)
          }
        } finally{
          setIsLoading(false);
        }
      })()

      return function(){
        controller.abort();
      }
  }, [query])

  return {movies, error, isLoading}
}