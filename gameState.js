export class GameState {
  constructor(golfBall) {
    this.shotsTaken = 0;
    this.currentHoleIndex = 1;
    this.holeParScores = [2, 3, 4];
    this.holeScores = [0, 0, 0];
    this.totalScore = 0;
    this.golfBall = golfBall;
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

  getScore() {
    return this.totalScore;
  }

  recordScore() {
    this.holeScores[this.currentHoleIndex - 1] = this.shotsTaken;
  }

  resetGame() {
    this.resetShotsTaken();
    this.resetCurrentHoleIndex();
    this.totalScore = 0;
  }
}
