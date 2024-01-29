const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const resultNotFound = document.getElementById("result-not-found");

resultNotFound.classList.add('hidden');
    
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

    const amount = result.length
   

    if (amount > 0) {
        result.forEach(element => {
            artistName.innerText = element.name;
            artistImage.src = element.urlImg;
        });
        resultNotFound.classList.add('hidden');
        resultArtist.classList.remove('hidden');
    }
    else if (amount === 0) {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.add('hidden');
        resultNotFound.classList.remove('hidden');
    }

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
        .then((result) => displayResults(result))
}

// voltar para pagina padrão
const buttonDone = document.getElementById('arrow-left');

buttonDone.addEventListener('click', function () {
    // o add hidden deixa invisivel/ remove deixa visivel
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
    resultNotFound.classList.add('hidden');

});

// tocar audio
const card = document.querySelector('.artist-card');
const audio = document.querySelector('audio');

let isPlaying = false;

card.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    audio.classList.add('hidden');
  } else {
    audio.play();
    isPlaying = true;
    audio.classList.remove('hidden');
  }
});