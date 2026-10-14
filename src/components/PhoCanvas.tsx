"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient 3D hero: a phở bowl floating in the dark with rising steam, lit in the
 * brand inks. It is deliberately bounded to the hero section, the scene animates
 * as you scroll THROUGH the hero and then parks, so the rest of the flat page
 * scrolls normally below. All Three.js runs in this client effect; the headline
 * and CTAs are real server-rendered DOM layered on top (see Hero3D).
 *
 * This is the one motion/illustration exception on the site, added at the owner's
 * request. See DESIGN.md, "Motion" and "Imagery".
 */
export default function PhoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement | null;
    if (!parent) return;

    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // no WebGL: the DOM hero still reads on the ground behind this canvas
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

    // ---- lights ----
    scene.add(new THREE.AmbientLight(0x1a120c, 0.85));

    const key = new THREE.SpotLight(0xffe8d6, 2.4, 30, 0.6, 0.6, 1.2);
    key.position.set(4.5, 8.5, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0004;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 24;
    scene.add(key);
    scene.add(key.target);

    const rim = new THREE.DirectionalLight(0x00e676, 0.7);
    rim.position.set(-5, 3, -4.5);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xff3b30, 0.32);
    fill.position.set(2.5, 1, 4);
    scene.add(fill);

    const brothLight = new THREE.PointLight(0xffd400, 1.15, 7, 2);
    brothLight.position.set(0, 1.45, 0);
    scene.add(brothLight);

    // ---- table grounds the bowl and catches the key light ----
    const table = new THREE.Mesh(
      new THREE.CircleGeometry(9, 64),
      new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.95, metalness: 0.0 }),
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.02;
    table.receiveShadow = true;
    scene.add(table);

    // ---- the bowl ----
    const bowlGroup = new THREE.Group();
    scene.add(bowlGroup);

    const profile = [
      [0.0, 0.0], [0.46, 0.0], [0.56, 0.13], [0.36, 0.17],
      [1.34, 1.12], [1.44, 1.22], [1.3, 1.2], [0.3, 0.3], [0.0, 0.28],
    ].map((p) => new THREE.Vector2(p[0], p[1]));

    const bowl = new THREE.Mesh(
      new THREE.LatheGeometry(profile, 72),
      new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.55, metalness: 0.12, side: THREE.DoubleSide }),
    );
    bowl.castShadow = true;
    bowl.receiveShadow = true;
    bowlGroup.add(bowl);

    // chili-red rim ring, the brand's committed field
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.37, 0.028, 16, 80),
      new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.35, metalness: 0.1, emissive: 0x3a0c08, emissiveIntensity: 0.95 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.19;
    bowlGroup.add(ring);

    // ---- broth surface (rippling) ----
    const brothGeo = new THREE.CircleGeometry(1.16, 120);
    const broth = new THREE.Mesh(
      brothGeo,
      new THREE.MeshStandardMaterial({ color: 0x7a3316, roughness: 0.22, metalness: 0.0, emissive: 0x2a1206, emissiveIntensity: 0.95 }),
    );
    broth.rotation.x = -Math.PI / 2;
    broth.position.y = 0.96;
    bowlGroup.add(broth);
    const brothAttr = brothGeo.attributes.position as THREE.BufferAttribute;
    const brothPos = brothAttr.array as Float32Array;
    const brothBase = brothPos.slice();

    // noodle coils + herb specks on the broth
    const garnish = new THREE.Group();
    bowlGroup.add(garnish);
    const coilMat = new THREE.MeshStandardMaterial({ color: 0xd9c48a, roughness: 0.6 });
    for (let c = 0; c < 3; c++) {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.16 + c * 0.05, 0.03, 8, 24), coilMat);
      coil.rotation.x = -Math.PI / 2;
      coil.position.set((c - 1) * 0.38, 0.98, Math.sin(c) * 0.28);
      garnish.add(coil);
    }
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x00e676, roughness: 0.5, emissive: 0x063d1e, emissiveIntensity: 0.3 });
    for (let h = 0; h < 6; h++) {
      const herb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), herbMat);
      const ha = Math.random() * Math.PI * 2;
      const hr = Math.random() * 0.9;
      herb.position.set(Math.cos(ha) * hr, 0.99, Math.sin(ha) * hr);
      garnish.add(herb);
    }

    // oil glints
    const oils: { mesh: THREE.Mesh; a: number; r: number; ph: number }[] = [];
    const oilMat = new THREE.MeshStandardMaterial({ color: 0xffd400, roughness: 0.12, metalness: 0.3, emissive: 0x4a3200, emissiveIntensity: 0.7 });
    for (let o = 0; o < 7; o++) {
      const od = new THREE.Mesh(new THREE.SphereGeometry(0.028 + Math.random() * 0.02, 8, 6), oilMat);
      oils.push({ mesh: od, a: Math.random() * Math.PI * 2, r: Math.random() * 0.95, ph: Math.random() * Math.PI * 2 });
      garnish.add(od);
    }

    // ---- chopsticks ----
    const sticks = new THREE.Group();
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x9a7a44, roughness: 0.5, metalness: 0.05 });
    for (let s = 0; s < 2; s++) {
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 3.0, 10), stickMat);
      st.castShadow = true;
      st.rotation.z = Math.PI / 2;
      st.position.set(0.15, 1.24 + s * 0.055, -0.22 + s * 0.14);
      sticks.add(st);
    }
    sticks.rotation.y = 0.5;
    bowlGroup.add(sticks);

    // ---- floating spices ----
    const spices = new THREE.Group();
    scene.add(spices);
    const spiceItems: { mesh: THREE.Mesh; r: number; a: number; y: number; spin: number; bob: number }[] = [];

    function starAnise(): THREE.Mesh {
      const shape = new THREE.Shape();
      const arms = 8;
      const outer = 0.17;
      const inner = 0.075;
      for (let i = 0; i < arms * 2; i++) {
        const r = i % 2 ? inner : outer;
        const a = (i / (arms * 2)) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 1 });
      geo.center();
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x3a2416, roughness: 0.75, metalness: 0.05 }));
      m.castShadow = true;
      return m;
    }
    function chili(): THREE.Mesh {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 14, 10),
        new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.35, emissive: 0x330a08, emissiveIntensity: 0.35 }),
      );
      m.scale.set(1, 1, 3.0);
      return m;
    }

    const defs = [
      { make: starAnise, r: 2.05, a: 0.4, y: 1.35 },
      { make: starAnise, r: 2.35, a: 2.3, y: 0.7 },
      { make: starAnise, r: 1.9, a: 4.1, y: 1.75 },
      { make: chili, r: 2.2, a: 1.2, y: 1.1 },
      { make: chili, r: 2.0, a: 3.4, y: 1.6 },
      { make: chili, r: 2.45, a: 5.2, y: 0.9 },
    ];
    defs.forEach((d) => {
      const mesh = d.make();
      spiceItems.push({ mesh, r: d.r, a: d.a, y: d.y, spin: (Math.random() - 0.5) * 0.6, bob: Math.random() * Math.PI * 2 });
      spices.add(mesh);
    });

    // ---- steam ----
    function radialSprite(): THREE.Texture {
      const cv = document.createElement("canvas");
      cv.width = 64;
      cv.height = 64;
      const g = cv.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.35)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const t = new THREE.Texture(cv);
      t.needsUpdate = true;
      return t;
    }

    const STEAM_N = 300;
    const steamGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(STEAM_N * 3);
    const sVel = new Float32Array(STEAM_N);
    function seedSteam(i: number, fresh: boolean) {
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.random() * 0.55;
      sPos[i * 3] = Math.cos(ang) * rad;
      sPos[i * 3 + 1] = 1.0 + (fresh ? Math.random() * 2.2 : 0);
      sPos[i * 3 + 2] = Math.sin(ang) * rad;
      sVel[i] = 0.25 + Math.random() * 0.5;
    }
    for (let i = 0; i < STEAM_N; i++) seedSteam(i, true);
    const steamAttr = new THREE.BufferAttribute(sPos, 3);
    steamGeo.setAttribute("position", steamAttr);
    const steamMat = new THREE.PointsMaterial({
      size: 0.42, map: radialSprite(), transparent: true, opacity: 0.5,
      depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffffff, sizeAttenuation: true,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    bowlGroup.add(steam);

    // faked bloom: a warm additive glow over the broth
    const glowMat = new THREE.SpriteMaterial({
      map: radialSprite(), color: 0xffb020, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(3.4, 3.4, 1);
    glow.position.set(0, 1.05, 0);
    bowlGroup.add(glow);

    // ---- camera poses: p=0 at the top of the hero, p=1 once scrolled through ----
    const poseA = { pos: new THREE.Vector3(0.2, 2.2, 6.2), tgt: new THREE.Vector3(0, 0.85, 0) };
    const poseB = { pos: new THREE.Vector3(0.0, 3.1, 7.8), tgt: new THREE.Vector3(0, 0.45, 0) };
    const introStart = new THREE.Vector3(0.2, 4.4, 10.6);
    const camPos = new THREE.Vector3();
    const camTgt = new THREE.Vector3();
    const finalPos = new THREE.Vector3();
    const smooth = (t: number) => t * t * (3 - 2 * t);

    // ---- input / progress ----
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    function onPointer(e: PointerEvent) {
      ptr.tx = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointer);

    let scrollP = 0;
    function readProgress() {
      const rect = canvas!.getBoundingClientRect();
      const h = Math.max(1, rect.height);
      scrollP = Math.max(0, Math.min(1, -rect.top / h));
    }

    function resize() {
      const w = parent!.clientWidth;
      const h = parent!.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      readProgress();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    // ---- loop ----
    const clock = new THREE.Clock();
    let introT = REDUCED ? 1 : 0;
    let raf = 0;
    let firstFrame = true;
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 0.9s ease";

    function frame() {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const et = clock.elapsedTime;
      readProgress();

      // camera: intro dolly, scroll pose, pointer parallax
      if (introT < 1) introT = Math.min(1, introT + dt / 1.9);
      const intro = smooth(introT);
      const sp = smooth(scrollP);
      camPos.lerpVectors(poseA.pos, poseB.pos, sp);
      camTgt.lerpVectors(poseA.tgt, poseB.tgt, sp);
      finalPos.lerpVectors(introStart, camPos, intro);
      ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 3);
      ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 3);
      finalPos.x += ptr.x * 0.5 * intro;
      finalPos.y += -ptr.y * 0.3 * intro;
      camera.position.copy(finalPos);
      camera.lookAt(camTgt);

      const idle = REDUCED ? 0 : et * 0.12;
      bowlGroup.rotation.y = idle + scrollP * Math.PI * 0.9;

      if (!REDUCED) {
        for (let v = 0; v < brothAttr.count; v++) {
          const bx = brothBase[v * 3];
          const by = brothBase[v * 3 + 1];
          const d = Math.sqrt(bx * bx + by * by);
          brothPos[v * 3 + 2] = Math.sin(d * 6 - et * 2.2) * 0.012 * (1 - d * 0.5);
        }
        brothAttr.needsUpdate = true;
      }

      for (let q = 0; q < spiceItems.length; q++) {
        const it = spiceItems[q];
        if (!REDUCED) it.a += dt * 0.12;
        const yb = it.y + (REDUCED ? 0 : Math.sin(et * 0.8 + it.bob) * 0.12);
        it.mesh.position.set(Math.cos(it.a) * it.r, yb, Math.sin(it.a) * it.r);
        if (!REDUCED) {
          it.mesh.rotation.x += dt * it.spin;
          it.mesh.rotation.y += dt * it.spin * 0.7;
        }
      }

      for (let oz = 0; oz < oils.length; oz++) {
        const ol = oils[oz];
        const oy = 0.965 + (REDUCED ? 0 : Math.sin(et * 1.3 + ol.ph) * 0.006);
        ol.mesh.position.set(Math.cos(ol.a) * ol.r, oy, Math.sin(ol.a) * ol.r);
      }

      // steam and glow thin out as the hero scrolls away
      const fade = 1 - scrollP;
      glowMat.opacity = 0.4 * fade + 0.1;
      steamMat.opacity = REDUCED ? 0 : 0.5 * fade;
      if (!REDUCED) {
        for (let m = 0; m < STEAM_N; m++) {
          sPos[m * 3 + 1] += sVel[m] * dt;
          sPos[m * 3] += Math.sin(et * 0.6 + m) * 0.0016;
          if (sPos[m * 3 + 1] > 3.4) seedSteam(m, false);
        }
        steamAttr.needsUpdate = true;
      }

      key.target.position.set(0, 0.7, 0);
      renderer.render(scene, camera);

      if (firstFrame) {
        firstFrame = false;
        canvas!.style.opacity = "1";
      }
    }
    frame();

    // ---- cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((mm) => mm.dispose());
        else if (mat) mat.dispose();
      });
      steamMat.map?.dispose();
      glowMat.map?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
