export function showMovies(movies) {
  let output = "";

  movies.forEach((movie) => {
    let {
      poster_path,
      title,
      vote_average,
      genre_names,
      overview,
      release_date,
      id,
      backdrop_path,
    } = movie;
    // creating a class for it

    output += `
<div class="card">
  <div class="movie-image">
    <img
      class="card-img-top"
      data-bs-toggle="modal"
      data-bs-target="#modal_${id}"
      id="movieImage"
      src="https://image.tmdb.org/t/p/w342${poster_path}"
      alt="${title}"
    />
  </div>
  <div class="movie-info">
    <a
      class="movie-title"
      data-bs-toggle="modal"
      data-bs-target="#modal_${id}"
      data-id="${id}">
      ${title}
    </a>
    <span class="movie-rated">${vote_average.toFixed(1)}</span>
  </div>
</div>;

<div class="modal fade" id="modal_${id}" tabindex="-1" aria-labelledby="movieModal"  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="movieModal">${title}</h5>
          <button  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div>
            <div class="modal-body">
              <div class="movie-poster">
                 <img src="https://image.tmdb.org/t/p/w780${backdrop_path}" alt="${title}" />
                </div>
                <span><small>${genre_names.join(" | ")}<small></small></small></span>
                <h5>About:</h5>
                <p>${overview}</p>
                <h5 class="release-date" id="date-id">Release Date: ${release_date}</h5>
            </div>
            <div class="modal-footer">
            <button class="btn btn-color modal-btn" data-action="add-to-queue" type="button">Add to favorites </button>
          <button type="button" class="btn btn-color" data-bs-dismiss="modal"> Close</button>
       </div>
    </div>
  </div>
</div>

 `; // creating markup for every movie element and pulling information from API
  });
  return output; // sending back to HTML file
}


