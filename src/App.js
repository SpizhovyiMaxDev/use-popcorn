import { useState, useEffect } from "react";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const[movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,  setError] = useState("");
  const [query, setQuery] = useState("");
  const KEY = '7183f468';
  const tempQuery = 'batman';

  useEffect(function(){

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    }

      (async function(){
        try{
          setIsLoading(true);
          setError("");
           const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`);
              
            if(!response.ok)
              throw new Error('Something went wrong with fetching Movies')
             
           const data = await response.json();

           if(data.Response === 'False')
              throw new Error('The movie wasn\' find')

           setMovies(data.Search)
        } catch(err){
          setError(err.message)
        } finally{
          setIsLoading(false);
        }
      })()
  }, [query])

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
          isLoading && <Loader />
        }
         {   
           !isLoading && !error && <MovieList movies = {movies}/>
        }

        {
          error && <ErrorMessage error = {error}/> 
        }
        </Box> 
        <Box>
          <WatchedSummary watched = {watched} /> 
          <WatchedMovieList watched = {watched}/> 
        </Box> 
      </Main>
    </>
  );
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

function MovieList({ movies }){
      return (
          <ul className="list">
          {movies?.map((movie) => (
            <Movie movie = {movie} key = {movie.imdbID}/> 
          ))}
        </ul>
      )
}

function Movie({movie}){
  return (
    <li>
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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}


function WatchedMovieList({ watched }){
  return (
    <ul className="list">
    {watched.map((movie) => (
        <WatchedMovie movie = {movie} key = {movie.imdbID}/>
    ))}
  </ul>
  )
}

function WatchedMovie({movie}){
  return (
    <li>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
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
    </div>
  </li>
  )
}