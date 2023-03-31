import React, { useEffect } from "react";
import { Mesh, ShaderMaterial } from "three";
import { useThree } from "@react-three/fiber";

const vertexShader = `
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform float uSphereY;
  varying vec3 vWorldPosition;

  void main() {
    float alpha = 1.0;
    if (vWorldPosition.y > uSphereY + 10.0) {
      alpha = 0.0;
    }

    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

const DisappearShader: React.FC<{ sphereY: number }> = ({ sphereY }) => {
  const { scene } = useThree();

  useEffect(() => {
    const material = new ShaderMaterial({
      uniforms: {
        uSphereY: { value: sphereY },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    scene.traverse((object) => {
      if (object instanceof Mesh && object.material) {
        object.material = material;
      }
    });

    return () => {
      scene.traverse((object) => {
        if (object instanceof Mesh && object.material) {
          object.material.dispose();
        }
      });
    };
  }, [sphereY, scene]);

  return null;
};

export default DisappearShader;
