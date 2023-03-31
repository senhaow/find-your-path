import React, { useMemo, forwardRef } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import { useConvexPolyhedron } from "@react-three/cannon";
import { Geometry } from "three-stdlib";

function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  geo.mergeVertices();
  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ];
}

export const Path = (props) => {
  const { nodes } = useGLTF("./path.glb");
  const geo = useMemo(() => toConvexProps(nodes.path.geometry), [nodes]);
  const [ref] = useConvexPolyhedron(() => ({
    type: "Static",
    ...props,
    args: geo,
  }));
  return (
    <mesh visible={false} ref={ref} geometry={nodes.path.geometry} {...props}>
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export const Boundary = (props) => {
  const { nodes } = useGLTF("./path.glb");
  const geo2 = useMemo(() => toConvexProps(nodes.boundary.geometry), [nodes]);
  const [ref] = useConvexPolyhedron(() => ({
    type: "Static",
    ...props,
    args: geo2,
  }));

  return (
    <mesh
      ref={ref}
      geometry={nodes.boundary.geometry}
      visible={false}
      {...props}
    >
      <meshStandardMaterial transparent={true} color="white" />
    </mesh>
  );
};

export const SceneDecorations = ({ clippingPlaneRef }) => {
  const { nodes } = useGLTF("./path.glb");

  return (
    <>
      <mesh castShadow receiveShadow geometry={nodes.base.geometry}>
        <meshStandardMaterial
          color="white"
          roughness={0.1}
          clippingPlanes={
            clippingPlaneRef.current ? [clippingPlaneRef.current] : undefined
          }
        />
      </mesh>
      <Sphere></Sphere>
    </>
  );
};

useGLTF.preload("/path.glb");
