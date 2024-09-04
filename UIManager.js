// UIManager.js

export class UIManager {
  constructor(gameState) {
    this.gameState = gameState;
  }

  showScoreCard(onAdvanceCallback) {
    const scoreCardDiv = document.createElement("div");
    scoreCardDiv.id = "scoreCard";
    scoreCardDiv.style.display = "flex";
    scoreCardDiv.style.flexDirection = "column";
    scoreCardDiv.style.alignItems = "center";
    scoreCardDiv.style.justifyContent = "center";
    scoreCardDiv.style.width = "300px";
    scoreCardDiv.style.height = "200px";
    scoreCardDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    scoreCardDiv.style.borderRadius = "10px";
    scoreCardDiv.style.padding = "20px";
    scoreCardDiv.style.fontSize = "18px";
    scoreCardDiv.style.fontWeight = "bold";
    scoreCardDiv.style.position = "absolute";
    scoreCardDiv.style.top = "50%";
    scoreCardDiv.style.left = "50%";
    scoreCardDiv.style.transform = "translate(-50%, -50%)";
    scoreCardDiv.style.zIndex = "1000";

    scoreCardDiv.innerHTML = `
      <h2>Hole ${this.gameState.getCurrentHoleIndex()}</h2>
      <p>Par: ${this.gameState.getHoleParScore()}</p>
      <p>Your Score: ${this.gameState.getShotsTaken()}</p>
      <button id="advanceButton">Advance to Hole ${this.gameState.getCurrentHoleIndex() + 1}</button>
    `;

    document.body.appendChild(scoreCardDiv);

    const advanceButton = document.getElementById("advanceButton");
    advanceButton.addEventListener("click", () => {
      document.body.removeChild(scoreCardDiv);
      onAdvanceCallback();
    });
  }

  showVictoryScreen() {
    const victoryScreenDiv = document.createElement("div");
    victoryScreenDiv.id = "victory-screen";
    victoryScreenDiv.style.display = "flex";
    victoryScreenDiv.style.flexDirection = "column";
    victoryScreenDiv.style.alignItems = "center";
    victoryScreenDiv.style.justifyContent = "center";
    victoryScreenDiv.style.width = "300px";
    victoryScreenDiv.style.height = "200px";
    victoryScreenDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    victoryScreenDiv.style.borderRadius = "10px";
    victoryScreenDiv.style.padding = "20px";
    victoryScreenDiv.style.fontSize = "18px";
    victoryScreenDiv.style.fontWeight = "bold";
    victoryScreenDiv.style.position = "absolute";
    victoryScreenDiv.style.top = "50%";
    victoryScreenDiv.style.left = "50%";
    victoryScreenDiv.style.transform = "translate(-50%, -50%)";
    victoryScreenDiv.style.zIndex = "1000";

    victoryScreenDiv.innerHTML = `
      <h2>Congratulations!</h2>
      <p>Your final score: ${this.gameState.getTotalScore()}</p>
      <button onclick="playAgain()">Play Again</button>
    `;

    document.body.appendChild(victoryScreenDiv);
  }
}
