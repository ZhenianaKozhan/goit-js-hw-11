
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import ImagesApiService from "./js/api";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const imagesApiService = new ImagesApiService();
const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250});

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

async function onSearch(e) {
    e.preventDefault();

    imagesApiService.resetPage();
    
    imagesApiService.query = e.currentTarget.elements.searchQuery.value;

    refs.loadMoreBtn.classList.add('is-hidden')

    if (imagesApiService.query === '') {
       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    clearGalleryContainer();
    

    try {
        const query = await imagesApiService.fetchImage();
        if (query.hits.length === 0) throw new Error("No data");
        appendPhotoMarcup(query);
        Notiflix.Notify.success(`Hooray! We found ${query.totalHits} images.`)
        if (query.hits.length >= 40) refs.loadMoreBtn.classList.remove('is-hidden');
    } catch (error) {
        onError();
    }
}

async function onLoadMore(e) {
    const query = await imagesApiService.fetchImage();
    appendPhotoMarcup(query)
    };

function createMarcupGallery(hits) {
    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
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
    </div>
    `).join("");
} 

function appendPhotoMarcup(data) {
    if ((data.totalHits - ((imagesApiService.page-1) * 40)) < 1) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
    }
    refs.galleryContainer.insertAdjacentHTML('beforeend', createMarcupGallery(data.hits));
    gallery.refresh()
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}

function onError() {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}