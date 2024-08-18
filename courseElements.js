// courseElements.js

import * as THREE from "three";
import {
  SUBTRACTION,
  INTERSECTION,
  ADDITION,
  Brush,
  Evaluator,
} from "three-bvh-csg";

// Create the CourseElement parent class
export class CourseElement {
  constructor(
    geometry,
    material,
    position,
    rotation = new THREE.Euler(0, 0, 0),
  ) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
    this.rotation = rotation;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.copy(this.rotation);
  }

  convertToBrush() {
    let brush = new Brush(this.mesh.geometry, this.mesh.material);
    brush.position.copy(this.mesh.position);
    brush.rotation.copy(this.mesh.rotation);
    brush.updateMatrixWorld();
    return brush;
  }

  applyCSG(holeGeometry) {
    const params = {
      operation: SUBTRACTION,
      useGroups: true,
      wireframe: false,
    };

    let greenBrush = this.convertToBrush();
    let holeBrush = holeGeometry.convertToBrush();
    greenBrush.updateMatrixWorld();
    holeBrush.updateMatrixWorld();

    let evaluator1 = new Evaluator();
    evaluator1.useGroups = params.useGroups;
    let result1;
    result1 = evaluator1.evaluate(
      greenBrush,
      holeBrush,
      params.operation,
      result1,
    );

    return result1;
  }
}

// Create the Green class and subtract the hole from it using CSG
export class Green extends CourseElement {
  constructor(
    geometry,
    position = new THREE.Vector3(),
    rotation = new THREE.Euler(),
    extrudeSettings = null,
  ) {
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 1,
    });

    // If extrude is not null, extrude the geometry
    if (extrudeSettings) {
      const extrudeGeometry = new THREE.ExtrudeGeometry(
        geometry,
        extrudeSettings,
      );

      geometry = extrudeGeometry;
    }

    super(geometry, material, position, rotation);
    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  }
}

// Create the Hole class
export class Hole extends CourseElement {
  constructor(position, rotation = new THREE.Euler()) {
    const geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32);
    const material = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,
      // flatShading: true,
      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 1,
    });

    super(geometry, material, position, rotation);
    this.position = position;
  }
}

// Create the Bumper class
export class Bumper extends CourseElement {
  constructor(
    geometry,
    position,
    rotation = new THREE.Euler(),
    extrudeSettings = null,
  ) {
    const material = new THREE.MeshLambertMaterial({
      color: "red",
      flatShading: true,
      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 1,
    });

    // If extrude is not null, extrude the geometry
    if (extrudeSettings) {
      const extrudeGeometry = new THREE.ExtrudeGeometry(
        geometry,
        extrudeSettings,
      );

      geometry = extrudeGeometry;
    }

    super(geometry, material, position, rotation);
    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  }
}

export function addToScene(object, scene, worldOctree) {
  object.mesh.recieveShadow = true;
  object.mesh.castShadow = true;
  scene.add(object.mesh);
  worldOctree.fromGraphNode(object.mesh);
}

export function addBrushToScene(brush, scene, worldOctree) {
  brush.recieveShadow = true;
  brush.castShadow = true;
  scene.add(brush);
  worldOctree.fromGraphNode(brush);
}
