const X = 0; //X's turn
const O = 1; //O's turn
let turn = X; //default X first
let xSpots = [] //selected X squares
let oSpots = [] //selected O squares

function updateSquare(square){
    if(turn == X){
        if(!xSpots.includes(square) && !oSpots.includes(square)){
            xSpots.push(square);
            document.getElementById(square).innerHTML = "<img src='x.png'>";
            document.getElementById("turn").innerHTML = "Current Turn: O";
            if(checkWin(square)){
                console.log(turn = " wins!");
                alert("X wins!");
            }
            turn = O;
        }
    }else{
        if(!xSpots.includes(square) && !oSpots.includes(square)){
            oSpots.push(square);
            document.getElementById(square).innerHTML = "<img src='circle.png'></img>"
            document.getElementById("turn").innerHTML = "Current Turn: X";
            if(checkWin(square)){
                console.log(turn = " wins!");
                alert("O wins!");
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
    console.log(spots);
    console.log(cases);
    for(let i = 0; i < cases.length; i++){
        if(containsAll(spots, cases[i])){
            return true;
        }
    }
    return false;
}

function containsAll(spots, singleCase){
    if(spots.includes(singleCase[0]) &&
        spots.includes(singleCase[1])){
        return true;
    }
    return false;
}

function newGame(){

}