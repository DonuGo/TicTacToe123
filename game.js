var powerof10 = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
var mySet = [new Set(), new Set(),new Set(),new Set(),new Set(),new Set(),new Set()]
var totalSet = new Set();

var tieSet = new Set();
var winSet = [new Set(), new Set()];

function add(game, index, number) {
    var ret = game;
    ret += powerof10[index] * number;

    if (number == 7) {
        for (var i = 0; i < 9; i++) {
            if ((Math.floor(ret / powerof10[i]) % 10) != 0) {
                ret -= powerof10[i];
            }
        }

    }
    return ret;
}

function getMax(game)
{
    var max = 0;
    for (var i = 0; i < 9; i++) {
        if ((Math.floor(game / powerof10[i]) % 10) > max) {
            max = Math.floor(game / powerof10[i]) % 10;
        }
    }
    return max;
}

function checkFinish(game)
{
    var data = [];
    for (var i = 0; i < 9; i++) {
        var tmp = Math.floor(game / powerof10[i]) % 10;
        if (tmp) {
		if (tmp % 2) {
            		data.push(1);
		} else {
			data.push(-1);

		}
        } else
            data.push(0);
    }

    for (var i = 0; i < 3; i++) {
        if (data[i * 3] > 0 && data[1 + i * 3] > 0 && data[2 + i * 3] > 0)
            return 1;
        if (data[i * 3] < 0 && data[1 + i * 3] < 0 && data[2 + i * 3] < 0)
            return 2;
        if (data[i] > 0 && data[i + 3] > 0 && data[i + 6] > 0)
            return 1;
        if (data[i] < 0 && data[i + 3] < 0 && data[i + 6] < 0)
            return 2;
    }

    if (data[0] > 0 && data[4] > 0 && data[8] > 0)
        return 1;
    if (data[0] < 0 && data[4] < 0 && data[8] < 0)
        return 2;

    if (data[2] > 0 && data[4] > 0 && data[6] > 0)
        return 1;
    if (data[2] < 0 && data[4] < 0 && data[6] < 0)
        return 2;

    return 0;

}
function run() {

    // Find the first order
    mySet[0].add(0);
    totalSet.add(0);
    for (var step = 1; step < 7; step++) {
        for (let game of mySet[step-1]) {
            for (var index = 0; index < 9; index++) {
                if ((Math.floor(game / powerof10[index]) % 10) == 0) {
                    var next = add(game, index, step);

                    if (!mySet[step].has(next)) {
                        mySet[step].add(next);
                        totalSet.add(next);
                    }
                }
            }
        }
    }

    // classify
    for (let game of totalSet) {
        var result = checkFinish(game);
        if (result == 1) {
            winSet[0].add(game);
            winSet[1].add(game + 1000000000);
        } else if (result == 2) {
            winSet[0].add(game + 1000000000);
            winSet[1].add(game);
        } else {
            tieSet.add(game);
            tieSet.add(game + 1000000000);
        }
    }

    console.log("Tie set: " + tieSet.size);
    console.log("Win set0: " + winSet[0].size);
    console.log("Win set1: " + winSet[1].size);
    console.log("Sum: " + (winSet[1].size + winSet[0].size + tieSet.size));

    var before = 0;
    var after = 1;
    while (before != after) {
        before = tieSet.size;
        for (let game of tieSet) {
            var number = getMax(game);
            var order1 = 0;
            var order2 = 1;

            if (number < 6) {
                order1 = number % 2;
                order2 = (number + 1) % 2;
            } else {
                if (game > 1000000000) {
                    order1 = 1;
                    order2 = 0;
                }
            }

            var gameStatus = 0;
            for (var index = 0; index < 9; index++) {
                if ((Math.floor(game / powerof10[index]) % 10) == 0) {
                    var next = add(game, index, number + 1);
                    if (number == 6) {
                        if (next > 1000000000) {
                            next -= 1000000000;
                        } else {
                            next += 1000000000;
                        }
                    }
                    if (winSet[order1].has(next)) {
                        gameStatus = -1;
                        break;
                    }

                    if (!winSet[order2].has(next)) {
                        gameStatus++;
                    }
                }
            }

            if (gameStatus == -1) {
                winSet[order1].add(game);
                tieSet.delete(game);
            } else if (gameStatus == 0) {
                winSet[order2].add(game);
                tieSet.delete(game);
            }

	    }
    	after = tieSet.size;
    }

    console.log("Tie set: " + tieSet.size);
    console.log("Win set0: " + winSet[0].size);
    console.log("Win set1: " + winSet[1].size);
    console.log("Sum: " + (winSet[1].size + winSet[0].size + tieSet.size));

    if (winSet[0].has(1006543210)) {
        console.log("test1 ok");
    }

    if (winSet[0].has(0)) {
        console.log("test2 ok");
    }

    if (!winSet[0].has(1)) {
        console.log("test3 ok");
    }

    if (winSet[0].has(10)) {
        console.log("test4 ok");
    }

    if (!winSet[0].has(100)) {
        console.log("test5 ok");
    }

    if (winSet[0].has(1000)) {
        console.log("test6 ok");
    }

    if (!winSet[0].has(10000)) {
        console.log("test7 ok");
    }

    if (winSet[0].has(100000)) {
        console.log("test8 ok");
    }

    if (!winSet[0].has(1000000)) {
        console.log("test9 ok");
    }

    if (winSet[0].has(10000000)) {
        console.log("test10 ok");
    }

    if (!winSet[0].has(100000000)) {
        console.log("test11 ok");
    }
}

function drawLine()
{
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.strokeStyle = '#000000';
    var width  = c.width;
    var height = c.height;

    ctx.moveTo(0, height / 3);
    ctx.lineTo(width, height / 3);

    ctx.moveTo(0, height * 2 / 3);
    ctx.lineTo(width, height * 2 / 3);

    ctx.moveTo(width / 3, 0);
    ctx.lineTo(width / 3, height);

    ctx.moveTo(width * 2 / 3, 0);
    ctx.lineTo(width * 2 / 3, height);
    ctx.stroke();
}

function drawMark(index, mark, depth)
{
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth=10;
    var width  = c.width;
    var height = c.height;

    var x = (index % 3) * (width / 3) + (width / 6);
    var y = Math.floor(index / 3) * (height / 3) + (height / 6);

    if (mark == "O") {
        ctx.arc(x, y, width / 6 * 0.8 , 0, 2 * Math.PI);
        ctx.strokeStyle = '#0000ff';
        ctx.strokeStyle = "rgba(0,0,255," + depth / 6 + ")";// '#0000ff';

    } else if (mark == "X") {
        ctx.moveTo(x + width / 6 * 0.8, y - width / 6 * 0.8);
        ctx.lineTo(x - width / 6 * 0.8, y + width / 6 * 0.8);
        ctx.moveTo(x - width / 6 * 0.8, y - width / 6 * 0.8);
        ctx.lineTo(x + width / 6 * 0.8, y + width / 6 * 0.8);
        ctx.strokeStyle = '#ff0000';
        ctx.strokeStyle = "rgba(255,0,0," + depth / 6 + ")";// '#0000ff';
    }
    ctx.stroke();
}

function reDraw(game)
{
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    drawLine();

    var order = 0;
    if (game > 1000000000) {
        order = 1;
    }
    if (getMax(currentGame) < 6)
        order = 0;

    for (var i = 0; i < 9; i++) {
        var tmp = Math.floor(game / powerof10[i]) % 10;
        if (tmp) {
            if ((tmp%2)^order) {
                drawMark(i, "O", tmp);
            } else {
                drawMark(i, "X", tmp);
            }
        }

    }
}

var currentGame = 0;
var number = 1;

function AIact()
{
    var win = [];
    var tie = [];
    var lose = [];
    if (number > 7)
        number = 7;

    var target = -1;
    for (var index = 0; index < 9; index++) {
        if ((Math.floor(currentGame / powerof10[index]) % 10) == 0) {
            var next = add(currentGame, index, number);
            if (number == 7)
                if (next > 1000000000)
                    next -= 1000000000;
                else
                    next += 1000000000;

            if (winSet[0].has(next)) {
                win.push(index);
            } else if (tieSet.has(next)) {
                tie.push(index);
            } else {
                lose.push(index);
            }
        }
    }
    if (win.length > 0) {
        target = win[Math.floor(Math.random()*win.length)];
        console.log("find win: " + target);
    } else if (tie.length > 0) {
        target = tie[Math.floor(Math.random()*tie.length)];
        console.log("find tie: " + target);
    } else {
        target = lose[Math.floor(Math.random()*lose.length)];
        console.log("find lose: " + target);
    }
    return target;
}

function reset()
{
    document.getElementById("result").innerHTML = "";
    currentGame = 0;
    number = 1;
    currentStep = 0;
    reDraw(currentGame);
}

var currentStep = 0;
function act(index)
{
    if (number > 7)
        number = 7;

    currentGame = add(currentGame, index, number);
    if (number == 7)
        if (currentGame > 1000000000)
            currentGame -= 1000000000;
        else
            currentGame += 1000000000;

    console.log(number + " " + currentGame);
    number++;
    reDraw(currentGame);
    if (checkFinish(currentGame)) {
        document.getElementById("result").innerHTML = "Game over";
    }
    if (currentStep > getCookie()) {
        setCookie(currentStep);
    }
    console.log("cookie"  + getCookie());
    document.getElementById("Max").innerHTML = "Max score: " + getCookie();
    document.getElementById("Now").innerHTML = "Now score: " + currentStep;
}

function onClick(e)
{
    if (checkFinish(currentGame)) {
        reset();
        act(AIact());
        return ;
    }

    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    var rect = c.getBoundingClientRect();

    var x =  Math.floor((e.clientX - rect.left) / (c.width / 3));
    var y = Math.floor((e.clientY - rect.top) / (c.height / 3));
    var index =  x + ( y * 3 );

    if (Math.floor(currentGame / powerof10[index]) % 10)
        return ;

    currentStep++;
    act(index);
    index = AIact();
    act(index);
}

function setCookie(score)
{
    localStorage.setItem("maxscore", score);
}

function getCookie()
{
    if (localStorage.getItem("maxscore") == null)
        return 0;
    return localStorage.maxscore
}
