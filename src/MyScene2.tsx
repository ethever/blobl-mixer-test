import { MutableRefObject, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import MagicalMaterial from "./NewMagicalMaterial";
import { Box } from "@react-three/drei";
import { Sphere } from "@react-three/drei";

const MyThreeScene2 = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[2, 32, 32]}>
        <mesh rotation={[0, 0.01, 0]}>
          <MagicalMaterial distort={1} radius={1} frequency={2} speed={1} />
        </mesh>
      </Sphere>
    </Canvas>
  );
};

export default MyThreeScene2;
