import * as THREE from "three";

export function createThreeApp(canvas) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = createCamera(
    canvas,
    new THREE.Vector3(30, 15, 0),
    new THREE.Vector3(0, 0, 0)
  );

  renderer.render(scene, camera);
}

function createRenderer(canvas) {
  const canvasSize = new THREE.Vector2(600, 600);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(...canvasSize);
  return renderer;
}

function createCamera(canvas, position, targetPosition) {
  const cameraAspect = canvas.width / canvas.height;
  const camera = new THREE.PerspectiveCamera(65, cameraAspect, 0.1, 1000);
  camera.position.set(...position);
  camera.lookAt(targetPosition);
  return camera;
}
