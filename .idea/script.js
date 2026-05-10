
const questions = [
    {
        q: "Wofür wird JavaScript hauptsächlich benutzt?",
        options: [
            "Für Webseiten im Internet",
            "Zum Drucken von Dokumenten",
            "Um Bilder zu malen",
            "Um Musik zu komponieren"
        ],
        answer: 0,
        explain: "JavaScript wird vor allem benutzt, um Webseiten interaktiv zu machen."
    },
    {
        q: "Wer hat JavaScript erfunden?",
        options: ["Bill Gates", "Mark Zuckerberg", "Brendan Eich", "Steve Jobs"],
        answer: 2,
        explain: "Brendan Eich hat JavaScript 1995 bei der Firma Netscape entwickelt."
    },
    {
        q: "In welchem Jahr ist JavaScript entstanden?",
        options: ["1985", "1990", "1995", "2005"],
        answer: 2,
        explain: "JavaScript wurde 1995 zum ersten Mal veröffentlicht."
    },
    {
        q: "Wie hieß JavaScript ganz am Anfang?",
        options: ["Java", "Mocha", "Python", "WebScript"],
        answer: 1,
        explain: "Die erste Version hieß „Mocha“, dann „LiveScript“ und schließlich „JavaScript“."
    },
    {
        q: "Wo läuft JavaScript normalerweise?",
        options: [
            "Direkt im Browser",
            "Nur auf dem Drucker",
            "Nur auf einem Taschenrechner",
            "Gar nicht, das ist keine echte Sprache"
        ],
        answer: 0,
        explain: "JavaScript läuft direkt im Browser – man muss nichts installieren."
    },
    {
        q: "Welche Webseite benutzt KEIN JavaScript?",
        options: [
            "YouTube",
            "Instagram",
            "Google",
            "Eigentlich benutzen das fast alle großen Webseiten"
        ],
        answer: 3,
        explain: "Fast jede große Webseite benutzt heute JavaScript – auch YouTube, Instagram und Google."
    }
];

// ====== Quiz-Logik ======
let step = 0;
let selected = null;
let score = 0;

const quizEl = document.getElementById("quiz");

function render() {
    if (step >= questions.length) {
        renderResult();
        return;
    }

    const current = questions[step];
    const progress = ((step + (selected !== null ? 1 : 0)) / questions.length) * 100;

    quizEl.classList.remove("pop-in");
    void quizEl.offsetWidth; // Animation neu starten
    quizEl.classList.add("pop-in");

    quizEl.innerHTML = `
    <div class="progress">
      <span>Frage ${step + 1} / ${questions.length}</span>
      <div class="bar"><div class="bar-fill" style="width:${progress}%"></div></div>
    </div>
    <div class="question">${current.q}</div>
    <div class="options">
      ${current.options.map((opt, i) => `
        <button class="option" data-index="${i}">
          <span class="letter">${String.fromCharCode(65 + i)}</span>${opt}
        </button>
      `).join("")}
    </div>
    <div id="feedback"></div>
  `;

    document.querySelectorAll(".option").forEach(btn => {
        btn.addEventListener("click", () => choose(parseInt(btn.dataset.index)));
    });
}

function choose(i) {
    if (selected !== null) return;
    selected = i;
    const current = questions[step];
    const isCorrect = i === current.answer;
    if (isCorrect) score++;

    document.querySelectorAll(".option").forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === current.answer) btn.classList.add("correct");
        if (idx === i && !isCorrect) btn.classList.add("wrong");
    });

    const feedback = document.getElementById("feedback");
    feedback.innerHTML = `
    <div class="feedback ${isCorrect ? "correct" : "wrong"}">
      ${isCorrect ? "Richtig! " : "Leider falsch. "}${current.explain}
    </div>
    <button class="btn next-btn">
      ${step + 1 < questions.length ? "Nächste Frage →" : "Ergebnis sehen"}
    </button>
  `;

    feedback.querySelector(".next-btn").addEventListener("click", () => {
        step++;
        selected = null;
        render();
    });
}

function renderResult() {
    const percent = Math.round((score / questions.length) * 100);
    quizEl.classList.remove("pop-in");
    void quizEl.offsetWidth;
    quizEl.classList.add("pop-in");

    quizEl.innerHTML = `
    <div class="result">
      <div class="score">${percent}%</div>
      <h3>Geschafft!</h3>
      <p>Ihr habt ${score} von ${questions.length} Fragen richtig beantwortet.</p>
      <button class="btn" id="restart">Nochmal versuchen</button>
      </div>
  `;
    document.getElementById("restart").addEventListener("click", () => {
        step = 0;
        selected = null;
        score = 0;
        render();
    });
}

render();