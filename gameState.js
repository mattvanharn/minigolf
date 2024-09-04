import * as THREE from "three";

export class GameState {
  constructor(golfBall) {
    this.shotsTaken = 0;
    this.currentHoleIndex = 1;
    this.holeParScores = [2, 3, 4];
    this.holeScores = [0, 0, 0];
    this.totalScore = 0;
    this.holePositions = [
      new THREE.Vector3(0, 4.2, -10),
      new THREE.Vector3(27.5, 1.7, -33.75),
      new THREE.Vector3(0, 0, 0),
    ];
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
    console.log("Advancing hole");
    this.incrementCurrentHoleIndex();
    this.resetShotsTaken();
  }

  getScore() {
    return this.totalScore;
  }

  recordScore() {
    this.holeScores[this.currentHoleIndex - 1] = this.shotsTaken;
  }

  getHolePosition(hole) {
    return this.holePositions[hole - 1];
  }

  isLastHole() {
    return this.currentHoleIndex === this.holeParScores.length;
  }

  resetGame() {
    this.resetShotsTaken();
    this.resetCurrentHoleIndex();
    this.totalScore = 0;
  }
}
