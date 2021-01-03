
const API_KEY = "11025352-e441425a1749dc1227f4601c8";
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
    constructo() {
        this.searchQuary = "";
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuary}&page=${this.page}&per_page=12&key=${API_KEY}`
        return fetch(url)
            .then(response => response.json())
            .then(({hits}) => {
                this.incrementPage()
                return hits
            })
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

    scrollTo() {
    window.scrollTo({
        top: (this.page-1) * 670,
        behavior: "smooth"
    })
    }
}