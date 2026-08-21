const words = [

    "keyboard",
    "typing",
    "computer",
    "practice",
    "master",
    "speed",
    "accuracy",
    "learning",
    "school",
    "future",
    "success",
    "coding",
    "website",
    "javascript",
    "browser",
    "technology",
    "education",
    "keyboard",
    "screen",
    "program"

];


let score = 0;

let lives = 5;

let time = 60;

let active = false;

let timer = null;

let spawner = null;


/* =====================================================
   ELEMENTS
===================================================== */

const screen =
    document.getElementById(
        "gameScreen"
    );

const input =
    document.getElementById(
        "gameInput"
    );


/* =====================================================
   START
===================================================== */

function startGame() {

    stopGame();

    score = 0;

    lives = 5;

    time = 60;

    active = true;

    screen.innerHTML = "";

    input.value = "";

    input.disabled = false;

    input.focus();

    updateUI();


    timer =
        setInterval(
            () => {

                time--;

                updateUI();

                if (time <= 0) {

                    endGame();

                }

            },
            1000
        );


    spawner =
        setInterval(
            spawnWord,
            850
        );


    document.getElementById(
        "gameMessage"
    ).textContent =
        "Type the falling words!";

}


function stopGame() {

    clearInterval(timer);

    clearInterval(spawner);

}


/* =====================================================
   SPAWN
===================================================== */

function spawnWord() {

    if (!active)
        return;


    const word =
        document.createElement(
            "div"
        );

    word.className =
        "falling-word";

    word.textContent =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ];


    word.style.left =
        Math.random() * 85 + "%";


    word.style.top =
        "-30px";


    screen.appendChild(
        word
    );


    let position = -30;


    const speed =
        1 +
        Math.random() * 1.7;


    const movement =
        setInterval(
            () => {

                if (!active) {

                    clearInterval(
                        movement
                    );

                    word.remove();

                    return;

                }


                position += speed;

                word.style.top =
                    position + "px";


                if (
                    position >
                    screen.clientHeight - 30
                ) {

                    clearInterval(
                        movement
                    );

                    word.remove();

                    lives--;

                    updateUI();


                    if (
                        lives <= 0
                    ) {

                        endGame();

                    }

                }

            },
            30
        );


    word.dataset.timer =
        movement;

}


/* =====================================================
   INPUT
===================================================== */

input.addEventListener(
    "input",
    function() {

        const typed =
            this.value
                .trim()
                .toLowerCase();


        if (!typed)
            return;


        const falling =
            document.querySelectorAll(
                ".falling-word"
            );


        falling.forEach(
            word => {

                if (
                    word.textContent
                        .toLowerCase() ===
                    typed
                ) {

                    clearInterval(
                        Number(
                            word.dataset.timer
                        )
                    );

                    word.remove();

                    score +=
                        typed.length * 10;

                    this.value = "";

                    updateUI();

                }

            }
        );

    }
);


/* =====================================================
   UI
===================================================== */

function updateUI() {

    document.getElementById(
        "score"
    ).textContent =
        score;

    document.getElementById(
        "lives"
    ).textContent =
        lives;

    document.getElementById(
        "gameTime"
    ).textContent =
        time;

}


/* =====================================================
   END
===================================================== */

function endGame() {

    active = false;

    stopGame();

    input.disabled = true;

    document.getElementById(
        "gameMessage"
    ).textContent =
        `Game Over! Score: ${score}`;


    const old =
        Number(
            localStorage.getItem(
                "tm_falling_best"
            ) || 0
        );


    if (score > old) {

        localStorage.setItem(
            "tm_falling_best",
            score
        );

    }

}


/* =====================================================
   BUTTONS
===================================================== */

document.getElementById(
    "startGame"
).onclick =
    startGame;


document.getElementById(
    "restartGame"
).onclick =
    startGame;