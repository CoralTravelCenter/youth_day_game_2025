import {gsap} from "gsap";
import {goToFinal, goToGame} from "./screenManager";
import {animateMatchIcon, flashGreen, flashRed} from "./animations";
import {ICONS} from "../gameData";

const selected = [];
export const matched = new Set();

function resetSelection() {
  selected.length = 0;
}

function isMatch(cardA, cardB) {
  return cardA.dataset.pairId === cardB.dataset.pairId;
}

export function checkGameEnd() {
  if (matched.size === 9) {
    goToFinal()
    ym(215233, 'reachGoal', 'den-molodezhi-win')
  }
}

export function cardsOff() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.pointerEvents = 'none';
  })
}

export function cardsOn() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.pointerEvents = 'all';
  })
}

export default function handleCardClick(card) {
  if (matched.has(card.dataset.pairId) || card.classList.contains('selected')) return;

  card.classList.add('selected');
  selected.push(card);

  if (selected.length === 2) {
    cardsOff()
    const [first, second] = selected;

    if (isMatch(first, second)) {
      matched.add(first.dataset.pairId);
      flashGreen(first);
      flashGreen(second);
      first.classList.add('success');
      second.classList.add('success');
      animateMatchIcon(document.querySelector(`.icon[data-pair-id="${first.dataset.pairId}"]`))
      resetSelection();
    } else {
      flashRed(first);
      flashRed(second);
      setTimeout(() => {
        first.classList.remove('selected');
        second.classList.remove('selected');
        resetSelection();
      }, 400);
    }
  }
}


export function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    gsap.set(card, {clearProps: 'all'});
    gsap.set(front, {clearProps: 'all'});
    gsap.set(back, {clearProps: 'all'});
    card.classList.remove('selected', 'wrong', 'success');
    document.querySelectorAll('.screen--game .icon').forEach((icon, idx) => {
      if (ICONS[idx] !== undefined) {
        console.log(icon, ICONS[idx]);
        gsap.set(icon, {
          scale: ICONS[idx].startScale,
          x: ICONS[idx].startX,
          y: ICONS[idx].startY
        });
      }
    });
  });
  matched.clear();
  resetSelection();
  goToGame()
}
