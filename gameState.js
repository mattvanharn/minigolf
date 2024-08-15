// gameState.js
export class GameState {
  constructor() {
    this.shotsTaken = 0;
    this.currentHoleIndex = 1;
    this.holeParScores = [2, 3, 4];
  }

  incrementShotsTaken() {
    this.shotsTaken++;
  }

  getShotsTaken() {
    return this.shotsTaken;
  }

  incrementCurrentHoleIndex() {
    this.currentHoleIndex++;
  }

  getCurrentHoleIndex() {
    return this.currentHoleIndex;
  }

  getHoleParScore() {
    return this.holeParScores[this.currentHoleIndex - 1];
  }

  resetShotsTaken() {
    this.shotsTaken = 0;
  }

  resetCurrentHoleIndex() {
    this.currentHoleIndex = 1;
  }

  advanceHole() {
    this.incrementCurrentHoleIndex();
    this.resetShotsTaken();
  }

  // Check if the golf ball is in the hole
  checkHole() {
    if (
      golfBall.collider.center.distanceTo(hole1Brush.position) < HOLE_RADIUS
    ) {
      console.log("Hole in one!");
      shotsTaken = 0;
      currentHoleIndex++;

      if (currentHoleIndex >= holeParScores.length) {
        console.log("Game over!");
      }
    }
  }
}
