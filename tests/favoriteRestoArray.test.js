/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { itActsAsFavoriteDishModel } from './contracts/favoriteDishResto';

// eslint-disable-next-line prefer-const
let FavoriteRestos = [];

const FavoriteDishArray = {
  getDish(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line eqeqeq
    return FavoriteRestos.find((dish) => dish.id == id);
  },

  getAllDish() {
    return FavoriteRestos;
  },

  putDish(dish) {
    // eslint-disable-next-line no-prototype-builtins
    if (!dish.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getDish(dish.id)) {
      return;
    }

    FavoriteRestos.push(dish);
  },

  deleteDish(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    // eslint-disable-next-line eqeqeq
    FavoriteRestos = FavoriteRestos.filter((dish) => dish.id != id);
  },

  async searchDish(query) {
    return (this.getAllDish()).filter((dish) => {
      const loweredCaseDishTitle = (dish.title || '-').toLowerCase();
      const jammedDishTitle = loweredCaseDishTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedDishTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Food Idb Contract Test Implementation', () => {
  afterEach(() => {
    // eslint-disable-next-line no-return-assign
    FavoriteRestos = [];
  });

  itActsAsFavoriteDishModel(FavoriteDishArray);
});
