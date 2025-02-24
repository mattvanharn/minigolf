import * as THREE from "three";

export class GameState {
  constructor(camera) {
    this.shotsTaken = 0;
    this.currentHoleIndex = 0;
    this.holeParScores = [2, 3, 4];
    this.holeScores = [0, 0, 0];
    this.totalScore = 0;
    this.holePositions = [
      new THREE.Vector3(0, 4.2, -10),
      new THREE.Vector3(27.5, 1.7, -33.75),
      new THREE.Vector3(15, 2.2, 7.5),
    ];
    this.startingPositions = [
      new THREE.Vector3(0, 3, 10),
      new THREE.Vector3(0, 3, -25),
      new THREE.Vector3(40, 3, -27.5),
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

  getHoleScores() {
    return this.holeScores;
  }

  resetShotsTaken() {
    console.log("Resetting shots taken");
    this.shotsTaken = 0;
  }

  resetCurrentHoleIndex() {
    this.currentHoleIndex = 0;
  }

  advanceHole() {
    // console.log("Before: ", this.cameraControls.cameraPosition);
    // console.log("Advancing hole");

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

    // console.log("After: ", this.cameraControls.cameraPosition);

    // Set Current Hole Completed to False
    this.setCurrentHoleCompleted(false);

    console.log("Hole Scores: ", this.holeScores);
  }

  getTotalPar() {
    return this.holeParScores.reduce((a, b) => a + b, 0);
  }

  getScore() {
    return this.holeScores.reduce((a, b) => a + b, 0);
  }

  recordScore() {
    this.holeScores[this.currentHoleIndex] = this.shotsTaken;
  }

  getHolePosition(holeIndex) {
    // console.log("Hole Index: ", holeIndex);
    // console.log("Hole Positions: ", this.holePositions);
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
    return this.currentHoleIndex === this.holeParScores.length - 1;
  }

  resetGame() {
    // Reset Hole Scores
    this.resetShotsTaken();
    this.resetCurrentHoleIndex();
    this.totalScore = 0;

    // Reset Golf Ball Position to First Hole
    this.golfBall.setPosition(this.startingPositions[0]);
  }
}
