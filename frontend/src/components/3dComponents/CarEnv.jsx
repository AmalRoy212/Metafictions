import React, {Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./CarEnv.css"
import Car from "./car/Car";
import Garage from "./garage/Garage";
import Signup from "../users/signup/SingUp";


function Enviroment() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} maxDistance={3} maxZoom={2} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <ambientLight intensity={3} />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={0.0001}
      />

      {/* <directionalLight color={0xffddff} intensity={1} position={[0, 1, 0]} /> */}

      <Car />
      <Garage />
    </>
  );
}

function CarEnv() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Enviroment />
      </Canvas>
    </Suspense>
  );
}

export default CarEnv;
