(function () {
    "use strict";

    var UNLOCKED_KEY = "htmlCourseUnlockedModule";
    var PASSED_KEY = "htmlCoursePassedModules";

    var ANSWER_KEYS = {
        1: { q1: 0, q2: 1, q3: 1, q4: 1, q5: 1 },
        2: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        3: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        4: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        5: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        6: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        7: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        8: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 },
        9: { q1: 1, q2: 1, q3: 1, q4: 0, q5: 0 },
        10: { q1: 1, q2: 0, q3: 1, q4: 1, q5: 1 },
        11: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 }
    };

    function getCurrentModuleNumber() {
        var match = window.location.pathname.match(/module(\d+)\.html$/i);
        return match ? parseInt(match[1], 10) : null;
    }

    function getUnlockedModule() {
        var raw = localStorage.getItem(UNLOCKED_KEY);
        var parsed = parseInt(raw, 10);

        if (!parsed || parsed < 1) {
            return 1;
        }

        return parsed;
    }

    function setUnlockedModule(moduleNumber) {
        localStorage.setItem(UNLOCKED_KEY, String(moduleNumber));
    }

    function getPassedModules() {
        var raw = localStorage.getItem(PASSED_KEY);

        if (!raw) {
            return [];
        }

        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.filter(function (value) {
                    return Number.isInteger(value);
                });
            }
        } catch (error) {
            return [];
        }

        return [];
    }

    function setPassedModules(modules) {
        localStorage.setItem(PASSED_KEY, JSON.stringify(modules));
    }

    function markModulePassed(moduleNumber) {
        var passed = getPassedModules();

        if (passed.indexOf(moduleNumber) === -1) {
            passed.push(moduleNumber);
            passed.sort(function (a, b) {
                return a - b;
            });
            setPassedModules(passed);
        }
    }

    function isModulePassed(moduleNumber) {
        return getPassedModules().indexOf(moduleNumber) !== -1;
    }

    function lockFutureLinks() {
        var unlocked = getUnlockedModule();
        var links = document.querySelectorAll("a[href]");

        links.forEach(function (link) {
            var href = link.getAttribute("href") || "";
            var moduleMatch = href.match(/module(\d+)\.html$/i);
            var certMatch = href.match(/certificate\.html$/i);

            if (moduleMatch) {
                var targetModule = parseInt(moduleMatch[1], 10);
                if (targetModule > unlocked) {
                    lockLink(link, "Finish previous module quizzes first.");
                }
                return;
            }

            if (certMatch && unlocked < 12) {
                lockLink(link, "Complete all modules first to unlock the certificate.");
            }
        });
    }

    function lockLink(link, message) {
        link.classList.add("locked-link");
        link.setAttribute("aria-disabled", "true");
        link.addEventListener("click", function (event) {
            event.preventDefault();
            alert(message);
        });
    }

    function guardCurrentModuleRoute() {
        var currentModule = getCurrentModuleNumber();
        if (!currentModule) {
            return;
        }

        var unlocked = getUnlockedModule();
        if (currentModule > unlocked) {
            var redirectModule = String(unlocked).padStart(2, "0");
            alert("This module is locked. Please complete earlier modules first.");
            window.location.href = "module" + redirectModule + ".html";
        }
    }

    function guardCertificateRoute() {
        var isCertificatePage = /certificate\.html$/i.test(window.location.pathname);
        if (!isCertificatePage) {
            return;
        }

        if (getUnlockedModule() < 12) {
            var redirectModule = String(getUnlockedModule()).padStart(2, "0");
            alert("Complete the modules in order before opening the certificate.");
            window.location.href = "module" + redirectModule + ".html";
        }
    }

    function setupQuizGrading() {
        var currentModule = getCurrentModuleNumber();
        if (!currentModule || !ANSWER_KEYS[currentModule]) {
            return;
        }

        var form = document.querySelector(".quiz form");
        if (!form) {
            return;
        }

        form.removeAttribute("onsubmit");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            gradeQuiz(form, currentModule);
        });
    }

    function getQuestionNames(form) {
        var radios = form.querySelectorAll('input[type="radio"]');
        var seen = {};
        var names = [];

        radios.forEach(function (radio) {
            if (!radio.name || seen[radio.name]) {
                return;
            }

            seen[radio.name] = true;
            names.push(radio.name);
        });

        names.sort(function (a, b) {
            var aNum = parseInt(a.replace(/\D/g, ""), 10);
            var bNum = parseInt(b.replace(/\D/g, ""), 10);
            return aNum - bNum;
        });

        return names;
    }

    function clearOptionStates(form) {
        form.querySelectorAll(".quiz-options label").forEach(function (label) {
            label.classList.remove("correct-option");
            label.classList.remove("wrong-option");
        });
    }

    function getOrCreateResultsBox(form) {
        var box = form.querySelector(".quiz-result");
        if (!box) {
            box = document.createElement("div");
            box.className = "quiz-result";
            form.appendChild(box);
        }

        return box;
    }

    function gradeQuiz(form, moduleNumber) {
        clearOptionStates(form);

        var answerKey = ANSWER_KEYS[moduleNumber];
        var names = getQuestionNames(form);

        var total = names.length;
        var correctCount = 0;
        var details = [];

        names.forEach(function (questionName, index) {
            var options = Array.from(form.querySelectorAll('input[type="radio"][name="' + questionName + '"]'));
            var selectedIndex = options.findIndex(function (option) {
                return option.checked;
            });
            var expectedIndex = answerKey[questionName];

            if (typeof expectedIndex !== "number") {
                return;
            }

            var correctInput = options[expectedIndex];
            var correctLabel = correctInput ? correctInput.closest("label") : null;

            if (selectedIndex === expectedIndex) {
                correctCount += 1;
                if (correctLabel) {
                    correctLabel.classList.add("correct-option");
                }
                return;
            }

            if (selectedIndex >= 0) {
                var wrongInput = options[selectedIndex];
                var wrongLabel = wrongInput ? wrongInput.closest("label") : null;
                if (wrongLabel) {
                    wrongLabel.classList.add("wrong-option");
                }
            }

            if (correctLabel) {
                correctLabel.classList.add("correct-option");
            }

            var answerText = correctLabel ? correctLabel.textContent.trim() : "(answer unavailable)";
            if (selectedIndex === -1) {
                details.push("Question " + (index + 1) + ": no answer selected. Correct answer is: " + answerText);
            } else {
                details.push("Question " + (index + 1) + ": incorrect. Correct answer is: " + answerText);
            }
        });

        var passed = total > 0 && correctCount === total;
        renderQuizResult(form, moduleNumber, correctCount, total, details, passed);

        if (passed) {
            markModulePassed(moduleNumber);
            var nextUnlocked = Math.max(getUnlockedModule(), moduleNumber + 1);
            setUnlockedModule(nextUnlocked);
            lockFutureLinks();
        }
    }

    function renderQuizResult(form, moduleNumber, correctCount, total, details, passed) {
        var resultBox = getOrCreateResultsBox(form);
        resultBox.innerHTML = "";

        var summary = document.createElement("p");
        summary.className = passed ? "quiz-summary pass" : "quiz-summary fail";

        if (passed) {
            summary.textContent = "Excellent. Score: " + correctCount + "/" + total + ". Module completed and next module unlocked.";
        } else {
            summary.textContent = "Score: " + correctCount + "/" + total + ". Review the incorrect answers below and try again.";
        }

        resultBox.appendChild(summary);

        if (details.length > 0) {
            var list = document.createElement("ul");
            list.className = "quiz-errors";

            details.forEach(function (item) {
                var li = document.createElement("li");
                li.textContent = item;
                list.appendChild(li);
            });

            resultBox.appendChild(list);
        }

        if (passed && moduleNumber < 12) {
            var nextModule = String(moduleNumber + 1).padStart(2, "0");
            var nextLink = document.createElement("a");
            nextLink.href = "module" + nextModule + ".html";
            nextLink.className = "btn btn-success";
            nextLink.textContent = "Go to Module " + (moduleNumber + 1) + " →";
            nextLink.style.marginTop = "1rem";
            nextLink.style.display = "inline-block";
            resultBox.appendChild(nextLink);
        }
    }

    function initializeModuleZeroState() {
        if (getUnlockedModule() < 1) {
            setUnlockedModule(1);
        }
    }

    function autoOpenCertificateAfterCapstone() {
        var currentModule = getCurrentModuleNumber();
        if (currentModule === 12) {
            setUnlockedModule(Math.max(getUnlockedModule(), 12));
        }
    }

    function markPassedIndicator() {
        var currentModule = getCurrentModuleNumber();
        if (!currentModule || !isModulePassed(currentModule)) {
            return;
        }

        var quizTitle = document.querySelector(".quiz-title");
        if (!quizTitle) {
            return;
        }

        if (!quizTitle.textContent.includes("Completed")) {
            quizTitle.textContent += " (Completed)";
        }
    }

    function setupResetProgressButton() {
        var resetButton = document.getElementById("reset-progress-btn");
        if (!resetButton) {
            return;
        }

        resetButton.addEventListener("click", function () {
            var shouldReset = window.confirm("Reset all quiz progress and lock modules again?");
            if (!shouldReset) {
                return;
            }

            localStorage.removeItem(UNLOCKED_KEY);
            localStorage.removeItem(PASSED_KEY);
            window.location.href = "index.html";
        });
    }

    function updateHomepageProgressDisplay() {
        var isHomePage = /index\.html$/i.test(window.location.pathname) || /\/$/.test(window.location.pathname);
        if (!isHomePage) {
            return;
        }

        var unlocked = getUnlockedModule();
        var passedCount = getPassedModules().length;

        var unlockedEl = document.getElementById("status-unlocked");
        var passedEl = document.getElementById("status-passed");
        var progressBar = document.querySelector(".progress-container .progress-bar");

        if (unlockedEl) {
            var shownUnlocked = Math.min(unlocked, 12);
            unlockedEl.textContent = "Module " + shownUnlocked;
        }

        if (passedEl) {
            passedEl.textContent = passedCount + "/11";
        }

        if (progressBar) {
            var percentage = Math.round((passedCount / 11) * 100);
            progressBar.style.width = percentage + "%";
            progressBar.textContent = percentage + "% Complete";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        initializeModuleZeroState();
        autoOpenCertificateAfterCapstone();
        guardCurrentModuleRoute();
        guardCertificateRoute();
        lockFutureLinks();
        setupQuizGrading();
        markPassedIndicator();
        setupResetProgressButton();
        updateHomepageProgressDisplay();
    });
})();
