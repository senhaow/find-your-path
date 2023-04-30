import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const SplashScreen = ({
  openingCameraRef,
  isOpeningScene,
  setIsOpening,
}) => {
  const gltfUrl = "./path.glb";
  const characterNames = useMemo(
    () => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"],
    []
  );

  const { nodes } = useGLTF(gltfUrl);
  const groupRef = useRef<Group>();

  const [initialCameraPosition] = useState(() => new THREE.Vector3());

  useEffect(() => {
    if (isOpeningScene && openingCameraRef.current && groupRef.current) {
      const { x, y, z } = groupRef.current.position;
      initialCameraPosition.set(x, y + 12, z + 16);
      openingCameraRef.current.position.copy(initialCameraPosition);
      openingCameraRef.current.lookAt(groupRef.current.position);
    }
  }, [isOpeningScene, openingCameraRef, initialCameraPosition]);

  useFrame(({ clock }) => {
    if (isOpeningScene && openingCameraRef.current) {
      openingCameraRef.current.lookAt(groupRef.current.position);

      if (clock.elapsedTime >= 5 && clock.elapsedTime <= 10) {
        const targetPosition = new THREE.Vector3(-25.25, 30.94, 21);
        const progress = (clock.elapsedTime - 5) / 3;
        openingCameraRef.current.position.lerpVectors(
          initialCameraPosition,
          targetPosition,
          progress
        );
      }

      if (clock.elapsedTime > 8) {
        setIsOpening(true);
      }
    }
  });

  return (
    <group ref={groupRef} position={[-5, 0, 0]} visible={isOpeningScene}>
      {characterNames.map((name, index) => {
        const geometry = nodes[name].geometry;
        return (
          <mesh key={index} geometry={geometry}>
            <MeshTransmissionMaterial
              background={new THREE.Color("#ffffff")}
              transmission={1}
            />
          </mesh>
        );
      })}
    </group>
  );
};
