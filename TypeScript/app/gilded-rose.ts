export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  private increaseQuality(item: Item): void {
      item.quality = item.quality + 1;
  } 

  private decreaseQuality(item: Item): void {
    item.quality = item.quality - 1;
  }
  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (
        item.name !== AGED_BRIE &&
        item.name !== BACKSTAGE_PASS
      ) {
        if (item.quality > 0) {
          if (item.name !== SULFURAS) {
            this.decreaseQuality(item)
          }
        }
      } else {
        if (item.quality < 50) {
          this.increaseQuality(item)
          if (item.name === BACKSTAGE_PASS) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                this.increaseQuality(item)
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                this.increaseQuality(item)
              }
            }
          }
        }
      }
      if (item.name !== SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name !== AGED_BRIE) {
          if (item.name !== BACKSTAGE_PASS) {
            if (item.quality > 0) {
              if (item.name !== SULFURAS) {
                this.decreaseQuality(item)
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            this.increaseQuality(item)
          }
        }
      }
    }

    return this.items;
  }
}
