/* fireworks.js — celebration animation. Exposes window.triggerFireworks() for booking.js. */

// ---------------------------------------------------------------
// Fireworks celebration — plays once after a successful booking
// ---------------------------------------------------------------
(function () {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  const msg = document.getElementById("celebrateMsg");
  let particles = [];
  let animating = false;
  let rafId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const colors = ["#7BB862", "#0989F1", "#0247FF", "#F2F3F5", "#006B3D", "#7BB862", "#0989F1"];

  function spawnBurst(x, y) {
    const count = 60;
    const hue = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: hue,
        size: 2 + Math.random() * 2,
        gravity: 0.045,
        decay: 0.012 + Math.random() * 0.012
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
    });
    particles = particles.filter((p) => p.alpha > 0);

    particles.forEach((p) => {
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (animating || particles.length > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  window.triggerFireworks = function () {
    canvas.classList.add("active");
    msg.classList.add("active");
    animating = true;

    let bursts = 0;
    const maxBursts = 6;
    const burstInterval = setInterval(() => {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const y = canvas.height * (0.2 + Math.random() * 0.35);
      spawnBurst(x, y);
      bursts++;
      if (bursts >= maxBursts) {
        clearInterval(burstInterval);
        animating = false;
      }
    }, 350);

    if (!rafId) tick();

    setTimeout(() => {
      canvas.classList.remove("active");
      msg.classList.remove("active");
    }, 3200);
  };
})();
