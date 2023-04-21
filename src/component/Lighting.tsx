export const Lighting = ({ BallLightRef }) => {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      {/* <ambientLight intensity={0.01} color={"#FFFFFF"} /> */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.2}
        castShadow
        color={"#FFFFFF"}
      />
      <directionalLight
        position={[-10, 10, 10]}
        intensity={0.2}
        castShadow
        color={"#FFFFFF"}
      />
      <pointLight
        ref={BallLightRef}
        intensity={1}
        decay={3}
        color={"#F4BC4E"}
        distance={6}
      />
    </>
  );
};
