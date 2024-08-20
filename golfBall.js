// golfBall.js
import * as THREE from "three";

export class GolfBall {
  constructor(position, radius) {
    this.position = position;
    this.radius = radius;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.shotPower = 1;
    this.shotDirection = new THREE.Vector3();

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
    camera.getWorldDirection(this.shotDirection);

    this.velocity.copy(this.shotDirection).multiplyScalar(this.shotPower);
  }
}
