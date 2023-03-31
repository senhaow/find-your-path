import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { forwardRef, useEffect, useRef } from "react";
import { Mesh } from "three";

const BALL_SPEED = 3;

export const ControlledSphere = forwardRef<Mesh>((_, fwdRef) => {
  const [sphereRef, api] = useSphere(
    () => ({
      mass: 10,
      position: [-5.2, 1.5, 1],
      args: [0.25],
    }),
    fwdRef
  );

  const keys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.key);
      updateSphereVelocity();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key);
      api.angularVelocity.set(0.0, 0.0, 0.0);
      updateSphereVelocity();
    };

    const updateSphereVelocity = () => {
      const velocityChange = [0, 0, 0];
      keys.current.forEach((key) => {
        if (key === "w") velocityChange[2] -= BALL_SPEED;
        if (key === "s") velocityChange[2] += BALL_SPEED;
        if (key === "a") velocityChange[0] -= BALL_SPEED;
        if (key === "d") velocityChange[0] += BALL_SPEED;
      });

      api.velocity.subscribe((currentVelocity) => {
        api.velocity.set(
          velocityChange[0],
          currentVelocity[1],
          velocityChange[2]
        );
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [api]);

  return (
    <group>
      <Sphere ref={sphereRef} castShadow args={[0.25]}>
        <meshStandardMaterial
          color={"#F4BC4E"}
          emissive={"#F4BC4E"}
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  );
});
