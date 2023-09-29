export default class ApiService {
  constructor() {
    this.API_KEY = "f47dd01c7ada638810d235b6320361fa";
    this.searchQuery = "";
    this.page = 1;
    this.URL = "https://api.themoviedb.org/3";
    this.lang = "uk-UA";
  }

  getPopular() {
    return this.sendRequest(
      `${this.URL}/movie/popular?api_key=${this.API_KEY}&language=${this.lang}&page=${this.page}`
    );
  }

  getGenres() {
    return this.sendRequest(
      `${this.URL}/genre/movie/list?api_key=${this.API_KEY}&language=${this.lang}`
    );
  }

  getMovieById(movieId) {
    return this.sendRequest(
      `${this.URL}/movie/${movieId}?api_key=${this.API_KEY}&language=${this.lang}`
    );
  }

  getMoviesByKeyWords(keyString) {
    this.searchQuery = encodeURIComponent(keyString);
    return this.sendRequest(
      `${this.URL}/search/movie?api_key=${this.API_KEY}&query=${
        this.searchQuery
      }&language=${this.lang}&page=${this.page || "1"}`
    );
  }
  
  sendRequest(url) {
    return fetch(url)
      .then((res) => this.checkResponse(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("--------");
        console.log("fetch: catch error: ", err.message);
      });
  }
  checkResponse(res) {
    if (res.status >= 400) {
      throw new Error("Something went wrong! ❌");
    } else {
      return res.json();
    }
  }
  setSearchQuery(keyString) {
    this.searchQuery = keyString.toLowerCase().replaceAll(" ", "+");
  }
}
