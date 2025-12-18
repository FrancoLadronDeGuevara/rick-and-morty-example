const $nameInput = document.getElementById("name-input");

const $statusSelect = document.getElementById("status-filter");

const $speciesFilter = document.getElementById("species-filter");

const $searchBtn = document.getElementById("search-button");

const $resultsContainer = document.getElementById("results");

const $prevBtn = document.getElementById("prev-btn");

const $pageNum = document.getElementById("page-num");

const $nextBtn = document.getElementById("next-btn");

const $charDetails = document.getElementById("details");

let page = 1;

$searchBtn.addEventListener("click", () => {
  page = 1;

  fetchCharacters();
});

$prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;

    fetchCharacters();
  }
});

$nextBtn.addEventListener("click", () => {
  page++;

  fetchCharacters();
});

function fetchCharacters() {
  const name = $nameInput.value.toLowerCase().trim();

  const status = $statusSelect.value;

  const species = $speciesFilter.value;

  url.searchParams.set("page", page);

  if (name) url.searchParams.set("name", name);

  if (status) url.searchParams.set("status", status);

  if (species) url.searchParams.set("species", species);

  $resultsContainer.innerHTML = `<div class="flex items-center gap-2">
    <div class="h-5 w-5 animate-spin rounded-full border-4 border-slate-600 border-t-lime-500">
    </div>
    <span class="text-slate-400 text-sm">Cargando...</span>
</div>`;

  $charDetails.classList.add("hidden");

  $pageNum.textContent = page;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("No se encontraron personajes");

      return res.json();
    })
    .then((data) => {
      console.log(data.results);
      renderCharacters(data.results);
    })
    .catch((error) => {
      $resultsContainer.innerHTML = `<p>${error.message}</p>`;
    });
}

function renderCharacters(characters) {
  $resultsContainer.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("article");

    card.className = "relative max-w-xs w-full p-5 border rounded shadow-xs";

    card.innerHTML = `
    <div class="flex flex-col items-center">
        <img class="w-24 h-24 mb-6 rounded-full" src=${char.image} alt=${char.name}/>
        <h5 class="mb-0.5 text-xl font-semibold tracking-tight text-heading">${char.name}</h5>
        <span class="text-sm text-body">${char.species}</span>
        <div class="flex mt-4 md:mt-6 gap-4">
            <button type="button" class="bg-fuchsia-500 rounded-full hover:bg-fuchsia-600 shadow-xs font-medium text-sm px-4 py-2 cursor-pointer text-white">
                Ver detalles
            </button>
        </div>
    </div>`;

    card.addEventListener("click", () => showDetails(char));

    $resultsContainer.appendChild(card);
  });
}

function showDetails(char) {
  $charDetails.classList.remove("hidden");

  $charDetails.innerHTML = `
  <div class="relative max-w-xs w-full p-5 border rounded shadow-xs">
  <div class="flex flex-col items-center">
  <img class="w-24 h-24 mb-6 rounded-full" src=${char.image} alt=${char.name}/>
  <h5 class="mb-0.5 text-xl font-semibold tracking-tight text-heading">${char.name}</h5>
  <span class="text-sm text-body">${char.status} - ${char.location.name}</span>
  <div class="flex mt-4 md:mt-6 gap-4">
  <button onclick="$charDetails.classList.add('hidden')" type="button" class="bg-fuchsia-500 rounded-full hover:bg-fuchsia-600 shadow-xs font-medium text-sm px-4 py-2 cursor-pointer text-white">
  Cerrar
  </button>
  </div>
  </div>
  </div>
    `;
}

fetchCharacters();
