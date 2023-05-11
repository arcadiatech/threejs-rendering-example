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
