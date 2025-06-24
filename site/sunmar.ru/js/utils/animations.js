import {gsap} from "gsap";

function getGameField() {
  return document.querySelector('.screen--game');
}

export function markSelected(card) {
  const target = card.querySelector('.card-front');
  gsap.to(target, {backgroundColor: '#FFE7AE', duration: 0.2});
}

export function flashRed(card) {
  const target = card.querySelector('.card-front');
  gsap.to(target, {
    backgroundColor: '#F9B8B8',
    duration: 0.5,
    repeat: 3,
    yoyo: true
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
        ease: "power2.inOut"
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
      });
    }
  });
}

export function resetCard(card) {
  const front = card.querySelector('.card-front');
  const gameField = getGameField();
  gsap.to(front, {
    backgroundColor: '#ffffff',
    duration: 0.2,
    onComplete: () => {
      gameField.classList.remove('js-darken');
    }
  });
}

export function animateMatchIcon(matchIcon, icon) {
  const gameField = getGameField();
  gsap.to(matchIcon, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      delay: 3,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(matchIcon, {
          xPercent: icon.position.xPercent,
          yPercent: icon.position.yPercent,
          scale: icon.position.scale,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            gameField.classList.add('js-darken-remove');
            setTimeout(() => {
              gameField.classList.remove('js-darken', 'js-darken-remove');
            }, 500);
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
