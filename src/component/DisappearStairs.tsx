import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSpherePosition } from "./SpherePositionContext";

export const DisappearItems = () => {
  const { nodes } = useGLTF("./path.glb");
  const disappearRefs = useRef([]);
  const spherePositionRef = useSpherePosition();

  const disappearNames = [
    "disappear001",
    "disappear002",
    "disappear003",
    "disappear004",
    "disappear005",
    "disappear006",
    "disappear007",
  ];

  // Define the 3D coordinates of each disappearName object
  const disappearPositions = [
    { x: -1.265, y: -3.068, z: -1.25 },
    { x: -6.39, y: -6.04, z: 0.14 },
    { x: -4.75, y: -10.92, z: -5.07 },
    { x: -6.39, y: -6.04, z: 0.14 },
    { x: 0.86, y: -10.03, z: -0.77 },
    { x: 4.25, y: -13.03, z: -4.85 },
    { x: 4.25, y: -13.03, z: -4.85 },
  ];

  const distanceThreshold = 1;
  const descendingSpeed = 0.02;
  const shakeFactor = 0.1;
  const visibilityDecay = 0.05;

  const disappeared = useRef(
    new Array(disappearNames.length).fill(null).map(() => ({
      visibility: 1,
      shakeFactor: 0,
      descending: false,
      castShadow: true,
    }))
  );
  useFrame(() => {
    if (spherePositionRef) {
      disappearRefs.current.forEach((disappear, index) => {
        const disappearState = disappeared.current[index];
        const disappearPosition = disappearPositions[index];
        const distance =
          spherePositionRef.current.distanceTo(disappearPosition);

        if (!disappearState.descending && distance <= distanceThreshold) {
          disappearState.descending = true;
        }

        if (disappearState.descending) {
          disappearState.visibility -= visibilityDecay;

          disappearState.shakeFactor =
            Math.random() * shakeFactor - shakeFactor / 2;
          disappear.position.y -= descendingSpeed;

          disappear.material.opacity = Math.max(0, disappearState.visibility);
          disappear.material.transparent = true;
          disappear.position.x += disappearState.shakeFactor;
          disappear.position.z += disappearState.shakeFactor;

          // Check if the object's visibility has reached 0
          if (disappearState.visibility <= 0) {
            disappear.visible = false; // Set visible to false
          }
          // Check if the sphere's y-coordinate has passed the y-coordinate of the disappearPositions
        }
        if (spherePositionRef.current.y < disappearPosition.y - 5) {
          disappear.visible = false;
        }
      });
    }
  });

  return (
    <>
      {disappearNames.map((disappearName, index) => {
        if (!nodes[disappearName]) {
          return null;
        }

        return (
          <mesh
            key={disappearName}
            ref={(el) => (disappearRefs.current[index] = el)}
            geometry={nodes[disappearName].geometry}
            position={[0, -0.01, 0]}
          >
            <meshPhongMaterial color="white" transparent />{" "}
            {/* Set transparent to true here */}
          </mesh>
        );
      })}
    </>
  );
};
