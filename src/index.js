import Notiflix from 'notiflix';

const axios = require('axios').default;

const input = document.querySelector('input');
const searchForm = document.querySelector('.search-form');
const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let per_page = 40;

const searchImages = async e => {
    // const searchedWord = searchForm.elements.searchQuery.value;
    const params = new URLSearchParams({
    key: "35166786-6cff48c73f51fd457f4a9ef76",
    // q: searchedWord,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: per_page,
    });

    const response = await axios.get(`https://pixabay.com/api/?${params}&q=` + searchForm.elements.searchQuery.value);
    // const photos = await response.json();
    return response;
}


const showImages = (response) => {
    const totalPhotos = response.data.total;
    const photos = response.data.hits;
    console.log(photos);
    if (response.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        const markup = photos
            .map((photo) => 
                   `<div class= "photo-card">
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
        gallery.innerHTML = markup;
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages()
        .then((response) => showImages(response))
        .catch((error) => console.log(error))
});