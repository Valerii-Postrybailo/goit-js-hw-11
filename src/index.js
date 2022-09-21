import  NewsApiService  from './fetch_picture';
import LoadMoreBtn from './load_more_btn';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

///////////////////////////////////////////////////////////////////

const loadMoreBtn = new LoadMoreBtn({
  selector: ('.btn-primary'),
  hidden:true,
})

const newsApiService = new NewsApiService()

const formEl = document.querySelector("#search-form");

const galleryEl = document.querySelector(".gallery")

////////////////////////////////////////////////////////////////////////

formEl.addEventListener("submit", submitFormEvtHandler);

loadMoreBtn.refs.button.addEventListener("click", onLoadMore);
console.log(newsApiService.page)

function submitFormEvtHandler(evt) {
  console.log(newsApiService.page)

  evt.preventDefault();
  newsApiService.resetPage() 
  newsApiService.value  = evt.currentTarget.elements.searchQuery.value;

  if(newsApiService.value.trim() === ''){
    Notify.failure("Empty, request!");
  }else{
    console.log(newsApiService.page)
    newsApiService.fetchArticles().then(images => {
      deleteMarkup();
      renderMarkup(images.hits);
      lightbox.refresh();

      if(images.totalHits !== 0){
        Notify.success(`"Hooray! We found ${images.totalHits} images."`);
        console.log(Math.ceil(images.totalHits/40))
        console.log(newsApiService.page)
      }

      if(images.totalHits/40 <= newsApiService.page){
        loadMoreBtn.hide();
      }else{
        loadMoreBtn.show();
        loadMoreBtn.enable();
      }
    })
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  console.log(newsApiService.page)

  newsApiService.fetchArticles().then(images => {
    renderMarkup(images.hits);
    lightbox.refresh();
    loadMoreBtn.enable();
  }).catch(error => console.error(error))
}


function  deleteMarkup() {
  galleryEl.innerHTML ='';
}

function renderMarkup(data) {
  console.log(data)
  console.log(data.length)

  if (data.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMoreBtn.hide();
  } else {
    galleryEl.insertAdjacentHTML("beforeend", renderImgGallery(data));
  }
}

function renderImgGallery(images) {
  const markup = images
  
  return markup
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        ` 
          <a class="gallery__link-item" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">

                <p class="info-item">
                  <b>Likes</b>
                    ${likes}
                </p>

                <p class="info-item">
                  <b>Views</b>
                    ${views}
                </p>

                <p class="info-item">
                  <b>Comments</b>
                    ${comments}
                </p>

                <p class="info-item">
                  <b>Downloads</b>
                    ${downloads}
                </p>
              </div>
            </div>
          </a>
        `
      )
    .join("");
  }


