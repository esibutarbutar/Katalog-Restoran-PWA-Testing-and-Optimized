import FavoriteResto from '../src/scripts/data/favorite-db';
import * as TestFactories from './helpers/testfactories';

// eslint-disable-next-line no-undef
describe('Liking a Food', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    addLikeButtonContainer();
  });

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    // Clean up IndexedDB after each test
    const allDishes = await FavoriteResto.getAllDish();
    allDishes.forEach(async (dish) => {
      await FavoriteResto.deleteDish(dish.id);
    });
  });

  // eslint-disable-next-line no-undef
  it('should show like button when food has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithDish({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this dish"]')).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not show the unlike button when the food has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithDish({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this dish"]')).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it('should be able to like the food', async () => {
    await TestFactories.createLikeButtonPresenterWithDish({ id: 1 });
    document.getElementById('likeButton').dispatchEvent(new Event('click'));

    const dish = await FavoriteResto.getDish(1);
    // eslint-disable-next-line no-undef
    expect(dish).toEqual({ id: 1 });
  });

  // eslint-disable-next-line no-undef
  it('should not add a dish again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithDish({ id: 1 });

    await FavoriteResto.putDish({ id: 1 });

    document.getElementById('likeButton').dispatchEvent(new Event('click'));
    const allDishes = await FavoriteResto.getAllDish();
    // eslint-disable-next-line no-undef
    expect(allDishes).toEqual([{ id: 1 }]);
  });

  // eslint-disable-next-line no-undef
  it('should not add a food when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithDish({});

    document.getElementById('likeButton').dispatchEvent(new Event('click'));
    // eslint-disable-next-line no-undef
    expect(await FavoriteResto.getAllDish()).toEqual([]);
  });
});
