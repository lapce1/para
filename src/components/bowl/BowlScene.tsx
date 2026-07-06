"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/** Rising steam — a GPU points system; CPU advances the y of each particle and
 *  the shader fades it in low, out high, and grows the puff as it climbs. */
function Steam() {
  const COUNT = 130;
  const MAX_H = 1.7;

  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  const { geo, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.sqrt(Math.random()) * 0.5;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.random() * MAX_H;
      positions[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.16 + Math.random() * 0.26;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geo, speeds };
  }, []);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uMaxH: { value: MAX_H },
          uSize: { value: 62 },
          uColor: { value: new THREE.Color("#F3E9D6") },
          uTex: { value: tex },
        },
        vertexShader: `
          uniform float uMaxH; uniform float uSize; varying float vA;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float h = clamp(position.y / uMaxH, 0.0, 1.0);
            vA = smoothstep(0.0, 0.16, h) * (1.0 - smoothstep(0.5, 1.0, h));
            gl_PointSize = uSize * (0.45 + h * 1.3) / (-mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform sampler2D uTex; uniform vec3 uColor; varying float vA;
          void main() {
            vec4 t = texture2D(uTex, gl_PointCoord);
            gl_FragColor = vec4(uColor, t.a * vA * 0.32);
          }`,
      }),
    [tex],
  );

  useFrame((_, dt) => {
    const attr = geo.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const d = Math.min(dt, 0.05);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * d;
      if (arr[i * 3 + 1] > MAX_H) {
        const r = Math.sqrt(Math.random()) * 0.5;
        const a = Math.random() * Math.PI * 2;
        arr[i * 3] = Math.cos(a) * r;
        arr[i * 3 + 1] = 0;
        arr[i * 3 + 2] = Math.sin(a) * r;
      }
    }
    attr.needsUpdate = true;
  });

  return <points geometry={geo} material={mat} />;
}

function Garnish() {
  return (
    <group position={[0, 0.0, 0]}>
      {/* herb leaves / scallion bits */}
      <mesh position={[0.18, 0.02, -0.14]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#57C77B" roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, 0.02, -0.26]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#86E0A3" roughness={0.5} />
      </mesh>
      <mesh position={[0.02, 0.02, 0.08]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#57C77B" roughness={0.5} />
      </mesh>
      {/* lime wheel lying on the broth */}
      <mesh position={[-0.34, 0.03, -0.16]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.035, 28]} />
        <meshStandardMaterial color="#BFE372" roughness={0.45} />
      </mesh>
      {/* chili — a small red horn */}
      <mesh position={[0.34, 0.03, -0.04]} rotation={[0, 0, Math.PI / 2.4]}>
        <coneGeometry args={[0.045, 0.3, 16]} />
        <meshStandardMaterial color="#E2533B" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Bowl() {
  return (
    <group scale={1.05} position={[0, 0, 0]}>
      {/* ceramic shell — lower hemisphere, flattened */}
      <mesh scale={[1, 0.62, 1]}>
        <sphereGeometry args={[1, 64, 48, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <meshStandardMaterial color="#15181d" roughness={0.42} metalness={0.28} side={THREE.DoubleSide} />
      </mesh>
      {/* rim lip */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.035, 18, 96]} />
        <meshStandardMaterial color="#262b33" roughness={0.38} metalness={0.4} />
      </mesh>
      {/* broth surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[0.97, 80]} />
        <meshStandardMaterial color="#E8B24A" emissive="#9c6916" emissiveIntensity={0.4} roughness={0.28} metalness={0.12} />
      </mesh>
      <group position={[0, -0.05, 0]}>
        <Garnish />
        <Steam />
      </group>
    </group>
  );
}

export default function BowlScene() {
  const group = useRef<THREE.Group>(null);
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.85, 4.5], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#57C77B" />
      <pointLight position={[0, 1.4, 0.5]} intensity={9} distance={6} decay={2} color="#E8B24A" />

      <group ref={group}>
        <Bowl />
      </group>

      <ContactShadows position={[0, -0.68, 0]} scale={3.6} blur={2.8} far={2.5} opacity={0.55} color="#000000" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        minPolarAngle={1.0}
        maxPolarAngle={1.4}
        target={[0, 0.05, 0]}
      />
    </Canvas>
  );
}
