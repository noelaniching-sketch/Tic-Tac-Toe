window.addEventListener("DOMContentLoaded", () => {

    const boxes = document.querySelectorAll(".box");
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcement = document.querySelector(".announcement");

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let livePlayer = "X"; // X = Player 1, O = Player 2
    let activeGame = true;

    const player1 = "Player 1 Wins!";
    const player2 = "Player 2 Wins!";
    const draw = "It is a draw!";

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Update text showing whose turn it is
    const updateTurnText = () => {
        if (livePlayer === "X") {
            playerDisplay.innerText = "1";
        } else {
            playerDisplay.innerText = "2";
        }
    };

    updateTurnText(); // show at start

    const validPlay = (box) => box.innerText === "";

    const updateGame = (index) => {
        gameBoard[index] = livePlayer;
    };

    // Switch player AND update turn display
    const changePlayer = () => {
        livePlayer = livePlayer === "X" ? "O" : "X";
        updateTurnText();
    };

    const announce = (type) => {
        if (type === player1) {
            announcement.innerHTML = "Player <span class='player1'>1</span> Wins!";
        } else if (type === player2) {
            announcement.innerHTML = "Player <span class='player2'>2</span> Wins!";
        } else {
            announcement.innerText = "Draw!";
        }
        announcement.classList.remove("hide");
    };

    const checkResults = () => {
        for (let combo of winCombos) {
            const [a, b, c] = combo;

            if (
                gameBoard[a] &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            ) {
                announce(livePlayer === "X" ? player1 : player2);
                activeGame = false;
                return;
            }
        }

        if (!gameBoard.includes("")) {
            announce(draw);
        }
    };

    const userAction = (box, index) => {
        if (validPlay(box) && activeGame) {
            box.innerText = livePlayer;
            box.classList.remove('player-x', 'player-o');
            box.classList.add(livePlayer === 'X' ? 'player-x' : 'player-o');

            updateGame(index);
            checkResults();
            changePlayer();
        }
    };

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => userAction(box, index));
    });

    const clearBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        activeGame = true;
        announcement.classList.add("hide");

        livePlayer = "X";
        updateTurnText();

        boxes.forEach(box => {
            box.innerText = "";
            box.classList.remove('player-x', 'player-o'); // remove color classes

        });
    };

    resetButton.addEventListener("click", clearBoard);
});
