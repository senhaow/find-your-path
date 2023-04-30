import { useSpherePosition } from "./SpherePositionContext";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import { Color } from "three";

export const Lighting = ({ isOpeningScene }) => {
  const spherePositionRef = useSpherePosition();
  const pointLightRef = useRef(null);

  const topBackgroudColor = useMemo(() => new Color("#2b2a4d"), []);
  const bottomBackgroudColor = useMemo(() => new Color("#fffced"), []);

  const topD1LightColor = useMemo(() => new Color("#375480"), []);
  const bottomD1LightColor = useMemo(() => new Color("#000000"), []);

  const topD2LightColor = useMemo(() => new Color("#6c95ae"), []);
  const bottomD2LightColor = useMemo(() => new Color("#000000"), []);

  const topPointColor = useMemo(() => new Color("#FFDF8E"), []);
  const bottomPointColor = useMemo(() => new Color("#FFFFFF"), []);

  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [D1LightColor, setD1LightColor] = useState(topD1LightColor);
  const [D2LightColor, setD2LightColor] = useState(topD2LightColor);
  const [D1LightIntensity, setD1LightIntensity] = useState(0.2);
  const [D2LightIntensity, setD2LightIntensity] = useState(0.3);
  const { scene } = useThree();

  useFrame(() => {
    if (pointLightRef.current) {
      pointLightRef.current.position.copy(spherePositionRef.current);
    }
    console.log(spherePositionRef);
    const t = Math.min(
      Math.max((spherePositionRef.current.y - -20) / 20, 0),
      1
    );
    const newColor = topBackgroudColor.clone().lerp(bottomBackgroudColor, t);
    setBackgroundColor(newColor.getStyle());
    const d1LightT = Math.min(
      Math.max((spherePositionRef.current.y - -20) / 20, 0),
      1
    );
    const newD1LightColor = topD1LightColor
      .clone()
      .lerp(bottomD1LightColor, d1LightT);
    setD1LightColor(newD1LightColor);
    scene.children[2].color = newD1LightColor;
    setD1LightIntensity(0.2 + d1LightT * 0.8);

    const d2LightT = Math.min(
      Math.max((spherePositionRef.current.y - -20) / 20, 0),
      1
    );
    const newD2LightColor = topD2LightColor
      .clone()
      .lerp(bottomD2LightColor, d2LightT);
    setD2LightColor(newD2LightColor);
    scene.children[3].color = newD2LightColor;
    setD2LightIntensity(0.3 + d2LightT * 0.7);
  });
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      {isOpeningScene ? (
        <>{/* Add your opening scene lighting setup here */}</>
      ) : (
        <>
          {/* Main scene lighting setup */}
          <pointLight
            ref={pointLightRef}
            intensity={1}
            decay={3}
            color={topPointColor}
            distance={6}
          />

          <directionalLight
            position={[10, 10, 10]}
            intensity={D1LightIntensity}
            castShadow
            color={D1LightColor}
          />
          <directionalLight
            position={[-10, 10, 10]}
            intensity={D1LightIntensity}
            castShadow
            color={D2LightColor}
          />
        </>
      )}
    </>
  );
};
