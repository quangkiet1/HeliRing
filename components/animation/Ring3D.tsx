import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  Box3,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

type PointerTarget = React.MutableRefObject<Vector2>;
type RingVariant = 'hero' | 'ambient';

const MODEL_URL = '/img/base.obj';
const TEXTURE_URLS = [
  '/img/texture_diffuse.png',
  '/img/texture_normal.png',
  '/img/texture_roughness.png',
  '/img/texture_metallic.png',
];

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(query.matches);

    syncPreference();
    query.addEventListener('change', syncPreference);
    return () => query.removeEventListener('change', syncPreference);
  }, []);

  return reducedMotion;
}

function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;

    return () => {
      scene.environment = null;
      environment.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function RingModel({
  pointer,
  reducedMotion,
  variant,
}: {
  pointer: PointerTarget;
  reducedMotion: boolean;
  variant: RingVariant;
}) {
  const ringRef = useRef<Group>(null);
  const sourceModel = useLoader(OBJLoader, MODEL_URL);
  const [diffuseMap, normalMap, roughnessMap, metalnessMap] = useLoader(
    TextureLoader,
    TEXTURE_URLS,
  ) as Texture[];

  const model = useMemo(() => {
    diffuseMap.colorSpace = SRGBColorSpace;
    [diffuseMap, normalMap, roughnessMap, metalnessMap].forEach((texture) => {
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    });

    const material = new MeshPhysicalMaterial({
      map: diffuseMap,
      normalMap,
      roughnessMap,
      metalnessMap,
      color: variant === 'hero' ? '#f1f5f9' : '#d7dde2',
      metalness: variant === 'hero' ? 0.82 : 0.72,
      roughness: variant === 'hero' ? 0.28 : 0.34,
      clearcoat: variant === 'hero' ? 0.58 : 0.42,
      clearcoatRoughness: variant === 'hero' ? 0.16 : 0.2,
      envMapIntensity: variant === 'hero' ? 1.9 : 1.35,
      side: DoubleSide,
    });

    const clone = sourceModel.clone(true);
    clone.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.computeVertexNormals();
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const bounds = new Box3().setFromObject(clone);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);

    clone.position.sub(center);
    clone.scale.setScalar((variant === 'hero' ? 1.72 : 2.4) / maxAxis);

    return clone;
  }, [diffuseMap, metalnessMap, normalMap, roughnessMap, sourceModel, variant]);

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    const baseX = variant === 'hero' ? -0.08 : -0.13;
    const baseY = variant === 'hero' ? -0.58 : -0.48;
    const baseZ = variant === 'hero' ? -0.04 : -0.08;
    const autoOrbit = reducedMotion ? 0 : state.clock.elapsedTime * (variant === 'hero' ? 0.28 : 0.18);
    const targetX = reducedMotion ? baseX : baseX + pointer.current.y * 0.16;
    const targetY = reducedMotion ? baseY : baseY + autoOrbit + pointer.current.x * 0.24;
    const targetZ = reducedMotion ? baseZ : baseZ + pointer.current.x * 0.07;

    ringRef.current.rotation.x = MathUtils.damp(ringRef.current.rotation.x, targetX, 5, delta);
    ringRef.current.rotation.y = MathUtils.damp(ringRef.current.rotation.y, targetY, 5, delta);
    ringRef.current.rotation.z = MathUtils.damp(ringRef.current.rotation.z, targetZ, 5, delta);

    if (!reducedMotion) {
      ringRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
    }
  });

  return (
    <group ref={ringRef}>
      <primitive object={model} />
    </group>
  );
}

function SensorCore({ variant }: { variant: RingVariant }) {
  const isHero = variant === 'hero';

  return (
    <div
      className={
        isHero
          ? 'pointer-events-none absolute left-1/2 top-1/2 z-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full'
          : 'pointer-events-none absolute left-[52%] top-[49%] z-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full'
      }
    >
      <div className="absolute inset-0 rounded-full border border-emerald-300/20 bg-emerald-400/5" />
      <div className="absolute inset-[23%] rounded-full border border-cyan-200/15" />
      <div className="absolute inset-[39%] rounded-full bg-emerald-300/80 blur-[4px] shadow-[0_0_26px_rgba(16,185,129,0.95),0_0_62px_rgba(6,182,212,0.35)]" />
    </div>
  );
}

function StageShell({ variant }: { variant: RingVariant }) {
  if (variant !== 'hero') {
    return (
      <div className="absolute inset-y-[16%] right-[8%] left-[18%] rounded-full bg-emerald-500/12 blur-[90px]" />
    );
  }

  return (
    <>
      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.28)_0%,rgba(6,182,212,0.12)_38%,transparent_70%)] blur-3xl" />
      <div className="absolute inset-[12%] rounded-full border border-emerald-200/10" />
      <div className="absolute inset-[22%] rounded-full border border-cyan-200/10" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_120deg,transparent,rgba(45,212,191,0.14),transparent_38%,rgba(16,185,129,0.16),transparent_72%)] blur-sm" />
      <div className="absolute left-[18%] top-[26%] h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
      <div className="absolute bottom-[26%] right-[18%] h-1.5 w-1.5 rounded-full bg-emerald-300/70 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
    </>
  );
}

export default function Ring3D({
  variant = 'ambient',
  className = '',
}: {
  variant?: RingVariant;
  className?: string;
}) {
  const pointer = useRef(new Vector2(0, 0));
  const reducedMotion = usePrefersReducedMotion();
  const isHero = variant === 'hero';

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.set(
      ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      -((event.clientY - rect.top) / rect.height - 0.5) * 2,
    );
  };

  const resetPointer = () => {
    pointer.current.set(0, 0);
  };

  return (
    <div
      className={
        isHero
          ? `pointer-events-none relative z-10 h-[22rem] w-full max-w-[38rem] select-none md:h-[30rem] lg:h-[36rem] ${className}`
          : `pointer-events-none absolute inset-y-0 right-[-18rem] z-0 hidden w-[min(52vw,44rem)] select-none items-center justify-end lg:flex xl:right-[-24rem] ${className}`
      }
    >
      <div
        className={
          isHero
            ? 'pointer-events-auto relative h-full w-full cursor-grab active:cursor-grabbing'
            : 'pointer-events-auto relative h-[36rem] w-full cursor-grab active:cursor-grabbing'
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <StageShell variant={variant} />
        <SensorCore variant={variant} />
        <Canvas
          camera={{ position: [0, 0, isHero ? 5.25 : 5.7], fov: isHero ? 27 : 28 }}
          dpr={[1, 1.8]}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          shadows
          className="relative z-10 h-full w-full"
        >
          <StudioEnvironment />
          <ambientLight intensity={isHero ? 0.72 : 0.52} />
          <hemisphereLight intensity={isHero ? 1 : 0.8} color="#dffdf5" groundColor="#06111f" />
          <directionalLight position={[3.5, 4.5, 5]} intensity={isHero ? 3.6 : 2.8} castShadow />
          <directionalLight position={[-2.8, 1.6, 3.2]} intensity={isHero ? 1.15 : 0.45} color="#a7f3d0" />
          <pointLight position={[-3, 1.4, 2.8]} intensity={isHero ? 1.45 : 1.1} color="#10b981" />
          <pointLight position={[2.4, -1.8, 3]} intensity={isHero ? 1.1 : 0.8} color="#38bdf8" />
          <Suspense fallback={null}>
            <RingModel pointer={pointer} reducedMotion={reducedMotion} variant={variant} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
