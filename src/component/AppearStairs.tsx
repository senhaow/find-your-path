import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSpherePosition } from "./SpherePositionContext";

export const AppearItems = () => {
  const { nodes } = useGLTF("./path.glb");
  const appearRefs = useRef([]);
  const spherePositionRef = useSpherePosition();
  const appearNames = ["appear001", "appear002"];

  const appearPositions = [
    { x: -9.11, y: -44.32, z: -5.76 },
    { x: -6.55, y: -46.87, z: 3.8 },
  ];

  const distanceThreshold = 1;
  const ascendingSpeed = 0.02;
  const visibilityDecay = 0.05;
  const initialYOffset = -1;

  const appeared = useRef(
    new Array(appearNames.length).fill(null).map(() => ({
      visibility: 0,
      ascending: false,
      castShadow: true,
    }))
  );
  useFrame(() => {
    if (spherePositionRef) {
      appearRefs.current.forEach((appear, index) => {
        const appearState = appeared.current[index];
        const appearPosition = appearPositions[index];
        const distance = spherePositionRef.current.distanceTo(appearPosition);

        if (!appearState.ascending && distance <= distanceThreshold) {
          appearState.ascending = true;
          console.log('triggered')
        }

        if (appearState.ascending) {
          appearState.visibility += visibilityDecay;

          if (appear.position.y <= 0) {
            appear.position.y = appear.position.y + ascendingSpeed;
          }

          appear.material.opacity = Math.min(1, appearState.visibility);
          appear.material.transparent = true;

          if (appearState.visibility >= 1) {
            appear.visible = true;
          }
        }
      });
    }
  });

  return (
    <>
      {appearNames.map((appearName, index) => {
        if (!nodes[appearName]) {
          return null;
        }

        return (
          <mesh
            key={appearName}
            ref={(el) => (appearRefs.current[index] = el)}
            geometry={nodes[appearName].geometry}
            position={[0, initialYOffset, 0]}
          >
            <meshPhongMaterial color="white" transparent opacity={0} />
          </mesh>
        );
      })}
    </>
  );
};
