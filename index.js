/* 
@title: maze-trixs
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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC6CC6C66C6CCC6C
CC6C6CC6CCC666CC
CC66CCC66CCC6CCC
CC6C6CC6CCCC6CCC
CC6CC6C66CCC6CCC
CCCCCCCCCCCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [goal, bitmap`
....44444444....
...4999999994...
..499333333994..
.49336666663394.
4993666666663994
4936666666666394
4936666666666394
4936666666666394
4936666666666394
4936666666666394
4936666666666394
4993666666663994
.49336666663394.
..499333333994..
...4999999994...
....44444444....`]
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

    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { x: 6, y: 6, color: color`9` });
        }
    }
});
