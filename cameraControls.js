// cameraControls.js

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CameraControls {
  constructor(camera, container) {
    this.camera = camera;
    this.container = container;

    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
  }

  update() {
    this.controls.update();
  }
}
