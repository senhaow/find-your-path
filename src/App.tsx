import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { SpherePositionProvider } from "./component/SpherePositionContext";
import Title from "./component/Title";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* <Title /> */}
      <div className="w-full h-full opacity-0 animate-fade-in">
        <Canvas shadows gl={{ localClippingEnabled: true }}>
          <SpherePositionProvider>
            <Scene />
          </SpherePositionProvider>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
