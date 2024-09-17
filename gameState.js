import * as THREE from "three";

export class GameState {
  constructor(camera) {
    this.shotsTaken = 0;
    this.currentHoleIndex = 0;
    this.holeParScores = [2, 3];
    this.holeScores = [0, 0];
    this.totalScore = 0;
    this.holePositions = [
      new THREE.Vector3(0, 4.2, -10),
      new THREE.Vector3(27.5, 1.7, -33.75),
    ];
    this.startingPositions = [
      new THREE.Vector3(0, 3, 10),
      new THREE.Vector3(0, 3, -25),
    ];
    this.currentHoleComplete = false;
    this.camera = camera;
    this.golfBall = null;
    this.cameraControls = null;
  }

  setGolfBall(golfBall) {
    this.golfBall = golfBall;
  }

  setCameraControls(cameraControls) {
    this.cameraControls = cameraControls;
  }

  incrementShotsTaken() {
    this.shotsTaken++;
  }

  getShotsTaken() {
    return this.shotsTaken;
  }

  incrementCurrentHoleIndex() {
    console.log("Incrementing hole index");
    this.currentHoleIndex++;
  }

  getCurrentHoleIndex() {
    return this.currentHoleIndex;
  }

  getHoleParScore() {
    return this.holeParScores[this.currentHoleIndex];
  }

  resetShotsTaken() {
    console.log("Resetting shots taken");
    this.shotsTaken = 0;
  }

  resetCurrentHoleIndex() {
    this.currentHoleIndex = 0;
  }

  advanceHole() {
    console.log("Before: ", this.cameraControls.cameraPosition);
    console.log("Advancing hole");
    // Record Score
    this.recordScore();

    // Increment Current Hole Index
    this.incrementCurrentHoleIndex();

    // Reset Shots Taken
    this.resetShotsTaken();

    // Set Golf Ball Position to Next Hole
    this.golfBall.setPosition(this.startingPositions[this.currentHoleIndex]);

    // Reset Golf Ball Velocity
    this.golfBall.resetVelocity();

    // Update camera position
    this.cameraControls.cameraPosition = this.golfBall
      .getPosition()
      .add(new THREE.Vector3(0, 2, 4));
    this.camera.position.copy(this.cameraControls.cameraPosition);

    console.log("After: ", this.cameraControls.cameraPosition);

    // Set Current Hole Completed to False
    this.setCurrentHoleCompleted(false);
  }

  getScore() {
    return this.holeScores.reduce((a, b) => a + b, 0);
  }

  recordScore() {
    this.holeScores[this.currentHoleIndex] = this.shotsTaken;
  }

  getHolePosition(holeIndex) {
    return this.holePositions[holeIndex];
  }

  getCurrentHoleCompleted() {
    return this.currentHoleComplete;
  }

  setCurrentHoleCompleted(bool) {
    this.currentHoleComplete = bool;
  }

  isLastHole() {
    // console.log("Current Hole Index: ", this.currentHoleIndex);
    // console.log("Num Holes: ", this.holeParScores.length - 1);
    // console.log(
    //   "Last Hole: ",
    //   this.currentHoleIndex === this.holeParScores.length - 1,
    // );
    return this.currentHoleIndex === this.holeParScores.length - 2;
  }

  resetGame() {
    this.resetShotsTaken();
    this.resetCurrentHoleIndex();
    this.totalScore = 0;
  }
}
