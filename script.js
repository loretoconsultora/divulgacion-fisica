// Navegación móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Tabs de disciplina (Física / Química / Biología)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Visual: energía potencial vs cinética
const energiaSlider = document.getElementById('energiaSlider');
const barPotencial = document.getElementById('barPotencial');
const barCinetica = document.getElementById('barCinetica');

if (energiaSlider) {
  energiaSlider.addEventListener('input', () => {
    const caida = Number(energiaSlider.value);
    barPotencial.style.height = `${100 - caida}%`;
    barCinetica.style.height = `${caida}%`;
  });
}

// Visual: fuerza vs masa
const masaSlider = document.getElementById('masaSlider');
const masaValor = document.getElementById('masaValor');
const fuerzaValor = document.getElementById('fuerzaValor');
const barFuerza = document.getElementById('barFuerza');
const ACELERACION = 5; // m/s^2, fija para la demostración

if (masaSlider) {
  masaSlider.addEventListener('input', () => {
    const masa = Number(masaSlider.value);
    const fuerza = masa * ACELERACION;
    masaValor.textContent = masa;
    fuerzaValor.textContent = fuerza;
    barFuerza.style.height = `${Math.min(fuerza, 100)}%`;
  });
}

// Reto: mini quiz interactivo
const quizQuestions = document.querySelectorAll('.quiz-question');
const quizResult = document.getElementById('quizResult');
const quizReset = document.getElementById('quizReset');

function setupQuiz() {
  let correctCount = 0;
  let answered = 0;

  quizQuestions.forEach((question) => {
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (option.disabled || question.dataset.answered) return;

        question.dataset.answered = 'true';
        answered += 1;

        const isCorrect = option.classList.contains('correct');
        if (isCorrect) {
          option.classList.add('selected-correct');
          feedback.textContent = '✅ ¡Correcto!';
          correctCount += 1;
        } else {
          option.classList.add('selected-wrong');
          feedback.textContent = '❌ Incorrecto. La respuesta correcta está resaltada en verde.';
          question.querySelector('.quiz-option.correct').classList.add('selected-correct');
        }

        options.forEach((opt) => (opt.disabled = true));

        if (answered === quizQuestions.length) {
          quizResult.textContent = `Obtuviste ${correctCount} de ${quizQuestions.length} respuestas correctas.`;
        }
      });
    });
  });
}

function resetQuiz() {
  quizQuestions.forEach((question) => {
    delete question.dataset.answered;
    question.querySelector('.quiz-feedback').textContent = '';
    question.querySelectorAll('.quiz-option').forEach((opt) => {
      opt.disabled = false;
      opt.classList.remove('selected-correct', 'selected-wrong');
    });
  });
  quizResult.textContent = '';
}

setupQuiz();

if (quizReset) {
  quizReset.addEventListener('click', () => {
    quizQuestions.forEach((q) => delete q.dataset.answered);
    resetQuiz();
  });
}
