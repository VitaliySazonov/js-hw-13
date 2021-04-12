import './styles.css';
import * as basicLightbox from 'basiclightbox'
import api from './api/api'
import $ from 'jquery';

const
  input = $('input'),
  gallery = $('#gallery'),
  loadMoreBtn = $('#load_more'),
  button = $('button'),
  h2 = $('h2')

let
  defaultPage = 1,
  defaultQuery = 'girls'

const lightBox = () =>
  $('.photo-card')
    .off()
    .on('click', evt =>
    basicLightbox
      .create(`<div class="modal"><img src="${evt.target.getAttribute('data-large')}"></div>`)
      .show());

const imgList = data => {
  if (!data.length) {
    h2.fadeIn()
    loadMoreBtn.fadeOut(0)
  }
  if (data.length) {
    h2.fadeOut(0);
    loadMoreBtn.fadeIn().css('display', 'block')
  }
  data.map(item => {
    gallery.append(
      `
      <li class="photo-card" >
          <img src="${item.webformatURL}" alt="" class="photo-card-img" data-large="${item.largeImageURL}"/>
          <div class="stats">
            <p class="stats-item"><i class="material-icons">thumb_up</i>${item.likes}</p>
            <p class="stats-item"><i class="material-icons">visibility</i>${item.views}</p>
            <p class="stats-item"><i class="material-icons">comment</i>${item.comments}</p>
            <p class="stats-item"><i class="material-icons">cloud_download</i>${item.downloads}</p>
          </div>
      </li>
    `);
  });
  lightBox()
};

// Images request
const searchImages = async (page = defaultPage, url = api.url, q = defaultQuery) => {
  try {
    let res = await fetch(`${url}&q=${q}&page=${page}`);
    let data = await res.json();
    console.log(data.hits);
    imgList(data.hits)
  } catch (err) {
    console.log('Error ==> ', err);
  }
}

// Track input
let searchString = input.on('input', evt => searchString = evt.target.value);

// Search click which is hidden
button.on('click', evt => {
  evt.preventDefault();
  let final = searchString.length === 1 ? searchString : searchString.replace(/ /g, '+')
  gallery.html('');
  searchImages(defaultPage, api.url, final)
  defaultQuery = searchString
});

// Load more click
loadMoreBtn.on('click', evt => {
  evt.preventDefault();
  searchImages(defaultPage += 1, api.url, defaultQuery);
  setTimeout(() => {
    window.scrollTo({
      top: evt.target.offsetTop,
      behavior: 'smooth'
    });
  }, 1000)
})

searchImages()
