import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { OrbitControls, Preload, Text, useGLTF,  useBounds, useEnvironment, Bounds, ContactShadows, Environment, MeshDistortMaterial, MeshRefractionMaterial, MeshTransmissionMaterial, Shadow, Caustics, useAspect} from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from 'three'
import fontBold from '../../../src/fonts/Changa-Bold.woff'
import fontSemiBold from '../../../src/fonts/Changa-SemiBold.woff'
import font from '../../../src/fonts/Changa-Regular.woff'

const Blob = () => {
  const blob = useGLTF("./blob/blob.glb");
  const group = useRef()
  const shadow = useRef()
  var speed = 0.01

  useFrame((state) => {
    if (!group.current) return
    const t = (Math.sin(state.clock.getElapsedTime() * 1.5)) / 3
    group.current.position.y = t / 3
  })

  return (
    <group
      position={[-.5, 0, 0]} scale={1.5}>
        <group ref={group}>
          <mesh geometry={blob.nodes.geo.geometry} castShadow receiveShadow>
            <MeshDistortMaterial color="#9000ff" flatShading roughness={1} metalness={0.5} factor={15} speed={5} />
          </mesh>
          <mesh geometry={blob.nodes.geo.geometry}>
            <meshBasicMaterial wireframe color ="#ffffff"/>
          </mesh>
        </group>
    </group>

  );
};

const BlobText = () => {
  const shadow = useRef()
  const group = useRef()

  return (
    <group ref={group} position={[-.5, -1, 0]} scale={1.7}>
      <group position={[1, 0, 0]}>
        <Text position={[0, 0, 0]} font={fontBold} fontSize={0.13} lineHeight={1} letterSpacing={-0.05}>
          01
        </Text>
        <Text bold position={[.28, -0.15, 0]} font={font} fontSize={0.15} lineHeight={1} letterSpacing={-0.05} color="white">
          {`Your Project`}
        </Text>
      </group>
      <group position={[0, 0, 0]}>
        <Text position={[0, -.7, 0]} font={fontSemiBold} fontSize={0.2} lineHeight={1} letterSpacing={-0.05} color="white">
          {`UNDER CONSTRUCTION`}
        </Text>
      </group>
    </group>
  );
};


const BlobAndText = () => {
  const group = useRef()

  return (
    <group ref={group}>
      <Blob/>
      <BlobText />
    </group>
  );
};

const BlobCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 2]}
      gl={{ powerPreference : "high-performance" }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 10],
      }}
    >
    <pointLight position={[-10, -10, -10]} intensity={1} />
      <ambientLight intensity={0.4} />
      <spotLight
        castShadow
        angle={0.3}
        penumbra={1}
        position={[0, 10, 20]}
        intensity={5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <BlobAndText />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BlobCanvas;
