import { key } from "../js/keys.js";

const artist = document.getElementById("inputArtist");

document.getElementById("btnArtist").addEventListener("click", getSong());

function getSong(){
    fetch("theaudiodb.com/api/v1/json/" + key + "/search.php?s=" + artist.value)
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            // handle error here...
        })
}
