import { key } from '../js/key.js';

const artist = document.getElementById("inputArtist");

const artists = document.getElementById("artists");
const albums = document.getElementById("albums");
const tracks = document.getElementById("tracks");

document.getElementById("btnArtist").addEventListener("click", getArtist);

function getArtist(){
    // Example = https://api.musixmatch.com/ws/1.1/artist.search?apikey=2a51b8d3d27551f0804f4f15658377e0&q=weekend
    // const searchTerm = ....
    fetch(`https://api.musixmatch.com/ws/1.1/artist.search?apikey=${key}&q=${artist.value}`)
        .then(response => response.json())
        .then(result => {
            result.message.body.artist_list.forEach(item => {
                const artistButton = document.createElement("button");
                artistButton.innerText= item.artist.artist_name;
                artistButton.addEventListener("click", () => getAlbums(item.artist.artist_id));
                artists.appendChild(artistButton);
            })
        })
        .catch(error => {
            // handle error here...
        })
}


function getAlbums(artist_id) {
    console.log("getting albums for ", artist_id);
    fetch (`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artist_id}&s_release_date=desc&g_album_name=1&apikey=${key}`)
    .then(response => response.json())
    .then(result => {
        //console.log(result);
        result.message.body.album_list.forEach(item => {
            console.log(item.album);
            const albumButton = document.createElement("button");
            albumButton.innerText= item.album.album_name;
            albumButton.addEventListener("click", () => getTracks(item.album.album_id));
            albums.appendChild(albumButton);
        })
    })
}

function getTracks(album_id) {
    console.log("getting tracks for ", album_id);
    fetch (`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${album_id}&s_release_date=desc&g_album_name=1&apikey=${key}`)
    .then(response => response.json())
    .then(result => {
        result.message.body.track_list.forEach(item => {
            console.log(item)
            const trackButton = document.createElement("button");
            trackButton.innerText= item.track.track_name;
            artistButton.addEventListener("click", () => getLyrics(item.track.track_id));
            tracks.appendChild(trackButton);
        })
    })
}

function getLyrics(track_id) {
    // TODO for Suleyman..
}

