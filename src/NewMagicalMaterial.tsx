import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";

import headers from "./headers.glsl?raw";
import displacement from "./displacement.glsl?raw";

type MagicalMaterialProps = {
  distort: number;
  radius: number;
  frequency: number;
  speed: number;
};

const MagicalMaterial: React.FC<MagicalMaterialProps> = ({
  distort,
  radius,
  frequency,
  speed,
}) => {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (materialRef.current) {
      const material = materialRef.current;

      material.uniforms.distort.value = distort;
      material.uniforms.radius.value = radius;
      material.uniforms.frequency.value = frequency;
      material.uniforms.speed.value = speed;
      material.uniforms.time.value = time;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          distort: { value: distort },
          radius: { value: radius },
          frequency: { value: frequency },
          speed: { value: speed },
          time: { value: 0 },
        }}
        vertexShader={`
          ${headers}
          ${displacement}

          void main() {
            vec3 displacedPosition = position + normalize(position) * distort;
            vec3 transformed = displacedPosition;

            vec3 transformedNormal = displacedNormal;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform float radius;
          uniform float frequency;
          uniform float speed;

          void main() {
            // Procedurally generate the color based on time and position
            vec2 uv = vec2(
              (sin(time * frequency + gl_FragCoord.x / radius) + 1.0) * 0.5,
              (cos(time * frequency + gl_FragCoord.y / radius) + 1.0) * 0.5
            );

            gl_FragColor = vec4(uv, 0.0, 1.0);
          }
        `}
      />
    </mesh>
  );
};

export default MagicalMaterial;
