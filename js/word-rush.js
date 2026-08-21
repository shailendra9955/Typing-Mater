const rushWords = [

    "apple",
    "keyboard",
    "computer",
    "typing",
    "master",
    "speed",
    "accuracy",
    "practice",
    "school",
    "future",
    "success",
    "coding",
    "website",
    "browser",
    "technology",
    "education",
    "screen",
    "program",
    "javascript",
    "learning"

];


let rushScore = 0;

let rushCorrect = 0;

let rushWrong = 0;

let rushTime = 30;

let rushTimer = null;

let currentWord = "";

let rushActive = false;


/* =====================================================
   START
===================================================== */

function startRush() {

    clearInterval(
        rushTimer
    );


    rushScore = 0;

    rushCorrect = 0;

    rushWrong = 0;

    rushTime = 30;

    rushActive = true;


    const input =
        document.getElementById(
            "rushInput"
        );


    input.value = "";

    input.disabled = false;

    input.focus();


    nextWord();

    updateRushUI();


    document.getElementById(
        "rushMessage"
    ).textContent =
        "Go! Type as many words as possible.";


    rushTimer =
        setInterval(
            () => {

                rushTime--;

                updateRushUI();

                if (
                    rushTime <= 0
                ) {

                    endRush();

                }

            },
            1000
        );

}


/* =====================================================
   NEXT WORD
===================================================== */

function nextWord() {

    currentWord =
        rushWords[
            Math.floor(
                Math.random() *
                rushWords.length
            )
        ];


    document.getElementById(
        "targetWord"
    ).textContent =
        currentWord;

}


/* =====================================================
   INPUT
===================================================== */

document.getElementById(
    "rushInput"
).addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter" ||
            !rushActive
        )
            return;


        const value =
            event.target.value
                .trim()
                .toLowerCase();


        if (
            value ===
            currentWord.toLowerCase()
        ) {

            rushCorrect++;

            rushScore +=
                currentWord.length * 10;

        }
        else {

            rushWrong++;

        }


        event.target.value = "";

        nextWord();

        updateRushUI();

    }
);


/* =====================================================
   UI
===================================================== */

function updateRushUI() {

    document.getElementById(
        "rushScore"
    ).textContent =
        rushScore;

    document.getElementById(
        "rushTime"
    ).textContent =
        rushTime;

    document.getElementById(
        "rushCorrect"
    ).textContent =
        rushCorrect;

    document.getElementById(
        "rushWrong"
    ).textContent =
        rushWrong;

}


/* =====================================================
   END
===================================================== */

function endRush() {

    rushActive = false;

    clearInterval(
        rushTimer
    );


    document.getElementById(
        "rushInput"
    ).disabled = true;


    document.getElementById(
        "rushMessage"
    ).textContent =
        `Game Over! Score: ${rushScore}`;


    const old =
        Number(
            localStorage.getItem(
                "tm_rush_best"
            ) || 0
        );


    if (
        rushScore > old
    ) {

        localStorage.setItem(
            "tm_rush_best",
            rushScore
        );

    }

}


/* =====================================================
   BUTTON
===================================================== */

document.getElementById(
    "startRush"
).onclick =
    startRush;