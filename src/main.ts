//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");

let isJumping = false; //changed this from var (sean comment)
let gameOver = true;

document.addEventListener("mousedown", jump); //made it so jump on mouse down (sean comment)

setInterval(function () {
  update(); //changed name with tony
}, 10);

function update() {
  //changed name with tony
  if (gameOver == false) {
    score = score + 1;
    setText("Score: " + score);

    checkGameOver();
  }
}

function jump() {
  if (gameOver == false && isJumping == false) {
    //combined them and got rid of a === (sean comment)
    isJumping = true;
    dino?.classList.add("jump");
    setTimeout(removeJump, 500);
  }
  if (gameOver == true) {
    //changed this with miles to make the score stop reseting when trying to jump in air
    startGame();
  }
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function checkGameOver() {
  if (gameOver == false && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    const cactusleft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    const birdleft = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect cactus collision
    if (
      (dinoTop >= 150 && Math.abs(cactusleft) < 7) ||
      (dinoTop <= 55 && Math.abs(birdleft) < 11) //combined these with tony
    ) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      removeJump();

      //reset cactus
      removeObstacles();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
