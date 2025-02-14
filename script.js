const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0; 
let totalImages = 0;
let photosArray = [];

// Unsplash API
const imageCount = 5;
const apiUrl = `https://mygoapi.miyago9267.com/mygo/random_img?amount=${imageCount}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imageLoaded);
  if (imagesLoaded === totalImages) {
    ready = true; 
    loader.hidden = true;
  }
}
// HelperFunction to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0; 
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  console.log(photosArray);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      herf: photo.url, 
      target: '_blank', 
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.url,
      alt: photo.alt,
      title: photo.alt,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img); 
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl); 
    const data = await response.json();
    photosArray = data.urls; // Adjust to match the response structure
    console.log(photosArray); // Log the photosArray to check its values
    displayPhotos();
  } catch (error) {
    // Catch Error Here
    console.error('Error fetching photos:', error);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos(); 