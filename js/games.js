/* =========================================
   TYPING MASTER - GAME ENGINE
========================================= */

const GameStats = {

    get() {
        return JSON.parse(
            localStorage.getItem("typingMasterStats") ||
            JSON.stringify({
                tests: 0,
                games: 0,
                bestWPM: 0,
                bestAccuracy: 0,
                totalTime: 0,
                gameScore: 0,
                bestScore: 0
            })
        );
    },

    save(data) {
        localStorage.setItem(
            "typingMasterStats",
            JSON.stringify(data)
        );
    },

    addGame(score, wpm = 0, accuracy = 0) {

        const stats = this.get();

        stats.games++;

        stats.gameScore += score;

        if (score > stats.bestScore) {
            stats.bestScore = score;
        }

        if (wpm > stats.bestWPM) {
            stats.bestWPM = wpm;
        }

        if (accuracy > stats.bestAccuracy) {
            stats.bestAccuracy = accuracy;
        }

        this.save(stats);
    }

};


/* =========================================
   WORDS
========================================= */

const GameWords = [

    "keyboard",
    "computer",
    "internet",
    "javascript",
    "website",
    "practice",
    "typing",
    "master",
    "speed",
    "accuracy",
    "developer",
    "programming",
    "technology",
    "learning",
    "creative",
    "application",
    "browser",
    "function",
    "variable",
    "database",
    "network",
    "software",
    "hardware",
    "keyboard",
    "monitor",
    "project",
    "challenge",
    "improve",
    "success",
    "performance",
    "experience",
    "education",
    "knowledge",
    "future",
    "development",
    "responsive",
    "interface",
    "design",
    "mobile",
    "desktop"

];


/* =========================================
   RANDOM WORD
========================================= */

function randomWord() {

    return GameWords[
        Math.floor(Math.random() * GameWords.length)
    ];

}


/* =========================================
   RANDOM NUMBER
========================================= */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* =========================================
   CALCULATE WPM
========================================= */

function calculateWPM(chars, seconds) {

    if (seconds <= 0) {
        return 0;
    }

    return Math.round(
        (chars / 5) / (seconds / 60)
    );

}


/* =========================================
   ACCURACY
========================================= */

function calculateAccuracy(correct, total) {

    if (total === 0) {
        return 100;
    }

    return Math.round(
        (correct / total) * 100
    );

}