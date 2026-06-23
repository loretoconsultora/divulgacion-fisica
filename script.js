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

// Visual: presión atmosférica vs comportamiento animal
const presionSlider = document.getElementById('presionSlider');
const presionValor = document.getElementById('presionValor');
const aveIcono = document.getElementById('aveIcono');
const estadoTormenta = document.getElementById('estadoTormenta');
const cieloBox = document.querySelector('.cielo-box');

if (presionSlider) {
  presionSlider.addEventListener('input', () => {
    const presion = Number(presionSlider.value);
    presionValor.textContent = presion;

    // 980 hPa (tormenta fuerte) -> 1030 hPa (despejado)
    const porcentaje = ((1030 - presion) / (1030 - 980)) * 100;
    aveIcono.style.top = `${20 + porcentaje * 0.6}%`;

    if (presion >= 1018) {
      estadoTormenta.textContent = 'Todo tranquilo';
      cieloBox.style.background = 'linear-gradient(180deg, #4a90b8 0%, #1c4a5e 100%)';
    } else if (presion >= 1000) {
      estadoTormenta.textContent = 'Cambios en el ambiente';
      cieloBox.style.background = 'linear-gradient(180deg, #2a5a72 0%, #15323c 100%)';
    } else {
      estadoTormenta.textContent = 'Tormenta cercana';
      cieloBox.style.background = 'linear-gradient(180deg, #1a3a4a 0%, #0a1a20 100%)';
    }
  });
}

// Visual: ciclo completo de la tormenta
const cicloSlider = document.getElementById('cicloSlider');
const cicloBox = document.getElementById('cicloBox');
const cicloIcono = document.getElementById('cicloIcono');
const cicloEtapa = document.getElementById('cicloEtapa');

const ETAPAS_CICLO = [
  { hasta: 20, icono: '🌬️', texto: 'Aire cálido asciende', fondo: '#4a90b8' },
  { hasta: 40, icono: '☁️', texto: 'La nube se forma', fondo: '#5a7a8a' },
  { hasta: 60, icono: '⚡', texto: 'Se generan los rayos', fondo: '#3a3a4a' },
  { hasta: 80, icono: '🌧️', texto: 'Cae la lluvia', fondo: '#2a4a5a' },
  { hasta: 100, icono: '🌤️', texto: 'La tormenta se disipa', fondo: '#3a7a6a' },
];

if (cicloSlider) {
  cicloSlider.addEventListener('input', () => {
    const valor = Number(cicloSlider.value);
    const etapa = ETAPAS_CICLO.find((e) => valor <= e.hasta) || ETAPAS_CICLO[ETAPAS_CICLO.length - 1];
    cicloIcono.textContent = etapa.icono;
    cicloEtapa.textContent = etapa.texto;
    cicloBox.style.background = etapa.fondo;
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
