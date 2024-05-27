/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unfavoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Nothing to show here. Add your favorite restaurant', '.empty_content');
});

Scenario('should show the unfavorite button when the restaurant has been favorited before', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.card', 5);
  I.seeElement('.card-content');
  const cardRestaurant = locate('.card-content a').first();
  const firstCardRestaurant = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.card-content');
  const favoritedCard = locate('.card-content a').first();
  const favoritedCardRestaurant = await I.grabTextFrom(favoritedCard);
  assert.strictEqual(firstCardRestaurant, favoritedCardRestaurant);
  I.click(favoritedCard);
  I.seeElement('[aria-label="unlike this dish"]');
});

Scenario('UnLiking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.card', 5);
  I.seeElement('.card');
  const cardRestaurant = locate('.card-content a').first();
  const firstCardRestaurant = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const favoritedCard = locate('.card-content a').first();
  const favoritedCardRestaurant = await I.grabTextFrom(favoritedCard);
  assert.strictEqual(firstCardRestaurant, favoritedCardRestaurant);
  I.click(favoritedCard);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.empty_content');
  const empty = await I.grabTextFrom('.empty_content');
  assert.strictEqual(empty, 'Nothing to show here. Add your favorite restaurant');
});
