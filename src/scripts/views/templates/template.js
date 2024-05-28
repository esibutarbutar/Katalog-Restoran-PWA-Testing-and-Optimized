/* eslint-disable no-sequences *//* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (restaurants) => `
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
  <ul>
    <li>${restaurants.menus.foods[0].name}</li>
    <li>${restaurants.menus.foods[1].name}</li>
    <li>${restaurants.menus.foods[2].name}</li>
  </ul>
</div>
<div class="info__drinks">
  <h4>DRINKS</h4>
  <ul>
    <li>${restaurants.menus.drinks[0].name}</li>
    <li>${restaurants.menus.drinks[1].name}</li>
    <li>${restaurants.menus.drinks[2].name}</li>
  </ul>
</div>
<div class="info__categories">
  <h4>CATEGORIES</h4>
  <span>${restaurants.categories[0].name}</span>
  ${
  restaurants.categories.length > 1
    ? `<span>${restaurants.categories[1].name}</span>`
    : ''
}
</div>
</div>

<div class="detail__overview">
<h3>Overview</h3>
<p>${restaurants.description}</p>
</div>
<div class="detail__reviews">
<h3>Reviews</h3>
<p>Nama: ${restaurants.customerReviews[0].name} </p>
<p>Review:${restaurants.customerReviews[0].review}</p>
<p>Tanggal: ${restaurants.customerReviews[0].date}</p>
</div>
`;

const createHomePageTemplate = (restaurants) => `
  <div class="card">
    <div class="image-container"> <!-- Tambahkan container untuk gambar dan city -->
      <img class="resto-img lazyload" alt="${restaurants.name}"
        src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}">
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
