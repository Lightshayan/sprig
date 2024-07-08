
/* 
@title: maze_game_starter
@author: Shayan
@tags: []
@addedOn: 2023-08-08
*/

const player = "p";
const wall = "w";
const goal = "g";
const key = "k";
const keyBox = "b";

setLegend(
	[ player, bitmap`
................
................
.....66666......
....6666666.....
...666666666....
...660660666....
...666666666....
...606666066....
...660000666....
....6666666.....
.....66666......
................
................
................
................
................` ],
    [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [key, bitmap`
................
.....6666666....
.....6666666....
.....66...66....
.....66...66....
.....66...66....
.....6666666....
.....6666666....
.......66.......
.......6666.....
.......66.......
.......6666.....
.......66.......
.......66.......
................
................`],
  [keyBox, bitmap`
..1..1..1..1..1.
1111111111111111
..1..1LLLL.1..1.
..1..LL.1LL1..1.
11111L1111L11111
..1..L..1.L1..1.
..1LLLLLLLLLL.1.
111LLLLLLLLLL111
..1LLLL22LLLL.1.
..1LLL2222LLL.1.
111LLL2222LLL111
..1LLLL22LLLL.1.
..1LLLL22LLLL.1.
111LLLLLLLLLL111
..1..1..1..1..1.
..1..1..1..1..1.`],
  [goal, bitmap`
....CCCCCCCC....
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....`]
);

setSolids([ player, wall ]); 

let level = 0
const levels = [
	map`
....
.ww.
.w..
pw.g`,
    map`
w...wp..
w.w.www.
w.w..gw.
wbwwwww.
........
www.www.
kww...w.
......w.`,
]

setMap(levels[level])

setPushables({
	[ player ]: []
})
//Player Controls
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
	getFirst(player).x += 1
});
// these get run after every input
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
    const keyCollected = tilesWith(player, key);
    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("You Win!", { x: 6, y: 6, color: color`9` });
        }
    }
  if (keyCollected.length >= 1) {
    getFirst(key).remove();
    getFirst(keyBox).remove();
  }
});
