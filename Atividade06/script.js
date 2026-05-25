(function () {
  const canvas = document.getElementById('animCanvas');
  const ctx = canvas.getContext('2d');
  const CW = canvas.width;
  const CH = canvas.height;

  const SW = 60;
  const SH = 80;

  let shipX = (CW - SW) / 2;
  let shipY = (CH - SH) / 2;

  // --- Estrelas animadas ---
  const stars = [];
  const STAR_COUNT = 80;

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * CW,
      y: Math.random() * CH,
      radius: Math.random() * 1.8 + 0.2,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.8 + 0.2
    });
  }

  function updateStars() {
    for (let s of stars) {
      s.y += s.speed;
      if (s.y > CH) {
        s.y = 0;
        s.x = Math.random() * CW;
      }
    }
  }

  function drawBackground() {
    // Fundo base
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, CW, CH);

    // Nebulosa muito sutil (dois gradientes)
    let grad1 = ctx.createRadialGradient(80, 100, 30, 80, 100, 130);
    grad1.addColorStop(0, 'rgba(70, 130, 180, 0.05)');
    grad1.addColorStop(1, 'rgba(70, 130, 180, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, CW, CH);

    let grad2 = ctx.createRadialGradient(220, 180, 40, 220, 180, 140);
    grad2.addColorStop(0, 'rgba(100, 70, 150, 0.04)');
    grad2.addColorStop(1, 'rgba(100, 70, 150, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, CW, CH);

    // Estrelas
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      ctx.fill();
    }
  }

  // --- Desenho da nave (igual ao anterior) ---
  function drawSpaceship(x, y) {
    const cx = x + SW / 2;
    const cy = y + SH / 2;

    // Corpo
    ctx.fillStyle = '#c5c6c7';
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(x + SW, y + SH * 0.6);
    ctx.lineTo(x + SW * 0.7, y + SH);
    ctx.lineTo(x + SW * 0.3, y + SH);
    ctx.lineTo(x, y + SH * 0.6);
    ctx.closePath();
    ctx.fill();

    // Asa inferior
    ctx.fillStyle = '#45a29e';
    ctx.beginPath();
    ctx.moveTo(x + SW * 0.15, y + SH * 0.6);
    ctx.lineTo(x + SW * 0.85, y + SH * 0.6);
    ctx.lineTo(x + SW, y + SH * 0.9);
    ctx.lineTo(x, y + SH * 0.9);
    ctx.closePath();
    ctx.fill();

    // Cabine
    ctx.fillStyle = '#66fcf1';
    ctx.beginPath();
    ctx.ellipse(cx, cy + SH * 0.05, SW * 0.25, SH * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Propulsor externo
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.moveTo(cx - SW * 0.15, y + SH * 0.85);
    ctx.lineTo(cx + SW * 0.15, y + SH * 0.85);
    ctx.lineTo(cx, y + SH + 8);
    ctx.closePath();
    ctx.fill();

    // Propulsor interno
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(cx - SW * 0.08, y + SH * 0.85);
    ctx.lineTo(cx + SW * 0.08, y + SH * 0.85);
    ctx.lineTo(cx, y + SH + 2);
    ctx.closePath();
    ctx.fill();
  }

  // --- Loop de animação ---
  function animate() {
    updateStars();
    drawBackground();
    drawSpaceship(shipX, shipY);
    requestAnimationFrame(animate);
  }
  animate();

  // --- Controle do mouse (inalterado) ---
  canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let newX = mouseX - SW / 2;
    let newY = mouseY - SH / 2;

    newX = Math.max(0, Math.min(newX, CW - SW));
    newY = Math.max(0, Math.min(newY, CH - SH));

    if (newX !== shipX || newY !== shipY) {
      shipX = newX;
      shipY = newY;
    }
  });

  canvas.addEventListener('mouseleave', function () {
    // Nenhuma ação extra necessária; a nave já está na última posição válida
  });
})();