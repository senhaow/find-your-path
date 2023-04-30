import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  ToneMapping,
  ChromaticAberration,
  Vignette,
  GodRays,
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
      <Noise opacity={0.04} />
    </EffectComposer>
  );
};
