import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { asset3DRegistry } from "../../data/assets";

interface Hero3DProps {
  onProgress?: (percent: number) => void;
  onLoaded?: () => void;
}

export function Hero3D({ onProgress, onLoaded }: Hero3DProps) {
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
      console.warn("WebGL not supported, falling back to cinematic canvas");
      onLoaded?.();
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Perspective Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(2.4, 0.3, 5.2);
    camera.lookAt(0.6, 0.1, 0);

    // Stage Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a0a0e, 1.8);
    scene.add(ambientLight);

    // Key Amber Stage Spotlight
    const keySpot = new THREE.SpotLight(0xf59e0b, 12, 30, Math.PI / 4.5, 0.45, 1.2);
    keySpot.position.set(3.5, 4.5, 3.5);
    scene.add(keySpot);

    // Cool Electric Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
    rimLight.position.set(-4.5, 2.5, -2.5);
    scene.add(rimLight);

    // Stage Floor Warm Bounce
    const floorBounce = new THREE.PointLight(0xffedd5, 1.8, 8);
    floorBounce.position.set(0.5, -2.5, 1.5);
    scene.add(floorBounce);

    // Main Asset Model Group
    const assetGroup = new THREE.Group();
    scene.add(assetGroup);

    // Volumetric Stage Beam Cone attached to lighting fixture
    const coneGeo = new THREE.ConeGeometry(1.8, 7.5, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const volumetricBeam = new THREE.Mesh(coneGeo, coneMat);
    volumetricBeam.position.set(0, 0, 3.8);
    volumetricBeam.rotation.x = -Math.PI / 2;
    volumetricBeam.visible = false;
    assetGroup.add(volumetricBeam);

    // Load Real 3D Production Asset via GLTFLoader
    const heroAssetConfig = asset3DRegistry[0]; // Stage Lighting Fixture
    const loader = new GLTFLoader();

    let loadedModel: THREE.Group | null = null;

    loader.load(
      heroAssetConfig.file,
      (gltf) => {
        loadedModel = gltf.scene;

        // Apply realistic metallic-roughness adjustments for stage lighting look
        loadedModel.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.envMapIntensity = 1.5;
            }
          }
        });

        // Set initial transform from registry
        loadedModel.scale.setScalar(heroAssetConfig.scale);
        loadedModel.position.set(...heroAssetConfig.initialPosition);
        loadedModel.rotation.set(...heroAssetConfig.initialRotation);

        assetGroup.add(loadedModel);
        volumetricBeam.position.set(
          heroAssetConfig.initialPosition[0],
          heroAssetConfig.initialPosition[1] + 0.3,
          heroAssetConfig.initialPosition[2] + 2.5
        );
        volumetricBeam.visible = true;

        onProgress?.(100);
        onLoaded?.();
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99);
          onProgress?.(percent);
        }
      },
      (error) => {
        console.warn("GLTF Load error:", error);
        onLoaded?.();
      }
    );

    // Mouse & Pointer Reactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotationY = mouseX * 0.22;
      targetRotationX = mouseY * 0.14;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);

      // Responsive positioning for mobile vs desktop
      if (newWidth < 768 && loadedModel) {
        loadedModel.position.set(0, -0.4, 0);
        loadedModel.scale.setScalar(heroAssetConfig.scale * 0.75);
      }
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with 4-Shot Camera Choreography
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 1.5), 1.5);

      if (loadedModel && !prefersReduced) {
        // Ambient mechanical breathing motion
        assetGroup.rotation.y += (targetRotationY - assetGroup.rotation.y + Math.sin(elapsed * 0.6) * 0.02) * 0.04;
        assetGroup.rotation.x += (targetRotationX - assetGroup.rotation.x + Math.cos(elapsed * 0.5) * 0.015) * 0.04;

        // Pulse volumetric beam intensity
        coneMat.opacity = 0.12 + Math.sin(elapsed * 2.0) * 0.03;
      }

      // 4-Shot Cinematic Camera Choreography linked to scroll
      if (scrollProgress <= 0.35) {
        // SHOT 01: Hero Intro (Close framing with slight side profile)
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 2.4 - scrollProgress * 1.2, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3 + scrollProgress * 0.5, 0.08);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.2 - scrollProgress * 1.5, 0.08);
        keySpot.intensity = THREE.MathUtils.lerp(keySpot.intensity, 14, 0.08);
      } else if (scrollProgress <= 0.8) {
        // SHOT 02: Sweep Pan around Fixture (Revealing metallic chassis)
        const p2 = (scrollProgress - 0.35) / 0.45;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 1.2 - p2 * 1.8, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.8 - p2 * 0.4, 0.08);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3.7 - p2 * 0.8, 0.08);
        if (loadedModel) loadedModel.rotation.y = THREE.MathUtils.lerp(loadedModel.rotation.y, -0.4 + p2 * 0.8, 0.05);
      } else if (scrollProgress <= 1.2) {
        // SHOT 03: High Beam Angle (Spotlight illuminates world transition)
        const p3 = (scrollProgress - 0.8) / 0.4;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, -0.6 + p3 * 1.2, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 - p3 * 0.8, 0.08);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.9 - p3 * 1.2, 0.08);
        keySpot.intensity = THREE.MathUtils.lerp(keySpot.intensity, 18 + p3 * 6, 0.08);
      } else {
        // SHOT 04: Pass-Through into Production Content
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 1.2, 0.08);
        if (loadedModel) {
          assetGroup.position.y = THREE.MathUtils.lerp(assetGroup.position.y, -1.8, 0.08);
        }
      }

      camera.lookAt(0.4, 0, 0);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      // Clean disposal
      coneGeo.dispose();
      coneMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced, onProgress, onLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
