import checkPair from "./checkPair";
import {animateMatchIcon, flashGreen, flashRed, markSelected, resetCard} from "./animations";

let selectedMain = null;
let selectedPair = null;

export default function handleCardClick(card, type, icon) {
  if (card.classList.contains('matched') || card.classList.contains('selected')) return;

  markSelected(card);

  if (type === 'main') {
    if (selectedMain) resetCard(selectedMain);
    selectedMain = card;
  } else {
    if (selectedPair) resetCard(selectedPair);
    selectedPair = card;
  }

  if (selectedMain && selectedPair) {
    const isMatch = checkPair(selectedMain, selectedPair);

    if (isMatch) {
      selectedMain.classList.add('matched');
      selectedPair.classList.add('matched');
      flashGreen(selectedMain);
      flashGreen(selectedPair);
      const pairId = selectedMain.dataset.pairId;
      const matchIcon = document.querySelector(`.icon[data-pair-id="${pairId}"]`);
      if (matchIcon) {
        animateMatchIcon(matchIcon, icon);
      }
    } else {
      flashRed(selectedMain);
      flashRed(selectedPair);
    }

    setTimeout(() => {
      selectedMain = null;
      selectedPair = null;
    }, 600);
  }
}
