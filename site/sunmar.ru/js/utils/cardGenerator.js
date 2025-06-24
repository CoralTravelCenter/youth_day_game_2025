import handleCardClick from "./handleCardClick";
import {ICONS} from "../gameData";

function createElement(item, icon) {
  const isPairCard = Boolean(item.pareImg);
  const type = isPairCard ? 'pair' : 'main';
  if (isPairCard && !item.pareImg) return null;
  if (!isPairCard && !item.countryImg) return null;
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.pairId = item.name;
  card.addEventListener('click', () => handleCardClick(card, type, icon));
  card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img width="106" height="106" src="${isPairCard ? item.pareImg : item.countryImg}" alt="${item.name}" />
          ${!isPairCard ? `<div class="card-name">${item.name}</div>` : ''}
        </div>
        <div class="card-back"></div>
      </div>
    `;
  return card;
}

export function iconsGenerator(icons, container) {
  icons.forEach(el => {
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.style.opacity = '0';
    icon.dataset.pairId = el.name;
    icon.innerHTML = `<img src="${el.icon}"/>`;
    if (el.zIndex) icon.style.zIndex = el.zIndex;
    container.appendChild(icon);
  })
}

export function cardGenerator(arr, container) {
  arr.forEach((item, idx) => {
    const card = createElement(item, ICONS[idx]);
    if (card) {
      container.append(card);
    }
  })
}
