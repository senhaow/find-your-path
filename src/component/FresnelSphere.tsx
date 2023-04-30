import { Sphere } from "@react-three/drei";

export const GlowingWireframeSphere = () => {
  return (
    <>
      <Sphere position={[-3.1998, -22.5, 1.3991]} args={[2.7]}>
        <meshToonMaterial emissiveIntensity={0.2} emissive={"#A7BED3"} />
      </Sphere>
      <Sphere position={[-9, -22.5, 10]} args={[1.7]}>
        <meshToonMaterial emissiveIntensity={0.2} emissive={"#F1FFC4"} />
      </Sphere>
      <Sphere position={[-13, -18, 2]} args={[1.7]}>
        <meshToonMaterial emissiveIntensity={0.5} emissive={"#DAB894"} />
      </Sphere>
    </>
  );
};
