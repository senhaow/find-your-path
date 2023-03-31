import { Physics } from "@react-three/cannon";
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh, PerspectiveCamera as Cam, Vector3, Light } from "three";
import { ControlledSphere } from "./ControlledSphere";
import { Boundary, Path, SceneDecorations } from "./Path";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
} from "@react-three/postprocessing";
import { FloatingParticles } from "./FloatingParticles";

export function Scene() {
  const v = new Vector3();

  const cameraRef = useRef<Cam>(null);
  const characterRef = useRef<Mesh>(null);
  const fogRef = useRef<Mesh>(null);
  const BallLightRef = useRef<Light>(null);
  const clippingPlaneRef = useRef<Mesh>(null);

  const lerpFactor = 0.1;

  useFrame(() => {
    if (!cameraRef.current) return;
    else if (!characterRef.current) {
      cameraRef.current.lookAt(new Vector3(-5, 4, 0));
    } else {
      characterRef.current.getWorldPosition(v);
      cameraRef.current.lookAt(v);

      if (characterRef.current && BallLightRef.current) {
        characterRef.current.add(BallLightRef.current);
        BallLightRef.current.position.set(0, 0, 0); // set the position of the light relative to the sphere
      }

      v.set(v.x - 20, v.y + 30, v.z + 20);
      cameraRef.current.position.lerp(v, lerpFactor);

      if (fogRef.current) {
        fogRef.current.position.setY(v.y - 32.3);
      }

      // if (clippingPlaneRef.current) {
      //   clippingPlaneRef.current.position.setY(v.y - 32);
      //   console.log(clippingPlaneRef.current.position);
      // }
    }
  });

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={10} />
      <color attach="background" args={["#ffffff"]} />
      {/* <ambientLight intensity={1.0} color={"#FFD0A0"} /> */}
      {/* <directionalLight
        position={[10, 10, 10]}
        intensity={0.6}
        castShadow
        color={"#FFA040"}
      /> */}
      <pointLight
        ref={BallLightRef}
        intensity={0.2}
        color={"#F4BC4E"}
        distance={6}
      />
      
      <Physics defaultContactMaterial={{ friction: 0.0 }}>
        <Path />
        <Boundary />
        <ControlledSphere ref={characterRef} />
      </Physics>
      
      <SceneDecorations clippingPlaneRef={clippingPlaneRef} />
      <Box ref={fogRef} args={[100, 1, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color={"#ffffff"} />
      </Box>
      {/* <Plane
        ref={clippingPlaneRef}
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
      /> */}
      <OrbitControls />
      <EffectComposer>
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.8}
          bokehScale={2}
          height={480}
        />
        <Bloom />
        {/* <FloatingParticles /> */}

        <Noise opacity={0.025} />
        {/* <Vignette eskil={false} offset={0.35} darkness={1.2} /> */}
      </EffectComposer>
    </Suspense>
  );
}
