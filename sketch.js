function Player(x, y, sx, sy){
  this.ax = 0
  this.ay = 0
  this.vx = 0 
  this.vy = 0 
  this.x = x 
  this.y = y 
  this.sx = sx
  this.sy = sy
  this.onFloor = false
  this.onPlatform = false
  this.v = sqrt((this.vx * this.vx)+(this.vy*this.vy))
}

function Vertex(x,y){
  this.x = x
  this.y = y
}

function Platform(v1,v3){
  this.x1 = v1.x
  this.y1 = v1.y
  this.x2 = v1.x
  this.y2 = v3.y
  this.x3 = v3.x
  this.y3 = v3.y
  this.x4 = v3.x
  this.y4 = v1.y
  this.sx = abs(this.x1 - this.x3)
  this.sy = abs(this.y1 - this.y3)
}

function Hedef(v1){
  this.x = v1.x
  this.y = v1.y 
}

var ww = 1000
var wh = 1500
var g = 1
var inst
var plat = []


function setup() {
  createCanvas(ww, wh);
  pl = new Player(425, 460, 50, 80)
  v1 = new Vertex(600,1350)
  v2 = new Vertex(800,1300)
  p1 = new Platform(v1,v2)
  plat.push(p1)
  v1 = new Vertex(200,1150)
  v2 = new Vertex(400,1100)
  p2 = new Platform(v1,v2)
  plat.push(p2)
  v1 = new Vertex(650,950)
  v2 = new Vertex(850,900)
  p3 = new Platform(v1,v2)
  plat.push(p3)
  v1 = new Vertex(150,750)
  v2 = new Vertex(350,700)
  p4 = new Platform(v1,v2)
  plat.push(p4)
  v1 = new Vertex(600,550)
  v2 = new Vertex(800,500)
  p6 = new Platform(v1,v2)
  plat.push(p6)
  v1 = new Vertex(500,200)
  h1 = new Hedef(v1)

}

function draw() {

  background(220);
  fill(0)
  circle(h1.x,h1.y,10)

  for (var key in plat){                           
    rect(plat[key].x2,plat[key].y2,plat[key].sx,plat[key].sy)              // RENDER THE PLATFORMS
    if(pl.y + pl.sy > plat[key].y3 && pl.y + pl.sy < plat[key].y1){        // 
      if(pl.x < plat[key].x3 && pl.x + pl.sx> plat[key].x1){               // PLATFORM CHECK
        pl.y = plat[key].y2 - (pl.sy)                                      // 
        pl.vy = 0                                                          // IDK WHY BUT MUST BE BEFORE KEYBOARD CONTROLS
        pl.ay = 0                                                          // 
        pl.onPlatform = true                                               //
    }}}

  if(keyIsPressed){
    if(keyIsDown(65)){                                        //
      console.log("a pressed")                                //                            
      pl.vx = -20                                             //                                                          
    }else if(keyIsDown(68)){                                  //      KEYBOARD CONTROLS                                                
      console.log("d pressed")                                //                           
      pl.vx = 20                                              //                                                   
    }else if(!keyIsDown(68) && !keyIsDown(65)){pl.vx = 0}     //                                                          
    if(keyIsDown(87) ){                                       //
      if(pl.onFloor == true || pl.onPlatform == true){        //                                                            
      inst = true                                             //      KEYBOARD CONTROLS  
      pl.onPlatform = false                                   //                                                            
      pl.vy = -25                                             //  
      pl.ay = g                                               //  
      console.log("w pressed")                                //  
    }}                                                             
  }else{
    pl.vx = 0
  }                                                         
  
  if(pl.y >= wh-pl.sy && inst == false){                      // FLOOR CHECK
    pl.y = wh-pl.sy
    pl.vy = 0       
    pl.ay = 0
    pl.onFloor = true
  }else{
    pl.ay = g
    pl.onFloor = false
  }

  pl.vx = pl.vx + pl.ax                                           // ACCELERATION SPEED CALCULATIONS
  pl.vy = pl.vy + pl.ay                                           //     MUST BE LAST !!!!!!
  pl.x = pl.x + pl.vx
  pl.y = pl.y + pl.vy
  rect(pl.x,pl.y,pl.sx,pl.sy)
  inst = false

  if(pl.x < h1.x && pl.x+pl.sx > h1.x && pl.y < h1.y && pl.y+pl.sy > h1.y){
    fill(207, 23, 164)
    stroke(207, 23, 164)                                          // CHECK IF THE GAME IS FINISHED
    textSize(250)   
    text("you win", 70 , 450 ,)
    noLoop()
  }}