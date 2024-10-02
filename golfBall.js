// golfBall.js
import * as THREE from "three";

// Texture loading
// https://threejs.org/docs/index.html#api/en/loaders/TextureLoader

export class GolfBall {
  constructor(position, radius, gameState) {
    this.position = position;
    this.radius = radius;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.shotPower = 25;
    this.shotDirection = new THREE.Vector3();
    this.isShot = false;
    this.gameState = null;
    this.uiManager = null;
    this.message = null;

    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    this.textureLoader = new THREE.TextureLoader();
    this.texture = this.textureLoader.load("./textures/golfball.jpg");
    this.normalMap = this.textureLoader.load(
      "./textures/Scratched_gold_01_1K_Normal.png",
    );
    this.material = new THREE.MeshStandardMaterial({
      color: "white",
      map: this.texture,
      normalMap: this.normalMap,
      roughness: 0.5,
      metalness: 0.5,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(this.position);

    this.collider = new THREE.Sphere(this.mesh.position, this.radius);
  }

  setUIManager(uiManager) {
    this.uiManager = uiManager;
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }

  getShotPower() {
    return this.shotPower;
  }

  setShotPower(power) {
    this.shotPower = power;
  }

  adjustShotPower(power) {
    this.shotPower += power;
  }

  getIsShot() {
    return this.isShot;
  }

  setIsShot(shot) {
    this.isShot = shot;
  }

  getPosition() {
    return this.mesh.position.clone();
  }

  setPosition(position) {
    this.mesh.position.copy(position);
  }

  getMessage() {
    return this.message;
  }

  resetVelocity() {
    this.velocity.set(0, 0, 0);
  }

  update(deltaTime, worldOctree, GRAVITY) {
    this.collider.center.addScaledVector(this.velocity, deltaTime);

    const result = worldOctree.sphereIntersect(this.collider);

    if (result) {
      this.velocity.addScaledVector(
        result.normal,
        -result.normal.dot(this.velocity) * 1.5,
      );
      this.collider.center.add(result.normal.multiplyScalar(result.depth));
    } else {
      this.velocity.y -= GRAVITY * deltaTime;
    }

    const damping = Math.exp(-1.5 * deltaTime) - 1;
    this.velocity.addScaledVector(this.velocity, damping);

    this.mesh.position.copy(this.collider.center);
  }

  shoot(camera) {
    // Update golf ball status and game state
    console.log("Shot power:", this.shotPower);
    this.isShot = true;
    this.gameState.incrementShotsTaken();

    camera.getWorldDirection(this.shotDirection);

    // Set the Y direction to 0
    this.shotDirection.y = 0;

    this.velocity.copy(this.shotDirection).multiplyScalar(this.shotPower);

    this.shotPower = 25;
  }

  ballMoving() {
    if (this.velocity.x < 0.001 && this.velocity.z < 0.001) {
      return false;
    } else {
      return true;
    }
  }

  // Check if the golf ball is in the hole
  checkHole(holePosition, HOLE_RADIUS) {
    // console.log(holePosition);
    if (this.collider.center.distanceTo(holePosition) < HOLE_RADIUS) {
      if (this.gameState.getShotsTaken() === 1) {
        // console.log("Hole in one!");
        this.message = "Hole in one!";
      } else {
        let strokesBelowPar =
          this.gameState.getShotsTaken() - this.gameState.getHoleParScore();
        switch (strokesBelowPar) {
          case -2:
            // console.log("Eagle!");
            this.message = "Eagle!";
            break;
          case -1:
            // console.log("Birdie!");
            this.message = "Birdie!";
            break;
          case 0:
            // console.log("Par!");
            this.message = "Par!";
            break;
          case 1:
            // console.log("Bogey!");
            this.message = "Bogey!";
            break;
          case 2:
            // console.log("Double Bogey!");
            this.message = "Double Bogey!";
            break;
          case 3:
            // console.log("Triple Bogey!");
            this.message = "Triple Bogey!";
            break;
          default:
            // console.log("Over par!");
            this.message = "Over par!";
            break;
        }
      }

      console.log(this.gameState.getShotsTaken());

      // this.uiManager.updateScore(this.gameState.getShotsTaken());
      // this.uiManager.showAdvanceButton();
      //
      return true;
    } else {
      return false;
    }
  }
}
