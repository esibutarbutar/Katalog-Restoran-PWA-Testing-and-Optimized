import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      database.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: 'id',
      });
    }
  },
});

const FavoriteResto = {
  async getDish(id) {
    if (!id) {
      return null;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllDish() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putDish(dish) {
    if (!Object.prototype.hasOwnProperty.call(dish, 'id')) {
      return null;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, dish);
  },
  async deleteDish(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  // eslint-disable-next-line no-unused-vars, no-empty-function
  async searchDish(query) {
    return (await this.getAllDish()).filter((dish) => {
      const loweredCaseDishTitle = (dish.title || '-').toLowerCase();
      const jammedDishTitle = loweredCaseDishTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedDishTitle.indexOf(jammedQuery) !== -1;
    });
  },

};

export default FavoriteResto;
