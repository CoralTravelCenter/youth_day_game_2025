import {gsap} from "gsap";
import {cardsOn, checkGameEnd} from "./handleCardClick";

function getGameField() {
  return document.querySelector('.screen--game');
}

export function flashRed(card) {
  const target = card.querySelector('.card-front');
  gsap.to(target, {
    backgroundColor: '#F9B8B8',
    duration: 0.5,
    repeat: 3,
    yoyo: true,
    onComplete: () => {
      gsap.to(target, {
        backgroundColor: '#FFFFFF',
      })
      cardsOn()
    },
  });
}

export function flashGreen(card) {
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');
  const gameField = getGameField();
  gsap.to(front, {
    backgroundColor: '#C1FBB1',
    duration: 0.5,
    repeat: 3,
    yoyo: true,
    onComplete: () => {
      gsap.to(front, {
        rotateY: 180,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(front, {
            backgroundColor: '#FFFFFF',
          })
        }
      });
      gsap.to(back, {
        rotateY: 0,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gameField.classList.add('js-darken');
        }
      });
      gsap.to(card, {
        scale: 0,
        duration: 0.4,
        delay: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          cardsOn()
        }
      });
    }
  });
}

export function animateMatchIcon(matchIcon) {
  const gameField = getGameField();
  gsap.to(matchIcon, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      delay: 3,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(matchIcon, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            gameField.classList.add('js-darken-remove');
            setTimeout(() => {
              gameField.classList.remove('js-darken', 'js-darken-remove');
            }, 500);
            setTimeout(() => checkGameEnd(), 200)
          }
        });
      }
    }
  );
}

export function animateCardFields() {
  gsap.to('.game-board__associations, .game-board__question', {
    y: 0,
    duration: 0.5,
    delay: 1,           // начальная задержка перед всей анимацией
    stagger: 0.2,       // задержка между элементами — волнообразный эффект
    ease: 'power2.inOut',
    onComplete: () => {
      setTimeout(() => {
        removeHowToPlay()
      }, 1500)
    }
  })
}

export function removeHowToPlay() {
  const howToPlay = document.querySelector('.game-instructions');
  const visual = document.querySelector('.screen--game .screen__visual');
  howToPlay.style.opacity = '0';
  visual.style.filter = 'brightness(1)';
}
