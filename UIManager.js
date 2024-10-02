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
    this.createAdvanceHoleScreen();
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

  updateGameInfo(info) {
    this.gameInfo.textContent = info;
  }

  updateGameDisplay() {
    const powerDisplay = document.getElementById("powerDisplay");
    powerDisplay.innerHTML = `Power: ${this.golfBall.getShotPower().toFixed(0)}`;
    const gameInfo = document.getElementById("gameInfo");
    gameInfo.innerHTML = `Hole: ${this.gameState.getCurrentHoleIndex() + 1} <br />
      Strokes: ${this.gameState.getShotsTaken()} <br />
      Par: ${this.gameState.getHoleParScore()} <br />
      `;
  }

  updateScore(score) {
    this.scoreElement.textContent = `Score: ${score}`;
  }

  createAdvanceHoleScreen() {
    this.advanceHoleScreen = document.createElement("div");
    this.advanceHoleScreen.id = "advance-hole-screen";
    this.advanceHoleScreen.style.display = "none";
    document.body.appendChild(this.advanceHoleScreen);
  }

  showAdvanceHoleScreen() {
    // Record score
    this.gameState.recordScore();

    // Clear existing content

    this.advanceHoleScreen.innerHTML = "";

    // Create new content
    this.advanceHoleScreen.innerHTML = `
      <div id="advance-hole-container">
        <h1>${this.golfBall.getMessage()}</h1>
        <div id="hole-scores-container">
          <table id="hole-scores">
            <thead>
              <tr id="holes">
                <th>Hole</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>Total</th>
              </tr>
              <tr id="pars">
                <th>Par</th>
                  <td>${this.gameState.holeParScores[0]}</td>
                  <td>${this.gameState.holeParScores[1]}</td>
                  <td>${this.gameState.holeParScores[2]}</td>
                  <td>${this.gameState.getTotalPar()}</td>
              </tr>
              <tr>
                <th id="scores">Score</th>
                  <td>${this.gameState.holeScores[0] === 0 ? "" : this.gameState.holeScores[0]}</td>
                  <td>${this.gameState.holeScores[1] === 0 ? "" : this.gameState.holeScores[1]}</td>
                  <td>${this.gameState.holeScores[2] === 0 ? "" : this.gameState.holeScores[2]}</td>
                  <td>${this.gameState.getScore()}</td>
              </tr>
            </thead>
          </table>
        </div>
        <button id="advance-hole-button">Advance to Hole ${this.gameState.getCurrentHoleIndex() + 2}</button>
      </div>
    `;

    // Add event listener to advance hole button
    const advanceHoleButton = this.advanceHoleScreen.querySelector(
      "#advance-hole-button",
    );
    advanceHoleButton.addEventListener("click", () => {
      console.log("Advance hole clicked");
      this.hideAdvanceHoleScreen();
      this.gameState.advanceHole();
    });

    this.advanceHoleScreen.style.display = "block";
  }

  hideAdvanceHoleScreen() {
    this.advanceHoleScreen.style.display = "none";
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
    this.gameCompleteScreen.innerHTML = "";

    // Create new content
    this.gameCompleteScreen.innerHTML = `
      <div id="game-complete-container">
        <h1>Game Complete!</h1>
        <div id="hole-scores-container">
          <table id="hole-scores">
            <thead>
              <tr id="holes">
                <th>Hole</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>Total</th>
              </tr>
              <tr id="pars">
                <th>Par</th>
                  <td>${this.gameState.holeParScores[0]}</td>
                  <td>${this.gameState.holeParScores[1]}</td>
                  <td>${this.gameState.holeParScores[2]}</td>
                  <td>${this.gameState.getTotalPar()}</td>
              </tr>
              <tr>
                <th id="scores">Score</th>
                  <td>${this.gameState.holeScores[0]}</td>
                  <td>${this.gameState.holeScores[1]}</td>
                  <td>${this.gameState.holeScores[2]}</td>
                  <td>${this.gameState.getScore()}</td>
              </tr>
            </thead>
          </table>
        </div>
        <button id="play-again-button">Play Again</button>
      </div>
    `;

    // Add event listener to play again button
    const playAgainButton =
      this.gameCompleteScreen.querySelector("#play-again-button");
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
