//Followed along Randy's Demo

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

let lat
let lon
const currentCoords = {latitude: lat, longitude: lon}
let image = document.createElement('img')
let currentIndex = 0

const fallBackCoord = { latitude: 28.418732, longitude: -81.581191}

function randomIndex(array){    
    return Math.floor(Math.random()*array.length)
}

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
        }
        
function showPhoto (response){
    if(currentIndex >= response.photos.photo.length){
        currentIndex = 0
        let photoURL = constructImageURL(response.photos.photo[currentIndex])
        image.src = photoURL       
        document.getElementById("photoBox").appendChild(image)
    }
    let photoURL = constructImageURL(response.photos.photo[currentIndex])
    image.src = photoURL
    document.getElementById("photoBox").appendChild(image)
}

function proccessResponse(response){
    let dataPromise = response.json() //hydrate
    dataPromise.then(showPhoto)
}

function assembleSearchURL(coords){
    const proxy = "https://shrouded-mountain-15003.herokuapp.com/"
    return proxy + 
    "https://flickr.com/services/rest/"+
    "?api_key=1eaac96ad6a232088012eeeb0f1cc678"+
    "&format=json"+
    "&nojsoncallback=1"+
    "&method=flickr.photos.search"+
    "&safe_search=1"+
    "&per_page=5"+
    "&lat="+ coords.latitude +
    "&lon="+ coords.longitude +
    "&text=" + text
}

function showPictures (coords){
    currentIndex+=1
    currentCoords.latitude = coords.latitude
    currentCoords.longitude = coords.longitude
    const url = assembleSearchURL(coords)    
    let fetchPromise = fetch(url)
    fetchPromise.then(proccessResponse)
}

function found (pos){
    console.log("Lat: " + pos.coords.latitude)
    console.log("Lon: " + pos.coords.longitude)
    text = "buildings"
    showPictures(pos.coords)
}

function notFound () {
    console.log("Cannot find location. Here's another great spot to check out: " + fallBackCoord.latitude + ", " + fallBackCoord.longitude)
    text = "vader"
    showPictures(fallBackCoord)
}

navigator.geolocation.getCurrentPosition(found, notFound, options)

function newPhoto(){
    text = document.getElementById('typedText').value
    text = text.replace(" ", "_")
    showPictures(currentCoords)
}
