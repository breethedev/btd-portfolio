type Card = {
  name: string;
  image: string;
};

const gridContainer = document.querySelector(".grid-container") as HTMLElement;
let cards: Card[] = [];
let firstCard: HTMLElement | null, secondCard: HTMLElement | null;
let lockBoard = false;
let score = "0";

(document.querySelector(".score") as HTMLElement).textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

export function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (const card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement & { dataset: { name: string } };

  if (lockBoard) return;
  if (!target.classList) return;

  target.classList.add("flipped");

  if (!firstCard) {
    firstCard = target as HTMLElement & { dataset: { name: string } };
    return;
  }

  secondCard = target as HTMLElement & { dataset: { name: string } };
  score = (parseInt(score) + 1).toString();
  (document.querySelector(".score") as HTMLElement).textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  if (!firstCard || !secondCard) return;
  const isMatch: boolean = firstCard.dataset.name === secondCard.dataset.name;

  return isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  if (!firstCard || !secondCard) return;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    if (!firstCard || !secondCard) return;
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

export function restart() {
  resetBoard();
  shuffleCards();
  score = "0";
  (document.querySelector(".score") as HTMLAnchorElement).textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
