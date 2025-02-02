function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}


function changeDiceImage() {
    let randomNumber1 = generateRandomNumber();
    let randomNumber2 = generateRandomNumber();
    
    let dice1 = document.querySelector(".img1");
    let dice2 = document.querySelector(".img2");
    
    dice1.setAttribute("src", `images/dice${randomNumber1}.png`);
    dice2.setAttribute("src", `images/dice${randomNumber2}.png`);
    
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").textContent = "🚩 Player 1 Wins!";
    } else if (randomNumber1 < randomNumber2) {
        document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
    } else {
        document.querySelector("h1").textContent = "Draw!";
    }
}

changeDiceImage();