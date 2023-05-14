import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// const MyThreeScene = () => {
//   const sceneRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     // Set up the scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     sceneRef.current.appendChild(renderer.domElement);

//     // Create geometry and materials
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Position the camera
//     camera.position.z = 5;

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate the cube
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       // Render the scene with the camera
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Clean up on component unmount
//     return () => {
//       if (!sceneRef.current) return;
//       sceneRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={sceneRef} />;
// };

// export default MyThreeScene;

// const MyThreeScene = () => {
//   const sceneRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sceneRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     sceneRef.current.appendChild(renderer.domElement);

//     // Create geometries
//     const cubeGeometry = new THREE.BoxGeometry();
//     const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
//     const coneGeometry = new THREE.ConeGeometry(1, 3, 32);

//     // Create materials
//     const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red color
//     const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Green color
//     const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blue color

//     // Create mesh objects with geometries and materials
//     const cube = new THREE.Mesh(cubeGeometry, lambertMaterial);
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     const cone = new THREE.Mesh(coneGeometry, coneMaterial);

//     // Position the objects
//     cube.position.set(-2, 0, 0);
//     sphere.position.set(0, 0, 0);
//     cone.position.set(2, 0, 0);

//     // Add objects to the scene
//     scene.add(cube);
//     scene.add(sphere);
//     scene.add(cone);

//     // Position the camera
//     camera.position.z = 5;

//     // Add ambient light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     // Add directional light
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(directionalLight);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       sphere.rotation.x += 0.01;
//       sphere.rotation.y += 0.01;

//       cone.rotation.x += 0.01;
//       cone.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       if (sceneRef.current) {
//         sceneRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return <div ref={sceneRef} />;
// };

const MyThreeScene = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Create geometries
    const cubeGeometry = new THREE.BoxGeometry();
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coneGeometry = new THREE.ConeGeometry(1, 3, 32);

    // Create materials
    const lambertMaterial = new THREE.MeshLambertMaterial({ color: "white" }); // Red color
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
    const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Blue color

    // Create mesh objects with geometries and materials
    const cube = new THREE.Mesh(cubeGeometry, phongMaterial);
    const sphere = new THREE.Mesh(sphereGeometry, phongMaterial);
    const cone = new THREE.Mesh(coneGeometry, phongMaterial);

    // Position the objects
    cube.position.set(-2, 0, 0);
    sphere.position.set(0, 0, 0);
    cone.position.set(2, 0, 0);

    // Add objects to the scene
    scene.add(cube);
    scene.add(sphere);
    scene.add(cone);

    // Position the camera
    camera.position.z = 5;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default MyThreeScene;
