// inputHandler.js

const keyStates = {};

export class InputHandler {
  constructor(document) {
    document.addEventListener("keydown", (event) => {
      console.log("event.key", event.key);
      keyStates[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
      console.log("event.key", event.key);
      keyStates[event.key] = false;
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

  updateShot(shotPower, shotDirection) {
    if (keyStates["KeyW"]) {
      if (shotPower < 10) {
        console.log("shotPower", shotPower);
        shotPower += 0.1;
      }
    }

    if (keyStates["KeyS"]) {
      if (shotPower > 0.1) {
        console.log("shotPower", shotPower);
        shotPower -= 0.1;
      }
    }

    if (keyStates["KeyA"]) {
      console.log("shotDirection", shotDirection);
      shotDirection.x -= 0.1;
    }

    if (keyStates["KeyD"]) {
      console.log("shotDirection", shotDirection);
      shotDirection.x += 0.1;
    }

    return shotPower, shotDirection;
  }
}
