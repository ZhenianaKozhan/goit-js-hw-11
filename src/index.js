// import axios from "axios";
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
    imagesApiService.fetchImage();
}

function onLoadMore(e) {
    imagesApiService.fetchImage();
}