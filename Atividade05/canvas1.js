let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

ctx1.beginPath();
ctx1.lineWidth = 5 ;
ctx1.strokeStyle = 'red' ;
ctx1.fillStyle = 'white';
ctx1.font = "90px Arial"
ctx1.textAlign = "center";

// retagulo
ctx1.fillRect(200,50,50,50);
ctx1.strokeRect(200,50,50,50);


//linhas
ctx1.moveTo(200,150);
ctx1.lineTo(60,10);
ctx1.lineTo(60,250)
ctx1.lineTo(200,150);
ctx1.fill();
ctx1.stroke();


//arco
ctx1.moveTo(300,200);
ctx1.arc(250,200,50,0,2.5*Math.PI);
// x,y,r,ini,fim
ctx1.fill();
ctx1.stroke();
ctx1.moveTo(300,290);
ctx1.arc(300,340,50,1.5*Math.PI,2.5*Math.PI);
ctx1.fill();
ctx1.stroke();

//txt
ctx1.fillText("Olá",200,350);
ctx1.strokeText("Olá",200,350);

ctx1.closePath();