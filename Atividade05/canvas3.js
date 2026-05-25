let canvas3 = document.getElementById('canvas3');
let ctx3 = canvas3.getContext('2d');

ctx3.lineWidth = 1;

// --- 1. LINHAS DE FUNDO ---

// Linha horizontal verde
ctx3.beginPath();
ctx3.strokeStyle = '#28a745';
ctx3.moveTo(0, 150);
ctx3.lineTo(300, 150);
ctx3.stroke();

// Linha vertical cinza
ctx3.beginPath();
ctx3.strokeStyle = '#6c757d';
ctx3.moveTo(150, 150);
ctx3.lineTo(150, 300);
ctx3.stroke();

// Linha diagonal azul
ctx3.beginPath();
ctx3.strokeStyle = '#0000ff';
ctx3.moveTo(50, 50);
ctx3.lineTo(150, 150);
ctx3.stroke();

// Linha diagonal vermelha
ctx3.beginPath();
ctx3.strokeStyle = '#ff0000';
ctx3.moveTo(250, 50);
ctx3.lineTo(150, 150);
ctx3.stroke();


// --- 2. ARCOS VERDES (APENAS LINHA) ---
ctx3.strokeStyle = '#28a745';

ctx3.beginPath();
ctx3.arc(150, 150, 40, Math.PI, 2 * Math.PI);
ctx3.stroke();

ctx3.beginPath();
ctx3.arc(150, 150, 60, Math.PI, 2 * Math.PI);
ctx3.stroke();

ctx3.beginPath();
ctx3.arc(150, 300, 50, Math.PI, 2 * Math.PI);
ctx3.stroke();

ctx3.beginPath();
ctx3.arc(150, 300, 80, Math.PI, 2 * Math.PI);
ctx3.stroke();


// --- 3. QUADRADOS E FORMAS (PREENCHIMENTO) ---

// Quadrado Azul (Canto superior esquerdo)
ctx3.beginPath();
ctx3.fillStyle = '#0000ff';
ctx3.fillRect(0, 0, 50, 50);

// Quadrado Vermelho (Canto superior direito)
ctx3.beginPath();
ctx3.fillStyle = '#ff0000';
ctx3.fillRect(250, 0, 50, 50);

// Blocos Cyan (Lados)
ctx3.beginPath();
ctx3.fillStyle = '#00ffff';
ctx3.fillRect(0, 120, 30, 30);
ctx3.fillRect(0, 150, 30, 30);
ctx3.fillRect(270, 135, 30, 30);

// Quadrado Vermelho (Centro)
ctx3.beginPath();
ctx3.fillStyle = '#ff0000';
ctx3.fillRect(110, 150, 40, 40);

// L Amarelo (Canto inferior esquerdo)
ctx3.beginPath();
ctx3.fillStyle = '#ffff00';
ctx3.fillRect(0, 240, 30, 30);
ctx3.fillRect(0, 270, 30, 30);
ctx3.fillRect(30, 270, 30, 30);

// L Preto (Canto inferior direito)
ctx3.beginPath();
ctx3.fillStyle = '#000000';
ctx3.fillRect(270, 240, 30, 30);
ctx3.fillRect(270, 270, 30, 30);
ctx3.fillRect(240, 270, 30, 30);


// --- 4. FORMAS CIRCULARES PREENCHIDAS ---

// Círculo Cyan central com borda Azul
ctx3.beginPath();
ctx3.arc(150, 115, 15, 0, 2 * Math.PI);
ctx3.fillStyle = '#00ffff';
ctx3.fill();
ctx3.strokeStyle = '#0000ff';
ctx3.stroke();

// Círculo Amarelo esquerdo com borda Verde
ctx3.beginPath();
ctx3.arc(85, 215, 15, 0, 2 * Math.PI);
ctx3.fillStyle = '#ffff00';
ctx3.fill();
ctx3.strokeStyle = '#28a745';
ctx3.stroke();

// Círculo Amarelo direito com borda Verde
ctx3.beginPath();
ctx3.arc(215, 215, 15, 0, 2 * Math.PI);
ctx3.fillStyle = '#ffff00';
ctx3.fill();
ctx3.strokeStyle = '#28a745';
ctx3.stroke();

// Semi-círculo Cyan inferior com borda Verde
ctx3.beginPath();
ctx3.arc(150, 300, 40, Math.PI, 2 * Math.PI);
ctx3.fillStyle = '#00ffff';
ctx3.fill();
ctx3.strokeStyle = '#28a745';
ctx3.stroke();


// --- 5. TEXTO ---
ctx3.beginPath();
ctx3.fillStyle = '#333333';
ctx3.font = "20px Arial";
ctx3.textAlign = "center";
ctx3.fillText("Canvas", 150, 65);