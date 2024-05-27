import FavoriteDish from '../../data/favorite-db';
import { createHomePageTemplate } from '../templates/template';

const Favorite = {
  async render() {
    return `
    <div class="favorite_container">
        <h2>Your Favorite Restaurant</h2>
        <div id="empty_content" class="empty_content"></div>
        <div id="favorite_content" class="favorite_content"></div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteDish.getAllDish();
    const restaurantsContainer = document.querySelector('#favorite_content');
    const emptyRestaurant = document.querySelector('.empty_content');
    if (restaurants.length === 0) {
      emptyRestaurant.innerHTML = 'Nothing to show here. Add your favorite restaurant';
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createHomePageTemplate(restaurant);
    });
  },

};

export default Favorite;
