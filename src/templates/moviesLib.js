export function moviesAllLib(movies) {
  
    movies.forEach((movie) => {
      const {poster_path, title, vote_average, overview, release_date, id, backdrop_path} = movie; // Pulling necessary names from API
     
      const movieBox = document.createElement("div"); //creating a div for individual movie elements
      movieBox.classList.add("card"); // creating a class for it
      
      movieBox.innerHTML = `
     
      <div class="movie-image">
      <img class="card-img-top" data-bs-toggle="modal" data-bs-target="#modal_${id}"   id="movieImage" src="https://image.tmdb.org/t/p/w342${poster_path}" alt="${title}" />
      </div>
      <div class="movie-info" >
        <a class="movie-title" data-bs-toggle="modal" data-bs-target="#modal_${id}" data-id ="${id}" >
          ${title}
        </a>
        <div>
        <span class="movie-rated">${vote_average.toFixed(1)}</span>
     
  
        <div class="modal fade" id="modal_${id}" tabindex="-1" aria-labelledby="movieModal" aria-hidden="true" data-modal>
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="movieModal">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="movie-poster"><img src="https://image.tmdb.org/t/p/w780${backdrop_path}" alt="${title}" /></div>
                
                <h5>Movie Description:</h5>
                <p>${overview}</p>
                <h5 class="release-date" id="date-${id}">Release Date: ${release_date}</h5>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-color" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      `; // creating markup for every movie element and pulling information from API
      
      mainSectionLib.appendChild(movieBox); // sending back to HTML file
    });
  }