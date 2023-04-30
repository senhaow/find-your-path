import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxBufferGeometry, MeshBasicMaterial } from "three";

export function DynamicFog({ spherePosition }) {
  const fogRef = useRef(null);

  useFrame(() => {
    if (fogRef.current && spherePosition.current) {
      fogRef.current.position.set(
        spherePosition.current.x,
        spherePosition.current.y - 5,
        spherePosition.current.z
      );
    }
  });

  return (
    <mesh ref={fogRef}>
      <BoxBufferGeometry args={[1000, 5, 1000]} />
      <MeshBasicMaterial color={"#ffffff"} transparent opacity={0.8} />
    </mesh>
  );
}
