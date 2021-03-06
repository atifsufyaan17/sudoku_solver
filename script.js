var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

// you can make a call to changeboard(board) function to update the state on the screen

function isSafeToPut(num,i,j,board){
    for(var x=0;x<9;x++){
        if(board[i][x]==num || board[x][j]==num){
            return false;
        }
    }
    
    i = i-i%3; j=j-j%3;

    for(var x=i;x<i+3;x++){
        for(var y=j;y<j+3;y++){
            if(board[x][y]==num){
                return false;
            }
        }
    }

    return true;
}

function solveSudokuHelper(board,i,j){

    //base case 
    if(i==9){
        changeBoard(board);
        return true;
    }
    //other cases 
    if(j==9){
        return solveSudokuHelper(board,i+1,0);
    }

    if(board[i][j]!=0){
        return solveSudokuHelper(board,i,j+1);
    }

    for(var num=1;num<=9;num++){
        if(isSafeToPut(num,i,j,board)){
            board[i][j]=num;
            var kyaBaakiBaatBani = solveSudokuHelper(board,i,j+1);
            if(kyaBaakiBaatBani==true){
                return true;
            }
            board[i][j]=0;
        }
    }

    return false;

}

function solveSudoku(board) {
    solveSudokuHelper(board,0,0);
}


solve.onclick = function () {
    solveSudoku(board)
}