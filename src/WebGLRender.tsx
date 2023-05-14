import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import headers from "./headers.glsl?raw";
import displacement from "./displacement.glsl?raw";

const WebGLRenderer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Define custom shader material
    const vertexShader = headers;

    const fragmentShader = `
      // Your fragment shader code here
      // ...
      uniform float time;
      uniform float radius;
      uniform float distort;
      uniform float frequency;
      uniform float surfaceDistort;
      uniform float surfaceFrequency;
      uniform float surfaceTime;
      uniform float numberOfWaves;
      uniform float fixNormals;
      uniform float surfacePoleAmount;
      uniform float gooPoleAmount;

      // GLSL code for your f() function and other utility functions
      // ...

      void main() {
        // Calculate displaced position and normal
        vec3 displacedPosition = position + normalize(normal) * f(position);
        vec3 displacedNormal = normalize(normal);

        // Generate new normals if fixNormals is enabled
        if (fixNormals == 1.0) {
          // Calculate displaced tangent and bitangent
          // ...

          displacedNormal = normalize(cross(displacedTangent, displacedBitangent));
        }

        // Final color calculation
        // ...

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        radius: { value: 1 },
        distort: { value: 1 },
        frequency: { value: 1 },
        surfaceDistort: { value: 1 },
        surfaceFrequency: { value: 1 },
        surfaceTime: { value: 0 },
        numberOfWaves: { value: 1 },
        fixNormals: { value: 0 },
        surfacePoleAmount: { value: 1 },
        gooPoleAmount: { value: 1 },
      },
    });

    // Create mesh with custom shader material
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up animation loop
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      material.uniforms.time.value = time * 0.001; // Pass time to the shader
      renderer.render(scene, camera);
    };

    // Start animation loop
    animate(1);
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default WebGLRenderer;
