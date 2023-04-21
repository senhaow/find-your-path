import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { SpherePositionProvider } from "./component/SpherePositionContext";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Canvas shadows gl={{ localClippingEnabled: true }}>
        <SpherePositionProvider>
          <Scene />
        </SpherePositionProvider>
      </Canvas>
    </div>
  );
};

export default App;
