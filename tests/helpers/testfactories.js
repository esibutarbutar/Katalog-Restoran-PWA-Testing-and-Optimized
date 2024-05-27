// eslint-disable-next-line import/newline-after-import
import FavoriteResto from '../../src/scripts/data/favorite-db';
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithDish = async (dish) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteDish: FavoriteResto,
    dish,
  });
};
// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithDish };
