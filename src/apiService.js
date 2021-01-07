
const API_KEY = "11025352-e441425a1749dc1227f4601c8";
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
    constructor() {
        this.searchQuary = "";
        this.page = 1;
       this.typeOfImage = "photo"
    }

    async fetchImages() {
        const url = `${BASE_URL}/?image_type=${this.typeOfImage}&orientation=horizontal&q=${this.searchQuary}&page=${this.page}&per_page=12&key=${API_KEY}`
        const response = await fetch(url);
        const { hits } = await response.json();
        this.incrementPage();
        return hits;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    set query(newQuery) {
        this.searchQuary = newQuery;
    }

    // scrollTo() {
    //     window.scrollTo({
    //     //  top: this.position,
    //     top: (this.page-1) * 500,
    //     behavior: "smooth"
    // })
    // }
}