import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Item, GildedRose } from '@/gilded-rose';

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

type GoldenMasterArgv = [
  node: '<node>',
  script: '<script>',
  days: string
];

function setGoldenMasterArgv(days: number): void {
  const argv: GoldenMasterArgv = ['<node>', '<script>', String(days)];
  process.argv = argv;
}

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('quality never goes below 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
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

  it('should thirtyDays', () => {
    setGoldenMasterArgv(30);
    process.argv = ["<node>", "<script>", "30"];
    require('../golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  });

});
