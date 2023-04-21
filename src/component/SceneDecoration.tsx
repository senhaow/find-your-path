import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSpherePosition } from "./SpherePositionContext";

export const SceneDecorations = () => {
  const { nodes } = useGLTF("./path.glb");
  const baseRefs = useRef([]);
  const spherePositionRef = useSpherePosition();

  const baseNames = [
    "base001",
    "base002",
    "base003",
    "base004",
    "base005",
    "base006",
    "base007",
    "base008",
  ];
  const thresholds = [-1.48, -4.6, -8.4, -10.63, -10.63, -14.3, -100, -11.1];

  useFrame(() => {
    if (spherePositionRef) {
      baseRefs.current.forEach((base, index) => {
        const threshold = thresholds[index]; // Adjust the threshold value according to your requirements
        base.visible = spherePositionRef.current.y > threshold;
      });
    }
  });

  return (
    <>
      {baseNames.map((baseName, index) => {
        if (!nodes[baseName]) {
          return null;
        }

        return (
          <mesh
            key={baseName}
            ref={(el) => (baseRefs.current[index] = el)}
            castShadow
            receiveShadow
            geometry={nodes[baseName].geometry}
            position={[0, -0.01, 0]}
          >
            <meshPhongMaterial color="white" />
          </mesh>
        );
      })}
    </>
  );
};
