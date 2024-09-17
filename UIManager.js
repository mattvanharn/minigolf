// UIManager.js

export class UIManager {
  constructor(gameState) {
    this.gameState = gameState;
    this.scoreElement = null;
    this.advanceButton = null;
    this.powerDisplay = null;
    this.gameCompleteScreen = null;
    this.gameInfo = null;
    this.golfBall = null;

    this.createScoreDisplay();
    this.createAdvanceButton();
    this.createPowerDisplay();
    this.createGameDisplay();
    this.createGameCompleteScreen();
  }

  createScoreDisplay() {
    const scoreElement = document.createElement("div");
    scoreElement.id = "score-display";
    scoreElement.textContent = "Score: 0";
    document.body.appendChild(scoreElement);
    this.scoreElement = scoreElement;
  }

  createAdvanceButton() {
    const advanceButton = document.createElement("button");
    advanceButton.id = "advance-button";
    advanceButton.textContent = "Next Hole";
    advanceButton.style.display = "none";
    document.body.appendChild(advanceButton);
    this.advanceButton = advanceButton;

    advanceButton.addEventListener("click", () => {
      this.gameState.advanceHole();
      this.advanceButton.style.display = "none";
    });
  }

  createPowerDisplay() {
    const powerDisplay = document.createElement("div");
    powerDisplay.id = "power-display";
    powerDisplay.textContent = "Power: 0";
    document.body.appendChild(powerDisplay);
    this.powerDisplay = powerDisplay;
  }

  createGameDisplay() {
    const gameDisplay = document.createElement("div");
    gameDisplay.id = "game-display";
    gameDisplay.innerHTML = `Hole: 1 <br />
      Strokes: 0 <br />
      Par: 3 <br />
      `;
    document.body.appendChild(gameDisplay);
    this.gameDisplay = gameDisplay;
  }

  setGolfBall(golfBall) {
    this.golfBall = golfBall;
  }

  updatePowerDisplay() {
    this.powerDisplay.innerHTML = `Power: ${this.golfBall.getShotPower()}`;
  }

  updateGameInfo(info) {
    this.gameInfo.textContent = info;
  }

  updateGameDisplay() {
    const powerDisplay = document.getElementById("powerDisplay");
    powerDisplay.innerHTML = `Power: ${this.golfBall.getShotPower().toFixed(2)}`;
    const gameInfo = document.getElementById("gameInfo");
    gameInfo.innerHTML = `Hole: ${this.gameState.getCurrentHoleIndex()} <br />
      Strokes: ${this.gameState.getShotsTaken()} <br />
      Par: ${this.gameState.getHoleParScore()} <br />
      `;
  }

  updateScore(score) {
    this.scoreElement.textContent = `Score: ${score}`;
  }

  showAdvanceButton() {
    this.advanceButton.style.display = "block";
  }

  hideAdvanceButton() {
    this.advanceButton.style.display = "none";
  }

  createGameCompleteScreen() {
    const gameCompleteScreen = document.createElement("div");
    gameCompleteScreen.id = "game-complete-screen";
    gameCompleteScreen.style.display = "none";
    gameCompleteScreen.innerHTML = `
      <h1>Game Complete!</h1>
      <p>Your final score is: ${this.gameState.getScore()}</p>
      <button id="play-again-button">Play Again</button>
    `;
    document.body.appendChild(gameCompleteScreen);
    this.gameCompleteScreen = gameCompleteScreen;

    const playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", () => {
      this.hideGameCompleteScreen();
      // Call the game reset function here
      this.gameState.resetGame();
    });
  }

  showGameCompleteScreen() {
    this.gameCompleteScreen.style.display = "block";
  }

  hideGameOverScreen() {
    this.gameCompleteScreen.style.display = "none";
  }
}
