import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Mesh, PerspectiveCamera as Cam, Vector3, Light } from "three";
import ControlledSphere, {
  ControlledSphereRef,
} from "./component/ControlledSphere";
import { Boundary } from "./component/Boundary";

import { Physics, vec3 } from "@react-three/rapier";
import { PostProcessing } from "./component/PostProcessing";
import { SceneDecorations } from "./component/SceneDecoration";
import { Lighting } from "./component/Lighting";
import { useSpherePosition } from "./component/SpherePositionContext";
import { DisappearItems } from "./component/DisappearStairs";
import { AppearItems } from "./component/AppearStairs";

export function Scene() {
  const cameraRef = useRef<Cam>(null);
  const characterRef = useRef<ControlledSphereRef>(null);
  const fogRef = useRef<Mesh>(null);
  const targetRef = useRef<Vector3>(new Vector3());
  const BallLightRef = useRef<Light>(null);
  const clippingPlaneRef = useRef(null);

  const spherePositionRef = useSpherePosition();

  const lookAtLerpFactor = 0.03;
  const positionLerpFactor = 0.1;

  useFrame(() => {
    if (!cameraRef.current) return;
    else if (!characterRef.current) {
      cameraRef.current.lookAt(new Vector3(-5, 4, 0));
    } else {
      const v = vec3(characterRef.current.translation());
      spherePositionRef.current.copy(v);
      targetRef.current.lerp(v, lookAtLerpFactor);
      cameraRef.current.lookAt(targetRef.current);

      if (characterRef.current && BallLightRef.current) {
        BallLightRef.current.position.set(v.x, v.y, v.z); // set the position of the light relative to the sphere
      }

      cameraRef.current.position.lerp(
        vec3({ x: v.x - 20, y: v.y + 30, z: v.z + 20 }),
        positionLerpFactor
      );

      if (clippingPlaneRef.current) {
        clippingPlaneRef.current.constant = v.y; // Changed this line
      }

      // if (fogRef.current) {
      //   fogRef.current.position.setY(v.y - 32.3);
      // }
    }
  });

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={10} />
      <Lighting BallLightRef={BallLightRef} />
      <Physics>
        <Boundary />
        <ControlledSphere ref={characterRef} />
      </Physics>
      <SceneDecorations />
      <DisappearItems />
      <AppearItems />
      <OrbitControls />
      <PostProcessing />
    </Suspense>
  );
}
