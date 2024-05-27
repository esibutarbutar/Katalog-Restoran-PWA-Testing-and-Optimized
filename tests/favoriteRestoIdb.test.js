/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { itActsAsFavoriteDishModel } from './contracts/favoriteDishResto';
import FavoriteResto from '../src/scripts/data/favorite-db';

describe('Favorite Food Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteResto.getAllDish()).forEach(async (dish) => {
      await FavoriteResto.deleteDish(dish.id);
    });
  });

  itActsAsFavoriteDishModel(FavoriteResto);
});
