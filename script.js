let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let body = document.querySelector("body");
let newGamebtn=document.querySelector("#newGame");
let msgCont=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");
let turnO = true;
let count=0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgCont.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO===true) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
       box.setAttribute("disabled","true");
       count++;
       let isWinner=checkWinner();
       if(count==9 && !isWinner) {
            gameDraw();
       }
    });
});

const enableBoxes=()=> {
    for(let box of boxes) {
        box.removeAttribute("disabled");
        box.innerText="";
    }
};


const disableBoxes=()=> {
    for(let box of boxes) {
        box.setAttribute("disabled","true");
    }
};

const showWinner=(winner)=> {
    msg.innerText=`Congratulations! Winner is player ${winner}`
    msgCont.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgCont.classList.remove("hide");
    disableBoxes();
  };

const checkWinner=()=> {
    for (let pattern of winPatterns) {
        
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val!="") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
