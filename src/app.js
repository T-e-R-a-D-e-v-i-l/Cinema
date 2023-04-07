import swal from "sweetalert";

let movie //переменная для хранения данных из инпута

const form = document.getElementById("form")
const input = document.getElementById("input")
const container = document.getElementById("container");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
        'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
    }
};

async function loadMovies(event) {
    event.preventDefault()
    let movie = input.value.trim()

    const response = await fetch(`https://moviesdb5.p.rapidapi.com/om?s=${movie}`, options)
    const data = await response.json()

    try {
        const movies = data.Search
        renderMovies(movies)
        return movies
    }
    catch (error) {

        swal("Error!", "Try changing the request", "error");
        console.log(error)
    }

}

document.getElementById("form").addEventListener("submit", (event) => {
    loadMovies(event)
    input.value = ""
})

function renderMovies(movies) {
    container.innerHTML = "";
    movies.forEach((movie) => {
        container.innerHTML += `
        <div class="bg-gray-900 flex flex-col justify-between items-center rounded-2xl overflow-hidden">
            <img class="h-3/4 w-full" src=${movie.Poster}></img>
            <div class="text-center text-white py-4">
                <h1 class="text-slate-300 text-lg font-bold">${movie.Title}</h1>
                <p class="text-slate-500 text-base">${movie.Year}</p>
            </div>
            <button 
                id="openModalBtn-${movie.imdbID}"
                class="bg-red-800 w-full mt-2 text-center text-slate-100 px-6 py-2 hover:bg-red-900 transition-all duration-300">
                More
            </button>
        </div>
        `
    })

    movies.forEach((movie) => {
        document.getElementById(`openModalBtn-${movie.imdbID}`).addEventListener('click', () => {
            openInform(movie.imdbID)
        })
    })
}


document.getElementById('buttonCloseModal').addEventListener("click", () => {
    modalCardMenu.style.display = 'none'
})

async function openInform(imdbID) {
    const response = await fetch(`https://moviesdb5.p.rapidapi.com/om?i=${imdbID}`, options)
    const informByMovie = await response.json()

    console.log(informByMovie)

    document.getElementById("modalCardMenu").style.display = "flex";
    const modalCard = document.getElementById("modalCard");
    modalCard.innerHTML = "";
    modalCard.innerHTML += ` 
        <div class="bg-slate-800 p-4">
            <h2 class="text-gray-50 text-3xl font-semibold text-center italic pb-5">${informByMovie.Title}</h2>
            <div class="flex gap-4">
                <div>
                    <img class=" w-auto" src=${informByMovie.Poster}></img>
                </div>
                <div class="text-slate-300">
                    <p">Released: ${informByMovie.Released}</p>
                    <p>Country: ${informByMovie.Country}</p>
                    <p>Genre: ${informByMovie.Genre}</p>
                    <p>Runtime: ${informByMovie.Runtime}</p>
                    <p>Actors: ${informByMovie.Actors}</p>
                    <p>Director: ${informByMovie.Director}</p>
                    <p>Language: ${informByMovie.Language}</p>
                    <p>Rating: ${informByMovie.imdbRating}</p>
                </div>
            </div>
            <div class="text-slate-300 pt-4">
                <p>Pilot: ${informByMovie.Plot}</p>
            </div>
        </div>
    `

}
