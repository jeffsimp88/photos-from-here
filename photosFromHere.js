//Followed along Randy's Demo

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

const fallBackCoord = { latitude: 28.418732, longitude: -81.581191}

function randomIndex(array){    
    return Math.floor(Math.random()*array.length)
}

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

let image = document.createElement('img')

function showPhoto (response){
    let photoURL = constructImageURL(response.photos.photo[randomIndex(response.photos.photo)])
    image.src = photoURL
    console.log(response)
    console.log(photoURL)
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
    "&text=building"
}

function showPictures (coords){
    console.log("Lat: " + coords.latitude)
    const lat = coords.latitude
    console.log("Lon: " + coords.longitude)
    const lon = coords.longitude
    const url = assembleSearchURL(coords)    
    let fetchPromise = fetch(url)
    fetchPromise.then(proccessResponse)
}

function found (pos){
    showPictures(pos.coords)
    console.log(pos.coords.latitude + " is the latitude.")
   }

function notFound () {
    console.log("Cannot find location. Here's another great spot to check out: " + fallBackCoord.latitude + ", " + fallBackCoord.longitude)
    showPictures(fallBackCoord)
}

navigator.geolocation.getCurrentPosition(found, notFound, options)

function newPhoto(){

 console.log("TESTING")   
}
