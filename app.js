const X = 0; //X's turn
const O = 1; //O's turn
const ON = 0; //bot ON
const OFF = 1; //bot OFF
let turn = X; //default X first
let xSpots = [] //selected X squares
let oSpots = [] //selected O squares
let allSpots = [] // all selected squares
let won = false;

function checkInput(square){
    if(!won){
        if(document.getElementById("checkbox").checked){
            //multiplayer
            console.log("checked");
            updateSquare(square);
        }else{
            //singleplayer
            console.log("not checked");
            updateSquare(square);
            setTimeout(() => {  
                //need to decide which square to select
                if(canWin(oSpots) > 0){
                    updateSquare(canWin(oSpots));
                }else if(canWin(xSpots) > 0){
                    updateSquare(canWin(xSpots));
                }else{
                    if(!allSpots.includes(5)){
                        updateSquare(5);
                    }else if(!allSpots.includes(1)){
                        updateSquare(1);
                    }else if(!allSpots.includes(3)){
                        updateSquare(3);
                    }else if(!allSpots.includes(7)){
                        updateSquare(7);
                    }else if(!allSpots.includes(9)){
                        updateSquare(9);
                    }else if(!allSpots.includes(2)){
                        updateSquare(2);
                    }else if(!allSpots.includes(4)){
                        updateSquare(4);
                    }else if(!allSpots.includes(6)){
                        updateSquare(6);
                    }else{
                        updateSquare(8);
                    }
                }
            }, 500);
        }
        if(allSpots.length >= 9){
            setTimeout(() => {
                console.log("Tie!");
                alert("Tie!");
            }), 500;
            won = true;
        }
    }
}

//check for 2 X's in a row
//return square to block, -1 otherwise
function canWin(spots){
    let cases = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];
    let winning = [];
    for(let i = 0; i < cases.length; i++){
        let matches = 0;
        for(let j = 0; j < spots.length; j++){
            if(cases[i].includes(spots[j])){
                winning.push(spots[j])
                matches++
            }
        }
        if(matches == 2){
            console.log("i: " + i);
            if(i == 6){ //edge case
                for(let x = 2; x < 10; x++){
                    if(!allSpots.includes(x)){
                        return x;
                    }
                }
            }
            for(let j = 0; j < 3; j++){
                if(!winning.includes(cases[i][j]) &&
                    !allSpots.includes(cases[i][j])){
                    return cases[i][j];
                }
            }
        }
    }
    return -1;
}

function updateSquare(square){
    console.log("updating: " + square);
    allSpots.push(square);
    if(turn == X){
        if(!xSpots.includes(square) && !oSpots.includes(square)){
            xSpots.push(square);
            document.getElementById(square).innerHTML = "<img src='x.png'>";
            document.getElementById("turn").innerHTML = "Current Turn: O";
            if(checkWin(square)){
                won = true;
                setTimeout(() => {
                    console.log("X wins!");
                    alert("X wins!");
                }), 500;
            }
            turn = O;
        }
    }else{
        if(!xSpots.includes(square) && !oSpots.includes(square)){
            oSpots.push(square);
            document.getElementById(square).innerHTML = "<img src='circle.png'></img>"
            document.getElementById("turn").innerHTML = "Current Turn: X";
            if(checkWin(square)){
                won = true;
                setTimeout(() => {
                    console.log("O wins!");
                    alert("O wins!");
                }), 500;
            }
            turn = X;
        }
    }
}

function checkWin(square){
    let spots = [];
    let cases = [];
    if(turn == X){
        spots = xSpots;
    }else{
        spots = oSpots;
    }
    console.log(square);
    switch(square){
        case 1:
            cases = [[2,3],[4,7],[5,9]];
            break;
        case 2:
            cases = [[1,3],[5,8]];
            break;
        case 3:
            cases = [[1,2],[6,9],[5,7]];
            break;
        case 4:
            cases = [[1,7],[5,6]];
            break;
        case 5:
            cases = [[4,6],[2,8],[1,9],[3,7]];
            break;
        case 6:
            cases = [[3,9],[4,5]];
            break;
        case 7:
            cases = [[1,4],[8,9],[3,5]];
            break;
        case 8:
            cases = [[2,5],[7,9]];
            break;
        case 9:
            cases = [[1,5],[7,8],[3,6]];
    }
    return checkCases(spots, cases);
}

function checkCases(spots, cases){
    for(let i = 0; i < cases.length; i++){
        if(spots.includes(cases[i][0]) &&
        spots.includes(cases[i][1])){
        return true;
        }
    }
    return false;
}

function newGame(){
    console.log("New Game");
    let i = 1;
    while(i < 10){
        document.getElementById(i).innerHTML = "";
        i++;
    }
    document.getElementById("turn").innerHTML = "Current Turn: X";
    turn = X;
    xSpots = [];
    oSpots = [];
    allSpots = [];
    won = false;
}