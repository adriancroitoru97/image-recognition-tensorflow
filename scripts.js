/*!
* Start Bootstrap - Landing Page v6.0.5 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



let vect=[]

/* refresh page */
function refresh(){
  window.location.reload();
}


function displayResults(vect) {
  let indvect = [0, 1, 2, 3];
  for (var i = 0; i < 3; i++) {
    for (var j = i + 1; j < 4; j++) {
      if (vect[i] < vect[j]) {
        let aux = vect[i];
        vect[i] = vect[j];
        vect[j] = aux;

        aux = indvect[i];
        indvect[i] = indvect[j];
        indvect[j] = aux;
      }
    }
  }

  console.log(indvect);

  if (indvect[0] == 0) {
    setTimeout(gameAppear("assets/games/assasn.jpg"), 7000);
  } else if (indvect[0] == 1) {
    setTimeout(gameAppear("assets/games/grow.jpg"), 7000);
  } else if (indvect[0] == 2) {
    setTimeout(gameAppear("assets/games/rainbow.jpg"), 7000);
  } else {
    setTimeout(gameAppear("assets/games/anno.jpg"), 7000);
  }
}



/* click button scroll down script */
  window.smoothScroll = function(target) {

  // apelam aiul
  var link = document.getElementById('emailAddress').value;
  testModel(link).then(displayResults(vect));

  

  // dispare roata, apare poza
  const timer = setTimeout(wheelDissappear, 7000);
  const timer2 = setTimeout(gameAppear, 7000);

  // the actual scroll
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

// wheel dissappear, game image appear
function wheelDissappear() {
  document.getElementById("loading_container").style.opacity = 0;
  document.getElementById("loading_container").style.transition = "all 1.5s";

  
  
}

function gameAppear(image) {
  document.getElementById("signup").style.transition = "all 2s";
  document.getElementById("signup").style.zIndex = -1;
  document.getElementById("signup").style.opacity = 0.8;
  document.getElementById("signup").style.backgroundImage = "url(image)";
  
  
      // var image = new Image();
      // // Image for transition
      // image.src = "assets/games/anno.jpg";
      // image.onload = function () {
      //   $(".call-to-action").css("background-image", 
      //                     "url('" + image.src + "')");
      // }

}




/* loading spinning shit */
var points = [],
  velocity2 = 5, // velocity squared
  canvas = document.getElementById('loading_container'),
  context = canvas.getContext('2d'),
  radius = 5,
  boundaryX = 200,
  boundaryY = 200,
  numberOfPoints = 30;

init();

function init() {
  // create points
  for (var i = 0; i<numberOfPoints; i++) {
    createPoint();
  }
  // create connections
  for (var i = 0, l=points.length; i<l; i++) {
    var point = points[i];
    if(i == 0) {
      points[i].buddy = points[points.length-1];
    } else {
      points[i].buddy = points[i-1];
    }
  }
  
  // animate
  animate();
}

function createPoint() {
  var point = {}, vx2, vy2;
  point.x = Math.random()*boundaryX;
  point.y = Math.random()*boundaryY;
  // random vx 
  point.vx = (Math.floor(Math.random())*2-1)*Math.random();
  vx2 = Math.pow(point.vx, 2);
  // vy^2 = velocity^2 - vx^2
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
  points.push(point);
}

function resetVelocity(point, axis, dir) {
  var vx, vy;
  if(axis == 'x') {
    point.vx = dir*Math.random();  
    vx2 = Math.pow(point.vx, 2);
  // vy^2 = velocity^2 - vx^2
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
  } else {
    point.vy = dir*Math.random();  
    vy2 = Math.pow(point.vy, 2);
  // vy^2 = velocity^2 - vx^2
  vx2 = velocity2 - vy2;
  point.vx = Math.sqrt(vx2) * (Math.random()*2-1);
  }
}

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = '#97badc';
  context.fill();  
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = '#8ab2d8'
  context.stroke();
}  

function draw() {
  for(var i =0, l=points.length; i<l; i++) {
    // circles
    var point = points[i];
    point.x += point.vx;
    point.y += point.vy;
    drawCircle(point.x, point.y);
    // lines
    drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
    // check for edge
    if(point.x < 0+radius) {
      resetVelocity(point, 'x', 1);
    } else if(point.x > boundaryX-radius) {
      resetVelocity(point, 'x', -1);
    } else if(point.y < 0+radius) {
      resetVelocity(point, 'y', 1);
    } else if(point.y > boundaryY-radius) {
      resetVelocity(point, 'y', -1);
    } 
  }
}

function animate() {
  context.clearRect ( 0 , 0 , 200 , 200 );
  draw();
  requestAnimationFrame(animate);
}




// AI part
async function getImage(model, filename) {
   
  var img = new Image();
  img.src = filename;
 
  img.crossOrigin = 'anoymous';

  img.onload = () => {
      console.log(filename)
      var pic1 = tf.browser.fromPixels(img, 3);

      pic1 = tf.image.resizeBilinear(pic1, [180, 180]).div(tf.scalar(255))

      let picarray = []

      picarray.push( pic1.expandDims(0) )
  
      const prediction = model.predict(picarray)

      prediction.softmax().print();
      console.log("PULA")
      return prediction.softmax().dataSync();
  }
}

async function testModel(link) {
  const model = await tf.loadLayersModel('modelxdjs/tensor/model.json');
  vect = getImage(model, link);
};