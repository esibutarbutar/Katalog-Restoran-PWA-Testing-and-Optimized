/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteResto from '../src/scripts/data/favorite-db';

describe('Unliking A Food', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteResto.putDish({ id: 1 });
  });

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavoriteResto.deleteDish(1);
  });

  // eslint-disable-next-line no-undef
  it('should display unlike widget when the food has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteDish: FavoriteResto,
      dish: {
        id: 1,
      },
    });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this dish"]')).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not display like widget when the food has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteDish: FavoriteResto,
      dish: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="like this food"]')).toBeFalsy();
  });

  it('should be able to remove liked food from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteDish: FavoriteResto,
      dish: {
        id: 1,
      },
    });
    document.querySelector('[aria-label="unlike this dish"]').dispatchEvent(new Event('click'));
    expect(await FavoriteResto.getAllDish()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked food is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteDish: FavoriteResto,
      dish: {
        id: 1,
      },
    });
    await FavoriteResto.deleteDish(1);
    document.querySelector('[aria-label="unlike this dish"]').dispatchEvent(new Event('click'));
    expect(await FavoriteResto.getAllDish()).toEqual([]);
  });
});
