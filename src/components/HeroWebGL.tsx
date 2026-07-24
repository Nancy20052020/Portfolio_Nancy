"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroWebGLProps = {
  className?: string;
  fullBleed?: boolean;
};

export function HeroWebGL({
  className = "hero-webgl",
  fullBleed = false,
}: HeroWebGLProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1018, fullBleed ? 0.038 : 0.07);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, fullBleed ? 1.2 : 0.35, fullBleed ? 7.4 : 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];

    const groundGeo = new THREE.CircleGeometry(20, 72);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x9eb3c9,
      metalness: 0.4,
      roughness: 0.5,
      transparent: true,
      opacity: 0.16,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.4;
    root.add(ground);
    disposables.push(groundGeo, groundMat);

    const iceGroup = new THREE.Group();
    root.add(iceGroup);

    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xd9e8f6,
      metalness: 0.65,
      roughness: 0.18,
      transparent: true,
      opacity: 0.72,
      emissive: 0x6f93b2,
      emissiveIntensity: 0.22,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xb6bac5,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    disposables.push(iceMat, wireMat);

    const crystalDefs = [
      { geo: new THREE.OctahedronGeometry(1.2, 0), pos: [0, 0.15, 0] as const, rot: [0.25, 0.4, 0.1] as const, s: 1 },
      { geo: new THREE.IcosahedronGeometry(0.75, 0), pos: [-1.75, -0.1, 0.5] as const, rot: [0.5, -0.3, 0.2] as const, s: 0.95 },
      { geo: new THREE.DodecahedronGeometry(0.6, 0), pos: [1.7, -0.2, 0.45] as const, rot: [-0.3, 0.55, 0.15] as const, s: 1 },
      { geo: new THREE.OctahedronGeometry(0.5, 0), pos: [0.9, 0.9, -0.75] as const, rot: [0.8, 0.2, -0.35] as const, s: 0.9 },
      { geo: new THREE.BoxGeometry(0.72, 0.72, 0.72), pos: [-1.0, 0.75, -0.5] as const, rot: [0.4, 0.75, 0.2] as const, s: 0.85 },
      { geo: new THREE.TetrahedronGeometry(0.58, 0), pos: [0.15, -0.55, 1.25] as const, rot: [0.25, -0.5, 0.3] as const, s: 1 },
    ];

    const crystals: THREE.Mesh[] = [];
    for (const def of crystalDefs) {
      disposables.push(def.geo);
      const mesh = new THREE.Mesh(def.geo, iceMat);
      mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
      mesh.rotation.set(def.rot[0], def.rot[1], def.rot[2]);
      mesh.scale.setScalar(def.s);
      iceGroup.add(mesh);
      crystals.push(mesh);

      const wire = new THREE.Mesh(def.geo, wireMat);
      wire.position.copy(mesh.position);
      wire.rotation.copy(mesh.rotation);
      wire.scale.copy(mesh.scale).multiplyScalar(1.03);
      iceGroup.add(wire);
    }

    const ringGeo = new THREE.TorusGeometry(2.9, 0.022, 12, 140);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc5d7ea,
      transparent: true,
      opacity: 0.42,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.05;
    ring.position.y = -0.9;
    iceGroup.add(ring);
    disposables.push(ringGeo, ringMat);

    const flakeCount = fullBleed ? 560 : 240;
    const flakeGeo = new THREE.BufferGeometry();
    const flakePos = new Float32Array(flakeCount * 3);
    const flakeVel = new Float32Array(flakeCount);
    for (let i = 0; i < flakeCount; i++) {
      flakePos[i * 3] = (Math.random() - 0.5) * (fullBleed ? 20 : 8);
      flakePos[i * 3 + 1] = Math.random() * (fullBleed ? 11 : 5) - 1.2;
      flakePos[i * 3 + 2] = (Math.random() - 0.5) * (fullBleed ? 16 : 6);
      flakeVel[i] = 0.004 + Math.random() * 0.01;
    }
    flakeGeo.setAttribute("position", new THREE.BufferAttribute(flakePos, 3));
    const flakeMat = new THREE.PointsMaterial({
      color: 0xeaf3ff,
      size: fullBleed ? 0.034 : 0.026,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });
    const flakes = new THREE.Points(flakeGeo, flakeMat);
    root.add(flakes);
    disposables.push(flakeGeo, flakeMat);

    if (fullBleed) {
      const hazeGeo = new THREE.CircleGeometry(7, 48);
      const hazeA = new THREE.Mesh(
        hazeGeo,
        new THREE.MeshBasicMaterial({
          color: 0x8eb0ce,
          transparent: true,
          opacity: 0.09,
          side: THREE.DoubleSide,
        }),
      );
      hazeA.position.set(-4.5, 2.4, -7);
      root.add(hazeA);
      disposables.push(hazeGeo, hazeA.material);

      const hazeGeoB = new THREE.CircleGeometry(5.5, 48);
      const hazeB = new THREE.Mesh(
        hazeGeoB,
        new THREE.MeshBasicMaterial({
          color: 0xb6bac5,
          transparent: true,
          opacity: 0.07,
          side: THREE.DoubleSide,
        }),
      );
      hazeB.position.set(5.2, 1.6, -8);
      root.add(hazeB);
      disposables.push(hazeGeoB, hazeB.material);
    }

    const lightA = new THREE.PointLight(0xdcecff, 2.6, 24);
    lightA.position.set(3.2, 4.2, 4.5);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0x9bb4cc, 1.9, 20);
    lightB.position.set(-4.2, 2.2, 2.4);
    scene.add(lightB);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5));
    scene.add(new THREE.AmbientLight(0xb7c6d6, 0.4));

    let frame = 0;
    let raf = 0;
    const pointer = { x: 0, y: 0 };

    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const animate = () => {
      frame += 0.008;
      iceGroup.rotation.y += 0.002;
      crystals.forEach((c, i) => {
        c.rotation.x += 0.0014 + i * 0.00018;
        c.rotation.y += 0.0018 + i * 0.00012;
        c.position.y += Math.sin(frame * 1.35 + i) * 0.0011;
      });
      ring.rotation.z += 0.0035;

      const positions = flakeGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < flakeCount; i++) {
        positions.array[i * 3 + 1] -= flakeVel[i];
        positions.array[i * 3] += Math.sin(frame + i) * 0.002;
        if ((positions.array[i * 3 + 1] as number) < -2.2) {
          positions.array[i * 3 + 1] = fullBleed ? 8.5 : 4.2;
        }
      }
      positions.needsUpdate = true;
      flakes.rotation.y += 0.00055;

      const camX = pointer.x * (fullBleed ? 0.6 : 0.32);
      const camY = (fullBleed ? 1.2 : 0.35) + -pointer.y * (fullBleed ? 0.28 : 0.12);
      camera.position.x += (camX - camera.position.x) * 0.045;
      camera.position.y += (camY - camera.position.y) * 0.045;
      camera.lookAt(0, fullBleed ? 0.15 : 0, 0);

      iceMat.emissiveIntensity = 0.18 + Math.sin(frame * 1.4) * 0.06;
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
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [fullBleed]);

  return <div ref={mountRef} className={className} aria-hidden />;
}
