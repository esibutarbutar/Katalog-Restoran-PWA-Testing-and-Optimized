import UrlParser from '../../routes/url-parser';
import RestoDbSources from '../../data/restaurant-source';
import { createRestoDetailTemplate } from '../templates/template';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteDish from '../../data/favorite-db';

const Details = {
  async render() {
    return `
    <div class="container">
      <div id="dish__details" class="detail container__height"></div>
      <div id="likeButtonContainer"></div>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const items = await RestoDbSources.detailResto(url.id);
    const { restaurant } = items;
    const detailContainer = document.getElementById('dish__details');
    detailContainer.innerHTML = createRestoDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      favoriteDish: FavoriteDish,
      dish: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        categories: restaurant.categories.name,
      },
    });
  },
};

export default Details;
