const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImg = document.createElement("img");
backgroundImg.src="file:///C:/Users/HP/Desktop/working%20files/html/img/nkatr.jpg";
const heroImg=document.createElement("img");
heroImg.src="file:///C:/Users/HP/Desktop/working%20files/html/img/bear.png";
const starImg=document.createElement("img");
starImg.src="file:///C:/Users/HP/Desktop/working%20files/html/img/snow.png";

const rabbitImg = document.createElement("img");
rabbitImg.src = "http://images6.fanpop.com/image/photos/39300000/dove-9-disney-princess-39351508-2500-2500.png";

const stabAudio = document.createElement("audio");
stabAudio.src = "https://soundbible.com//mp3/Stab-SoundBible.com-766875573.mp3";

const audio=document.createElement("audio");
audio.src="file:///C:/Users/HP/Downloads/EML6Z8D-ball-rolls-by.mp3"

let data ={ 
    hero:{
      xDelta:0,
      yDelta:0,
        X:10,
        y:400,
        width:300,
        height:300
      
    },
    bullets:[],
    rabbits:[]
};

function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
      num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
      y = Math.max(rect1.y, rect2.y),
      num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};


function update() {
  data.hero.X += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;
  
  data.bullets.forEach(function (bullet) {
    data.rabbits.forEach(function(rabbit) {
      if(intersect(rabbit, bullet)) {
          stabAudio.currentTime = 0;
          stabAudio.play();
          bullet.deleteMe = true;
          rabbit.deleteMe = true;
      }
    });
  });

  data.bullets = data.bullets.filter(function (bullet) {
    return bullet.deleteMe !== true;
  });
  data.rabbits = data.rabbits.filter(function (rabbit) {
    return rabbit.deleteMe !== true;
  });


  data.bullets.forEach(function(bullet){
bullet.x += bullet.xDelta;
  });

  data.bullets= data.bullets.filter(function(bullet){
    if(bullet.x> canvas.width){
      return false;
    }
    return true;
  });
  data.rabbits.forEach(function(rabbit){
    rabbit.x += rabbit.xDelta;
  });
  if(data.rabbits.length === 0){
   data.rabbits.push({
     xDelta:-1,
     x:canvas.width-100,
     y:data.hero.y,
     width: 100,
     height: 100

   });

    }
  
  
}

function draw() {
  
  context.drawImage(backgroundImg,0,0,canvas.width,canvas.height );
  context.drawImage(heroImg, data.hero.X, data.hero.y, data.hero.width, data.hero.height );

  data.bullets.forEach(function(bullet){
  context.drawImage(starImg,bullet.x,bullet.y,bullet.width,bullet.height);
  });
  data.rabbits.forEach(function(rabbit){
    context.drawImage(rabbitImg,rabbit.x,rabbit.y,rabbit.width,rabbit.height); 

});
}

function loop() {
  requestAnimationFrame(loop);
  
  update();
  draw();
}

loop();

document.addEventListener("keydown", function(evt) {
  if(evt.code === "ArrowRight"){
    data.hero.xDelta =1;

  } else if (evt.code === "ArrowLeft"){
    data.hero.xDelta= -1;
  }
  else  if (evt.code === "ArrowDown"){
    data.hero.yDelta= 1;}
    else if(evt.code==="ArrowUp"){
      data.hero.yDelta =-1;
    }
   else{
    audio.currentTime=0;
    audio.play();
    data.bullets.push( {
      xDelta:5,
      x: data.hero.X+data.hero.width/1.5,
      y: data.hero.y+data.hero.height/2,
      width:70,
      height:70

    });
  }
 
});
document.addEventListener("keyup", function(evt) {
  data.hero.xDelta=0,
  data.hero.yDelta=0;
}

);