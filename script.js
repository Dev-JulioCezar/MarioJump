"use strict";
const imgs = Array.from(document.querySelectorAll("img"));
/* INDEX
0 : img.logo
1 : img.clouds
2 : img.pipe
3 : img.mario
4 : img.mario-dance
5 : img.game-over
*/

// botões
const play = document.querySelector(".play");
const btnReload = document.querySelector(".reload img");

//spans
const level = document.querySelector(".level-value");
const creditos = document.querySelector(".creditos");
const score = document.querySelector(".score-value");

//sons
const som = new Audio("./sound/sound_tema_mario.mp3");
const somGameOver = new Audio("./sound/game-over.mp3");
const pulo = new Audio("./sound/mario-pulo.mp3");

const playGame = () => {
  som.play();

  document.querySelector(".level").style.opacity = "1";
  level.innerText = 1;
  let levelSpeed = 2; //velocidade do pipe
  let scoreValue = 0; // pontuação
  let scoreSpeed = 2000;
  let timeScore;

  const updateTimeScore = () => {
    scoreValue++;
    score.innerText = scoreValue;

    if (scoreValue === 5) {
      level.innerText = 2;
      levelSpeed = 1.5;
      scoreSpeed = 1500;
      clearInterval(timeScore);
      timeScore = setInterval(updateTimeScore, scoreSpeed);
      imgs[2].style.animation = `pipe-animation2 ${levelSpeed}s linear infinite`;
    } else if (scoreValue === 13) {
      level.innerText = 3;
      levelSpeed = 1;
      scoreSpeed = 1000;
      clearInterval(timeScore);
      timeScore = setInterval(updateTimeScore, scoreSpeed);
      imgs[2].style.animation = `pipe-animation ${levelSpeed}s linear infinite`;
    } else if (scoreValue === 20) {
      level.innerText = 4;
      levelSpeed = 0.7;
      scoreSpeed = 700;
      clearInterval(timeScore);
      timeScore = setInterval(updateTimeScore, scoreSpeed);
      imgs[2].style.animation = `pipe-animation2 ${levelSpeed}s linear infinite`;
    } else if (scoreValue === 35) {
      level.innerText = "Max";
      levelSpeed = 0.5;
      scoreSpeed = 500;
      clearInterval(timeScore);
      timeScore = setInterval(updateTimeScore, scoreSpeed);
      imgs[2].style.animation = `pipe-animation2 ${levelSpeed}s linear infinite`;
    }
  };

  timeScore = setInterval(updateTimeScore, scoreSpeed);

  //                                    velocidade do pipe
  imgs[2].style.animation = `pipe-animation ${levelSpeed}s linear infinite`;
  imgs[0].style.display = "none";
  imgs[3].style.opacity = "1";
  imgs[2].style.opacity = "1";
  imgs[4].style.opacity = "0";
  play.style.display = "none";
  creditos.style.display = "none";

  // Função pulo do Mario
  const jump = () => {
    //editar o audio do pulo mais tarde!!!!
    if (som.paused === false) {
      pulo.play();
    }

    if (scoreValue < 20) {
      imgs[3].classList.add("mario-jump");
      setTimeout(() => {
        imgs[3].classList.remove("mario-jump");
      }, 500);
    } else {
      imgs[3].classList.remove("mario-jump");
      imgs[3].classList.add("mario-jump2");
      setTimeout(() => {
        imgs[3].classList.remove("mario-jump2");
      }, 350);
    }
  };

  document.addEventListener("keydown", jump);

  // Loop para verificar se foi Game-Over
  const loop = setInterval(() => {
    const pipePosition = imgs[2].offsetLeft;
    const marioPosition = +window
      .getComputedStyle(imgs[3])
      .bottom.replace("px", "");

    if (pipePosition <= 120 && marioPosition <= 80 && pipePosition > 0) {
      imgs[2].style.animation = "none";
      imgs[2].style.left = `${pipePosition}px`;
      imgs[3].style.bottom = `${marioPosition}px`;
      imgs[3].style.animation = "none";
      imgs[3].src = `img/game-over.png`;
      imgs[3].style.width = "70px";
      imgs[3].style.marginLeft = "50px";
      btnReload.style.display = "initial";
      imgs[5].style.display = "initial";
      if (som.paused === false) {
        som.pause();
        somGameOver.play();
      }
      clearInterval(timeScore);
      clearInterval(loop);
    }
  }, 10);
};

play.addEventListener("click", playGame);

const reload = () => {
  location.reload();
};

btnReload.addEventListener("click", reload);
