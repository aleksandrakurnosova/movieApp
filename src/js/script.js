import ApiService from "./api-service";

import { showMovies } from "../templates/movies-all"

import  queryParams from "./pagination";

const mainSection = document.getElementById("mainSection"); // selecting DOM element to work with
const searchInput = document.getElementById("search-field");
const invalidFeedback = document.querySelector(".query-warning");



let queueArray = localStorage.getItem('QUEUE_KEY')
  ? JSON.parse(localStorage.getItem('QUEUE_KEY'))
  : [];


function addGenres(movies, genres) {
  return movies.map(({ genre_ids, ...otherProps }) => {
    const genre_names = genre_ids.map((genreId) => {
      return genres.find(({ id }) => genreId === id).name;
    });
    return { ...otherProps, genre_names };
  });
}

function renderMovies(movies) {
  mainSection.innerHTML = showMovies(movies);
}

async function renderMovieInfo(movieId) {
  const result = await api.getMovieById(movieId);
  document
  .querySelector('[data-action="add-to-queue"]')
  .addEventListener(
    'click',
    addToStorage.bind(null, movieId, 'QUEUE_KEY', queueArray)
  );
   
}

function addToStorage(movieId, key, arr) {
  const index = arr.indexOf(movieId);
  index === -1 ? arr.push(movieId) : arr.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(arr));
}

function onMovieClick(e) {
  if (!e.target.classList.contains("movie-title")) return;
  renderMovieInfo(e.target.dataset.id);
}

// search
document.getElementById("search-form").addEventListener("submit", (i) => {
  i.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm.length > 2) {
    invalidFeedback.classList.add("fade");

    Promise.all([api.getMoviesByKeyWords(searchTerm), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => {
        if (movies.length > 0) {
          return addGenres(movies, genres);
        }
        throw new Error("Empty results");
      })
      .then((result) => renderMovies(result))
      .catch((err) => {
        console.log("render: catch error: ", err.message);
        invalidFeedback.classList.remove("fade");
      });
  }
});


const api = new ApiService();
api.page = queryParams.get("page");

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

mainSection.addEventListener("click", onMovieClick);


