const practicePassages = {

    beginner: [
        "Practice typing every day to improve your speed and accuracy.",
        "Learning takes time. Stay patient and keep practicing.",
        "Good typing habits can make computer work easier."
    ],

    intermediate: [
        "The best way to improve your typing is to practice regularly while maintaining accuracy.",
        "Typing becomes easier when your fingers learn the position of every key automatically.",
        "Regular practice improves confidence, concentration and typing speed."
    ],

    advanced: [
        "Developing exceptional typing proficiency requires consistent practice, deliberate repetition and careful attention to accuracy.",
        "Professional productivity can improve significantly when typing becomes an automatic and reliable skill.",
        "Efficient communication requires the ability to express complex ideas clearly and accurately."
    ]

};


let practiceText = "";

let practiceStart = null;


/* =====================================================
   TABS
===================================================== */

const generatedTab =
    document.getElementById(
        "generatedTab"
    );

const customTab =
    document.getElementById(
        "customTab"
    );

const generated =
    document.getElementById(
        "generatedPractice"
    );

const custom =
    document.getElementById(
        "customPractice"
    );


generatedTab.onclick = () => {

    generatedTab.classList.add(
        "active"
    );

    customTab.classList.remove(
        "active"
    );

    generated.classList.remove(
        "hidden"
    );

    custom.classList.add(
        "hidden"
    );

};


customTab.onclick = () => {

    customTab.classList.add(
        "active"
    );

    generatedTab.classList.remove(
        "active"
    );

    custom.classList.remove(
        "hidden"
    );

    generated.classList.add(
        "hidden"
    );

};


/* =====================================================
   GENERATED
===================================================== */

function generatePractice() {

    const level =
        document.getElementById(
            "practiceDifficulty"
        ).value;

    const list =
        practicePassages[level];

    practiceText =
        list[
            Math.floor(
                Math.random() *
                list.length
            )
        ];

    renderPractice();

}


function renderPractice() {

    const passage =
        document.getElementById(
            "practicePassage"
        );

    passage.innerHTML = "";

    [...practiceText].forEach(
        (character,index) => {

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                character;

            if (index === 0) {

                span.classList.add(
                    "current"
                );

            }

            passage.appendChild(
                span
            );

        }
    );


    const input =
        document.getElementById(
            "practiceInput"
        );

    input.value = "";

    input.focus();

}


document.getElementById(
    "practiceNew"
).onclick =
    generatePractice;


document.getElementById(
    "practiceDifficulty"
).onchange =
    generatePractice;


/* =====================================================
   GENERATED INPUT
===================================================== */

document.getElementById(
    "practiceInput"
).addEventListener(
    "input",
    function() {

        if (!practiceStart) {

            practiceStart =
                Date.now();

        }


        updatePractice(
            practiceText,
            this.value,
            "practicePassage",
            "practiceProgress",
            "practiceStats"
        );

    }
);


/* =====================================================
   CUSTOM PRACTICE
===================================================== */

document.getElementById(
    "startCustom"
).onclick =
    () => {

        const text =
            document.getElementById(
                "customText"
            ).value.trim();


        if (!text) {

            alert(
                "Please enter some text first."
            );

            return;

        }


        renderCustom(text);

    };


function renderCustom(text) {

    const passage =
        document.getElementById(
            "customPassage"
        );

    passage.innerHTML = "";


    [...text].forEach(
        (character,index) => {

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                character;

            if (index === 0) {

                span.classList.add(
                    "current"
                );

            }

            passage.appendChild(
                span
            );

        }
    );


    document.getElementById(
        "customArea"
    ).classList.remove(
        "hidden"
    );


    const input =
        document.getElementById(
            "customInput"
        );

    input.value = "";

    input.focus();

    input.dataset.text =
        text;

};


/* =====================================================
   CUSTOM INPUT
===================================================== */

document.getElementById(
    "customInput"
).addEventListener(
    "input",
    function() {

        updatePractice(
            this.dataset.text || "",
            this.value,
            "customPassage",
            "customProgress",
            "customStats"
        );

    }
);


/* =====================================================
   SHARED PRACTICE UPDATE
===================================================== */

function updatePractice(
    text,
    typed,
    passageId,
    progressId,
    statsId
) {

    const spans =
        document.querySelectorAll(
            "#" + passageId + " span"
        );


    let correct = 0;

    let errors = 0;


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
                    text[index]
                ) {

                    span.classList.add(
                        "correct"
                    );

                    correct++;

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


    const start =
        practiceStart ||
        Date.now();


    if (!practiceStart) {

        practiceStart =
            start;

    }


    const seconds =
        Math.max(
            (
                Date.now() -
                start
            ) / 1000,
            1
        );


    const wpm =
        Math.round(
            (
                correct / 5
            ) /
            (
                seconds / 60
            )
        );


    const accuracy =
        typed.length
            ? Math.round(
                (
                    correct /
                    typed.length
                ) * 100
            )
            : 100;


    document.getElementById(
        progressId
    ).style.width =
        Math.min(
            (
                typed.length /
                text.length
            ) * 100,
            100
        ) + "%";


    document.getElementById(
        statsId
    ).textContent =
        `WPM: ${wpm} | Accuracy: ${accuracy}% | Errors: ${errors}`;

}


/* =====================================================
   START
===================================================== */

generatePractice();