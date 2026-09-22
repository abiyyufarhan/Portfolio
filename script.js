/* ═══════════════════════════════════════════════
   Cyber Dark Portfolio — Main Script
   ═══════════════════════════════════════════════ */

// ── Mobile Menu Toggle ──────────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);

  if (menuOpen) {
    bar1.style.transform = 'rotate(45deg) translate(4px, 4px)';
    bar2.style.opacity = '0';
    bar3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
    bar3.style.width = '1.5rem';
  } else {
    bar1.style.transform = '';
    bar2.style.opacity = '';
    bar3.style.transform = '';
    bar3.style.width = '';
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    bar1.style.transform = '';
    bar2.style.opacity = '';
    bar3.style.transform = '';
    bar3.style.width = '';
  });
});

// ── Navbar Scroll Effect ────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('border-cyber-border/50');
    navbar.style.backgroundColor = 'rgba(11, 17, 32, 0.85)';
  } else {
    navbar.classList.remove('border-cyber-border/50');
    navbar.style.backgroundColor = '';
  }

  lastScroll = currentScroll;
});

// ── Intersection Observer for Scroll Reveal ─
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── Smooth Scroll for Anchor Links ──────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ── 3D Isometric Server & Processor Rack ──────
const pipelineStage = document.getElementById('pipeline-stage');

if (pipelineStage && window.THREE) {
  const scene = new THREE.Scene();
  const frustum = 5.8;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum * 0.85, -frustum * 0.85, 0.1, 200);
  // Isometric camera angle
  camera.position.set(12, 10, 12);
  camera.lookAt(0, 0.5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  // Render the canvas at a minimum of 2x CSS resolution for a consistently crisp HD result.
  const renderPixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 3), 3);
  renderer.setPixelRatio(renderPixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  pipelineStage.prepend(renderer.domElement);

  const rack = new THREE.Group();
  scene.add(rack);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leds = [];
  const fans = [];
  const dataParticles = [];
  const cables = [];

  // ── Colors ──
  const C = {
    frame:   0x1a2744,
    rail:    0x2d3f5e,
    server:  0x1e293b,
    active:  0x0e7490,
    accent:  0x38bdf8,
    cyan:    0x67e8f9,
    led_on:  0x22d3ee,
    led_off: 0x334155,
    gpu:     0x7c3aed,
    heatsink:0x475569,
    floor:   0x0f172a,
    cable:   0x0ea5e9,
  };

  // ── Lighting ──
  const ambient = new THREE.AmbientLight(0x94a3b8, 0.35);
  scene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xe2e8f0, 0.7);
  keyLight.position.set(8, 12, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(4096, 4096);
  keyLight.shadow.bias = -0.0001;
  keyLight.shadow.normalBias = 0.02;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 40;
  keyLight.shadow.camera.left = -10;
  keyLight.shadow.camera.right = 10;
  keyLight.shadow.camera.top = 10;
  keyLight.shadow.camera.bottom = -10;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.2);
  fillLight.position.set(-6, 4, -4);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0x38bdf8, 0.5, 20);
  rimLight.position.set(-3, 6, 8);
  scene.add(rimLight);

  // ── Helper: Rounded Box ──
  function roundedBox(w, h, d, r) {
    const shape = new THREE.Shape();
    shape.moveTo(-w/2 + r, -h/2);
    shape.lineTo(w/2 - r, -h/2);
    shape.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
    shape.lineTo(w/2, h/2 - r);
    shape.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
    shape.lineTo(-w/2 + r, h/2);
    shape.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
    shape.lineTo(-w/2, -h/2 + r);
    shape.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
    return new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false });
  }

  // ── Floor Platform ──
  const floorGeo = new THREE.BoxGeometry(7.5, 0.12, 5.5);
  const floorMat = new THREE.MeshPhysicalMaterial({ color: C.floor, roughness: 0.8, metalness: 0.3, transparent: true, opacity: 0.6 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -0.06;
  floor.receiveShadow = true;
  rack.add(floor);

  // Floor grid lines
  const gridMat = new THREE.LineBasicMaterial({ color: C.accent, transparent: true, opacity: 0.06 });
  for (let i = -3.5; i <= 3.5; i += 0.5) {
    const pts = [new THREE.Vector3(i, 0.01, -2.5), new THREE.Vector3(i, 0.01, 2.5)];
    rack.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
  }
  for (let i = -2.5; i <= 2.5; i += 0.5) {
    const pts = [new THREE.Vector3(-3.5, 0.01, i), new THREE.Vector3(3.5, 0.01, i)];
    rack.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
  }

  // ── Rack Frame ──
  function createRackFrame(x, z, height) {
    const group = new THREE.Group();
    const railMat = new THREE.MeshPhysicalMaterial({ color: C.rail, roughness: 0.4, metalness: 0.7 });
    const frameMat = new THREE.MeshPhysicalMaterial({ color: C.frame, roughness: 0.5, metalness: 0.6 });

    // 4 vertical rails
    const railGeo = new THREE.BoxGeometry(0.08, height, 0.08);
    const positions = [
      [-1.35, height/2, -0.9], [1.35, height/2, -0.9],
      [-1.35, height/2, 0.9],  [1.35, height/2, 0.9]
    ];
    positions.forEach(p => {
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(...p);
      rail.castShadow = true;
      group.add(rail);
    });

    // Top frame
    const topBarX = new THREE.Mesh(new THREE.BoxGeometry(2.78, 0.06, 0.06), frameMat);
    topBarX.position.set(0, height, -0.9);
    group.add(topBarX);
    const topBarX2 = topBarX.clone();
    topBarX2.position.z = 0.9;
    group.add(topBarX2);
    const topBarZ = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.88), frameMat);
    topBarZ.position.set(-1.35, height, 0);
    group.add(topBarZ);
    const topBarZ2 = topBarZ.clone();
    topBarZ2.position.x = 1.35;
    group.add(topBarZ2);

    group.position.set(x, 0, z);
    rack.add(group);
    return group;
  }

  // ── Server Unit (1U or 2U) ──
  function createServerUnit(rackX, rackZ, slotY, unitHeight, config) {
    const group = new THREE.Group();
    const w = 2.5, d = 1.6;
    const h = unitHeight;

    // Main chassis
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: config.active ? C.active : C.server,
      roughness: 0.35, metalness: 0.5, clearcoat: 0.4,
      transparent: true, opacity: 0.85
    });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), chassisMat);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    // Edge wireframe
    const edgeMat = new THREE.LineBasicMaterial({
      color: config.active ? C.accent : 0x475569,
      transparent: true, opacity: config.active ? 0.7 : 0.4
    });
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(chassis.geometry), edgeMat));

    // Front face plate
    const faceMat = new THREE.MeshPhysicalMaterial({
      color: config.active ? 0x0c4a6e : 0x172033,
      roughness: 0.6, metalness: 0.3
    });
    const face = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, h - 0.04, 0.02), faceMat);
    face.position.z = d/2 + 0.01;
    group.add(face);

    // LED indicators
    const ledColors = config.leds || [C.led_on, C.led_on, C.led_off];
    ledColors.forEach((color, i) => {
      const ledGeo = new THREE.SphereGeometry(0.028, 24, 24);
      const ledMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-w/2 + 0.15 + i * 0.12, h/2 - 0.08, d/2 + 0.03);
      group.add(led);
      leds.push({ mesh: led, baseColor: color, phase: Math.random() * Math.PI * 2, speed: 1.5 + Math.random() * 2 });
    });

    // Drive bays (small rectangles on front)
    if (config.drives) {
      const driveMat = new THREE.MeshPhysicalMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.2 });
      for (let i = 0; i < config.drives; i++) {
        const drive = new THREE.Mesh(new THREE.BoxGeometry(0.28, h * 0.6, 0.015), driveMat);
        drive.position.set(-w/2 + 0.6 + i * 0.35, 0, d/2 + 0.02);
        group.add(drive);
        // Drive LED
        const dLed = new THREE.Mesh(new THREE.SphereGeometry(0.015, 16, 16), new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.8 }));
        dLed.position.set(-w/2 + 0.6 + i * 0.35, h * 0.35, d/2 + 0.03);
        group.add(dLed);
        leds.push({ mesh: dLed, baseColor: 0x22c55e, phase: Math.random() * Math.PI * 2, speed: 3 + Math.random() * 4 });
      }
    }

    // Cooling fans (visible from back)
    if (config.fans) {
      for (let i = 0; i < config.fans; i++) {
        const fanGroup = new THREE.Group();
        const fanRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.15, 0.02, 24, 48),
          new THREE.MeshPhysicalMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.6 })
        );
        fanRing.rotation.y = Math.PI / 2;
        fanGroup.add(fanRing);

        // Fan blades
        const bladeMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.4 });
        for (let b = 0; b < 4; b++) {
          const blade = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.03), bladeMat);
          blade.rotation.x = (b / 4) * Math.PI;
          blade.position.set(0, 0, 0);
          fanGroup.add(blade);
        }

        const fanSpacing = w / (config.fans + 1);
        fanGroup.position.set(-w/2 + fanSpacing * (i + 1), 0, -d/2 - 0.01);
        fanGroup.rotation.y = Math.PI / 2;
        group.add(fanGroup);
        fans.push({ group: fanGroup, speed: 3 + Math.random() * 2 });
      }
    }

    // Heatsink blocks
    if (config.heatsinks) {
      const hsMat = new THREE.MeshPhysicalMaterial({ color: C.heatsink, roughness: 0.3, metalness: 0.8 });
      config.heatsinks.forEach(pos => {
        const hs = new THREE.Mesh(new THREE.BoxGeometry(0.5, h * 0.4, 0.5), hsMat);
        hs.position.set(pos[0], h * 0.15, pos[1]);
        group.add(hs);
        // Heatsink fins
        for (let f = 0; f < 5; f++) {
          const fin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.01, 0.02), hsMat);
          fin.position.set(pos[0], h * 0.15 + h * 0.2, pos[1] - 0.2 + f * 0.1);
          group.add(fin);
        }
      });
    }

    // Label sprite (4K resolution)
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024; labelCanvas.height = 192;
    const ctx = labelCanvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.font = '600 44px Inter, sans-serif';
    ctx.fillStyle = config.active ? '#67e8f9' : '#94a3b8';
    ctx.fillText(config.label, 512, 80);
    ctx.font = '500 28px Inter, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(config.sublabel || '', 512, 136);
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, transparent: true, depthTest: false }));
    labelSprite.scale.set(2.4, 0.45, 1);
    labelSprite.position.set(0, h/2 + 0.35, d/2 + 0.1);
    group.add(labelSprite);

    // Glow strip for active units
    if (config.active) {
      const glowMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.15 });
      const glow = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, h + 0.06, d + 0.1), glowMat);
      group.add(glow);
    }

    group.position.set(rackX, slotY + h/2, rackZ);
    rack.add(group);
    return group;
  }

  // ── Build Racks ──
  const rackHeight = 4.5;

  // Left rack — Compute servers
  const leftFrame = createRackFrame(-2.2, 0, rackHeight);
  createServerUnit(-2.2, 0, 0.15, 0.55, {
    label: 'AUTH SERVICE', sublabel: '1U • 64GB DDR5',
    active: false, leds: [C.led_on, C.led_off, C.led_off], drives: 2, fans: 2
  });
  createServerUnit(-2.2, 0, 0.85, 0.75, {
    label: 'CORE API', sublabel: '2U • 128GB DDR5 • NVME',
    active: true, leds: [C.led_on, C.led_on, C.led_on], drives: 4, fans: 3,
    heatsinks: [[-0.6, -0.1], [0.6, -0.1]]
  });
  createServerUnit(-2.2, 0, 1.75, 0.55, {
    label: 'LOAD BALANCER', sublabel: '1U • 32GB',
    active: true, leds: [C.led_on, C.led_on, C.led_off], drives: 1, fans: 2
  });
  createServerUnit(-2.2, 0, 2.45, 0.55, {
    label: 'MONITORING', sublabel: '1U • Prometheus',
    active: false, leds: [0x22c55e, C.led_off, C.led_off], fans: 1
  });
  createServerUnit(-2.2, 0, 3.15, 0.75, {
    label: 'WEB CLUSTER', sublabel: '2U • K8s Node Pool',
    active: true, leds: [C.led_on, C.led_on, C.led_on], drives: 3, fans: 3,
    heatsinks: [[0, -0.1]]
  });

  // Right rack — Data & ML
  const rightFrame = createRackFrame(2.2, 0, rackHeight);
  createServerUnit(2.2, 0, 0.15, 0.75, {
    label: 'POSTGRESQL', sublabel: '2U • 512GB • RAID-10',
    active: true, leds: [C.led_on, C.led_on, C.led_on], drives: 6, fans: 2,
    heatsinks: [[0, 0]]
  });
  createServerUnit(2.2, 0, 1.05, 0.55, {
    label: 'REDIS CACHE', sublabel: '1U • 256GB DDR5',
    active: true, leds: [C.led_on, C.led_on, C.led_off], fans: 2
  });
  createServerUnit(2.2, 0, 1.75, 0.75, {
    label: 'ML PIPELINE', sublabel: '2U • A100 GPU • CUDA',
    active: true, leds: [C.led_on, C.led_on, C.led_on], drives: 2, fans: 3,
    heatsinks: [[-0.5, -0.1], [0.5, -0.1]]
  });
  createServerUnit(2.2, 0, 2.65, 0.55, {
    label: 'S3 / CDN', sublabel: '1U • Object Storage',
    active: false, leds: [C.led_on, C.led_off, C.led_off], drives: 4, fans: 1
  });
  createServerUnit(2.2, 0, 3.35, 0.55, {
    label: 'BACKUP', sublabel: '1U • Cold Storage',
    active: false, leds: [0x22c55e, C.led_off, C.led_off], fans: 1
  });

  // ── Cable Bundles between racks ──
  const cableMat = new THREE.MeshBasicMaterial({ color: C.cable, transparent: true, opacity: 0.25 });
  const cableGlowMat = new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.08 });
  const cableRoutes = [
    { from: [-0.85, 1.2, 0], to: [0.85, 0.5, 0] },
    { from: [-0.85, 2.0, 0], to: [0.85, 1.3, 0] },
    { from: [-0.85, 3.5, 0], to: [0.85, 2.1, 0] },
    { from: [-0.85, 0.4, 0.3], to: [0.85, 0.4, 0.3] },
    { from: [-0.85, 2.8, -0.3], to: [0.85, 2.9, -0.3] },
  ];

  cableRoutes.forEach(route => {
    const mid = new THREE.Vector3(
      (route.from[0] + route.to[0]) / 2,
      Math.min(route.from[1], route.to[1]) - 0.3,
      (route.from[2] + route.to[2]) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...route.from),
      mid,
      new THREE.Vector3(...route.to)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.025, 12, false);
    rack.add(new THREE.Mesh(tubeGeo, cableMat));

    // Glow tube
    const glowGeo = new THREE.TubeGeometry(curve, 48, 0.06, 12, false);
    rack.add(new THREE.Mesh(glowGeo, cableGlowMat));

    cables.push({ curve, length: curve.getLength() });
  });

  // ── Data Flow Particles ──
  const particleGeo = new THREE.SphereGeometry(0.04, 16, 16);
  for (let i = 0; i < 25; i++) {
    const cable = cables[i % cables.length];
    const isHighlight = i % 5 === 0;
    const mat = new THREE.MeshBasicMaterial({
      color: isHighlight ? 0x67e8f9 : 0x38bdf8,
      transparent: true, opacity: isHighlight ? 1.0 : 0.7
    });
    const particle = new THREE.Mesh(particleGeo, mat);
    rack.add(particle);

    // Point light for highlight particles
    let pLight = null;
    if (isHighlight) {
      pLight = new THREE.PointLight(0x38bdf8, 0.15, 1.5);
      particle.add(pLight);
    }

    dataParticles.push({
      mesh: particle,
      curve: cable.curve,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  // ── Status label floating above (4K resolution) ──
  function createFloatingLabel(text, x, y, z, color) {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 192;
    const ctx = c.getContext('2d');
    ctx.textAlign = 'center';
    ctx.font = '600 72px Inter, sans-serif';
    ctx.fillStyle = color || '#38bdf8';
    ctx.fillText(text, c.width / 2, c.height / 2 + 24);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    sprite.scale.set(1.8, 0.34, 1);
    sprite.position.set(x, y, z);
    rack.add(sprite);
    return sprite;
  }

  createFloatingLabel('COMPUTE RACK', -2.2, rackHeight + 0.5, 0, '#67e8f9');
  createFloatingLabel('DATA & ML RACK', 2.2, rackHeight + 0.5, 0, '#67e8f9');

  // ── Resize handler ──
  function resizePipeline() {
    const bounds = pipelineStage.getBoundingClientRect();
    const aspect = bounds.width / bounds.height;
    const viewH = frustum * 2 * 0.85;
    camera.left = -(viewH * aspect) / 2;
    camera.right = (viewH * aspect) / 2;
    camera.top = viewH / 2;
    camera.bottom = -viewH / 2;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(renderPixelRatio);
    renderer.setSize(bounds.width, bounds.height, false);
  }

  // ── Pointer tracking ──
  pipelineStage.addEventListener('pointermove', event => {
    const bounds = pipelineStage.getBoundingClientRect();
    pointer.tx = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.ty = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });
  pipelineStage.addEventListener('pointerleave', () => { pointer.tx = 0; pointer.ty = 0; });
  window.addEventListener('resize', resizePipeline);
  resizePipeline();

  // ── Animation Loop ──
  function animate(time) {
    const t = time * 0.001;
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // Isometric orbit — subtle rotation around the rack
    const baseAngle = Math.PI / 4;
    rack.rotation.y = baseAngle + pointer.x * 0.25;
    rack.rotation.x = pointer.y * -0.08;

    // LED blink
    leds.forEach(led => {
      if (reducedMotion) return;
      const blink = Math.sin(t * led.speed + led.phase) * 0.5 + 0.5;
      led.mesh.material.opacity = 0.4 + blink * 0.6;
    });

    // Fan spin
    fans.forEach(fan => {
      if (reducedMotion) return;
      fan.group.children.forEach((child, i) => {
        if (i > 0) child.rotation.x += fan.speed * 0.03;
      });
    });

    // Data particles
    dataParticles.forEach(p => {
      if (reducedMotion) return;
      p.progress += p.speed * p.direction;
      if (p.progress > 1) { p.progress = 1; p.direction = -1; }
      if (p.progress < 0) { p.progress = 0; p.direction = 1; }
      const pos = p.curve.getPoint(p.progress);
      p.mesh.position.copy(pos);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ── Resume Preview Modal ────────────────────
const resumeModal = document.getElementById('resume-modal');
const resumeBackdrop = document.getElementById('resume-backdrop');
const closeResumeModal = document.getElementById('close-resume-modal');
const resumeTriggers = document.querySelectorAll('.resume-trigger');

function openResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove('opacity-0', 'pointer-events-none');
  resumeModal.classList.add('opacity-100', 'pointer-events-auto');
  const dialog = resumeModal.querySelector('.transform');
  if (dialog) {
    dialog.classList.remove('scale-95');
    dialog.classList.add('scale-100');
  }
  document.body.style.overflow = 'hidden';
}

function closeResumeModalHandler() {
  if (!resumeModal) return;
  resumeModal.classList.remove('opacity-100', 'pointer-events-auto');
  resumeModal.classList.add('opacity-0', 'pointer-events-none');
  const dialog = resumeModal.querySelector('.transform');
  if (dialog) {
    dialog.classList.remove('scale-100');
    dialog.classList.add('scale-95');
  }
  document.body.style.overflow = '';
}

resumeTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openResumeModal();
  });
});

if (closeResumeModal) {
  closeResumeModal.addEventListener('click', (e) => {
    e.preventDefault();
    closeResumeModalHandler();
  });
}

if (resumeBackdrop) {
  resumeBackdrop.addEventListener('click', (e) => {
    e.preventDefault();
    closeResumeModalHandler();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resumeModal && !resumeModal.classList.contains('pointer-events-none')) {
    closeResumeModalHandler();
  }
});

