/* ============================================
   KARTENDECK APP — Logik
   Bugs gefixt:
   - Bild wird erst angezeigt wenn vollständig geladen
   - Freeze bei schnellem Wischen behoben (Timeout-Fallback)
   ============================================ */

const DECK_DEFINITION = [
  // ♠ PIK (schwarz)
  { wert: "2",  farbe: "pik",   symbol: "♠", hiLo: +1, img: "./cards/P/P-2.png" },
  { wert: "3",  farbe: "pik",   symbol: "♠", hiLo: +1, img: "./cards/P/P-3.png" },
  { wert: "4",  farbe: "pik",   symbol: "♠", hiLo: +1, img: "./cards/P/P-4.png" },
  { wert: "5",  farbe: "pik",   symbol: "♠", hiLo: +1, img: "./cards/P/P-5.png" },
  { wert: "6",  farbe: "pik",   symbol: "♠", hiLo: +1, img: "./cards/P/P-6.png" },
  { wert: "7",  farbe: "pik",   symbol: "♠", hiLo:  0, img: "./cards/P/P-7.png" },
  { wert: "8",  farbe: "pik",   symbol: "♠", hiLo:  0, img: "./cards/P/P-8.png" },
  { wert: "9",  farbe: "pik",   symbol: "♠", hiLo:  0, img: "./cards/P/P-9.png" },
  { wert: "10", farbe: "pik",   symbol: "♠", hiLo: -1, img: "./cards/P/P-10.png" },
  { wert: "J",  farbe: "pik",   symbol: "♠", hiLo: -1, img: "./cards/P/P-Bube.png" },
  { wert: "Q",  farbe: "pik",   symbol: "♠", hiLo: -1, img: "./cards/P/P-Dame.png" },
  { wert: "K",  farbe: "pik",   symbol: "♠", hiLo: -1, img: "./cards/P/P-König.png" },
  { wert: "A",  farbe: "pik",   symbol: "♠", hiLo: -1, img: "./cards/P/P-Ass.png" },

  // ♥ HERZ (rot)
  { wert: "2",  farbe: "herz",  symbol: "♥", hiLo: +1, img: "./cards/H/H-2.png" },
  { wert: "3",  farbe: "herz",  symbol: "♥", hiLo: +1, img: "./cards/H/H-3.png" },
  { wert: "4",  farbe: "herz",  symbol: "♥", hiLo: +1, img: "./cards/H/H-4.png" },
  { wert: "5",  farbe: "herz",  symbol: "♥", hiLo: +1, img: "./cards/H/H-5.png" },
  { wert: "6",  farbe: "herz",  symbol: "♥", hiLo: +1, img: "./cards/H/H-6.png" },
  { wert: "7",  farbe: "herz",  symbol: "♥", hiLo:  0, img: "./cards/H/H-7.png" },
  { wert: "8",  farbe: "herz",  symbol: "♥", hiLo:  0, img: "./cards/H/H-8.png" },
  { wert: "9",  farbe: "herz",  symbol: "♥", hiLo:  0, img: "./cards/H/H-9.png" },
  { wert: "10", farbe: "herz",  symbol: "♥", hiLo: -1, img: "./cards/H/H-10.png" },
  { wert: "J",  farbe: "herz",  symbol: "♥", hiLo: -1, img: "./cards/H/H-Bube.png" },
  { wert: "Q",  farbe: "herz",  symbol: "♥", hiLo: -1, img: "./cards/H/H-Dame.png" },
  { wert: "K",  farbe: "herz",  symbol: "♥", hiLo: -1, img: "./cards/H/H-König.png" },
  { wert: "A",  farbe: "herz",  symbol: "♥", hiLo: -1, img: "./cards/H/H-Ass.png" },

  // ♦ KARO (rot)
  { wert: "2",  farbe: "karo",  symbol: "♦", hiLo: +1, img: "./cards/D/D-2.png" },
  { wert: "3",  farbe: "karo",  symbol: "♦", hiLo: +1, img: "./cards/D/D-3.png" },
  { wert: "4",  farbe: "karo",  symbol: "♦", hiLo: +1, img: "./cards/D/D-4.png" },
  { wert: "5",  farbe: "karo",  symbol: "♦", hiLo: +1, img: "./cards/D/D-5.png" },
  { wert: "6",  farbe: "karo",  symbol: "♦", hiLo: +1, img: "./cards/D/D-6.png" },
  { wert: "7",  farbe: "karo",  symbol: "♦", hiLo:  0, img: "./cards/D/D-7.png" },
  { wert: "8",  farbe: "karo",  symbol: "♦", hiLo:  0, img: "./cards/D/D-8.png" },
  { wert: "9",  farbe: "karo",  symbol: "♦", hiLo:  0, img: "./cards/D/D-9.png" },
  { wert: "10", farbe: "karo",  symbol: "♦", hiLo: -1, img: "./cards/D/D-10.png" },
  { wert: "J",  farbe: "karo",  symbol: "♦", hiLo: -1, img: "./cards/D/D-Bube.png" },
  { wert: "Q",  farbe: "karo",  symbol: "♦", hiLo: -1, img: "./cards/D/D-Dame.png" },
  { wert: "K",  farbe: "karo",  symbol: "♦", hiLo: -1, img: "./cards/D/D-König.png" },
  { wert: "A",  farbe: "karo",  symbol: "♦", hiLo: -1, img: "./cards/D/D-Ass.png" },

  // ♣ KREUZ (schwarz)
  { wert: "2",  farbe: "kreuz", symbol: "♣", hiLo: +1, img: "./cards/C/C-2.png" },
  { wert: "3",  farbe: "kreuz", symbol: "♣", hiLo: +1, img: "./cards/C/C-3.png" },
  { wert: "4",  farbe: "kreuz", symbol: "♣", hiLo: +1, img: "./cards/C/C-4.png" },
  { wert: "5",  farbe: "kreuz", symbol: "♣", hiLo: +1, img: "./cards/C/C-5.png" },
  { wert: "6",  farbe: "kreuz", symbol: "♣", hiLo: +1, img: "./cards/C/C-6.png" },
  { wert: "7",  farbe: "kreuz", symbol: "♣", hiLo:  0, img: "./cards/C/C-7.png" },
  { wert: "8",  farbe: "kreuz", symbol: "♣", hiLo:  0, img: "./cards/C/C-8.png" },
  { wert: "9",  farbe: "kreuz", symbol: "♣", hiLo:  0, img: "./cards/C/C-9.png" },
  { wert: "10", farbe: "kreuz", symbol: "♣", hiLo: -1, img: "./cards/C/C-10.png" },
  { wert: "J",  farbe: "kreuz", symbol: "♣", hiLo: -1, img: "./cards/C/C-Bube.png" },
  { wert: "Q",  farbe: "kreuz", symbol: "♣", hiLo: -1, img: "./cards/C/C-Dame.png" },
  { wert: "K",  farbe: "kreuz", symbol: "♣", hiLo: -1, img: "./cards/C/C-König.png" },
  { wert: "A",  farbe: "kreuz", symbol: "♣", hiLo: -1, img: "./cards/C/C-Ass.png" },
];

/* ---- STATE ---- */
let deck = [];
let currentIndex = 0;
let trueCount = 0;
let isAnimating = false;

/* ---- DOM ---- */
const screenDeck      = document.getElementById('screen-deck');
const screenEnd       = document.getElementById('screen-end');
const activeCard      = document.getElementById('active-card');
const cardImg         = document.getElementById('card-img');
const cardPlaceholder = document.getElementById('card-placeholder');
const cardValueTop    = document.getElementById('card-value-top');
const cardValueBot    = document.getElementById('card-value-bot');
const cardSuitMid     = document.getElementById('card-suit-mid');
const cardCounter     = document.getElementById('card-counter');
const liveCount       = document.getElementById('live-count');
const progressBar     = document.getElementById('progress-bar');
const btnShuffle      = document.getElementById('btn-shuffle');
const btnCheck        = document.getElementById('btn-check');
const btnRestart      = document.getElementById('btn-restart');
const userCountInput  = document.getElementById('user-count-input');
const resultBox       = document.getElementById('result-box');
const resultIcon      = document.getElementById('result-icon');
const resultText      = document.getElementById('result-text');
const resultCorrect   = document.getElementById('result-correct');
const deckArea        = document.querySelector('.deck-area');

/* ---- FISHER-YATES MISCHEN ---- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---- DECK INITIALISIEREN ---- */
function initDeck() {
  deck = shuffle([...DECK_DEFINITION]);
  currentIndex = 0;
  trueCount = 0;
  isAnimating = false;
  activeCard.style.transform = '';
  activeCard.style.transition = '';
  activeCard.classList.remove('fly-out', 'fly-in', 'swiping');
  updateUI();
  showCard(currentIndex, false);
  resultBox.classList.add('hidden');
  userCountInput.value = '';
}

/* ---- KARTE ANZEIGEN ----
   FIX: Bild erst anzeigen wenn vollständig geladen,
   damit nicht kurz der falsche Platzhalter aufblitzt */
const RED_SUITS = ['herz', 'karo'];

function showCard(idx, animate) {
  const card = deck[idx];
  const isRed = RED_SUITS.includes(card.farbe);
  activeCard.classList.toggle('red-suit', isRed);

  // Immer zuerst Platzhalter zeigen
  cardImg.style.display = 'none';
  cardPlaceholder.style.display = 'flex';
  renderPlaceholder(card);

  // Bild im Hintergrund laden
  if (card.img) {
    const tempImg = new Image();
    tempImg.onload = () => {
      // Nur setzen wenn diese Karte noch die aktuelle ist
      if (deck[currentIndex] === card) {
        cardImg.src = card.img;
        cardImg.style.display = 'block';
        cardPlaceholder.style.display = 'none';
      }
    };
    tempImg.onerror = () => {
      console.warn('Bild nicht gefunden:', card.img);
    };
    tempImg.src = card.img;
  }

  if (animate) {
    activeCard.classList.add('fly-in');
    activeCard.addEventListener('animationend', () => {
      activeCard.classList.remove('fly-in');
    }, { once: true });
  }
}

function renderPlaceholder(card) {
  cardValueTop.textContent = card.wert;
  cardValueBot.textContent = card.wert;
  cardSuitMid.textContent  = card.symbol;
}

/* ---- UI AKTUALISIEREN ---- */
function updateUI() {
  cardCounter.textContent = `${currentIndex + 1} / ${deck.length}`;
  liveCount.textContent   = trueCount > 0 ? `+${trueCount}` : trueCount;
  const pct = ((currentIndex + 1) / deck.length) * 100;
  progressBar.style.width = pct + '%';
}

/* ---- NÄCHSTE KARTE ---- */
function nextCard() {
  if (isAnimating) return;

  trueCount += deck[currentIndex].hiLo;
  currentIndex++;

  if (currentIndex >= deck.length) {
    flyOutCard();
    setTimeout(showEndScreen, 400);
    return;
  }

  isAnimating = true;
  flyOutCard(() => {
    updateUI();
    showCard(currentIndex, true);
    isAnimating = false;
  });
}

/* FIX: Timeout-Fallback damit isAnimating nie dauerhaft hängt */
function flyOutCard(callback) {
  activeCard.classList.add('fly-out');

  let called = false;
  const done = () => {
    if (called) return;
    called = true;
    activeCard.classList.remove('fly-out');
    activeCard.style.transform = '';
    activeCard.style.transition = '';
    if (callback) callback();
  };

  activeCard.addEventListener('transitionend', done, { once: true });
  // Fallback nach 500ms falls transitionend nicht feuert
  setTimeout(done, 500);
}

/* ---- MISCHEN ---- */
function doShuffle() {
  if (isAnimating) return;
  deckArea.classList.add('shuffling');
  setTimeout(() => {
    deckArea.classList.remove('shuffling');
    initDeck();
  }, 500);
}

/* ---- ENDSCREEN ---- */
function showEndScreen() {
  screenDeck.classList.remove('active');
  screenEnd.classList.add('active');
}

function showDeckScreen() {
  screenEnd.classList.remove('active');
  screenDeck.classList.add('active');
  initDeck();
}

/* ---- KARTENZÄHLEN PRÜFEN ---- */
function checkCount() {
  const userVal = parseInt(userCountInput.value, 10);
  if (isNaN(userVal)) {
    userCountInput.focus();
    return;
  }

  resultBox.classList.remove('hidden', 'correct', 'wrong');

  if (userVal === trueCount) {
    resultBox.classList.add('correct');
    resultIcon.textContent = '✅';
    resultText.textContent = 'Perfekt! Du hast richtig gezählt.';
    resultCorrect.textContent = `Der korrekte Wert war: ${trueCount > 0 ? '+' : ''}${trueCount}`;
  } else {
    resultBox.classList.add('wrong');
    resultIcon.textContent = '❌';
    const diff = userVal - trueCount;
    resultText.textContent = `Leider falsch. Du warst um ${Math.abs(diff)} ${Math.abs(diff) === 1 ? 'Punkt' : 'Punkte'} daneben.`;
    resultCorrect.textContent = `Richtig wäre: ${trueCount > 0 ? '+' : ''}${trueCount}`;
  }
}

/* ============================================
   SWIPE / TOUCH / MAUS HANDLING
   ============================================ */

let startY = 0;
let currentY = 0;
let isDragging = false;
const SWIPE_THRESHOLD = 60;

function onPointerDown(e) {
  if (isAnimating) return;
  isDragging = true;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
  currentY = startY;
  activeCard.classList.add('swiping');
}

function onPointerMove(e) {
  if (!isDragging) return;
  currentY = e.touches ? e.touches[0].clientY : e.clientY;
  const dy = currentY - startY;
  if (dy < 0) {
    activeCard.style.transform = `translateY(${dy}px) rotate(${dy * 0.02}deg)`;
  }
}

function onPointerUp(e) {
  if (!isDragging) return;
  isDragging = false;
  activeCard.classList.remove('swiping');

  const dy = currentY - startY;
  if (dy < -SWIPE_THRESHOLD) {
    nextCard();
  } else {
    activeCard.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    activeCard.style.transform = '';
    activeCard.addEventListener('transitionend', () => {
      activeCard.style.transition = '';
    }, { once: true });
  }
}

/* Touch Events */
activeCard.addEventListener('touchstart', onPointerDown, { passive: true });
activeCard.addEventListener('touchmove',  onPointerMove, { passive: true });
activeCard.addEventListener('touchend',   onPointerUp);

/* Maus Events */
activeCard.addEventListener('mousedown', onPointerDown);
window.addEventListener('mousemove', onPointerMove);
window.addEventListener('mouseup', onPointerUp);

/* ---- BUTTONS ---- */
btnShuffle.addEventListener('click', doShuffle);
btnCheck.addEventListener('click', checkCount);
btnRestart.addEventListener('click', showDeckScreen);
userCountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkCount();
});

/* ---- START ---- */
initDeck();
