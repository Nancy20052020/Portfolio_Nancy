"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroWebGL() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const width = mount.clientWidth || 420;
    const height = mount.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.28, 180, 28);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.35,
      metalness: 0.75,
      roughness: 0.25,
      wireframe: false,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const wireGeo = new THREE.TorusKnotGeometry(1.15, 0.02, 120, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf9a8d4,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    const ringGeo = new THREE.TorusGeometry(1.55, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.55,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const particlesGeo = new THREE.BufferGeometry();
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({
        color: 0xa5f3fc,
        size: 0.025,
        transparent: true,
        opacity: 0.85,
      }),
    );
    group.add(particles);

    const lightA = new THREE.PointLight(0x22d3ee, 2.2, 12);
    lightA.position.set(2, 2, 3);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0xa78bfa, 1.8, 12);
    lightB.position.set(-2, -1, 2);
    scene.add(lightB);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    let frame = 0;
    let raf = 0;
    const pointer = { x: 0, y: 0 };

    const onPointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", onPointer);

    const animate = () => {
      frame += 0.008;
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.007;
      wire.rotation.x -= 0.003;
      wire.rotation.z += 0.005;
      ring.rotation.z += 0.01;
      particles.rotation.y += 0.002;
      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.05;
      group.rotation.x += (-pointer.y * 0.25 - group.rotation.x) * 0.05;
      knotMat.emissiveIntensity = 0.3 + Math.sin(frame * 2) * 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointermove", onPointer);
      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-webgl" aria-hidden />;
}
