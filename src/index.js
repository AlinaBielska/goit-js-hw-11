import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;
const lightbox = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let perPage = 40;
let response;

gallery.classList.add('gallery__div');

const searchImages = async e => {
    const params = new URLSearchParams({
        key: "35166786-6cff48c73f51fd457f4a9ef76",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: perPage,
    });

    response = await axios.get(`https://pixabay.com/api/?${params}&q=` + searchForm.searchQuery.value);
    await showImages(response);
    return 
};

const showImages = () => {
    const totalHits = response.data.total;
    const photos = response.data.hits;
    const totalPages = Math.ceil(totalHits / perPage);
    if (photos.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (page > totalPages) {
        loadMore.classList.remove('isVisible');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    else {
        loadMore.classList.add('isVisible');
        const markup = photos
            .map((photo) =>
                `<div class= "photo-card">
                  <a href = "${photo.largeImageURL}">
                    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /
                  </a>
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
        gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();
        if (page === 1) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`) 
        }
    }
};

searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    try {
        await searchImages();
    } catch (error) {
        console.log(error);
    }
    
});

loadMore.addEventListener("click", async e => {
    page += 1;
    try {
        await searchImages();
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" })
    } catch (error) {
        console.log(error);
    }
});