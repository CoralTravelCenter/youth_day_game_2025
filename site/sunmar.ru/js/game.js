// 1) Создаем и рендерим карточки в разметку
import {cardGenerator, iconsGenerator} from "./utils/cardGenerator";
import {COUNTRIES, COUNTRIES_PAIRS, ICONS} from "./gameData";
import {vimeoAutoPlay} from "../../common/js/usefuls";
import {endGameBtnInsert, goToGame} from "./utils/screenManager";
import {animateCardFields} from "./utils/animations";

(async () => {
  await hostReactAppReady();
  vimeoAutoPlay()
  const mainCardContainer = document.querySelector('.game-screen .main-card-container');
  const pairCardContainer = document.querySelector('.game-screen .pair-card-container');
  const iconsContainer = document.querySelector('.game-screen .icons-container');
  cardGenerator(COUNTRIES, mainCardContainer)
  cardGenerator(COUNTRIES_PAIRS, pairCardContainer)
  iconsGenerator(ICONS, iconsContainer)

  const goToGameBtn = document.querySelector('.goToGameBtn');
  goToGameBtn.addEventListener('click', (e) => {
    goToGame(e.currentTarget)
    animateCardFields()
  })


  setTimeout(() => endGameBtnInsert(), 600000)
})()
