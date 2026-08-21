/* =====================================================
   COMMON TYPING MASTER SYSTEM
===================================================== */

const app = document.getElementById("app");


/* =====================================================
   CURRENT PAGE / LOCATION
===================================================== */

const currentPage =
    location.pathname
        .split("/")
        .pop() || "index.html";

const inGamesFolder =
    location.pathname.includes("/games/");

const rootPath =
    inGamesFolder ? "../" : "";


/* =====================================================
   SHARED LAYOUT
===================================================== */

app.innerHTML = `

<div class="app">

    <aside id="sidebar" class="sidebar">

        <div class="logo">
            <span>Typing Master</span>
        </div>


        <div class="nav-title">
            Main
        </div>


        <a href="${rootPath}index.html"
           class="nav-link"
           data-page="index.html">
            🏠
            <span>Home</span>
        </a>


        <a href="${rootPath}typing-test.html"
           class="nav-link"
           data-page="typing-test.html">
            ⌨️
            <span>Typing Test</span>
        </a>


        <a href="${rootPath}practice.html"
           class="nav-link"
           data-page="practice.html">
            📝
            <span>Practice</span>
        </a>


        <div class="nav-title">
            🎮 Typing Games
        </div>


        <a href="${rootPath}games.html"
           class="nav-link"
           data-page="games.html">
            🎮
            <span>Games Hub</span>
        </a>


        <a href="${rootPath}games/type-racer.html"
           class="nav-link sub-link"
           data-page="type-racer.html">
            🏎️
            <span>Type Racer</span>
        </a>


        <a href="${rootPath}games/falling-words.html"
           class="nav-link sub-link"
           data-page="falling-words.html">
            
            <span>📝 Falling Words</span>
        </a>


        <a href="${rootPath}games/zombie-typing.html"
           class="nav-link sub-link"
           data-page="zombie-typing.html">
            🧟
            <span>Zombie Typing</span>
        </a>


        <a href="${rootPath}games/typing-race.html"
           class="nav-link sub-link"
           data-page="typing-race.html">
            🏁
            <span>Typing Race</span>
        </a>


        <a href="${rootPath}games/word-scramble.html"
           class="nav-link sub-link"
           data-page="word-scramble.html">
            🔤
            <span>Word Scramble</span>
        </a>


        <a href="${rootPath}games/target-typing.html"
           class="nav-link sub-link"
           data-page="target-typing.html">
            🎯
            <span>Target Typing</span>
        </a>
		
		<div class="nav-title">
            💡 Tips & Tricks
        </div>
		
		<a href="${rootPath}Tips.html"
           class="nav-link sub-link"
           data-page="Tips.html">
            🛣️
            <span>Tips</span>
        </a>
		
		


        <!--<div class="nav-title">
            📊 Progress
        </div>


        <a href="${rootPath}statistics.html"
           class="nav-link"
           data-page="statistics.html">
            📊
            <span>Statistics</span>
        </a>


        <a href="${rootPath}achievements.html"
           class="nav-link"
           data-page="achievements.html">
            🏆
            <span>Achievements</span>
        </a>


        <a href="${rootPath}settings.html"
           class="nav-link"
           data-page="settings.html">
            ⚙️
            <span>Settings</span>
        </a>-->

    </aside>


    <header class="topbar">

        <button
            id="menuButton"
            class="menu-btn">
            ☰
        </button>


        <div class="top-title">
            Welcome to Typing Master!
        </div>


        <div class="top-actions">

            <button
                id="themeButton"
                class="theme-btn"
                title="Toggle dark mode">
                🌙
            </button>

        </div>

    </header>

</div>
`;


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        if (
            link.dataset.page === currentPage
        ) {

            link.classList.add("active");

        }

    });


/* =====================================================
   MOBILE MENU
===================================================== */

const sidebar =
    document.getElementById("sidebar");

const menuButton =
    document.getElementById("menuButton");


if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("open");

        }
    );

}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    document.getElementById(
        "themeButton"
    );


function loadTheme() {

    const theme =
        localStorage.getItem(
            "typing_theme"
        );


    if (
        theme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );


        if (themeButton) {

            themeButton.textContent =
                "☀️";

        }

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "typing_theme",
                dark
                    ? "dark"
                    : "light"
            );


            themeButton.textContent =
                dark
                    ? "☀️"
                    : "🌙";

        }
    );

}


loadTheme();


/* =====================================================
   SHARED STATISTICS
===================================================== */

function getStats() {

    return {

        bestWpm:
            Number(
                localStorage.getItem(
                    "tm_best_wpm"
                ) || 0
            ),

        bestAccuracy:
            Number(
                localStorage.getItem(
                    "tm_best_accuracy"
                ) || 0
            ),

        tests:
            Number(
                localStorage.getItem(
                    "tm_tests"
                ) || 0
            ),

        words:
            Number(
                localStorage.getItem(
                    "tm_words"
                ) || 0
            ),

        characters:
            Number(
                localStorage.getItem(
                    "tm_characters"
                ) || 0
            ),

        totalWpm:
            Number(
                localStorage.getItem(
                    "tm_total_wpm"
                ) || 0
            ),

        fallingBest:
            Number(
                localStorage.getItem(
                    "tm_falling_best"
                ) || 0
            ),

        rushBest:
            Number(
                localStorage.getItem(
                    "tm_rush_best"
                ) || 0
            )

    };

}


/* =====================================================
   SAVE TYPING TEST
===================================================== */

function saveTypingResult(
    wpm,
    accuracy,
    characters
) {

    const stats =
        getStats();


    stats.bestWpm =
        Math.max(
            stats.bestWpm,
            wpm
        );


    stats.bestAccuracy =
        Math.max(
            stats.bestAccuracy,
            accuracy
        );


    stats.tests++;


    stats.characters +=
        characters;


    stats.words +=
        Math.floor(
            characters / 5
        );


    stats.totalWpm +=
        wpm;


    localStorage.setItem(
        "tm_best_wpm",
        stats.bestWpm
    );


    localStorage.setItem(
        "tm_best_accuracy",
        stats.bestAccuracy
    );


    localStorage.setItem(
        "tm_tests",
        stats.tests
    );


    localStorage.setItem(
        "tm_characters",
        stats.characters
    );


    localStorage.setItem(
        "tm_words",
        stats.words
    );


    localStorage.setItem(
        "tm_total_wpm",
        stats.totalWpm
    );


    updateDashboard();

}


/* =====================================================
   DASHBOARD UPDATE
===================================================== */

function updateDashboard() {

    const stats =
        getStats();


    const wpm =
        document.getElementById(
            "homeWpm"
        );


    const accuracy =
        document.getElementById(
            "homeAccuracy"
        );


    const tests =
        document.getElementById(
            "homeTests"
        );


    const words =
        document.getElementById(
            "homeWords"
        );


    if (wpm) {

        wpm.textContent =
            stats.bestWpm;

    }


    if (accuracy) {

        accuracy.textContent =
            stats.bestAccuracy + "%";

    }


    if (tests) {

        tests.textContent =
            stats.tests;

    }


    if (words) {

        words.textContent =
            stats.words;

    }

}