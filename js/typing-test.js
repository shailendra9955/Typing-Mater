/* =====================================================
   TYPING TEST
===================================================== */

const passages = {

    beginner: [

        "Typing is a useful skill that can help you work faster. Practice every day and try to keep your hands in the correct position.",

        "The sun is bright and the sky is blue. I like to walk outside in the morning. Fresh air helps me feel happy.",

        "Learning new skills takes time and patience. Small steps every day can lead to great results.",

        "Practice makes progress. When you repeat a skill regularly, your fingers become more comfortable.",

        "Good habits are built through small actions repeated every day."

    ],

    intermediate: [

        "Learning to type quickly is not only about moving your fingers faster. Accuracy is important because fewer mistakes mean less time spent correcting your work.",

        "Technology has changed the way people communicate, learn and work. Strong keyboard skills can make everyday computer tasks much easier.",

        "The best way to improve your typing speed is to practice regularly. Focus on accuracy first, then gradually increase your speed.",

        "Every mistake is an opportunity to improve. Pay attention to the letters you often type incorrectly.",

        "Good typing technique allows you to concentrate on your ideas instead of thinking about every individual key.",

        "Regular practice can help improve concentration, confidence and typing speed."

    ],

    advanced: [

        "Efficient communication requires more than simply knowing what to say; it requires the ability to express complex ideas clearly, accurately and without unnecessary hesitation.",

        "Modern software development involves countless interactions with a keyboard, from writing source code and documentation to reviewing configuration files.",

        "Developing exceptional typing proficiency is a gradual process. Consistent practice, deliberate repetition and careful attention to accuracy eventually transform conscious movements into automatic habits.",

        "When productivity matters, even small improvements in typing speed can accumulate into significant amounts of saved time.",

        "The ability to concentrate on meaningful ideas while your fingers automatically handle the mechanics of typing is one of the greatest advantages of extensive keyboard practice."

    ]

};


let testText = "";

let started = false;

let finished = false;

let startTime = null;

let elapsed = 0;

let timerInterval = null;

let errors = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const passage =
    document.getElementById("passage");

const input =
    document.getElementById("typingInput");

const difficulty =
    document.getElementById("difficulty");

const duration =
    document.getElementById("duration");


/* =====================================================
   RANDOM PASSAGE
===================================================== */

function generatePassage() {

    const list =
        passages[difficulty.value];

    const shuffled =
        [...list].sort(
            () => Math.random() - .5
        );

    return shuffled
        .slice(0,3)
        .join(" ");

}


/* =====================================================
   DISPLAY PASSAGE
===================================================== */

function renderPassage() {

    passage.innerHTML = "";

    [...testText].forEach(
        (character,index) => {

            const span =
                document.createElement("span");

            span.textContent =
                character;

            if (index === 0) {

                span.classList.add(
                    "current"
                );

            }

            passage.appendChild(span);

        }
    );

}


/* =====================================================
   NEW PASSAGE
===================================================== */

function newTest() {

    stopTimer();

    testText =
        generatePassage();

    resetTestState();

    renderPassage();

    setTimerDisplay();

    input.focus();

}


/* =====================================================
   RESET SAME PASSAGE
===================================================== */

function resetTestState() {

    started = false;

    finished = false;

    startTime = null;

    elapsed = 0;

    errors = 0;

    input.value = "";

    input.disabled = false;

    document.getElementById(
        "wpm"
    ).textContent = "0";

    document.getElementById(
        "accuracy"
    ).textContent = "100%";

    document.getElementById(
        "errors"
    ).textContent = "0";

    document.getElementById(
        "progressBar"
    ).style.width = "0%";

    document.getElementById(
        "resultBox"
    ).classList.add("hidden");

    document.getElementById(
        "testMessage"
    ).textContent =
        "Start typing to begin.";

}


/* =====================================================
   RESTART
   SAME PASSAGE
===================================================== */

function restartTest() {

    stopTimer();

    resetTestState();

    renderPassage();

    setTimerDisplay();

    input.focus();

}


/* =====================================================
   DURATION CHANGE
   SAME PASSAGE
===================================================== */

duration.addEventListener(
    "change",
    () => {

        /*
         * IMPORTANT:
         * Do NOT call newTest().
         *
         * Duration changes only restart
         * the current passage.
         */

        restartTest();

    }
);


/* =====================================================
   DIFFICULTY CHANGE
   NEW PASSAGE
===================================================== */

difficulty.addEventListener(
    "change",
    () => {

        newTest();

    }
);


/* =====================================================
   TIMER DISPLAY
===================================================== */

function setTimerDisplay() {

    const value =
        Number(duration.value);

    document.getElementById(
        "timer"
    ).textContent =
        value === 0
            ? "∞"
            : value;

}


/* =====================================================
   START TIMER
===================================================== */

function startTimer() {

    if (started)
        return;

    started = true;

    startTime =
        Date.now();

    timerInterval =
        setInterval(
            updateTimer,
            100
        );

}


/* =====================================================
   UPDATE TIMER
===================================================== */

function updateTimer() {

    elapsed =
        Math.floor(
            (
                Date.now() -
                startTime
            ) / 1000
        );

    const limit =
        Number(duration.value);


    if (limit > 0) {

        const remaining =
            Math.max(
                limit - elapsed,
                0
            );

        document.getElementById(
            "timer"
        ).textContent =
            remaining;

        if (
            remaining <= 0
        ) {

            finishTest();

        }

    }
    else {

        document.getElementById(
            "timer"
        ).textContent =
            elapsed;

    }

    updateStats();

}


/* =====================================================
   INPUT
===================================================== */

input.addEventListener(
    "input",
    () => {

        if (finished)
            return;

        if (
            !started &&
            input.value.length
        ) {

            startTimer();

        }

        const typed =
            input.value;

        const spans =
            passage.querySelectorAll(
                "span"
            );

        errors = 0;

        spans.forEach(
            (span,index) => {

                span.classList.remove(
                    "correct",
                    "incorrect",
                    "current"
                );

                if (
                    index <
                    typed.length
                ) {

                    if (
                        typed[index] ===
                        testText[index]
                    ) {

                        span.classList.add(
                            "correct"
                        );

                    }
                    else {

                        span.classList.add(
                            "incorrect"
                        );

                        errors++;

                    }

                }

            }
        );


        if (
            typed.length <
            spans.length
        ) {

            spans[
                typed.length
            ].classList.add(
                "current"
            );

        }


        const progress =
            Math.min(
                (
                    typed.length /
                    testText.length
                ) * 100,
                100
            );


        document.getElementById(
            "progressBar"
        ).style.width =
            progress + "%";


        updateStats();


        if (
            typed.length >=
            testText.length
        ) {

            finishTest();

        }

    }
);


/* =====================================================
   STATISTICS
===================================================== */

function updateStats() {

    const typed =
        input.value;

    let correct = 0;

    [...typed].forEach(
        (character,index) => {

            if (
                character ===
                testText[index]
            ) {

                correct++;

            }

        }
    );


    const minutes =
        Math.max(
            elapsed,
            1
        ) / 60;


    const wpm =
        Math.round(
            (
                correct / 5
            ) / minutes
        );


    const accuracy =
        typed.length === 0
            ? 100
            : Math.round(
                (
                    correct /
                    typed.length
                ) * 100
            );


    document.getElementById(
        "wpm"
    ).textContent =
        isFinite(wpm)
            ? wpm
            : 0;


    document.getElementById(
        "accuracy"
    ).textContent =
        accuracy + "%";


    document.getElementById(
        "errors"
    ).textContent =
        errors;

}


/* =====================================================
   FINISH
===================================================== */

function finishTest() {

    if (finished)
        return;

    finished = true;

    stopTimer();

    updateStats();

    const wpm =
        Number(
            document.getElementById(
                "wpm"
            ).textContent
        );

    const accuracy =
        Number(
            document.getElementById(
                "accuracy"
            ).textContent
                .replace("%","")
        );

    const characters =
        input.value.length;


    document.getElementById(
        "finalWpm"
    ).textContent =
        wpm;

    document.getElementById(
        "finalAccuracy"
    ).textContent =
        accuracy + "%";

    document.getElementById(
        "finalErrors"
    ).textContent =
        errors;

    document.getElementById(
        "finalCharacters"
    ).textContent =
        characters;


    document.getElementById(
        "resultBox"
    ).classList.remove(
        "hidden"
    );


    input.disabled = true;


    saveTypingResult(
        wpm,
        accuracy,
        characters
    );

}


/* =====================================================
   STOP TIMER
===================================================== */

function stopTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }

}


/* =====================================================
   BUTTONS
===================================================== */

document.getElementById(
    "newPassage"
).addEventListener(
    "click",
    newTest
);


document.getElementById(
    "restartTest"
).addEventListener(
    "click",
    restartTest
);


document.getElementById(
    "tryAgain"
).addEventListener(
    "click",
    newTest
);


/* =====================================================
   START
===================================================== */

newTest();