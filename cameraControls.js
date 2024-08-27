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

    // Camera modes
    this.isLockedBehindBall = true;
    this.freeCameraMode = false;
    this.lastLockedPosition = new THREE.Vector3();
    this.lastLockedTarget = new THREE.Vector3();
    this.lockedCameraDistance = 5;
    this.lockedCameraHeight = golfBall.position.y + 1;
  }

  // Camera methods
  toggleCameraMode() {
    this.freeCameraMode = !this.freeCameraMode;
    this.isLockedBehindBall = !this.freeCameraMode;
    if (this.freeCameraMode) {
      this.lastLockedPosition.copy(this.camera.position);
      this.lastLockedTarget.copy(this.controls.target);
      this.controls.enabled = true;
      console.log("Free camera mode enabled");
      console.log("Camera position", this.camera.position);
      console.log("Camera target", this.controls.target);
    } else {
      this.camera.position.copy(this.lastLockedPosition);
      this.camera.lookAt(this.lastLockedTarget);
      this.controls.enabled = false;
      console.log("Locked camera mode enabled");
      console.log("Camera position", this.camera.position);
      console.log("Camera target", this.controls.target);
    }
  }

  update() {
    if (this.isLockedBehindBall) {
      this.positionCameraBehindBall();
    }
  }

  positionCameraBehindBall() {
    const angle = this.golfBall.rotation.y;
    const x =
      this.golfBall.position.x - Math.sin(angle) * this.lockedCameraDistance;
    const z =
      this.golfBall.position.z - Math.cos(angle) * this.lockedCameraDistance;
    const y = this.golfBall.position.y + this.lockedCameraHeight;

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.golfBall.position);
  }

  rotateCamera(targetRotationAngle) {
    // Rotate the camera around the golf ball
  }
}
