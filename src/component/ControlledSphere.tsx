import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { RigidBody, RapierRigidBody, vec3 } from "@react-three/rapier";

export interface ControlledSphereRef {
  translation: () => { x: number; y: number; z: number };
}

const BALL_SPEED = 4;
const ControlledSphere = forwardRef((props, ref) => {
  const rigidBody = useRef<RapierRigidBody>(null);
  const sphereLocationRef = useRef(null);

  const keys = useRef(new Set<string>());

  const updateSphereVelocity = () => {
    const velocityChange = [0, 0, 0];
    keys.current.forEach((key) => {
      if (key === "w" || key === "W") velocityChange[2] -= BALL_SPEED;
      if (key === "s" || key === "S") velocityChange[2] += BALL_SPEED;
      if (key === "a" || key === "A") velocityChange[0] -= BALL_SPEED;
      if (key === "d" || key === "D") velocityChange[0] += BALL_SPEED;
    });

    if (rigidBody.current) {
      const currentVelocity = vec3(rigidBody.current.linvel());
      rigidBody.current.setLinvel(
        {
          x: velocityChange[0],
          y: currentVelocity.y,
          z: velocityChange[2],
        },
        true
      );
    }
  };

  const animationLoop = () => {
    updateSphereVelocity();
    requestAnimationFrame(animationLoop);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    requestAnimationFrame(animationLoop);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    translation: () =>
      rigidBody.current
        ? vec3(rigidBody.current.translation())
        : { x: 0, y: 0, z: 0 },
  }));

  return (
    <RigidBody
      ref={rigidBody}
      colliders="ball"
      position={[-5.25, 2, 1]}
      linearDamping={0.0}
      angularDamping={0.0}
      friction={0}
    >
      <mesh ref={sphereLocationRef}>
        <sphereBufferGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          emissive="blue"
          emissiveIntensity={1}
          color="blue"
        />
      </mesh>
    </RigidBody>
  );
});

export default ControlledSphere;
