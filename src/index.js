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

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn();

refs.inputRef.addEventListener('input', (debounce((e => handleInput(e)), 500)));
loadMoreBtn.btnRef.addEventListener('click', fetchImages);

openModal()
pixabayApiService.query = "cat"
fetchImages()
function handleInput(e) {
    e.preventDefault()

    pixabayApiService.query = e.target.value

    if (e.target.value === "") {
        loadMoreBtn.hide();
        clearPage();
        return;
    }
    pixabayApiService.resetPage()
    clearPage()
    fetchImages()
        
    loadMoreBtn.show()
    
}

function fetchImages() {
    loadMoreBtn.disable()
  return pixabayApiService.fetchImages().then(images => {
      createImagesMarkup(images)
      pixabayApiService.scrollTo()
      loadMoreBtn.enable()
      })
}
function createImagesMarkup(images) {
    refs.galleryRef.insertAdjacentHTML('beforeend', imgTemplate(images));
    }
function clearPage() {
        refs.galleryRef.innerHTML = "";
}

// const optionScroll = {
// position: body.scrollTop
// }
function openModal() {
    refs.galleryRef.addEventListener('click', (e) => {
     let scrollTop = window.pageYOffset ;
        basicLightbox.create(`<img width="1400" height="900" src="${e.target.dataset.source}">`,
            {
                onClose: () => {
                    window.scrollTo({
                   top: scrollTop
        })
        }  
        }).show();
       }
    )
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

