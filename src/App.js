import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

// const movies = [
//   "Matrix",
//   "Full Metal Jacket",
//   "Oldboy",
//   "Star Wars"
// ]
//
// const movieImages = [
//   "https://upload.wikimedia.org/wikipedia/en/1/10/The_Greatest_Showman_poster.png",
//   "http://digitalspyuk.cdnds.net/17/20/980x490/landscape-1495116925-hugh-jackman-the-greatest-showman.jpg",
//   "http://digitalspyuk.cdnds.net/17/26/980x490/landscape-1498655102-screen-shot-2017-06-28-at-140640.jpg",
//   "https://s3.amazonaws.com/ffe-ugc/intlportal2/dev-temp/en-US/__5a3a7621081b4-medium.jpg"
// ]



class App extends Component {

  // Render : componentWillMount() -> render() -> componentDidMound()

  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()


  state = {}

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async() => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
