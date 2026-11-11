import * as THREE from "three";

/**
 * The hero scene: one bowl of phở on a dark table, steam rising off it. Loaded
 * with a dynamic import from PhoCanvas, so three.js never sits in the page's
 * first-load JavaScript; the headline and CTAs are already on screen by then.
 *
 * Colour comes from the food, mapped to the brand inks: chili is the rim and the
 * chilies, jade is the herbs and scallions, gold is the broth. The light itself is
 * neutral and warm, so the broth reads as broth.
 *
 * Returns a disposer. Does nothing (and leaves the static fallback in place) when
 * WebGL is unavailable.
 */
export function mountPhoScene(canvas: HTMLCanvasElement): () => void {
  const stage = canvas.parentElement as HTMLElement | null;
  if (!stage) return () => {};
  const hero = (canvas.closest("section") as HTMLElement | null) ?? stage;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Seeded, so the bowl is composed the same way on every visit.
  let seed = 20260810;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const range = (a: number, b: number) => a + (b - a) * rnd();

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.03);
  const VFOV = 35;
  const camera = new THREE.PerspectiveCamera(VFOV, 1, 0.1, 80);

  // ---------------------------------------------------------------- lights
  scene.add(new THREE.HemisphereLight(0xfff1e0, 0x0a0806, 0.28));

  const key = new THREE.SpotLight(0xfff0dd, 1.3, 40, 0.62, 0.8, 1);
  key.position.set(3.2, 8.5, 4.4);
  key.target.position.set(0, 0.6, 0);
  key.castShadow = true;
  const shadowRes = stage.clientWidth < 768 ? 1024 : 2048;
  key.shadow.mapSize.set(shadowRes, shadowRes);
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.02;
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 22;
  scene.add(key, key.target);

  const rim = new THREE.DirectionalLight(0xffffff, 0.28);
  rim.position.set(-3, 4, -6);
  scene.add(rim);

  const brothGlow = new THREE.PointLight(0xffb84a, 0.32, 5, 2);
  brothGlow.position.set(0, 1.55, 0);
  scene.add(brothGlow);

  // ----------------------------------------------------------------- table
  // A pool of light, not a tabletop: the disc fades to nothing before the light
  // does, so the page's own ground shows around it with no visible edge.
  const fadeCanvas = document.createElement("canvas");
  fadeCanvas.width = 256;
  fadeCanvas.height = 256;
  const fg = fadeCanvas.getContext("2d")!;
  const grad = fg.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "#fff");
  grad.addColorStop(0.2, "#fff");
  grad.addColorStop(0.62, "#000");
  grad.addColorStop(1, "#000");
  fg.fillStyle = grad;
  fg.fillRect(0, 0, 256, 256);
  const fadeTex = new THREE.CanvasTexture(fadeCanvas);

  const table = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 72),
    new THREE.MeshStandardMaterial({ color: 0x1b1a19, roughness: 0.92, metalness: 0, transparent: true, alphaMap: fadeTex, depthWrite: false }),
  );
  table.rotation.x = -Math.PI / 2;
  table.receiveShadow = true;
  scene.add(table);

  // ------------------------------------------------------------------ bowl
  const bowl = new THREE.Group();
  scene.add(bowl);

  const R0 = 0.5;
  const R1 = 1.42;
  const Y0 = 0.16;
  const H = 1.04;
  const THICK = 0.07;
  const wall = (t: number) => R0 + (R1 - R0) * (1 - Math.pow(1 - t, 2.1));
  const RIM_Y = Y0 + H;

  const outerPts: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.46, 0),
    new THREE.Vector2(0.485, 0.03),
    new THREE.Vector2(0.47, 0.13),
  ];
  for (let i = 0; i <= 26; i++) outerPts.push(new THREE.Vector2(wall(i / 26), Y0 + H * (i / 26)));
  outerPts.push(new THREE.Vector2(R1 + 0.012, RIM_Y + 0.012), new THREE.Vector2(R1 - 0.02, RIM_Y + 0.018));

  const outer = new THREE.Mesh(
    new THREE.LatheGeometry(outerPts, 96),
    new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.32, metalness: 0.15, side: THREE.DoubleSide }),
  );
  outer.castShadow = true;
  bowl.add(outer);

  const innerPts: THREE.Vector2[] = [new THREE.Vector2(R1 - 0.03, RIM_Y + 0.014)];
  for (let i = 26; i >= 2; i--) innerPts.push(new THREE.Vector2(wall(i / 26) - THICK, Y0 + H * (i / 26)));
  innerPts.push(new THREE.Vector2(0, Y0 + 0.07));
  const inner = new THREE.Mesh(
    new THREE.LatheGeometry(innerPts, 96),
    new THREE.MeshStandardMaterial({ color: 0xf1ebe0, roughness: 0.38, metalness: 0, side: THREE.DoubleSide }),
  );
  inner.receiveShadow = true;
  bowl.add(inner);

  // the chili rim, the one committed band of colour on the vessel
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(R1 - 0.004, 0.03, 16, 120),
    new THREE.MeshStandardMaterial({ color: 0xe5261c, roughness: 0.3, metalness: 0.05, emissive: 0x4a0d09, emissiveIntensity: 0.35 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = RIM_Y + 0.016;
  ring.castShadow = true;
  bowl.add(ring);

  // ----------------------------------------------------------------- broth
  const BROTH_Y = 0.93;
  const brothR = wall((BROTH_Y - Y0) / H) - THICK - 0.004;
  const brothGeo = new THREE.RingGeometry(0, brothR, 72, 9);
  const broth = new THREE.Mesh(
    brothGeo,
    new THREE.MeshStandardMaterial({ color: 0x8f4510, roughness: 0.14, metalness: 0, emissive: 0x2a1203, emissiveIntensity: 0.5 }),
  );
  broth.rotation.x = -Math.PI / 2;
  broth.position.y = BROTH_Y;
  broth.receiveShadow = true;
  bowl.add(broth);
  const brothAttr = brothGeo.attributes.position as THREE.BufferAttribute;
  const brothPos = brothAttr.array as Float32Array;
  const brothBase = brothPos.slice();

  // -------------------------------------------------------------- contents
  const food = new THREE.Group();
  bowl.add(food);

  // rice noodles: a loose nest of loops, half under the surface
  const noodleMat = new THREE.MeshStandardMaterial({ color: 0xf3ead2, roughness: 0.5 });
  for (let n = 0; n < 7; n++) {
    const cx = range(-0.3, 0.3);
    const cz = range(-0.3, 0.3);
    const rad = range(0.32, 0.72);
    const pts: THREE.Vector3[] = [];
    const steps = 9;
    const phase = rnd() * Math.PI * 2;
    for (let i = 0; i < steps; i++) {
      const a = phase + (i / steps) * Math.PI * 2;
      const r = rad * range(0.78, 1.12);
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, BROTH_Y + range(-0.012, 0.04), cz + Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
    food.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, 0.024, 6, true), noodleMat));
  }

  // thin slices of beef, fanned on one side
  const beefMat = new THREE.MeshStandardMaterial({ color: 0x93523f, roughness: 0.62 });
  for (let b = 0; b < 4; b++) {
    const slice = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), beefMat);
    slice.scale.set(range(0.3, 0.36), 0.018, range(0.17, 0.22));
    const a = 0.5 + b * 0.36;
    const r = range(0.5, 0.78);
    slice.position.set(Math.cos(a) * r, BROTH_Y + 0.03 + b * 0.006, Math.sin(a) * r);
    slice.rotation.set(range(-0.12, 0.12), -a + range(-0.5, 0.5), range(-0.1, 0.1));
    food.add(slice);
  }

  // scallion rings
  const scallionMat = new THREE.MeshStandardMaterial({ color: 0x00b85a, roughness: 0.45 });
  const scallionGeo = new THREE.TorusGeometry(0.04, 0.013, 6, 16);
  for (let s = 0; s < 11; s++) {
    const ring2 = new THREE.Mesh(scallionGeo, scallionMat);
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * (brothR - 0.14);
    ring2.position.set(Math.cos(a) * r, BROTH_Y + 0.04, Math.sin(a) * r);
    ring2.rotation.set(Math.PI / 2 + range(-0.25, 0.25), 0, range(0, 3));
    food.add(ring2);
  }

  // basil and mint leaves, gathered opposite the beef
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x0f9a4a, roughness: 0.55 });
  for (let l = 0; l < 6; l++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8), leafMat);
    leaf.scale.set(range(0.11, 0.15), 0.012, range(0.06, 0.08));
    const a = 3.5 + l * 0.3 + range(-0.1, 0.1);
    const r = range(0.45, 0.9);
    leaf.position.set(Math.cos(a) * r, BROTH_Y + 0.05 + l * 0.004, Math.sin(a) * r);
    leaf.rotation.set(range(-0.25, 0.25), rnd() * Math.PI, range(-0.2, 0.2));
    food.add(leaf);
  }

  // chili slices
  const chiliMat = new THREE.MeshStandardMaterial({ color: 0xe5261c, roughness: 0.35, emissive: 0x3a0a07, emissiveIntensity: 0.2 });
  const chiliSliceGeo = new THREE.TorusGeometry(0.045, 0.017, 6, 16);
  for (let c = 0; c < 4; c++) {
    const cs = new THREE.Mesh(chiliSliceGeo, chiliMat);
    const a = 2.2 + c * 0.42;
    const r = range(0.25, 0.7);
    cs.position.set(Math.cos(a) * r, BROTH_Y + 0.045, Math.sin(a) * r);
    cs.rotation.set(Math.PI / 2 + range(-0.3, 0.3), 0, 0);
    food.add(cs);
  }

  // eyes of fat on the surface: what a long-simmered bone broth looks like
  const fatMat = new THREE.MeshStandardMaterial({ color: 0xffc640, roughness: 0.08, transparent: true, opacity: 0.5, depthWrite: false });
  for (let o = 0; o < 16; o++) {
    const eye = new THREE.Mesh(new THREE.CircleGeometry(range(0.022, 0.06), 18), fatMat);
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * (brothR - 0.08);
    eye.position.set(Math.cos(a) * r, BROTH_Y + 0.011, Math.sin(a) * r);
    eye.rotation.x = -Math.PI / 2;
    food.add(eye);
  }

  // ------------------------------------------------------------ star anise
  const spiceMat = new THREE.MeshStandardMaterial({ color: 0x6b3f24, roughness: 0.8, metalness: 0.02 });
  const aniseShape = new THREE.Shape();
  for (let i = 0; i < 16; i++) {
    const r = i % 2 ? 0.07 : 0.185;
    const a = (i / 16) * Math.PI * 2;
    if (i === 0) aniseShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else aniseShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  aniseShape.closePath();
  const aniseGeo = new THREE.ExtrudeGeometry(aniseShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 2 });
  aniseGeo.center();

  const floatingAnise = new THREE.Mesh(aniseGeo, spiceMat);
  floatingAnise.scale.setScalar(0.78);
  floatingAnise.rotation.x = -Math.PI / 2;
  floatingAnise.position.set(-0.62, BROTH_Y + 0.05, 0.5);
  food.add(floatingAnise);

  // ------------------------------------------------------------ chopsticks
  const stickMat = new THREE.MeshStandardMaterial({ color: 0xc9a26b, roughness: 0.6 });
  const sticks = new THREE.Group();
  for (let s = 0; s < 2; s++) {
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.032, 3.3, 10), stickMat);
    st.rotation.x = Math.PI / 2;
    st.rotation.z = s === 0 ? 0.03 : -0.02;
    st.position.set(0.62 + s * 0.13, RIM_Y + 0.075, 0.12);
    st.castShadow = true;
    sticks.add(st);
  }
  sticks.rotation.y = -0.52;
  bowl.add(sticks);

  // --------------------------------------------------------------- floaters
  // The aromatics, drifting around the bowl.
  const chiliPts = [
    [0, -0.24], [0.03, -0.2], [0.052, -0.06], [0.058, 0.1], [0.042, 0.2], [0.016, 0.245], [0, 0.25],
  ].map((p) => new THREE.Vector2(p[0], p[1]));
  const chiliGeo = new THREE.LatheGeometry(chiliPts, 14);
  const cinnamonGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.56, 12);
  const cinnamonMat = new THREE.MeshStandardMaterial({ color: 0x8f5630, roughness: 0.75 });

  type Floater = { mesh: THREE.Mesh; r: number; a: number; y: number; spin: number; bob: number };
  const floaters: Floater[] = [];
  const addFloater = (geo: THREE.BufferGeometry, mat: THREE.Material, r: number, a: number, y: number) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    scene.add(mesh);
    floaters.push({ mesh, r, a, y, spin: range(-0.35, 0.35), bob: rnd() * Math.PI * 2 });
  };
  addFloater(aniseGeo, spiceMat, 2.05, 0.5, 1.5);
  addFloater(aniseGeo, spiceMat, 2.3, 2.6, 0.75);
  addFloater(aniseGeo, spiceMat, 1.95, 4.3, 1.95);
  addFloater(chiliGeo, chiliMat, 2.2, 1.5, 1.15);
  addFloater(chiliGeo, chiliMat, 2.1, 5.3, 0.95);
  addFloater(cinnamonGeo, cinnamonMat, 2.25, 3.5, 1.6);

  // ------------------------------------------------------------------ steam
  // Soft puffs that are born small over the broth, rise, spread and thin out.
  // All motion lives in the vertex shader; nothing is rewritten per frame.
  const STEAM_N = stage.clientWidth < 768 ? 64 : 90;
  const steamSeed = new Float32Array(STEAM_N * 4);
  for (let i = 0; i < STEAM_N; i++) {
    steamSeed[i * 4] = rnd() * Math.PI * 2;
    steamSeed[i * 4 + 1] = Math.sqrt(rnd()) * 0.6;
    steamSeed[i * 4 + 2] = rnd();
    steamSeed[i * 4 + 3] = range(0.085, 0.15);
  }
  const steamGeo = new THREE.BufferGeometry();
  steamGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(STEAM_N * 3), 3));
  steamGeo.setAttribute("aSeed", new THREE.BufferAttribute(steamSeed, 4));
  steamGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2.4, 0), 4);
  const steamMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    uniforms: { uTime: { value: 0 }, uPx: { value: 1 }, uFade: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uPx;
      uniform float uFade;
      attribute vec4 aSeed;
      varying float vAlpha;
      void main() {
        float age = fract(uTime * aSeed.w + aSeed.z);
        float spread = 1.0 + age * 1.5;
        vec3 p;
        // each puff wanders a little; the whole column leans on a slow draught
        float lean = sin(uTime * 0.31) * 0.34 + sin(uTime * 0.17 + 1.3) * 0.2;
        p.x = cos(aSeed.x) * aSeed.y * spread + sin(age * 5.0 + aSeed.z * 40.0) * 0.2 * age + lean * age * age;
        p.z = sin(aSeed.x) * aSeed.y * spread + cos(age * 4.0 + aSeed.z * 31.0) * 0.18 * age;
        p.y = 1.0 + pow(age, 0.85) * 2.7;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = mix(0.34, 1.35, age) * uPx / -mv.z;
        vAlpha = smoothstep(0.0, 0.1, age) * (1.0 - smoothstep(0.22, 1.0, age)) * uFade;
      }`,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float m = smoothstep(1.0, 0.0, d);
        gl_FragColor = vec4(vec3(1.0), m * m * vAlpha * 0.34);
      }`,
  });
  const steam = new THREE.Points(steamGeo, steamMat);
  steam.frustumCulled = false;
  scene.add(steam);

  // ---------------------------------------------------------------- camera
  // Phones get the bowl centred in its own band above the copy. From md up the
  // stage is the whole hero and the bowl is pushed into the right-hand column,
  // clear of the headline.
  const target = new THREE.Vector3(0, 1.3, 0);
  const camPos = new THREE.Vector3();
  let dist = 7;
  let wide = false;
  const place = (out: THREE.Vector3, d: number, elev: number, az: number) =>
    out.set(Math.sin(az) * Math.cos(elev) * d, target.y + Math.sin(elev) * d, Math.cos(az) * Math.cos(elev) * d);

  let scrollP = 0;
  const readScroll = () => {
    const rect = hero.getBoundingClientRect();
    scrollP = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
  };

  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    wide = w >= 768;
    const frac = wide ? 0.34 : 0.64; // share of the stage width the bowl takes
    const tanH = Math.tan(THREE.MathUtils.degToRad(VFOV / 2)) * camera.aspect;
    dist = Math.min(11.5, (R1 * 2) / (frac * 2 * tanH));
    target.y = wide ? 1.3 : 1.42;
    if (wide) camera.setViewOffset(w, h, -w * 0.245, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    const buf = renderer.getDrawingBufferSize(new THREE.Vector2());
    steamMat.uniforms.uPx.value = buf.y / (2 * Math.tan(THREE.MathUtils.degToRad(VFOV / 2)));
    readScroll();
    if (reduced) drawStill();
  };

  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    ptr.tx = (e.clientX / window.innerWidth) * 2 - 1;
    ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const clock = new THREE.Clock();
  let intro = reduced ? 1 : 0;
  let shown = false;

  const frameAt = (et: number, dt: number) => {
    if (intro < 1) intro = Math.min(1, intro + dt / 1.7);
    const k = ease(intro);
    const sp = scrollP * scrollP * (3 - 2 * scrollP);

    // intro: settle in from higher and further out. scroll: lift and pull away.
    const d = dist * (1 + (1 - k) * 0.5 + sp * 0.3);
    const elev = 0.5 + (1 - k) * 0.3 + sp * 0.28;
    place(camPos, d, elev, 0.16);
    ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 2.5);
    ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 2.5);
    camPos.x += ptr.x * 0.4;
    camPos.y -= ptr.y * 0.22;
    camera.position.copy(camPos);
    camera.lookAt(target);

    bowl.rotation.y = et * 0.09 + scrollP * Math.PI * 0.7;

    // the surface breathes: two slow crossing swells, normals follow
    for (let v = 0; v < brothAttr.count; v++) {
      const x = brothBase[v * 3];
      const y = brothBase[v * 3 + 1];
      brothPos[v * 3 + 2] = Math.sin(x * 4.2 + et * 1.1) * 0.0045 + Math.sin(y * 5.1 - et * 0.8) * 0.004;
    }
    brothAttr.needsUpdate = true;
    brothGeo.computeVertexNormals();

    const orbit = wide ? 1 : 0.78;
    for (const f of floaters) {
      const a = f.a + et * 0.1;
      f.mesh.position.set(Math.cos(a) * f.r * orbit, f.y + Math.sin(et * 0.7 + f.bob) * 0.1, Math.sin(a) * f.r * orbit);
      f.mesh.rotation.x += dt * f.spin;
      f.mesh.rotation.y += dt * f.spin * 0.7;
    }

    steamMat.uniforms.uTime.value = et;
    steamMat.uniforms.uFade.value = k * (1 - scrollP * 0.85);

    renderer.render(scene, camera);
    if (!shown) {
      shown = true;
      stage.dataset.live = "1";
    }
  };

  // prefers-reduced-motion: one composed still, redrawn only on resize
  function drawStill() {
    frameAt(6.4, 0);
  }

  let raf = 0;
  let visible = true;
  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    readScroll();
    frameAt(clock.elapsedTime, dt);
    raf = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (reduced || raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  // only spend frames while the hero is actually on screen
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) wake();
    },
    { rootMargin: "80px" },
  );
  io.observe(hero);
  document.addEventListener("visibilitychange", wake);

  resize();
  if (!reduced) wake();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", wake);
    window.removeEventListener("pointermove", onPointer);
    scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    fadeTex.dispose();
    renderer.dispose();
  };
}
