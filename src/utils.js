import * as THREE from "three";

export function createRenderer(canvas) {
  const canvasSize = new THREE.Vector2(600, 600);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(...canvasSize);
  return renderer;
}

export function createCamera(canvas, position, targetPosition) {
  const cameraAspect = canvas.width / canvas.height;
  const camera = new THREE.PerspectiveCamera(65, cameraAspect, 0.1, 1000);
  camera.position.set(...position);
  camera.lookAt(targetPosition);
  return camera;
}

export function createBasicMesh() {
  const geometry = new THREE.BoxGeometry(3, 2, 5);
  const material = new THREE.MeshLambertMaterial({
    color: "#f00",
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export function createGround() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(512, 512),
    new THREE.MeshLambertMaterial({
      color: "#0f0",
      side: THREE.DoubleSide,
    })
  );
  ground.rotateX(-Math.PI / 2);
  return ground;
}

export function createTree() {
  const greenMaterial = new THREE.MeshLambertMaterial({
    color: "#285430",
  });

  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 1.6, 3),
    greenMaterial
  );

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 2.7, 4),
    greenMaterial
  );

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 2),
    new THREE.MeshLambertMaterial({
      color: "#371B58",
    })
  );

  top.position.set(0, 3 / 2 + 5, 0);
  base.position.set(0, 3 / 2 + 2, 0);
  trunk.position.set(0, 1, 0);

  const tree = new THREE.Group();
  tree.add(trunk, base, top);
  tree.scale.multiplyScalar(Math.random() / 2 + 0.75);
  return tree;
}

export function createCabin() {
  const cabin = new THREE.Group();

  const wallMaterial = new THREE.MeshLambertMaterial({
    color: "#2C3333",
  });

  const box = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 5), wallMaterial);

  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 6, 0.5),
    wallMaterial
  );

  const roofRadius = 2;
  const roof = new THREE.Mesh(
    new THREE.CylinderGeometry(roofRadius, roofRadius, 5.4, 3),
    new THREE.MeshLambertMaterial({
      color: "#FC4F00",
    })
  );

  box.position.set(0, 1, 0);
  chimney.position.set(0, 3, 2);
  roof.rotateZ(Math.PI);
  roof.rotateX(Math.PI / 2);
  roof.position.set(0, 2 + roofRadius / 2, 0); // this is generally not a correct formula for cylinders, unless it's a 3 sided cylinder

  cabin.add(box, roof, chimney);
  return cabin;
}
