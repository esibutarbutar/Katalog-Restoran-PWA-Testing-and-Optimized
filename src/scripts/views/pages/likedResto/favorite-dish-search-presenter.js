/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
class FavoriteDishSearchPresenter {
  constructor({ FavoriteResto, view }) {
    this._view = view;
    this._favoritedish = FavoriteResto;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchDish(latestQuery);
    });
  }

  async _searchDish(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundDish;
    if (this._latestQuery.length > 0) {
      foundDish = await this._favoritedish.searchDish(this._latestQuery);
    } else {
      foundDish = await this._favoritedish.getAllDish();
    }

    this._showFoundDish(foundDish);
  }

  _showFoundDish(dish) {
    this._view.showDish(dish);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteDishSearchPresenter;
