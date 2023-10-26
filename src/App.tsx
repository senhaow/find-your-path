import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { SpherePositionProvider } from "./component/SpherePositionContext";
import React, { FC, useEffect, useRef, useState } from "react";
import SoundControl from "./component/SoundControl";

const App: FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {!hasStarted ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={() => { setHasStarted(true); }}
            className="px-8 py-4 border-2 border-gray-300 text-gray-400 bg-transparent text-lg font-semibold rounded hover:border-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
          >
            Start Experience
          </button>
        </div>
      ) : (
        <div className="w-full h-full">
          <Canvas shadows gl={{ localClippingEnabled: true }}>
            <SpherePositionProvider>
              <Scene />
            </SpherePositionProvider>
          </Canvas>
          <SoundControl hasStarted={hasStarted} />
        </div>
      )}
    </div>
  );
};

export default App;
