import { Button, Container } from "@mui/joy";
import Blob from "./Blob";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import useQueryState from "./useQueryState";
import { Controls, withControls } from "react-three-gui";
import { Canvas, useLoader, Vector3 } from "@react-three/fiber";

const iconPosition = [0, 1.6, 0];

import { OrbitControls, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import g0 from "./assets/media/02.png";
import g1 from "./assets/media/03.png";
import g2 from "./assets/media/04.png";
import g3 from "./assets/media/05.png";
import g4 from "./assets/media/06.png";
import g5 from "./assets/media/07.png";
import g6 from "./assets/media/08.png";
import g7 from "./assets/media/09.png";
import g10 from "./assets/media/10.png";

import env from "./assets/envmap-2048.min.jpg";
import MagicalMaterial from "./MagicalMaterial";
import { a, useSpring } from "@react-spring/three";

const AnimatedMagicalMaterial = a(MagicalMaterial);

const MScene = () => {
  const [transmission, setTransmission] = useState(0);
  const [reflectivity, setReflectivity] = useState(1);
  const [roughness, setRoughness] = useState(0.36);
  const [metalness, setMetalness] = useState(1);
  const [clearcoat, setClearcoat] = useState(1);
  const [clearcoatRoughness, setClearcoatRoughness] = useState(1);

  const [radius, setRadius] = useState(1);
  const [distort, setDistort] = useState(0.6);
  const [frequency, setFrequency] = useState(3.05);
  const [speed, setSpeed] = useState(0.1); // useState(1.62);

  const [surfaceDistort, setSurfaceDistort] = useState(1.4);
  const [surfaceFrequency, setSurfaceFrequency] = useState(1.74);
  const [surfaceTime, setSurfaceTime] = useState(0.32);
  const [surfaceSpeed, setSurfaceSpeed] = useState(0.2);
  const [numberOfWaves, setNumberOfWaves] = useState(12.07);
  const [fixNormals, setFixNormals] = useState(true);
  const [surfacePoleAmount, setSurfacePoleAmount] = useState(1);
  const [gooPoleAmount, setGooPoleAmount] = useState(0);

  useControl("metalness", {
    type: "number",
    state: [metalness, setMetalness],
    spring: true,
    group: "State",
  });
  useControl("radius", {
    type: "number",
    state: [radius, setRadius],
    spring: true,
    group: "State",
  });
  useControl("distort", {
    type: "number",
    state: [distort, setDistort],
    spring: true,
    group: "State",
    min: 0,
    max: 100,
  });

  const ref = useRef();
  const [
    g0Map,
    g1Map,
    envMap,
    g2Map,
    g3Map,
    g4Map,
    g5Map,
    g6Map,
    g7Map,
    g10Map,
  ] = useLoader(TextureLoader, [g0, g1, env, g2, g3, g4, g5, g6, g7, g10]);
  const center = [0, 1.6, 0];

  const lightSpring0 = useSpring({
    angle: 0.42,
    intensity: 1.27,
    color: "rgba(0,255,248,1)",
    distance: 8.27 * 0.1,
    decay: 1,
    penumbra: 0.66,
    position: [
      center[0] + -5 * 0.1,
      center[1] + 0.07 * 0.1,
      center[2] + 1.93 * 0.1,
    ] as any,
    config: { tension: 100, friction: 20 },
  });
  const lightSpring1 = useSpring({
    angle: 0.52,
    intensity: 3,
    color: "rgba(120,0,255,1)",
    distance: 9.53 * 0.1,
    decay: 0.5,
    penumbra: 1,
    position: [
      center[0] + -2.73 * 0.1,
      center[1] + -6.67 * 0.1,
      center[2] + 5.73 * 0.1,
    ] as any,
    config: { tension: 100, friction: 20 },
  });
  return (
    <>
      {/* <ambientLight intensity={0.2} color="white" /> */}
      <directionalLight intensity={0.3} castShadow={true} />
      <a.spotLight
        castShadow={false}
        shadow-bias={false}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-near={0.5}
        shadow-focus={1}
        {...lightSpring0}
      />
      <a.spotLight {...lightSpring1} />

      <mesh castShadow frustumCulled={false}>
        <sphereBufferGeometry args={[1, 512, 512]} />
        {/* <meshPhysicalMaterial
          transparent={false}
          map={colorMap}
          displacementMap={colorMap}
          envMap={envMap}
          flatShading={true}
        /> */}
        <MagicalMaterial
          transmission={transmission}
          reflectivity={reflectivity}
          roughness={roughness}
          clearcoatRoughness={clearcoatRoughness}
          metalness={metalness}
          clearcoat={clearcoat}
          flatShading={false}
          wireframe={false}
          transparent={false}
          ref={ref}
          // displacementMap={g1Map}
          map={g4Map}
          envMap={g0Map}
          radius={radius}
          distort={distort}
          frequency={frequency}
          speed={speed}
          surfaceDistort={surfaceDistort}
          surfaceFrequency={surfaceFrequency}
          surfaceTime={surfaceTime}
          surfaceSpeed={surfaceSpeed}
          numberOfWaves={numberOfWaves}
          fixNormals={fixNormals}
          surfacePoleAmount={surfacePoleAmount}
          gooPoleAmount={gooPoleAmount}
        />
      </mesh>
    </>
  );
};
import { useControl } from "react-three-gui";

const App = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100%",
        display: "flex",
        background: "#303030",
      }}
    >
      <Canvas>
        <Suspense fallback="loading">
          <MScene />
          <OrbitControls zoom0={2} maxZoom={2} autoRotate enableZoom={true} />
        </Suspense>
      </Canvas>
    </Container>
  );
};

export default App;
