/* eslint-disable no-undef */
const itActsAsFavoriteDishModel = (favoriteDish) => {
  it('should return the dish that has been added', async () => {
    favoriteDish.putDish({ id: 1 });
    favoriteDish.putDish({ id: 2 });

    expect(await favoriteDish.getDish(1)).toEqual({ id: 1 });
    expect(await favoriteDish.getDish(2)).toEqual({ id: 2 });
    expect(await favoriteDish.getDish(3)).toEqual(undefined);
  });

  it('should refuse a food from being added if it does not have the correct property', async () => {
    favoriteDish.putDish({ aProperty: 'property' });

    expect(await favoriteDish.getAllDish()).toEqual([]);
  });

  it('can return all of the food that have been added', async () => {
    favoriteDish.putDish({ id: 1 });
    favoriteDish.putDish({ id: 2 });

    expect(await favoriteDish.getAllDish()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite food', async () => {
    favoriteDish.putDish({ id: 1 });
    favoriteDish.putDish({ id: 2 });
    favoriteDish.putDish({ id: 3 });

    await favoriteDish.deleteDish(1);

    expect(await favoriteDish.getAllDish()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a food even though the dish has not been added', async () => {
    favoriteDish.putDish({ id: 1 });
    favoriteDish.putDish({ id: 2 });
    favoriteDish.putDish({ id: 3 });

    await favoriteDish.deleteDish(4);

    expect(await favoriteDish.getAllDish()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should be able to search for foods', async () => {
    favoriteDish.putDish({ id: 1, title: 'food a' });
    favoriteDish.putDish({ id: 2, title: 'food b' });
    favoriteDish.putDish({ id: 3, title: 'food abc' });
    favoriteDish.putDish({ id: 4, title: 'ini mah food abcd' });

    expect(await favoriteDish.searchDish('food a')).toEqual([
      { id: 1, title: 'food a' },
      { id: 3, title: 'food abc' },
      { id: 4, title: 'ini mah food abcd' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteDishModel };
