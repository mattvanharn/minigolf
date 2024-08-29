// cameraControls.js

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CameraControls {
  constructor(camera, container, golfBall) {
    this.camera = camera;
    this.container = container;
    this.golfBall = golfBall;

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

  update() {
    if (this.isLockedBehindBall) {
      const offset = new THREE.Vector3(0, 2, 4);
      this.cameraPosition = this.golfBall.mesh.position.clone().add(offset);
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
    this.camera.lookAt(this.golfBall.mesh.position);
    this.isLockedBehindBall = !this.isLockedBehindBall;
    console.log(this.isLockedBehindBall);
  }

  rotateCamera(movementX) {
    const rotationAngle = movementX / -500;

    const directionVector = new THREE.Vector3();
    directionVector.subVectors(
      this.camera.position,
      this.golfBall.mesh.position,
    );

    const rotatedDirectionVector = new THREE.Vector3();
    rotatedDirectionVector
      .copy(directionVector)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);

    this.camera.position.copy(
      rotatedDirectionVector.add(this.golfBall.mesh.position),
    );

    this.camera.lookAt(this.golfBall.mesh.position);
  }

  followGolfBall() {
    this.camera.position.lerp(this.cameraPosition, 0.1);
    this.camera.lookAt(this.golfBall.mesh.position);
  }
}
