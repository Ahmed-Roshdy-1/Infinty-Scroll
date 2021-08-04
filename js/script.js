const imageContainter = document.getElementById("image-container");
const loader = document.getElementById("loader");

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
let photosArray = [];

// Unsplash API
let count = 30;
const apiKey = "QZLl-4vjMuUA05nsi0tw6qZKWyyZ-IdlAVy6lRAsATE";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//  Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 50;
  }
}

// Create Elements For Links & Photos , Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // Event Listener , check when each is finished
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a> then put both iside imageContainer Element
    item.appendChild(img);
    imageContainter.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// on Load
getPhotos();
