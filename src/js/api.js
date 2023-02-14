// import axios from "axios";

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImage() {
        const url = `https://pixabay.com/api/?key=33603912-7e8ee717ebd011b2a3cf395f5&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        fetch(url).then(r => r.json()).then(( data  ) => {
            this.page += 1;
            console.log(data);
        });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};