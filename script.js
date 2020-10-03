const gameBoard = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    return {boardArray};
})();

let playerOrder = [];
//I was trying prevent things from being in the global scope, but this needed to be here otherwise it wasn't able to be edited within gameStart and returned in gameController

let hasWon = false;
//same here

const gameController = (() => {
    //This object contains methods and info relating to the flow of the game

    const gameStart = () => {
        let name1 = prompt("Enter Player 1's Name");
        const player1 = playerFactory(name1, "X");
        let name2 = prompt("Enter Player 2's Name");
        const player2 = playerFactory(name2, "O");
        playerOrder = [player1, player2];
        gameController.render();
        for (let i=0; i<9; i++) {
            document.getElementById(`B${i}`).onclick = () => {
                playerOrder[0].funcClick(i);
            };
        };
    }
    
    const render = () => {
        for (i=0; i<9; i++) {
            document.getElementById(`B${i}`).innerHTML = `${gameBoard.boardArray[i]}`;
        };
        document.getElementById("curTurn").textContent = `It is ${playerOrder[0].name}'s turn`
    }

    const checkWin = () => {
        const winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i=0; i<8; i++) {
            if ((gameBoard.boardArray[winArrays[i][0]] == "X" && gameBoard.boardArray[winArrays[i][1]] == "X" && gameBoard.boardArray[winArrays[i][2]] == "X") || (gameBoard.boardArray[winArrays[i][0]] == "O" && gameBoard.boardArray[winArrays[i][1]] == "O" && gameBoard.boardArray[winArrays[i][2]] == "O")) {
                //I was unable to get the win check working easily, so I had to use this less consise way
                playerOrder[1].execWin();
            } else if (gameController.checkFull() && hasWon == false) {
                hasWon = true;
                document.getElementById("winText").textContent = "Nobody Wins."
                let playAgain = document.createElement("button")
                playAgain.textContent = "Play Again?"
                playAgain.id = "playAgain"
                playAgain.onclick = () => {
                    gameController.resetGame();
                }
                document.getElementById("gameEnd").appendChild(playAgain);
            }
        }
    }

    const checkFull = () => {
        result = true;
        for (i=0; i<9; i++) {
            if (gameBoard.boardArray[i] == "") {
                result = false;
            }
        }
        return result;
    }
    //having checkFull in here is weird but having it in gameBoard created issues for some reason. I am not entirely sure why but that is due to my lack of understanding of scope.

    const resetGame = () => {
        gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
        gameController.render();
        document.getElementById("gameEnd").removeChild(document.getElementById("playAgain"));
        document.getElementById("winText").textContent = "";
        hasWon = false;
        console.log(gameBoard.boardArray);
    }

    return {gameStart, render, checkWin, resetGame, checkFull}
})();

const playerFactory = (name, symbol) => {
    const funcClick = (i) => {
        if (gameBoard.boardArray[i] == "" && hasWon == false) {
            gameBoard.boardArray[i] = symbol;
            playerOrder = playerOrder.reverse();
            gameController.render();
            gameController.checkWin();
        } else if (hasWon == true) {
            alert("The game is over.");
        } else {
            alert("Please make a valid move.")
        }
    }

    const execWin = () => {
        document.getElementById("winText").textContent = `${name} Wins!`
        hasWon = true;
        let playAgain = document.createElement("button")
        playAgain.textContent = "Play Again?"
        playAgain.id = "playAgain"
        playAgain.onclick = () => {
            gameController.resetGame();
        }
        document.getElementById("gameEnd").appendChild(playAgain);
    }

    return {name, symbol, funcClick, execWin};
};

gameController.gameStart();
