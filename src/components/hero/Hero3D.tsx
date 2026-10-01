import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      console.warn("WebGL not supported, falling back to CSS background");
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.2, 0.4, 5.8);
    camera.lookAt(0.4, 0, 0);

    // Stage Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a0a0c, 2.5);
    scene.add(ambientLight);

    // Warm stage spotlight (Key amber)
    const keySpot = new THREE.SpotLight(0xf59e0b, 18, 25, Math.PI / 5, 0.4, 1.2);
    keySpot.position.set(4, 5, 4);
    scene.add(keySpot);

    // Cool electric stage backlight (Rim cyan)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 5);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    // Subtle floor bounce
    const floorBounce = new THREE.PointLight(0xffffff, 2, 10);
    floorBounce.position.set(0, -3, 2);
    scene.add(floorBounce);

    // Master Stage Assembly Group
    const stageAssembly = new THREE.Group();
    scene.add(stageAssembly);

    // Materials: Dark brushed metallic & anodized aluminum
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.88,
      roughness: 0.28,
    });

    const brushedAlloy = new THREE.MeshStandardMaterial({
      color: 0x242428,
      metalness: 0.94,
      roughness: 0.18,
    });

    const goldAccent = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.9,
      roughness: 0.3,
    });

    const opticalLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.4,
    });

    // 1. Procedural Heavy Box Truss Frame
    const trussGroup = new THREE.Group();
    const chordGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.8, 16);
    const chordMat = brushedAlloy;

    // 4 Corner Chords
    const chordOffsets = [
      [-0.8, -0.8],
      [0.8, -0.8],
      [0.8, 0.8],
      [-0.8, 0.8],
    ];

    chordOffsets.forEach(([cx, cy]) => {
      const chord = new THREE.Mesh(chordGeo, chordMat);
      chord.position.set(cx, 0, cy);
      trussGroup.add(chord);
    });

    // Cross-bracing diagonals along the truss
    const braceGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
    for (let i = -1.4; i <= 1.4; i += 0.7) {
      const b1 = new THREE.Mesh(braceGeo, chordMat);
      b1.position.set(0, i, -0.8);
      b1.rotation.z = Math.PI / 4;
      trussGroup.add(b1);

      const b2 = new THREE.Mesh(braceGeo, chordMat);
      b2.position.set(0.8, i, 0);
      b2.rotation.x = Math.PI / 4;
      trussGroup.add(b2);

      const b3 = new THREE.Mesh(braceGeo, chordMat);
      b3.position.set(0, i, 0.8);
      b3.rotation.z = -Math.PI / 4;
      trussGroup.add(b3);
    }

    trussGroup.position.set(0.6, 0.2, -0.8);
    trussGroup.rotation.z = 0.15;
    trussGroup.rotation.y = -0.3;
    stageAssembly.add(trussGroup);

    // 2. High-End Moving Head Stage Spotlight
    const fixtureGroup = new THREE.Group();

    // Base chassis
    const baseGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.22, 32);
    const fixtureBase = new THREE.Mesh(baseGeo, darkMetal);
    fixtureGroup.add(fixtureBase);

    // Yoke arms (U-shape bracket)
    const yokeArmGeo = new THREE.BoxGeometry(0.12, 0.9, 0.2);
    const leftArm = new THREE.Mesh(yokeArmGeo, brushedAlloy);
    leftArm.position.set(-0.4, 0.45, 0);
    fixtureGroup.add(leftArm);

    const rightArm = new THREE.Mesh(yokeArmGeo, brushedAlloy);
    rightArm.position.set(0.4, 0.45, 0);
    fixtureGroup.add(rightArm);

    const yokeCross = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 24);
    const yokeCrossMesh = new THREE.Mesh(yokeCross, darkMetal);
    yokeCrossMesh.position.set(0, 0.15, 0);
    fixtureGroup.add(yokeCrossMesh);

    // Spotlight Head / Barrel
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.55, 0);

    const barrelGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.95, 32);
    const barrel = new THREE.Mesh(barrelGeo, darkMetal);
    barrel.rotation.x = Math.PI / 2;
    headGroup.add(barrel);

    // Heat sink cooling rings
    for (let r = -0.25; r <= 0.25; r += 0.12) {
      const ringGeo = new THREE.TorusGeometry(0.39, 0.016, 12, 32);
      const ring = new THREE.Mesh(ringGeo, goldAccent);
      ring.position.set(0, 0, r);
      headGroup.add(ring);
    }

    // Front Optical Lens
    const lensGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.08, 32);
    const lens = new THREE.Mesh(lensGeo, opticalLensMat);
    lens.position.set(0, 0, 0.48);
    lens.rotation.x = Math.PI / 2;
    headGroup.add(lens);

    // Volumetric Light Cone projecting outward
    const coneGeo = new THREE.ConeGeometry(1.6, 6, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(0, 0, 3.48);
    lightCone.rotation.x = -Math.PI / 2;
    headGroup.add(lightCone);

    fixtureGroup.add(headGroup);
    fixtureGroup.position.set(1.4, -0.4, 0.5);
    fixtureGroup.rotation.y = -0.6;
    fixtureGroup.rotation.x = 0.2;
    stageAssembly.add(fixtureGroup);

    // Subtle atmospheric floating dust/motes
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf4f2ed,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse & Scroll Reactive Parameters
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotationY = mouseX * 0.28;
      targetRotationX = mouseY * 0.18;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Subtle ambient mechanical breath
      if (!prefersReduced) {
        fixtureGroup.rotation.y += (targetRotationY - fixtureGroup.rotation.y + Math.sin(elapsed * 0.5) * 0.04) * 0.04;
        fixtureGroup.rotation.x += (targetRotationX - fixtureGroup.rotation.x + Math.cos(elapsed * 0.4) * 0.02) * 0.04;
        headGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.12;

        trussGroup.rotation.y = -0.3 + Math.sin(elapsed * 0.3) * 0.03;
        particles.rotation.y = elapsed * 0.02;
        particles.rotation.x = elapsed * 0.01;
      }

      // Scroll reactive camera shift
      const scrollY = window.scrollY;
      camera.position.z = 5.8 - Math.min(scrollY * 0.003, 1.8);
      camera.position.y = 0.4 - scrollY * 0.001;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-85 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
