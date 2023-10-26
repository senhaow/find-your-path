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
import { SplashScreen } from "./component/SplashScreen";
import { DynamicFog } from "./component/DynamicFog";
import FresnelSphere, {
  GlowingWireframeSphere,
} from "./component/FresnelSphere";

export function Scene() {
  const [openingSequenceComplete, setOpeningSequenceComplete] = useState(false);

  const cameraRef = useRef<Cam>(null);
  const characterRef = useRef<ControlledSphereRef>(null);
  const fogRef = useRef<Mesh>(null);
  const openingCameraRef = useRef<Cam>(null);
  const targetRef = useRef<Vector3>(new Vector3());
  const BallLightRef = useRef<Light>(null);
  const clippingPlaneRef = useRef(null);

  const spherePositionRef = useSpherePosition();

  const lookAtLerpFactor = 0.03;
  const positionLerpFactor = 0.1;

  useFrame(() => {
    if (!cameraRef.current) return;
    else if (!characterRef.current) {
      cameraRef.current.lookAt(new Vector3(-5, 0, 0));
    } else {
      const v = vec3(characterRef.current.translation());
      spherePositionRef.current.copy(v);
      targetRef.current.lerp(v, lookAtLerpFactor);
      cameraRef.current.lookAt(targetRef.current);

      if (characterRef.current && BallLightRef.current) {
        BallLightRef.current.position.set(v.x, v.y, v.z);
      }

      cameraRef.current.position.lerp(
        vec3({ x: v.x - 20, y: v.y + 30, z: v.z + 20 }),
        positionLerpFactor
      );

      if (clippingPlaneRef.current) {
        clippingPlaneRef.current.constant = v.y;
      }
    }
  });

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={openingSequenceComplete}
        fov={10}
        position={[-25.25, 30.94, 21]} // Add this
      />
      <PerspectiveCamera
        ref={openingCameraRef}
        makeDefault={!openingSequenceComplete}
        fov={10}
      />
      <Lighting isOpeningScene={!openingSequenceComplete} />
      <SplashScreen
        imageURL="/splash.png"
        isOpeningScene={!openingSequenceComplete}
        openingCameraRef={openingCameraRef}
        setIsOpening={setOpeningSequenceComplete}
      />
      <PostProcessing />
      {openingSequenceComplete && (
        <>
          <GlowingWireframeSphere />

          <Physics>
            <Boundary />
            <ControlledSphere ref={characterRef} />
          </Physics>
          <SceneDecorations />
          <DisappearItems />
          <AppearItems />
        </>
      )}
    </Suspense>
  );
}
