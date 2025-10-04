let boxes = document.querySelectorAll(".but");
let rreset = document.querySelector("#reset");

rreset.addEventListener("click", () => {

    for (box of boxes) {

        box.innerText = "";
        box.disabled = false;
        i = 0;
        statu = false;


    }

    document.querySelector("h2").innerText = "";






});


let turn0 = true;

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let i = 0;
let statu = false;
boxes.forEach((but) => {
    but.addEventListener("click", () => {
        if (turn0 === true) {
            but.innerText = "O";
            turn0 = false;
            i++;
        } else {
            but.innerText = "X";
            turn0 = true;
            i++;
        }
        but.disabled = true;
        Checkwinner();
        if (i === 9 && statu === false) {
            document.querySelector("h2").innerText = "DRAW !";
            document.querySelector("h2").style.display = "visible";
        }

    });
});



const Checkwinner = () => {
    for (let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;


        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                statu = true;
                let winner = pos1;
                announce(winner);
                break;

            }


        }
    }

};

let announce = (winner) => {

    document.querySelector("h2").innerText = "WINNER : " + winner;
    document.querySelector("h2").style.visibility = "visible";
    for (let box of boxes) {

        box.disabled = true;

    }



}
