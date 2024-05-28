/* eslint-disable no-sequences *//* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/newline-after-import
import CONFIG from '../../globals/config';
function categoriesRestaurant(restaurant) {
  return restaurant.categories
    .map(
      (category) => `
      <li>${category.name}</li>
    `,
    )
    .join('');
}

function foodsRestaurant(restaurant) {
  return restaurant.menus.foods
    .map(
      (food) => `
      <li>${food.name}</li>
      `,
    )
    .join('');
}

function customerReviews(restaurant) {
  return restaurant.customerReviews
    .map(
      (reviews) => `
      <li class="review">
        <div class="name-review">${reviews.name}</div>
        <div class="date-review">${reviews.date}</div>
        <div class="description-review">"${reviews.review}"</div>
      </li>
      `,
    )
    .join('');
}

function drinksRestaurant(restaurant) {
  return restaurant.menus.drinks
    .map(
      (drink) => `
      <li>${drink.name}</li>
      `,
    )
    .join('');
}

const createRestoDetailTemplate = (restaurants) => `
<div class="detail">
  <div class="detail__header">
    <h2 class="detail__title">${restaurants.name.toUpperCase()}</h2>
    <img class="resto__poster lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" width="350px" height="500px" />
  </div>
  <div class="detail__info">
    <h3>INFORMATION</h3>
    <p>City : ${restaurants.city}</p>
    <p>Address : ${restaurants.address}</p>
    <p>Rating : ${restaurants.rating}⭐️</p>
    <div class="info__food">
      <h4>FOOD</h4>
      <ul class="menus">${foodsRestaurant(restaurants)}</ul>
    </div>
    <div class="info__drinks">
      <h4>DRINKS</h4>
      <ul class="menus">${drinksRestaurant(restaurants)}</ul>
    </div>
    <div class="info__categories">
      <h4>CATEGORIES</h4>
      <ul class="menus">${categoriesRestaurant(restaurants)}</ul>
    </div>
  </div>
  <div class="detail__overview">
    <h3>Overview</h3>
    <p>${restaurants.description}</p>
  </div>
  <div class="detail__reviews">
    <h3>Reviews</h3>
    <ul class="menus">${customerReviews(restaurants)}</ul>
  </div>
</div>
`;

const createHomePageTemplate = (restaurants) => `
  <div class="card">
    <div class="image-container"> <!-- Tambahkan container untuk gambar dan city -->
    <picture>
    <source data-srcset="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}">
    <img class="resto-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" />
  </picture>
      
      <p class="city">${restaurants.city}</p> <!-- Tampilkan nama kota di atas gambar -->
    </div>
    <div class="card-content">
      <h3><a href="/#/detail/${restaurants.id}">${restaurants.name}</a></h3>
      <p class="rating">⭐️${restaurants.rating}</p>
    </div>
    <div class="card-body">
      <p>${restaurants.description}</p>
    </div>
  </div>
`;

const createLikeDishButtonTemplate = () => `
  <button aria-label="like this dish" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedDishButtonTemplate = () => `
  <button aria-label="unlike this dish" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createHomePageTemplate,
  createRestoDetailTemplate,
  createLikeDishButtonTemplate,
  createLikedDishButtonTemplate,
};
