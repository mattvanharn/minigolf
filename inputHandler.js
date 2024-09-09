// inputHandler.js

import { CameraControls } from "./cameraControls.js";

export class InputHandler {
  constructor(document, golfBall, camera, cameraControls) {
    this.document = document;
    this.golfBall = golfBall;
    this.camera = camera;
    this.cameraControls = cameraControls;
    this.isMouseDown = false;

    const keyStates = {};

    document.addEventListener("keydown", (event) => {
      console.log("event.code", event.code);
      keyStates[event.code] = true;
      switch (event.code) {
        case "KeyW":
          console.log("W key pressed");
          golfBall.adjustShotPower(0.25);
          break;
        case "KeyS":
          golfBall.adjustShotPower(-0.25);
          break;
        case "Space":
          // Shoot the ball only if the camera is locked and the ball is not moving
          console.log(
            "cameraControls.getIsLockedBehindBall()",
            cameraControls.getIsLockedBehindBall(),
          );
          if (cameraControls.getIsLockedBehindBall()) {
            if (!golfBall.ballMoving()) {
              golfBall.shoot(camera);
            }
          } else {
            console.log("Attempted to shoot in free camera");
          }
          break;
        case "KeyT":
          // Toggle camera mode
          cameraControls.toggleCameraMode();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      console.log("event.code", event.code);
      keyStates[event.code] = false;
    });

    document.addEventListener("mousedown", (event) => {
      this.isMouseDown = true;
    });

    document.addEventListener("mouseup", (event) => {
      this.isMouseDown = false;
    });

    document.body.addEventListener("mousemove", (event) => {
      if (cameraControls.getIsLockedBehindBall() && this.isMouseDown) {
        // Allow the user to only move the camera side to side when locked on the ball
        cameraControls.rotateCamera(event.movementX);
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
