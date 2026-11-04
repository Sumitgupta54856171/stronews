"use client";

import { useEffect, useRef } from "react";

export default function Ambient3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let animationFrame = 0;
    let renderer: import("three").WebGLRenderer | undefined;
    let cleanupScene: (() => void) | undefined;

    void import("three")
      .then((THREE) => {
        if (disposed) return;

        try {
          const context = canvas.getContext("webgl2", {
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          });
          if (!context) return;

          renderer = new THREE.WebGLRenderer({
            canvas,
            context,
          });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x000000, 0);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            42,
            window.innerWidth / window.innerHeight,
            0.1,
            100,
          );
          camera.position.z = 12;

          const ambient = new THREE.AmbientLight(0xffffff, 2.2);
          const keyLight = new THREE.DirectionalLight(0xc5ead8, 3.5);
          keyLight.position.set(-4, 6, 8);
          scene.add(ambient, keyLight);

          const sceneGroup = new THREE.Group();
          scene.add(sceneGroup);

          const addMesh = (
            geometry: import("three").BufferGeometry,
            material: import("three").Material,
            x: number,
            y: number,
            z: number,
            parent: import("three").Object3D = sceneGroup,
          ) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            parent.add(mesh);
            return mesh;
          };

          const makeTile = (
            x: number,
            y: number,
            z: number,
            rotation: number,
            tint: number,
          ) => {
            const tile = new THREE.Group();
            tile.position.set(x, y, z);
            tile.rotation.z = rotation;
            sceneGroup.add(tile);
            addMesh(
              new THREE.BoxGeometry(2.35, 1.42, 0.12),
              new THREE.MeshStandardMaterial({
                color: tint,
                metalness: 0.22,
                roughness: 0.38,
                transparent: true,
                opacity: 0.76,
              }),
              0,
              0,
              0,
              tile,
            );
            addMesh(
              new THREE.BoxGeometry(0.42, 0.07, 0.025),
              new THREE.MeshStandardMaterial({ color: 0x27775f, roughness: 0.45 }),
              -0.75,
              0.36,
              0.08,
              tile,
            );
            addMesh(
              new THREE.BoxGeometry(1.38, 0.045, 0.025),
              new THREE.MeshStandardMaterial({ color: 0x849b8e, roughness: 0.65 }),
              -0.26,
              0.13,
              0.08,
              tile,
            );
            addMesh(
              new THREE.BoxGeometry(1.02, 0.045, 0.025),
              new THREE.MeshStandardMaterial({ color: 0xa2b2a8, roughness: 0.65 }),
              -0.44,
              -0.08,
              0.08,
              tile,
            );
            addMesh(
              new THREE.BoxGeometry(0.7, 0.045, 0.025),
              new THREE.MeshStandardMaterial({ color: 0xa2b2a8, roughness: 0.65 }),
              -0.6,
              -0.29,
              0.08,
              tile,
            );
          };

          makeTile(-3.65, 1.5, -1.5, -0.14, 0xdce9e2);
          makeTile(3.55, -1.1, -1.1, 0.12, 0xe7e6d9);
          makeTile(4.5, 2.1, -2.4, -0.08, 0xe1e8e1);

          const orbitMaterial = new THREE.MeshStandardMaterial({
            color: 0x52957b,
            metalness: 0.65,
            roughness: 0.3,
            transparent: true,
            opacity: 0.45,
          });
          const orbit = addMesh(
            new THREE.TorusGeometry(3.1, 0.018, 6, 96),
            orbitMaterial,
            0.25,
            0.1,
            -2,
          );
          orbit.rotation.set(0.95, 0.2, -0.4);

          const orbitAccent = addMesh(
            new THREE.TorusGeometry(2.05, 0.012, 6, 80),
            new THREE.MeshStandardMaterial({
              color: 0x83a991,
              transparent: true,
              opacity: 0.36,
              roughness: 0.4,
            }),
            0.2,
            0,
            -2.1,
          );
          orbitAccent.rotation.set(0.8, -0.3, 0.55);

          const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d8366,
            metalness: 0.48,
            roughness: 0.22,
            transparent: true,
            opacity: 0.72,
          });
          [
            [-1.25, 2.2, -0.5, 0.11],
            [1.8, 1.75, -0.2, 0.075],
            [-2.15, -1.45, -0.8, 0.085],
            [2.4, -2.15, -0.4, 0.12],
            [0.1, 2.8, -1.2, 0.06],
          ].forEach(([x, y, z, radius]) => {
            addMesh(
              new THREE.SphereGeometry(radius, 12, 8),
              nodeMaterial.clone(),
              x,
              y,
              z,
            );
          });

          const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.position.z = window.innerWidth < 640 ? 15 : 12;
            camera.updateProjectionMatrix();
            renderer?.setSize(window.innerWidth, window.innerHeight);
            sceneGroup.scale.setScalar(window.innerWidth < 640 ? 0.78 : 1);
          };

          const pointer = new THREE.Vector2();
          const onPointerMove = (event: PointerEvent) => {
            pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
            pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
          };
          const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          let visible = document.visibilityState === "visible";

          const render = (time: number) => {
            if (disposed || !renderer) return;
            sceneGroup.rotation.y +=
              (pointer.x * 0.045 + Math.sin(time * 0.00022) * 0.025 -
                sceneGroup.rotation.y) *
              0.025;
            sceneGroup.rotation.x +=
              (-pointer.y * 0.025 - sceneGroup.rotation.x) * 0.025;
            renderer.render(scene, camera);
            if (!reducedMotion && visible) {
              animationFrame = window.requestAnimationFrame(render);
            }
          };

          const onVisibilityChange = () => {
            visible = document.visibilityState === "visible";
            window.cancelAnimationFrame(animationFrame);
            if (visible && !reducedMotion) {
              animationFrame = window.requestAnimationFrame(render);
            } else if (visible) {
              render(0);
            }
          };

          window.addEventListener("resize", resize);
          window.addEventListener("pointermove", onPointerMove, { passive: true });
          document.addEventListener("visibilitychange", onVisibilityChange);
          cleanupScene = () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.cancelAnimationFrame(animationFrame);
            scene.traverse((object) => {
              if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                  object.material.forEach((material) => material.dispose());
                } else {
                  object.material.dispose();
                }
              }
            });
            renderer?.dispose();
          };

          resize();
          if (reducedMotion) {
            render(0);
          } else {
            animationFrame = window.requestAnimationFrame(render);
          }
        } catch (error) {
          console.error("Unable to initialize the 3D background.", error);
          renderer?.dispose();
        }
      })
      .catch((error: unknown) => {
        if (!disposed) {
          console.error("Unable to load the 3D background.", error);
        }
      });

    return () => {
      disposed = true;
      cleanupScene?.();
    };
  }, []);

  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-scene-fallback" />
      <canvas ref={canvasRef} className="ambient-scene-canvas" />
    </div>
  );
}
