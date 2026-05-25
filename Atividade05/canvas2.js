let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');

ctx2.beginPath();
ctx2.lineWidth = 5 ;
ctx2.font = "90px Arial"
ctx2.textAlign = "center";

//chao
ctx2.fillStyle = 'gray';
ctx2.fillRect(0,300,400,100);
// x,y,lx,ay

ctx2.fillStyle = '#8C4A23';
//casa
ctx2.fillRect(140,220,80,80);
//arvores
ctx2.fillRect(40,270,15,30);
ctx2.fillRect(303,315,15,35);

//janela
ctx2.fillStyle = 'gray';
ctx2.fillStyle = '#61BBFB';
ctx2.fillRect(150,235,20,20);
ctx2.fillRect(190,235,20,20);

//porta
ctx2.fillStyle = '#5F4525';
ctx2.fillRect(170,255,20,45);

//sol
ctx2.fillStyle = '#F2E641';
ctx2.moveTo(260,100);
ctx2.arc(260,100,40,0,2.5*Math.PI);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
//copa da arvore
ctx2.fillStyle = '#408C2B';
ctx2.moveTo(47,250);
ctx2.arc(47,250,25,0,2.5*Math.PI);
ctx2.moveTo(310,295);
ctx2.arc(310,295,25,0,2.5*Math.PI);
ctx2.fill();

ctx2.closePath();

//telhado
ctx2.beginPath();
ctx2.fillStyle = '#EC6E52';
ctx2.moveTo(180,180);
ctx2.lineTo(140,220);
ctx2.lineTo(220,220);
ctx2.fill();
ctx2.closePath();

//zul
ctx2.beginPath();
ctx2.fillStyle = '#598CFA';
ctx2.moveTo(0,300);
ctx2.arc(0,300,30,1.5*Math.PI,2*Math.PI);
ctx2.moveTo(140,400);
ctx2.arc(140,400,30,1.5*Math.PI,2*Math.PI);
ctx2.fill();
ctx2.fillRect(0,370,140,30);
ctx2.fillRect(0,300,30,100);
ctx2.closePath();
