import './styles.css';
import refs from './refs';
import './apiService';
import PixabayApiService from "./apiService";
import imgTemplate from "./imgTemplate.hbs";
import debounce from "lodash.debounce";
import LoadMoreBtn from "./loadMorebtn";
import * as basicLightbox from 'basiclightbox';

import "../node_modules/basiclightbox/dist/basicLightbox.min.css"
import position from "./position";


const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn();

// refs.inputRef.addEventListener('input', debounce(e => handleInput(e), 500));
loadMoreBtn.btnRef.addEventListener('click', fetchImages);
refs.searchForm.addEventListener('submit', handleInput);
refs.galleryRef.addEventListener('click', openModal);


function handleInput(e) {
    e.preventDefault()

    pixabayApiService.query = e.currentTarget.elements.query.value
    pixabayApiService.typeOfImage = e.target.elements.typeOfImage.value
    if (e.target.value === "") {
        loadMoreBtn.hide();
        clearPage();
        refs.galleryRef.classList.remove('not-found')
        return;
    }
    pixabayApiService.resetPage()
    refs.galleryRef.classList.remove('not-found')
    clearPage()
    fetchImages()
       
}

function fetchImages() {
    loadMoreBtn.disable()
    return pixabayApiService.fetchImages().then(images => {
        if (images.length === 0) {
            loadMoreBtn.hide()
            refs.galleryRef.classList.add('not-found')
            refs.galleryRef.insertAdjacentHTML("afterbegin", `<p class="no-result-text">No results :(</p>`)
            return
            }

    createImagesMarkup(images)
    position.setCurrentPosition()
    position.scrollToBottom()
    loadMoreBtn.show()
    loadMoreBtn.enable()
      })
}
function createImagesMarkup(images) {
    refs.galleryRef.insertAdjacentHTML('beforeend', imgTemplate(images));
    }
function clearPage() {
        refs.galleryRef.innerHTML = "";
}

function openModal(e) {
    e.preventDefault()
    return basicLightbox.create(`<img width="1400" height="900" src="${e.target.dataset.source}">`).show();
}