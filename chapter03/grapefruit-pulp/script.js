// script.js
let currentIndex = 0;
let photos = document.getElementsByClassName('photo');
let lightbox = document.getElementById('lightbox');
let lightboxPhoto = document.getElementById('lightbox-photo');

function showPhoto(index) {
  for (let i = 0; i < photos.length; i++) {
    photos[i].style.display = 'none';
  }
  photos[index].style.display = 'block';
}

function openLightbox(index) {
  lightbox.style.display = 'block';
  lightboxPhoto.src = photos[index].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  showPhoto(currentIndex);
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  showPhoto(currentIndex);
}

showPhoto(currentIndex);
setInterval(nextPhoto, 15000);
