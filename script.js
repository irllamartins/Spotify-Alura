const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

// busca de musica
const requestApi = (searchTerm) => {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

const displayResults = (result) => {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }

    requestApi(searchTerm);
})

// pesquisa por genero musical
window.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.cards');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            const title = card.querySelector('span').textContent;
            musicalGenreApi(title)
        });
    });
});

const musicalGenreApi = (genreTerm) => {
    const url = `http://localhost:3000/artists?genre_like=${genreTerm}`

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            if (result.length > 0) {
                displayResults(result)
            }
        })
}

// voltar para pagina padrão
const buttonDone = document.getElementById('arrow-left');

buttonDone.addEventListener('click', function () {
    // o add hidden deixa invisivel
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
});

