import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('updates a normal item', () => {
    const gildedRose = new GildedRose([
      new Item('foo', 5, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(
      new Item('foo', 4, 9)
    );
  });
  it('returns an array of Items', () => {
  const gildedRose = new GildedRose([
    new Item('foo', 5, 10),
  ]);

  const items: Item[] = gildedRose.updateQuality();

  expect(items[0]).toBeInstanceOf(Item);
});
});
