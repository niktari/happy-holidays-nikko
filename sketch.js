let img;
let pixel;
let mappedScale;

let linesCanvas;

let smallest = 0.5;
let largest = 4;

let spacing = 6;
let margin = 0;

let redSwatch;
let blueSwatch;
let pinkSwatch;
let yellowSwatch;

let scale = 1920 / 1080;

let resizeTimeout;

function preload() {
  img = loadImage("images/img.png");

}

function setup() {
  
  img.loadPixels();
  let myCanvas = createCanvas(img.width, img.height);
  myCanvas.parent("sketch-container");

  noStroke();

  rectMode(CENTER);
  strokeCap(ROUND);
  
  redSwatch = color(253, 81, 0);
  blueSwatch = color(5, 126, 210);
  pinkSwatch = color(255, 95, 190);
  yellowSwatch = color(213, 196, 0);

  background('rgb(211, 208, 202)');
  
  

}


function draw() {
  img.resize(windowWidth / 1.5, windowWidth / 1.5 / scale);
  resizeCanvas(img.width, img.height);
  drawScene();




}


function drawScene(){
  
  
    for (let x = margin; x <img.width - margin; x+=spacing) {
    for (let y = margin; y < img.height - margin; y+=spacing) {
      
      pixel = getQuick(img, x, y);
      
      let firstMappedPos = map(y, margin, (img.height - margin) / 3, 0, 1);
      let secondMappedPos = map(y, (img.height - margin) / 2.5, (img.height - margin) - (img.height - margin) / 2.5, 0, 1);
      let thirdMappedPos = map(y, (img.height - margin) - (img.height - margin) / 4, (img.height - margin), 0, 1);
      
      let firstGradient = lerpColor(redSwatch, blueSwatch, firstMappedPos);
      let secondGradient = lerpColor(blueSwatch, pinkSwatch, secondMappedPos);
      let thirdGradient = lerpColor(pinkSwatch, yellowSwatch, thirdMappedPos);
      
    
            
      let multiplier = map(mouseX, 0, windowWidth, 0, 2);
      strokeWeight(0.5);
      
      if(y < img.height / 3) {
        stroke(firstGradient);
        line(x, y, x, img.height - margin);
        
      } else if(y > (img.height - margin) / 2.5 && y < (img.height - margin) - (img.height - margin) /  2.5) {
        stroke(secondGradient);
        line(x, y, x, img.height - margin);
      } else if(y > img.height / 2) {
        stroke(thirdGradient);
        line(x, y, x, img.height - margin);
      }

      mappedScale = map(pixel[0], 0, 255, largest, smallest)
      strokeWeight(mappedScale * multiplier);   
      if (255 > pixel[0]) {
        line(x, y, x, y + spacing);
      }
    }
  }

  
}



function getQuick(img, x, y) {
  
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3],
  ];
}

window.onresize = function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    img.resize(windowWidth / 1.5, windowWidth / 1.5 / scale);
    resizeCanvas(img.width, img.height);
  }, 200); // Adjust the delay as needed
};