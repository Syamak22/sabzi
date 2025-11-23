'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Orange color palette based on #f26335
    const orangeColors = [
      new THREE.Color(0x000000), // Black
      new THREE.Color(0x8B2500), // Dark orange
      new THREE.Color(0xCC3300), // Medium dark orange
      new THREE.Color(0xf26335), // Main orange (#f26335)
      new THREE.Color(0xFF6347), // Bright orange
    ];

    // Construction-themed objects (replacing particles)
    const constructionObjects: THREE.Mesh[] = [];
    const objectCount = 80;

    for (let i = 0; i < objectCount; i++) {
      let geometry;
      const objectType = Math.floor(Math.random() * 10);

      switch (objectType) {
        case 0: // Bricks (boxes)
          geometry = new THREE.BoxGeometry(1.2, 0.6, 0.9);
          break;
        case 1: // Steel beams (long boxes)
          geometry = new THREE.BoxGeometry(3.0, 0.3, 0.3);
          break;
        case 2: // Pipes (cylinders)
          geometry = new THREE.CylinderGeometry(0.15, 0.15, 1.8, 8);
          break;
        case 3: // Bolts/Screws
          geometry = new THREE.CylinderGeometry(0.24, 0.24, 0.9, 6);
          break;
        case 4: // Wooden planks
          geometry = new THREE.BoxGeometry(2.4, 0.3, 0.45);
          break;
        case 5: // Concrete blocks
          geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
          break;
        case 6: // Nails (thin cylinders)
          geometry = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 6);
          break;
        case 7: // Cones (safety cones)
          geometry = new THREE.ConeGeometry(0.5, 1.2, 8);
          break;
        case 8: // Hexagonal nuts
          geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 6);
          break;
        case 9: // T-beams (combined boxes)
          const tBeam = new THREE.BoxGeometry(0.3, 1.5, 0.3);
          geometry = tBeam;
          break;
        default:
          geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
      }

      const material = new THREE.MeshBasicMaterial({
        color: orangeColors[Math.floor(Math.random() * orangeColors.length)],
        wireframe: false,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50
      );

      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store random rotation speeds
      (mesh.userData as { rotationSpeed: THREE.Vector3 }).rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      );

      constructionObjects.push(mesh);
      scene.add(mesh);
    }

    // Floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
    ];

    const shapes: THREE.Mesh[] = [];
    const shapeCount = 15;

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: orangeColors[Math.floor(Math.random() * (orangeColors.length - 1))],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store random rotation speeds
      (mesh.userData as { rotationSpeed: THREE.Vector3 }).rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );

      shapes.push(mesh);
      scene.add(mesh);
    }

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate construction objects
      constructionObjects.forEach((obj, index) => {
        const speed = obj.userData.rotationSpeed as THREE.Vector3;
        obj.rotation.x += speed.x;
        obj.rotation.y += speed.y;
        obj.rotation.z += speed.z;

        // Floating motion
        obj.position.y += Math.sin(elapsedTime + index * 0.5) * 0.002;
      });

      // Animate geometric shapes
      shapes.forEach((shape, index) => {
        const speed = shape.userData.rotationSpeed as THREE.Vector3;
        shape.rotation.x += speed.x;
        shape.rotation.y += speed.y;
        shape.rotation.z += speed.z;

        // Floating motion
        shape.position.y += Math.sin(elapsedTime + index) * 0.001;
      });

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      // Dispose of Three.js resources
      constructionObjects.forEach(obj => {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      });
      geometries.forEach(geo => geo.dispose());
      shapes.forEach(shape => {
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
