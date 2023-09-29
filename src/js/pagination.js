let paginationLength = 5;
function createPagination(paginationLength) {
  let output =
    '<button class="btn pagination-button" id="prev-button" title="Previous page" aria-label="Previous page">&#5130;</button>';
  for (let i = 0; i < paginationLength; i++) {
    output += `<button class=" btn pagination-numbers " data-id="${
      i + 1
    }">${i + 1}</button>`;
  }
  output +=
    '<button class="btn pagination-button" id="next-button" title="Next page" aria-label="Next page">&#5125</button>';
  paginationContainer.innerHTML = output;
}


const paginationContainer = document.querySelector(".pagination-container");

createPagination(paginationLength);

const paginationNumbers = document.querySelectorAll(".pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const queryParams = new URLSearchParams(window.location.search);
if (!queryParams.toString()) {  history.replaceState(null, null, window.location.pathname);
}
paginationNumbers.forEach((el) => {
  el.onclick = function () {
    //console.log('page: ', el.innerText);
    
    queryParams.set("page", el.dataset.id);
   
    window.location.search = queryParams.toString();
  
  };
});
let currentPage = Number(queryParams.get("page"));


if (currentPage === 1) {
  prevButton.classList.add("disabled");
} else {
  prevButton.addEventListener("click", () => {
    queryParams.set("page", --currentPage);
    prevButton.classList.remove("disabled");
     //refresh
    window.location.search = queryParams.toString();
  });
}

if (currentPage != paginationLength) {
  nextButton.addEventListener("click", () => {
    queryParams.set("page", ++currentPage);
    //refresh
    window.location.search = queryParams.toString();
  });
} else {
  nextButton.classList.add("disabled");
}

export default queryParams;
