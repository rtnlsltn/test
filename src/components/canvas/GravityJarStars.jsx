import React, { Suspense, useRef, useState } from "react";
import { Canvas,  useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Preload, useGLTF,  useBounds, Bounds, ContactShadows, Environment, MeshDistortMaterial, MeshRefractionMaterial, MeshTransmissionMaterial, Shadow, Caustics, useAspect} from "@react-three/drei";

import CanvasLoader from "../Loader";

import * as THREE from 'three'

import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.2 }));

  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.getElapsedTime() * .07)) / 3
    ref.current.rotation.x = 0 + t;
    ref.current.rotation.y = .9 ;
  });

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

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

    // ref.current.rotation.y = .01 + t;
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
  return (
    <group>
      <mesh geometry={jar.nodes.jar.geometry} transparent position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.065}>
       <MeshTransmissionMaterial backside transparent thickness={2} roughness={0} clearcoat={0} clearcoatRoughness={0} transmission={1} ior={1.25} anisotropy={.5} envMapIntensity={2} chromaticAberration={.5} color="#ffffff" attenuationTint="#ffe79e" attenuationDistance={5} />
      </mesh>
    </group>
  );
};

const GravityJar = () => {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = (1 + Math.sin(state.clock.getElapsedTime() * .85)) / 3

    // group.current.position.y = t / 2
    // // group.current.rotation.y = 1.7
    // group.current.rotation.x = group.current.rotation.y += 0.005
    //
    // group.current.rotation.x = 1.7
    // group.current.rotation.y = -.3

    // group.current.position.y = t / 1
    // group.current.rotation.x = group.current.rotation.z += 0.005
    //
    //good angle
    // group.current.rotation.x = 2
    // group.current.rotation.y = .5

    // group.current.position.x = THREE.MathUtils.lerp(.7, mouse.x / 5, 1)
    // group.current.position.y = THREE.MathUtils.lerp(-8, mouse.y / 5, 1)

    group.current.position.z = t
    // group.current.rotation.y = group.current.rotation.x += 0.005

    // group.current.rotation.x = 2
    // group.current.rotation.y = .5
    //
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
      shadows
      frameloop='always'
      dpr={[2, 2]}
      gl={{ preserveDrawingBuffer: true }}
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
        <group position={[-1.5, 0, 0]}>
          <Stars />
        </group>
        </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default GravityJarCanvas;
