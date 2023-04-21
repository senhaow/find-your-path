import { createContext, useContext, useRef } from "react";
import { Vector3 } from "three";

const SpherePositionContext = createContext(null);

export const SpherePositionProvider = ({ children }) => {
  const spherePositionRef = useRef(new Vector3());

  return (
    <SpherePositionContext.Provider value={spherePositionRef}>
      {children}
    </SpherePositionContext.Provider>
  );
};

export const useSpherePosition = () => {
  return useContext(SpherePositionContext);
};
