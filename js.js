const emojis = [
  "🍎",
  "🍌",
  "🍒",
  "🍇",
  "🍉",
  "🥝",
  "🍍",
  "🍑",
  "🍎",
  "🍌",
  "🍒",
  "🍇",
  "🍉",
  "🥝",
  "🍍",
  "🍑",
].sort(() => Math.random() - 0.5);

const cards = document.querySelectorAll(".card");
let first = null; //pierwsza kliknieta karta
let second = null; //druga kliknieta karta
let lock = false; //blokuje klikanie kart

cards.forEach((card, index) => {
  card.dataset.emoji = emojis[index];
  card.addEventListener("click", cardClick);
});

function cardClick() {
  if (lock || this === first || this.classList.contains("flipped")) return;
  // classList.contains("cos") sprawdza czy element html posiada klase css o nazwie cos

  this.textContent = this.dataset.emoji; // zamiast napisu ktory jest na kartoniku (nie ma go ) to dodaje emoji z listy u gory emojis
  this.classList.add("flipped"); // dodaje do kliknietego kartonika klaseee flipped
  //this = kliknieta karta

  if (!first) {
    // first jest null → warunek spełniony
    first = this; // Zapamiętujemy klikniętą kartę
    return; // Kończymy działanie funkcji, czekamy na drugą kartę
  }

  second = this; //zapisujemy druga karte
  lock = true; //blokujemy zeby nie bylo mozna klikac az nie sprawdzimy kart

  setTimeout(() => {
    if (first.dataset.emoji === second.dataset.emoji) {
      // Jeśli emoji się zgadzają - wyłączamy możliwość klikania tych kart
      first.removeEventListener("click", cardClick);
      second.removeEventListener("click", cardClick);
    } else {
      // W przeciwnym wypadku zakrywamy karty ponownie
      first.textContent = "";
      second.textContent = "";
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }
    // Resetujemy zmienne
    first = null;
    second = null;
    lock = false;
  }, 1000);
}
