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
    gameInfo.innerHTML = `Hole: ${this.gameState.getCurrentHoleIndex() + 1} <br />
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
    this.gameCompleteScreen = document.createElement("div");
    this.gameCompleteScreen.id = "game-complete-screen";
    this.gameCompleteScreen.style.display = "none";
    document.body.appendChild(this.gameCompleteScreen);
  }

  showGameCompleteScreen() {
    this.gameState.recordScore();

    // Clear existing content
    this.gameCompleteScreen.innerHTML = '';

    // Create new content
    this.gameCompleteScreen.innerHTML = `
    <h1>Game Complete!</h1>
    <p>Your final score is: ${this.gameState.getScore()}</p>
    <div id="hole-scores"></div>
    <button id="play-again-button">Play Again</button>
  `;

    // Add hole scores
    const holeScoresElement = this.gameCompleteScreen.querySelector("#hole-scores");
    for (let i = 0; i < this.gameState.holeScores.length; i++) {
      const holeScore = this.gameState.holeScores[i];
      const holePar = this.gameState.holeParScores[i];
      const scoreText = `Hole ${i + 1}: ${holeScore} (Par ${holePar})`;
      const scoreElement = document.createElement("p");
      scoreElement.textContent = scoreText;
      holeScoresElement.appendChild(scoreElement);
    }

    // Add event listener to play again button
    const playAgainButton = this.gameCompleteScreen.querySelector("#play-again-button");
    playAgainButton.addEventListener("click", () => {
      console.log("Play again clicked");
      this.hideGameCompleteScreen();
      this.gameState.resetGame();
    });

    this.gameCompleteScreen.style.display = "block";
  }

  hideGameCompleteScreen() {
    this.gameCompleteScreen.style.display = "none";
  }
}
