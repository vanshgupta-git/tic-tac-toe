let box = document.querySelectorAll(".btn");
let reset = document.querySelector(".reset");
let newGame = document.querySelector(".newGame");
let msg = document.querySelector(".msg");
let resultContainer = document.querySelector(".result");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
box.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "blue";
        }
        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "black";
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            draw();
        }
    });
});

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1value = box[pattern[0]].innerText;
        let pos2value = box[pattern[1]].innerText;
        let pos3value = box[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                showWinner(pos1value);
                return true;
            }
        }
    }
};
const showWinner = (winner) => {
    msg.innerText = `${winner} is the Winner!`;
    resultContainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes = () => {
    for (checkbox of box) {
        checkbox.disabled = true;
    }
}
const enableBoxes = () => {
    for (checkbox of box) {
        checkbox.disabled = false;
        checkbox.innerText = "";
    }
}
const draw = () => {
    msg.innerText = `It's a Draw!`;
    resultContainer.classList.remove("hide");
    disableBoxes();
}
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    resultContainer.classList.add("hide");
}

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);

