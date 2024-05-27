/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const assert = require('assert');

Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Nothing to show here. Add your favorite restaurant', '.empty_content');
});

Scenario('should show the favorite button when the restaurant has not been favorited before', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card', 5);
  I.seeElement('.card');
  const cardRestaurant = locate('.card-content a').first();
  I.click(cardRestaurant);
  I.seeElement('[aria-label="like this dish"]');
});

Scenario('liking one restaurants', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.card');
  I.seeElement('.card');
  const cardRestaurant = locate('.card-content a').first();
  const firstRestaurantTitle = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const favoritedCardRestaurant = await I.grabTextFrom('.card-content a');
  assert.strictEqual(firstRestaurantTitle, favoritedCardRestaurant);
});
