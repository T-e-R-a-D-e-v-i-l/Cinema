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
    // event.preventDefault()
    let movie = input.value.trim()

    const response = await fetch("https://moviesdb5.p.rapidapi.com/om?s=${movie}", options)
    const data = await response.json()

    try {
        const movies = data.Search
        renderMovies(movies)
        return movies
    }
    catch (error) {
        swal("Произошла ошибка!", "Попробуйте ввести запрос на английском языке", "error");
    }
}

document.getElementById("form").addEventListener("click", () => {
    loadMovies()
})

function renderMovies(movies) {
    container.innerHTML = "";
    movies.forEach((movie) => {
        console.log(movies)
        container.innerHTML += `
        <div>
        <img src=${movie.poster}></img>
        </div>
        `
    })
}

