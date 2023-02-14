
// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
import ImagesApiService from "./js/api";
// import './css/styles.css';
// import "simplelightbox/dist/simple-lightbox.min.css";
// import ImagesApiService from "./js/image-service";

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImage().then(hits => appendPhotoMarcup(hits));
    
}

function onLoadMore(e) {
    imagesApiService.fetchImage().then(hits => console.log(hits));
}

function createMarcupGallery(hits) {
    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
        <p class="info-item">
            <b>Likes</b>${likes}
        </p>
        <p class="info-item">
            <b>Views</b>${views}
        </p>
        <p class="info-item">
            <b>Comments</b>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>${downloads}
        </p>
        </div>
    </div>`).join("");
} 

function appendPhotoMarcup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', createMarcupGallery(hits))
}

