import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
} from "@react-three/postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.8}
        bokehScale={2}
        height={480}
      />
      <Bloom />
      {/* <FloatingParticles /> */}

      <Noise opacity={0.05} />
      {/* <Vignette eskil={false} offset={0.35} darkness={1.2} /> */}
    </EffectComposer>
  );
};
