import { useState, useEffect } from "react";
import StarRaing from "./StarRating";
const KEY = '7183f468';


const average = (arr) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function App() {
  const[movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,  setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(function(){
    const data = JSON.parse(localStorage.getItem('watched'));
    return data;
  });

  useEffect(function(){

    const controller = new AbortController();;

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
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

   useEffect(function(){
     localStorage.setItem('watched', JSON.stringify(watched));
   }, [watched]);

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

function Message(){
  return <p className="message"> Search a movie (-.-)| </p>
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }){
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map(m => m.imdbID).includes(movie.imdbID);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedId)?.userRating;
  

  const {
    Title:title,
    Year:year,
    Poster:poster,
    Runtime:runtime,
    imdbRating,
    Plot:plot,
    Released:released,
    Actors:actors,
    Deirector:director,
    Genre:genre,
  } = movie;

  useEffect(function(){

    function handlePressKey(e){
      if(e.key === 'Escape'){
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', handlePressKey)

    return function(){
      document.removeEventListener('keydown', handlePressKey)
    }

   }, [onCloseMovie])

    useEffect(function(){

      (async function(){
          try{
            setIsLoading(true)
            const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            if(!response.ok)
                     throw new Error('Something wrong with the movie server')

            const data = await response.json();
            setMovie(data);
          } catch (err) {
              console.error(err)
          } finally{
            setIsLoading(false)
          }
      })()

    }, [selectedId])

    useEffect(function(){
      if(!title)return;
        document.title = `Movie | ${title}`;

        return function(){
          document.title = "usePopcorn"
        }
    }, [title])

    function handleAdd(){
       const newWatchedMovie = {
            imdbID:selectedId,
            title,
            year,
            poster,
            imdbRating: +imdbRating,
            runtime:+runtime.split(' ').at(0),
            userRating,
       }
   

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

      return (
        <div className = "details">
          {
            isLoading ? 
              <Loader /> 
              : 
              <>
                <header>
                    
                    <button className = "btn-back" onClick = {onCloseMovie}>  
                        &larr;
                    </button>
                    <img src = {poster} alt = {'Post of' + movie} /> 


                    <div className = "details-overview">
                        <h2>{title}</h2>
                        <p>
                          {released} &bull; {runtime}
                        </p>
                        <p>{genre}</p>
                        <p><span>⭐️</span> {imdbRating} IMDB Rating</p>
                    </div>
                </header>
                
                <section>
                  <div className= "rating">
                    {!isWatched ? (
                        <>
                          <StarRaing maxRating = {10} size = {window.innerWidth > 450 ? 24 : 16} onSetRating = {setUserRating} /> 
                          {
                            userRating > 0 && <button className = "btn-add" onClick = {handleAdd}>+  Add to list</button>
                          }
                        </>
                     ) : (
                      <p>You rated this movie {watchedUserRating} <span>⭐️</span></p>
                  )}
                  </div>

                  <p><em>{plot}</em></p>
                  <p>Starring {actors}</p>
                  <p>Directed by {director}</p>
                </section>
              </>
          }
        </div>
      )
}

function ErrorMessage({error}){
  return <p className = "error"><span>❌</span> {error}</p>
}

function Loader(){
  const svgStyle = {
    margin: 'auto',
    display: 'block',
    shapeRendering: 'auto',
    width: '100px',
    height:'100px'
  }

  return (
  <p className = "loader">
    <svg 
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         style={svgStyle}
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.6501182033096926s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(30 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.5910165484633569s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(60 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.5319148936170213s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(90 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.47281323877068554s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(120 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.4137115839243498s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(150 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.35460992907801414s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(180 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.29550827423167847s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(210 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.23640661938534277s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(240 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.17730496453900707s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(270 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.11820330969267138s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(300 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.05910165484633569s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(330 50 50)">
        <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="0s" repeatCount="indefinite"></animate>
        </rect>
      </g>
    </svg>
  </p>
  )
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children}
        </div>
  )
}

function NavBar({children}){
  return (
    <nav className="nav-bar">
        {children}
    </nav>
  )
}

function Logo(){
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }){

  return (
      <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      />
  ) 
}

function NumResults({movies}){
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Main({ children }){
  return (
    <main className="main">
        {children}
    </main>
  )
}

function MovieList({ movies, onSelectMovie }){
      return (
          <ul className="list list-movies">
          {movies?.map((movie) => (
            <Movie movie = {movie} key = {movie.imdbID} onSelectMovie = {onSelectMovie}/> 
          ))}
        </ul>
      )
}

function Movie({movie, onSelectMovie}){
  return (
    <li onClick = {() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
    </li>
  )
}

function WatchedSummary({ watched }){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  )
}


function WatchedMovieList({ watched, onDeleteWatched }){
  return (
    <ul className="list">
    {watched.map((movie) => (
        <WatchedMovie movie = {movie} key = {movie.imdbID} onDeleteWatched = {onDeleteWatched}/>
    ))}
  </ul>
  )
}

function WatchedMovie({movie, onDeleteWatched}){
  return (
    <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className = "btn-delete" onClick = {() => onDeleteWatched(movie)}>
          X
      </button>
    </div>
  </li>
  )
}