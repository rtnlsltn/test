import React, { Suspense, useRef, useState } from "react";
import { Canvas,  useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF,  useBounds, useEnvironment, Bounds, ContactShadows, Environment, MeshDistortMaterial, MeshRefractionMaterial, MeshTransmissionMaterial, Shadow, Caustics, useAspect} from "@react-three/drei";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant, slideIn } from "../../utils/motion";
import CanvasLoader from "../Loader";

import * as THREE from 'three'

const BlackHole = (props) => {
  const gltf = useGLTF("./jar/scene.gltf");
  const ref = useRef();

  var axis = new THREE.Vector3(0, .6, 0).normalize();
  var axis2 = new THREE.Vector3(0, 0, .3).normalize();
  var speed = 0.01
  var speed2 = 0.009

  gltf.scene.position.z = -1.5
  gltf.scene.rotation.x = 2.4
  gltf.scene.background = null;


  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.getElapsedTime() * .85))
    gltf.scene.rotateOnAxis(axis, speed)
  });

  return (
    <group>
      <primitive object={gltf.scene} scale={0.005} ref={ref}/>
    </group>
  );
};

const Jar = () => {
  const jar = useGLTF("./jar/jar.glb");
  const rgbeTexture = useEnvironment({ files: './jar/jar_env.jpg' })
  //https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/autumn_field_puresky.jpg
  return (
    <group>
      <mesh geometry={jar.nodes.jar.geometry}  position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.065}>
       <MeshTransmissionMaterial backside transparent  envMap={rgbeTexture} thickness={1} transmission={1} roughness={0} clearcoat={0} clearcoatRoughness={0} ior={1.25} anisotropy={.5} envMapIntensity={2} chromaticAberration={.5} color="#ffffff" attenuationTint="#de00ff" attenuationDistance={5} />
      </mesh>
    </group>
  );
};

const GravityJar = () => {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = (1 + Math.sin(state.clock.getElapsedTime() * .85)) / 3

    group.current.position.z = t
    group.current.position.x = THREE.MathUtils.lerp(0, 0, 0)
    group.current.position.y = THREE.MathUtils.lerp(0, 0, 0)
  })

  return (
    <group ref={group}>
      <BlackHole/>
      <Jar />
    </group>
  );
};
const GravityJarCanvas = () => {

  return (
      <Canvas
        frameloop='always'
        dpr={[2, 2]}
        gl={{ preserveDrawingBuffer: true, powerPreference : "high-performance" }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <ambientLight intensity={1.5} />
      <directionalLight
        // castShadow
        intensity={0.2}
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
      />
        <Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <group position={[.7, -1.5, 0]}rotation={[1.5, .55, 1.4]}>
            <GravityJar/>
          </group>
          </Suspense>
        <Preload all />
      </Canvas>

  );
};

export default GravityJarCanvas;
