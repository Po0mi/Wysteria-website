// Three.js Scene Setup
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0,
  mouseY = 0;
let targetX = 0,
  targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Initialize Three.js
function initThree() {
  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.z = 400;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Create Particle System
  createParticleSystem();

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x5a189a, 2, 500);
  pointLight.position.set(0, 0, 250);
  scene.add(pointLight);

  // Create floating geometries
  createFloatingGeometries();
}

// Create Particle System
function createParticleSystem() {
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 1000;
    positions[i3 + 1] = (Math.random() - 0.5) * 1000;
    positions[i3 + 2] = (Math.random() - 0.5) * 1000;

    // Purple-ish colors
    colors[i3] = Math.random() * 0.5 + 0.5;
    colors[i3 + 1] = Math.random() * 0.3;
    colors[i3 + 2] = Math.random() * 0.5 + 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

// Create floating geometric shapes
function createFloatingGeometries() {
  const geometries = [
    new THREE.OctahedronGeometry(20, 0),
    new THREE.TetrahedronGeometry(25, 0),
    new THREE.IcosahedronGeometry(15, 0),
  ];

  geometries.forEach((geometry, index) => {
    const material = new THREE.MeshPhongMaterial({
      color: 0x5a189a,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Random positions
    mesh.position.x = (Math.random() - 0.5) * 400;
    mesh.position.y = (Math.random() - 0.5) * 400;
    mesh.position.z = (Math.random() - 0.5) * 400;

    scene.add(mesh);

    // Animate with GSAP
    gsap.to(mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 10 + index * 2,
      repeat: -1,
      ease: "none",
    });

    gsap.to(mesh.position, {
      y: mesh.position.y + 50,
      duration: 3 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth camera movement following mouse
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  camera.position.x += (targetX - camera.position.x) * 0.05;
  camera.position.y += (-targetY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  // Rotate particle system
  if (particleSystem) {
    particleSystem.rotation.y += 0.0005;
    particleSystem.rotation.x += 0.0003;
  }

  renderer.render(scene, camera);
}

// Mouse move handler
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

// Window resize handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Particle Canvas (2D overlay)
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles2D = [];
  const particleCount = 50;

  // Create 2D particles
  for (let i = 0; i < particleCount; i++) {
    particles2D.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  // Animate 2D particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles2D.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Resize handler for 2D canvas
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// GSAP Animations for content
function initGSAPAnimations() {
  // Glitch text animation
  const glitchText = document.querySelector(".glitch-text");

  gsap.fromTo(
    glitchText,
    {
      opacity: 0,
      scale: 0.5,
      rotationX: -90,
    },
    {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1,
      ease: "back.out(1.7)",
    },
  );

  // Floating symbols animation with GSAP
  const symbols = document.querySelectorAll(".floating-symbol");
  symbols.forEach((symbol, index) => {
    gsap.fromTo(
      symbol,
      {
        opacity: 0,
        scale: 0,
        rotation: -180,
      },
      {
        opacity: 0.15,
        scale: 1,
        rotation: 0,
        duration: 1,
        delay: 0.5 + index * 0.2,
        ease: "elastic.out(1, 0.5)",
      },
    );
  });

  // Button hover effect enhancement
  const button = document.querySelector(".return-button");

  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  // Continuous glitch effect
  setInterval(() => {
    gsap.to(glitchText, {
      x: Math.random() * 4 - 2,
      duration: 0.05,
      yoyo: true,
      repeat: 1,
    });
  }, 3000);
}

// Initialize everything
function init() {
  initThree();
  initParticleCanvas();
  initGSAPAnimations();
  animate();

  // Event listeners
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
