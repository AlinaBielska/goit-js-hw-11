import Notiflix from 'notiflix';

const axios = require('axios');
const input = document.querySelector('input');
const searchForm = document.querySelector('.search-form');

// let searchedImage = e.target.value;

const searchImages = async e => {
    e.preventDefault();
    const params = {
    key: "35166786-6cff48c73f51fd457f4a9ef76",
    q: e.target.value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    };
    try {
// console.log(e.value);
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        const photos = await response.json();
        showImages(photos);
    } catch (error) {
        console.log(error);
    }
}


const showImages = (photos) => {
    if (photos.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        const markup = photos
            .map(
                (photo) => `<div class= "photo-card">
                    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${photo.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${photo.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${photo.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${photo.downloads}
                        </p></div>
                    </div >`
            )
            .join("");
        searchForm.insertAdjacentHTML("afterend", markup);
    }
}


searchForm.addEventListener("submit", searchImages);
    
    
    
