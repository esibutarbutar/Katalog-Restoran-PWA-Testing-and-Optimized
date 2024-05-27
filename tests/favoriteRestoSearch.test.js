/* eslint-disable class-methods-use-this */
import FavoriteResto from '../src/scripts/data/favorite-db';
import FavoriteDishSearchPresenter from '../src/scripts/views/pages/likedResto/favorite-dish-search-presenter';

class FavoriteDishSearchView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
        <div id="dish-search-container">
          <input id="query" type="text">
          <div class="dish-result-container">
            <ul class="food">
            </ul>
          </div>
        </div>
      `;
  }

  getFavoriteDishTemplate() {
  // eslint-disable-next-line indent
  return `
    <div class="content">
      <h2 class="content__heading">Your Liked Food</h2>
      <div id="dish" class="dish">
        <!-- Add content here -->
      </div>
    </div>
  `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showDish(dish) {
    let html;
    if (dish.length > 0) {
      // Jika ada hasil pencarian, buat elemen untuk setiap item dan tambahkan ke dalam DOM
      html = dish.reduce(
        (carry, food) => carry.concat(`
          <li class="food">
            <span class="food__title">${food.title || '-'}</span>
          </li>
        `),
        '',
      );
    } else {
      // Jika hasil pencarian kosong, tampilkan pesan
      html = '<div class="food__not__found">Tidak ada makanan ditemukan</div>';
    }

    // Memperbarui elemen dengan kelas '.food' dengan hasil pencarian atau pesan
    document.querySelector('.food').innerHTML = html;

    // Memancarkan event 'food:searched:updated' setelah pembaruan tampilan
    document.getElementById('dish-search-container').dispatchEvent(new Event('food:searched:updated'));
  }
}

/* eslint-disable no-undef */
describe('Searching foods', () => {
  let presenter;
  let favoriteDish;
  let view;

  const searchDish = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setDishSearchContainer = () => {
    view = new FavoriteDishSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteDish = {
      searchDish: jest.spyOn(FavoriteResto, 'searchDish'),
      getAllDish: jest.spyOn(FavoriteResto, 'getAllDish'),
    };
    presenter = new FavoriteDishSearchPresenter({
      FavoriteResto: favoriteDish,
      view,
    });
  };

  beforeEach(() => {
    setDishSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteDish.searchDish.mockImplementation(() => []);

      searchDish('food a');

      expect(presenter.latestQuery).toEqual('food a');
    });

    it('should ask the model to search for liked foods', () => {
      favoriteDish.searchDish.mockImplementation(() => []);

      searchDish('food a');

      expect(favoriteDish.searchDish)
        .toHaveBeenCalledWith('food a');
    });

    it('should show the found foods', () => {
      document.querySelector('.food').innerHTML = '';
      presenter._showFoundDish([{ id: 1 }]);
      const foodElements = document.querySelectorAll('.food > li');
      expect(foodElements.length).toEqual(1);
    });

    it('should show the title of the found foods', () => {
      presenter._showFoundDish([
        {
          id: 1,
          title: 'Satu',
        },
      ]);
      expect(document.querySelectorAll('.food__title').item(0).textContent).toEqual('Satu');
    });

    it('should show the title of the found foods', () => {
      presenter._showFoundDish([
        {
          id: 1,
          title: 'Satu',
        },
      ]);

      expect(document.querySelectorAll('.food__title').item(0).textContent).toEqual('Satu');
      presenter._showFoundDish([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      const dishTitles = document.querySelectorAll('.food__title');
      expect(dishTitles.item(0).textContent).toEqual('Satu');
      expect(dishTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found food without title', () => {
      presenter._showFoundDish([{ id: 1 }]);
      expect(document.querySelectorAll('.food__title').item(0).textContent).toEqual('-');
    });

    it('should show the name of the foods found by Favorite Foods', (done) => {
      document
        .getElementById('dish-search-container')
        .addEventListener('food:searched:updated', () => {
          const dishTitles = document.querySelectorAll('.food__title');
          expect(dishTitles.item(0).textContent).toEqual('food abc');
          expect(dishTitles.item(1).textContent).toEqual('ada juga food abcde');
          expect(dishTitles.item(2).textContent).toEqual('ini juga boleh food a');
          done();
        });

      favoriteDish.searchDish.mockImplementation((query) => {
        if (query === 'food a') {
          return [
            { id: 111, title: 'food abc' },
            { id: 222, title: 'ada juga food abcde' },
            { id: 333, title: 'ini juga boleh food a' },
          ];
        }
        return [];
      });

      searchDish('food a');
    });

    it('should show - when the food returned does not contain a title', (done) => {
      document.getElementById('dish-search-container')
        .addEventListener('food:searched:updated', () => {
          const dishTitlesTitles = document.querySelectorAll('.food__title');
          expect(dishTitlesTitles.item(0).textContent)
            .toEqual('-');

          done();
        });

      favoriteDish.searchDish.mockImplementation((query) => {
        if (query === 'food a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchDish('food a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteDish.getAllDish.mockImplementation(() => []);
      searchDish(' ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite dishes when the query is empty', () => {
      favoriteDish.getAllDish.mockImplementation(() => []);
      searchDish('    '); // Passing empty query
      expect(favoriteDish.getAllDish).toHaveBeenCalled();
    });
  });

  describe('When no favorite food could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('dish-search-container')
        .addEventListener('food:searched:updated', () => {
          expect(document.querySelectorAll('.food__not__found').length).toEqual(1);
          done();
        });
      // eslint-disable-next-line no-unused-vars
      favoriteDish.searchDish.mockImplementation((query) => []);
      searchDish('food a');
    });

    it('should not show any food', (done) => {
      document.getElementById('dish-search-container')
        .addEventListener('food:searched:updated', () => {
          expect(document.querySelectorAll('.dish').length).toEqual(0);
          done();
        });
      // eslint-disable-next-line no-unused-vars
      favoriteDish.searchDish.mockImplementation((query) => []);
      searchDish('food a');
    });
  });
});
