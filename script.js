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

// Visual: ciclo completo de la tormenta
const cicloSlider = document.getElementById('cicloSlider');
const cicloBox = document.getElementById('cicloBox');
const cicloIcono = document.getElementById('cicloIcono');
const cicloEtapa = document.getElementById('cicloEtapa');

const CICLO_ETAPAS = [
  { hasta: 20, icono: '🌬️', texto: 'Aire cálido asciende', color: '#2a5a72' },
  { hasta: 40, icono: '❄️', texto: 'Choque hielo-agua dentro de la nube', color: '#3a4a6e' },
  { hasta: 60, icono: '➕➖', texto: 'Separación de cargas eléctricas', color: '#4a3a6e' },
  { hasta: 80, icono: '⚡', texto: 'Descarga eléctrica: el rayo', color: '#6e3a4a' },
  { hasta: 100, icono: '🔊', texto: 'Onda de sonido: el trueno', color: '#2a5a4a' },
];

if (cicloSlider) {
  cicloSlider.addEventListener('input', () => {
    const valor = Number(cicloSlider.value);
    const etapa = CICLO_ETAPAS.find((e) => valor <= e.hasta) || CICLO_ETAPAS[CICLO_ETAPAS.length - 1];
    cicloIcono.textContent = etapa.icono;
    cicloEtapa.textContent = etapa.texto;
    cicloBox.style.background = etapa.color;
  });
}

// Visual: ozono y petricor
const quimicaSlider = document.getElementById('quimicaSlider');
const quimicaBox = document.getElementById('quimicaBox');
const quimicaIcono = document.getElementById('quimicaIcono');
const quimicaEtapa = document.getElementById('quimicaEtapa');

const QUIMICA_ETAPAS = [
  { hasta: 20, icono: '🌫️', texto: 'Aire en calma, sin olor particular', color: '#3a4a3a' },
  { hasta: 40, icono: '🌧️', texto: 'Las primeras gotas liberan aerosoles', color: '#3a5a4a' },
  { hasta: 60, icono: '🦠', texto: 'Se libera geosmina del suelo', color: '#4a5a3a' },
  { hasta: 80, icono: '🧪', texto: 'Se forma ozono por los rayos', color: '#5a4a3a' },
  { hasta: 100, icono: '👃', texto: 'Petricor: el olor a lluvia en su punto máximo', color: '#2a5a72' },
];

if (quimicaSlider) {
  quimicaSlider.addEventListener('input', () => {
    const valor = Number(quimicaSlider.value);
    const etapa = QUIMICA_ETAPAS.find((e) => valor <= e.hasta) || QUIMICA_ETAPAS[QUIMICA_ETAPAS.length - 1];
    quimicaIcono.textContent = etapa.icono;
    quimicaEtapa.textContent = etapa.texto;
    quimicaBox.style.background = etapa.color;
  });
}

// Visual: presión atmosférica y comportamiento animal
const presionSlider = document.getElementById('presionSlider');
const presionValor = document.getElementById('presionValor');
const aveIcono = document.getElementById('aveIcono');
const estadoTormenta = document.getElementById('estadoTormenta');

if (presionSlider) {
  presionSlider.addEventListener('input', () => {
    const presion = Number(presionSlider.value);
    presionValor.textContent = presion;

    const altura = Math.max(5, Math.min(80, ((presion - 980) / 50) * 80));
    aveIcono.style.top = `${altura}%`;

    if (presion >= 1015) {
      estadoTormenta.textContent = 'Todo tranquilo';
    } else if (presion >= 1000) {
      estadoTormenta.textContent = 'Las aves comienzan a volar más bajo';
    } else {
      estadoTormenta.textContent = 'Tormenta inminente: las aves buscan refugio';
    }
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

if (quizQuestions.length) {
  setupQuiz();
}

if (quizReset) {
  quizReset.addEventListener('click', () => {
    quizQuestions.forEach((q) => delete q.dataset.answered);
    resetQuiz();
  });
}
