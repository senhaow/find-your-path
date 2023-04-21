import { useGLTF } from "@react-three/drei";
import { MeshCollider, RigidBody } from "@react-three/rapier";

export const Boundary = (props) => {
  const { nodes } = useGLTF("./path.glb");

  return (
    <RigidBody
      type="fixed"
      includeInvisible
      linearDamping={0.0}
      angularDamping={0.0}
      friction={0}
    >
      <MeshCollider type="trimesh">
        <mesh geometry={nodes.boundary.geometry} visible={false} />
      </MeshCollider>
    </RigidBody>
  );
};

useGLTF.preload("/path.glb");
