// cameraControls.js

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CameraControls {
  constructor(camera, container, golfBall, gameState) {
    this.camera = camera;
    this.container = container;
    this.golfBall = golfBall;
    this.gameState = gameState;

    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.enabled = false;

    // Camera modes
    this.cameraPosition = new THREE.Vector3(0, 0, 0);
    this.isLockedBehindBall = true;
    this.lastLockedPosition = new THREE.Vector3();
  }

  enableControls() {
    this.controls.enabled = true;
  }

  disableControls() {
    this.controls.enabled = false;
  }

  getIsLockedBehindBall() {
    return this.isLockedBehindBall;
  }

  update() {
    if (this.isLockedBehindBall) {
      const offset = new THREE.Vector3(0, 2, 4);
      this.cameraPosition = this.golfBall.getPosition().add(offset);
    }
  }

  toggleCameraMode() {
    if (this.isLockedBehindBall) {
      this.lastLockedPosition.copy(this.camera.position);
      this.controls.enabled = true;
    }
    if (!this.isLockedBehindBall) {
      this.camera.position.copy(this.lastLockedPosition);
      this.controls.enabled = false;
    }
    this.camera.lookAt(this.golfBall.getPosition());
    this.isLockedBehindBall = !this.isLockedBehindBall;
  }

  rotateCamera(movementX) {
    const rotationAngle = movementX / -500;

    const directionVector = new THREE.Vector3();
    directionVector.subVectors(
      this.camera.position,
      this.golfBall.getPosition(),
    );

    const rotatedDirectionVector = new THREE.Vector3();
    rotatedDirectionVector
      .copy(directionVector)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);

    this.camera.position.copy(
      rotatedDirectionVector.add(this.golfBall.getPosition()),
    );

    this.camera.lookAt(this.golfBall.getPosition());
  }

  followGolfBall() {
    // Get direction vector from the golf ball to the hole
    // https://stackoverflow.com/questions/40488945/get-direction-between-two-3d-vectors-using-three-js
    const directionVector = new THREE.Vector3();
    directionVector
      .subVectors(
        this.gameState.getHolePosition(this.gameState.getCurrentHoleIndex()),
        this.golfBall.getPosition(),
      )
      .normalize();

    // Place the camera behind the golf ball in line with the hole, make the camera look at the hole
    // console.log("Direction vector", directionVector);

    const distanceOffset = 5;
    const heightOffset = 2;
    this.cameraPosition.copy(this.golfBall.getPosition());
    this.cameraPosition.addScaledVector(directionVector, -distanceOffset);
    this.cameraPosition.y += heightOffset;

    this.camera.position.lerp(this.cameraPosition, 0.1);
    this.camera.lookAt(
      this.gameState.getHolePosition(this.gameState.getCurrentHoleIndex()),
    );

    // this.camera.position.lerp(this.cameraPosition, 0.1);
    // // this.camera.lookAt(this.golfBall.getPosition());
    // this.camera.lookAt(this.gameState.getHolePosition());
    // // console.log("Position", this.golfBall.getPosition());
  }
}
