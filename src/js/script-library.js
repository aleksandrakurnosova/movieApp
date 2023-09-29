import ApiService from "./api-service";
import { moviesAllLib } from '../templates/moviesLib';
const api = new ApiService();

const mainSection = document.getElementById("mainSectionLib"); // selecting DOM element to work with
const btn = document.querySelector(".modal-btn")

let queueArray = localStorage.getItem('QUEUE_KEY')
  ? JSON.parse(localStorage.getItem('QUEUE_KEY'))
  : [];


async function showLibrary(key) {
  const idsArr = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

//clear
  mainSection.innerHTML = '';

  const moviesArr = [];
  for (let i = 0; i < idsArr.length; i++) {
    await api.getMovieById(idsArr[i]).then((result) => moviesArr.push(result));
  }
//render
  moviesAllLib (moviesArr)
}
// - init
 showLibrary("QUEUE_KEY")

