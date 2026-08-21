function loadStatistics() {

    const stats =
        getStats();


    document.getElementById(
        "bestWpm"
    ).textContent =
        stats.bestWpm;


    document.getElementById(
        "bestAccuracy"
    ).textContent =
        stats.bestAccuracy + "%";


    document.getElementById(
        "totalTests"
    ).textContent =
        stats.tests;


    document.getElementById(
        "totalWords"
    ).textContent =
        stats.words;


    document.getElementById(
        "totalCharacters"
    ).textContent =
        stats.characters;


    document.getElementById(
        "fallingBest"
    ).textContent =
        stats.fallingBest;


    document.getElementById(
        "rushBest"
    ).textContent =
        stats.rushBest;


    const average =
        stats.tests > 0
            ? Math.round(
                stats.totalWpm /
                stats.tests
            )
            : 0;


    document.getElementById(
        "averageWpm"
    ).textContent =
        average;

}


/* =====================================================
   RESET
===================================================== */

document.getElementById(
    "clearStats"
).addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to delete all statistics?"
            );


        if (!confirmed)
            return;


        const keys = [

            "tm_best_wpm",
            "tm_best_accuracy",
            "tm_tests",
            "tm_words",
            "tm_characters",
            "tm_total_wpm",
            "tm_falling_best",
            "tm_rush_best"

        ];


        keys.forEach(
            key =>
                localStorage.removeItem(
                    key
                )
        );


        loadStatistics();

    }
);


loadStatistics();