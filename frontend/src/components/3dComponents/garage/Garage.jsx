import React, { useEffect, useRef } from 'react';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function Garage() {
  const gltf = useLoader(GLTFLoader, "models/garage/scene.gltf");
  const carRef = useRef();

  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.rotation.y = -Math.PI;
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} ref={carRef} />;
}

export default Garage;
