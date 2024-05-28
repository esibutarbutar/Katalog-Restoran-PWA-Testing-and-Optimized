/* eslint-disable no-empty-function *//* eslint-disable linebreak-style */
import RestoDbSources from '../../data/restaurant-source';
import { createHomePageTemplate } from '../templates/template';

const Home = {
  async render() {
    return `
    <div class="hero-container">
    <h1 class="hero-heading">Discover delicious cuisines....</h1>
   
    <picture>
        <source media="(max-width: 600px)" srcset="/images/heros/hero-image_4-small.jpg" type="image/webp">
        <source media="(max-width: 600px)" srcset="/images/heros/hero-image_4-small.jpg" type="image/jpeg">

        <img class="hero-image lazyload" src='/images/heros/hero-image_4-large.jpg' 
             alt="Hero Images">
      </picture>
  </div>
  
  <section id="maincontent">
    <h1 class="title" tabindex="0">Explore Restaurant</h1>
    <hr>
  </section>
            <section class="list-resto" id="listResto"></section>
        `;
  },

  async afterRender() {
    const restaurants = await RestoDbSources.homePage();
    const listRestoContainer = document.querySelector('#listResto');
    restaurants.forEach((restaurant) => {
      listRestoContainer.innerHTML += createHomePageTemplate(restaurant);
    });
  },
};

export default Home;
