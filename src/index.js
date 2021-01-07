// import renderMarkup from "./markup"
// import markup from "./markup.hbs"
import './styles.css';
import refs from './refs';
import './apiService';
import PixabayApiService from "./apiService";
import imgTemplate from "./imgTemplate.hbs";
import debounce from "lodash.debounce";
import LoadMoreBtn from "./loadMorebtn";
import * as basicLightbox from 'basiclightbox';
import modalTmp from "./modalTmp.hbs";
import "../node_modules/basiclightbox/dist/basicLightbox.min.css"
import position from "./position";
import "../JavaScript-autoComplete-master/auto-complete.css"
import '../JavaScript-autoComplete-master/auto-complete'
import autoComplete from '../JavaScript-autoComplete-master/auto-complete';

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn();

// refs.inputRef.addEventListener('input', debounce(e => handleInput(e), 500));
loadMoreBtn.btnRef.addEventListener('click', fetchImages);
refs.searchForm.addEventListener('submit', handleInput);
refs.galleryRef.addEventListener('click', openModal);

// pixabayApiService.query = "cat"
// fetchImages()
// const autocomplete = new autoComplete({
//     selector: refs.inputRef,
//     minChars: 2,
//     source: function(term, response){
//         $.getJSON('https://pixabay.com/api/?q=&key=11025352-e441425a1749dc1227f4601c8', { q: term }, function(data){ response(data); });
//     }
// })
// autocomplete()
function handleInput(e) {
    e.preventDefault()

    pixabayApiService.query = e.currentTarget.elements.query.value
    pixabayApiService.typeOfImage = e.target.elements.typeOfImage.value
    if (e.target.value === "") {
        loadMoreBtn.hide();
        clearPage();
        refs.galleryRef.classList.remove('not-found')
        // refs.galleryRef.insertAdjacentHTML("afterbegin", `<p class="no-result-text">No results :(</p>`)
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
    // function handleInput(e) {
    //     e.preventDefault()
    //     const searchValue = e.target.value
    //     if (searchValue === "") {
    //         clearPage()
    //         refs.loadMore.classList.add("loadMore--notShown");
    //         return
    //     }
   
    //     clearPage()
    //     let page = 1
    //    console.log(page)
    //     renderImg(searchValue)
    
    //     refs.loadMore.addEventListener("click", (e) => {
        
    //         console.log(page)
    //         showMoreImages(e, searchValue, page)
    //     })

    //     function showMoreImages(e, searchValue, page) {
    //         e.preventDefault()
        
        
    //         console.log(page)
    //         // refs.loadMore.disabled = true;
    //         renderImg(searchValue, page)
    //         // return page;
    //     }
    // // .then(refs.loadMore.disabled = false)
    //     function renderImg(searchValue, page = 1) {
    //         console.log(page)
    //         const position = (page - 1) * 670;
    //         // refs.loadMore.disabled = true;
        
    //       getImages(searchValue, page)
    //             .then(obj => refs.galleryRef.insertAdjacentHTML('beforeend', imgTemplate(obj.hits)))
    //           .then(function () {
    //               page += 1;
    //               console.log(page);
    //                 refs.loadMore.classList.remove("loadMore--notShown");
    //                 window.scrollTo({
    //                     top: position,
    //                     behavior: "smooth"
    //                 })
    // //                 document.querySelector(".photo_link").addEventListener('click', function () {
    // //                     const instance = basicLightbox.create(`
    // // 	<img src=""></img>
    // // `)
    // //                 })
    //                 // refs.photoRef.addEventListener('click', console.log("Hey"))
    //             })
        
    //     }
    // }

