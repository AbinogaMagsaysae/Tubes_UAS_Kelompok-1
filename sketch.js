
let debug = true;
let path;
let bg;
let pesawatAB= [];
let pesawatBA= [];
let itera;
let mtk;
let f2;

function preload(){
  itera = loadImage("ITERA.png")
  mtk = loadImage("mtk.png")
  bg = loadImage("bg.jpeg")
  f2 = loadFont('f2.otf')

}


function setup() {
  createCanvas(800,400);
  newPath();
  for(var i=0;i<8;i++){
    pesawatAB[i] = new Vehicle(0,200+random(5),random(4),random(0.2))                     
  }
}

function draw() {
  background(102, 178, 255);
  image(bg,0,0,800,400);
  image(itera,710,20,30,30);
  image(mtk,750,20,30,30);
  fill('black')
  textFont('f2');
  textSize(10);
  text('Simulasi Lalu Lintas Pesawat Terbang',10,325)
  text('Kelompok 1 :',10,335)
  text('1. Abinoga Magsaysae',10,345)
  text('2. Ahmad Khoirul Fikri',10,355)
  text('3. Khalila Adiba Safa',10,365)
  text('4. Nada Afra Kamila',10,375)
  text('5. Iin Nur Aini',10,385)
  text('6. Arsy Aliffia',10,395)
  
  
  for(var i=0; i<8; i++){
  pesawatAB[i].follow(path1);
  pesawatAB[i].run();
  pesawatAB[i].borders(path1);
  }
  

}

function newPath() {
  path1 = new Path1();
  path1.addPoint(0, 200, 0, 150);
  path1.addPoint(240,10, 0, 600);
  path1.addPoint(800 + 20, 350);
  
  
}

