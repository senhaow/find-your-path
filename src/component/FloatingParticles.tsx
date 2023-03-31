import { PointMaterial, useFrame } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { BufferGeometry, Points, Vector3 } from "three";

const particleCount = 200;
const particleSpeed = 0.01;

export function FloatingParticles() {
  const positions = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    return posArray;
  }, []);

  const particlesRef = useRef<BufferGeometry>();
  const particleDeltas = useMemo(() => {
    const deltas = new Array(particleCount).fill(null).map(() => ({
      x: (Math.random() - 0.5) * particleSpeed,
      y: (Math.random() - 0.5) * particleSpeed,
      z: (Math.random() - 0.5) * particleSpeed,
    }));

    return deltas;
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      pos.setZ(i, pos.getZ(i) + particleDeltas[i].z);

      if (pos.getZ(i) > 50) {
        pos.setZ(i, -50);
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <Points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={15}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </Points>
  );
}
