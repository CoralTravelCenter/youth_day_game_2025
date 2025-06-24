import checkPair from "./checkPair";
import {animateMatchIcon, flashGreen, flashRed, markSelected, resetCard} from "./animations";
import {gsap} from "gsap";
import {goToFinal} from "./screenManager";

const matchedPairs = new Set();
const selected = {main: null, pair: null};

function setSelected(type, card) {
  if (type === 'main') {
    if (selected.main !== card) {
      if (selected.main) resetCard(selected.main);
      selected.main = card;
    }
    // else do nothing (already selected)
    // do not reset pair
  } else if (type === 'pair') {
    if (selected.pair !== card) {
      if (selected.pair) resetCard(selected.pair);
      selected.pair = card;
    }
    // else do nothing (already selected)
    // do not reset main
  }
}

export default function handleCardClick(card, type, icon) {
  let isMatch = false

  setSelected(type, card);
  markSelected(card);

  if (selected.main && selected.pair) {
    isMatch = checkPair(selected.main, selected.pair);

    if (isMatch) {
      const pairId = selected.main.dataset.pairId;
      matchedPairs.add(pairId);
      flashGreen(selected.main);
      flashGreen(selected.pair);
      const matchIcon = document.querySelector(`.icon[data-pair-id="${pairId}"]`);
      if (matchIcon) {
        animateMatchIcon(matchIcon, icon);
      }
      if (matchedPairs.size === 9) {
        setTimeout(() => goToFinal(), 1000)
      }
    } else {
      flashRed(selected.main);
      flashRed(selected.pair);
      setTimeout(() => {
        resetCard(selected.main);
        resetCard(selected.pair);
        selected.main = null;
        selected.pair = null;
      }, 600);
    }
  }
}

export function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    gsap.killTweensOf(card);
    gsap.set(card, {clearProps: "all"});
  });

  const icons = document.querySelectorAll('.icon');
  icons.forEach(icon => {
    gsap.killTweensOf(icon);
    gsap.set(icon, {clearProps: "all"});
  });

  matchedPairs.clear();
  selected.main = null;
  selected.pair = null;
}
