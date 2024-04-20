let boxes = document.querySelectorAll('.box');
const beginBtn = document.getElementById('begin-btn');
const resetBtn = document.getElementById('reset-btn');
const title = document.getElementById('title');
let titleText = document.getElementById('titletxt');
let Xplaying = true;
let countX = 0;
let countO = 0;
let gameEnded;

function reset() {
    //setting defaults
    Xplaying = true;
    gameEnded = false;
    countX = 0;
    countO = 0;
    title.style.display = "none";
    boxes.forEach((box) => {
        box.innerText = '';
        box.dataset.Clicked = "false"; // Nothing clicked
    })
}
function begin() {

   // resetBtn.disabled = "true"; //disabling the button "begin"
    resetBtn.style.backgroundColor = "#614BC3";
    resetBtn.style.cursor = "pointer";
    beginBtn.disabled = "true";//disabling the button "begin"
    beginBtn.style.backgroundColor = "#808080";
    beginBtn.style.cursor = "not-allowed";
    title.style.display = "none";
    boxes.forEach((box) => { //looping through each boxes of the grid
        box.innerText = '';
    //hover effect    
        box.addEventListener('mouseover', () => {
            if (box.dataset.Clicked == "true"||gameEnded) return //if the box is already clicked or the game got over- no hover effect
            box.classList.add("boxnewclass") //adding hover-styled class
            if (Xplaying) {
                box.innerText = 'X';
            }
            else {
                box.innerText = 'O';
            }
        })
        box.addEventListener('mouseout', () => {
            if (box.dataset.Clicked == "true"||gameEnded) return //if already clicked - stop setting empty string to the box on movingout
            box.classList.remove("boxnewclass")
            box.innerText = "";

        })
        box.addEventListener('click', () => {
            if (box.dataset.Clicked == "true") return //if already clicked(already there is "X" or "O") - stop setting again 'X' or 'O'
            box.classList.remove("boxnewclass") //before clicking, Hover occurs which adds the class, so need to remove that class after clicking
            if (gameEnded) return
            if (Xplaying) {
                box.innerText = 'X';
                countX++;
                if(countX==5){
                    titleText.innerText = "OOPS! IT'S A DRAW, PRESS RESET"
                    title.style.display = "block";
                }
                Xplaying = false; //means => turn for Player 'O'
                if (countX >= 3) check() //to execute check func only when atleast 3 turns over
            }
            else {
                box.innerText = 'O';
                countO++;
                Xplaying = true;  //means => turn for Player 'X'
                if (countO >= 3) check()  
            }
            box.dataset.Clicked = "true";
            
        })
    });
}

function check() { //function to check winning
    let checkObj = { //concatenate the inner text and store into a key
        row1: boxes[0].innerText + boxes[1].innerText + boxes[2].innerText,// XXX/XOO/XXO/OXX/OOX...
        row2: boxes[3].innerText + boxes[4].innerText + boxes[5].innerText,
        row3: boxes[6].innerText + boxes[7].innerText + boxes[8].innerText,
        col1: boxes[0].innerText + boxes[3].innerText + boxes[6].innerText,
        col2: boxes[1].innerText + boxes[4].innerText + boxes[7].innerText,
        col3: boxes[2].innerText + boxes[5].innerText + boxes[8].innerText,
        diag1: boxes[0].innerText + boxes[4].innerText + boxes[8].innerText,
        diag2: boxes[2].innerText + boxes[4].innerText + boxes[6].innerText,
    }
    for (let key in checkObj) {// looping through the obj
        if (checkObj[key] === "XXX") {
            console.log("X wins")
            titleText.innerText = "X WON"
            title.style.display = "block"; 
            gameEnded = true;  
        }
        if (checkObj[key] === "OOO") {
            console.log("O wins")
            titleText.innerText = "O WON"
            title.style.display = "block";
            gameEnded = true;
        }
    }
}
