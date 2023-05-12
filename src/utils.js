import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createRenderer(canvas, { enableShadows }) {
  const canvasSize = new THREE.Vector2(600, 600);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(...canvasSize);

  if (enableShadows) {
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
  }

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

export function createGround({ enableShadows }) {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(256),
    new THREE.MeshLambertMaterial({
      color: "#7AA874",
      side: THREE.DoubleSide,
    })
  );
  ground.rotateX(-Math.PI / 2);

  if (enableShadows) {
    ground.receiveShadow = true;
  }

  return ground;
}

export function createTree({ enableShadows }) {
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
      color: "#4F200D",
    })
  );

  top.position.set(0, 3 / 2 + 5, 0);
  base.position.set(0, 3 / 2 + 2, 0);
  trunk.position.set(0, 1, 0);

  const tree = new THREE.Group();
  tree.add(trunk, base, top);
  tree.scale.multiplyScalar(Math.random() / 2 + 0.75);

  if (enableShadows) {
    tree.children.forEach((child) => (child.castShadow = true));
  }

  return tree;
}

export function createCircularForest(
  minDistance,
  maxDistance,
  numberOfTrees,
  enableShadows = false
) {
  const trees = Array.from(Array(numberOfTrees), () => {
    const tree = createTree({
      enableShadows,
    });

    const angle = Math.random() * 2 * Math.PI;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    tree.position.set(
      Math.cos(angle) * distance,
      0,
      Math.sin(angle) * distance
    );

    return tree;
  });

  return trees;
}

export function createCabin({ enableShadows }) {
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

  if (enableShadows) {
    cabin.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }

  return cabin;
}

export function createDirectionalLight({ enableShadows }) {
  const light = new THREE.DirectionalLight("#fff", 0.5);

  if (enableShadows) {
    light.castShadow = true;

    light.shadow.mapSize.width = 1024 * 6;
    light.shadow.mapSize.height = 1024 * 6;

    const lightDistance = 200;
    light.shadow.camera.near = -1 * lightDistance;
    light.shadow.camera.far = 1.5 * lightDistance;
    light.shadow.camera.top = lightDistance;
    light.shadow.camera.bottom = -lightDistance;
    light.shadow.camera.left = -2 * lightDistance;
    light.shadow.camera.right = 2 * lightDistance;
  }

  return light;
}

export function loadGLTFModel(path, callback) {
  const modelLoader = new GLTFLoader();

  modelLoader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      callback(model);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
}

export function importTruckModel({ onModelLoaded = () => {}, enableShadows }) {
  loadGLTFModel("resources/models/suvLuxury.glb", (model) => {
    if (enableShadows) {
      model.traverse((child) => {
        if (child.isMesh) child.castShadow = true;
      });
    }
    onModelLoaded(model);
  });
}
