// inputHandler.js

import { CameraControls } from "./cameraControls.js";

export class InputHandler {
  constructor(document, golfBall, camera, cameraControls) {
    this.document = document;
    this.golfBall = golfBall;
    this.camera = camera;
    this.cameraControls = cameraControls;

    const keyStates = {};

    document.addEventListener("keydown", (event) => {
      console.log("event.code", event.code);
      keyStates[event.code] = true;
      switch (event.code) {
        case "KeyW":
          console.log("W key pressed");
          golfBall.shotPower += 0.1;
          break;
        case "KeyS":
          golfBall.shotPower -= 0.1;
          break;
        case "Space":
          // Shoot the ball only if the camera is locked and the ball is not moving
          if (golfBall.velocity.x <= 0.001 && golfBall.velocity.z <= 0.001) {
            console.log("Velocity", golfBall.velocity.x, golfBall.velocity.z);
            console.log("Space key pressed");
            golfBall.shoot(camera);
          }
        case "KeyT":
          // Toggle camera mode
          cameraControls.toggleCameraMode();
      }
    });

    document.addEventListener("keyup", (event) => {
      console.log("event.code", event.code);
      keyStates[event.code] = false;
    });

    document.body.addEventListener("mousemove", (event) => {
      if (cameraControls.isLockedBehindBall) {
        const rotationSpeed = 0.01;
        const rotationAngle = -event.movementX * rotationSpeed;
        this.cameraControls.rotateCamera(rotationAngle);
      }
    });
  }

  getForwardVector() {
    camera.getWorldDirection(shotDirection);
    shotDirection.y = 0;
    shotDirection.normalize();

    return shotDirection;
  }

  getSideVector() {
    camera.getWorldDirection(shotDirection);
    shotDirection.y = 0;
    shotDirection.normalize();
    shotDirection.cross(camera.up);

    return shotDirection;
  }
}
