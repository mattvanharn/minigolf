// courseElements.js

import * as THREE from 'three';
import {
  SUBTRACTION,
  INTERSECTION,
  ADDITION,
  Brush,
  Evaluator,
} from "three-bvh-csg";

// Create the CourseElement parent class
export class CourseElement {
  constructor(geometry, material, position = new THREE.Vector3(), rotation = new THREE.Euler()) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
    this.rotation = rotation;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.copy(this.rotation);
  }

  addToScene(scene, worldOctree) {
    scene.add(this.mesh);
  }

  // Method to apply the CSG operation
  applyCSG(csgOperation, brush) {
    const evaluator = new Evaluator();
    evaluator.useGroups = true;
    let result;
    result = evaluator.evaluate(this.mesh, brush, csgOperation);
    this.mesh.geometry = result.geometry;
  }
}

// Create the Hole class
export class Hole extends CourseElement {
  constructor(radius, depth, segments) {
    const geometry = new THREE.CylinderGeometry(radius, radius, depth, segments);
    const material = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,

      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 1,
    });

    super(geometry, material)
    this.mesh.position.copy(position);
    this.holeBrush = new Brush(this.mesh);
  }
}

// Create the Green class and subtract the hole from it using CSG
export class Green extends CourseElement {
  constructor(position) {
    const geometry = new THREE.BoxGeometry(100, 1, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
    });

    super(geometry, material, position);
    this.mesh.position.copy(position);
    this.greenBrush = new Brush(this.mesh);
  }
}