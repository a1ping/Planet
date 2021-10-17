
let canvas = document.getElementById("MarkCanvas");
let scene.context = canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;

const petalPoints = [
  [
    [0, 0],
    [0.3, -1.5],
    [0.8, -1.5],
    [1, 3.0],
    [0.8, 0.3],
    [0.28, 0.35],
    [0, 0]
  ],
  [
    [0, 0],
    [1, 0]
  ],
];

function gradient(a, b) {
    return (b.y-a.y)/(b.x-a.x);
}

function bzCurve(points, f, t) {
    if (typeof(f) == 'undefined') f = 0.3;
    if (typeof(t) == 'undefined') t = 0.6;
  
    scene.context.beginPath();
    scene.context.moveTo(points[0].x, points[0].y);
  
    var m = 0;
    var dx1 = 0;
    var dy1 = 0;

    var preP = points[0];

    for (var i = 1; i < points.length; i++) {
        var curP = points[i];
        nexP = points[i + 1];
        if (nexP) {
            m = gradient(preP, nexP);
            dx2 = (nexP.x - curP.x) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }
          
        scene.context.bezierCurveTo(
            preP.x - dx1, preP.y - dy1,
            curP.x + dx2, curP.y + dy2,
            curP.x, curP.y
        );
      
        dx1 = dx2;
        dy1 = dy2;
        preP = curP;
    }
    scene.context.stroke();
}

function drawPetal(x, y, width, height, alpa, path) {
  var i = 0;
  var fPoints = [];
  var dp;
  scene.context.setTransform(1, 0, 0, 1, x, y);
  scene.context.rotate(alpa);
  do { // loop through paths
    const p = path[i];
    let j = 0;
    dp = { x: p[j][0] * width, y: p[j++][1] * height };
    fPoints.push(dp);
    while (j < p.length - 1) {
      //scene.context.lineTo(p[j][0] * width, p[j++][1] * height);
      dp = { x: p[j][0] * width, y: p[j++][1] * height };
      fPoints.push(dp);
    }
    if ((!p[j][0] === p[0][0] && p[j][1] === p[0][1])) { // is the path closed ?
      //.lineTo(p[j][0] * width, p[j][1] * height)
      dp = { x: p[j][0] * width, y: p[j][1] * height };
      fPoints.push(dp);
    }
  } while (++i < path.length);

  bzCurve(fPoints, 0.3, 0.9);
  scene.context.setTransform(1, 0, 0, 1, 0, 0); // restore default
}

function drawFlower(color, lineWidth, fitScale, flag) {
  scene.context.strokeStyle = color;
  scene.context.lineWidth = lineWidth;
  const size = Math.min(scene.context.canvas.width, scene.context.canvas.height) * fitScale * 0.5;
  scene.context.beginPath();
  x0=w/2; y0=h/2;
  alpa0 = -0.435*Math.PI;
  if(flag==1)
  {
    wk1=0.95;hk1=0.1;
    wk2=1.03;hk2=0.12;
    wk3=0.78;hk3=0.09;
  }
  else
  {
    wk1=0.97;hk1=0.1;
    wk2=1.05;hk2=0.12;
    wk3=0.80;hk3=0.09;
  }
  drawPetal(x0, y0, size*wk1, size*hk1, alpa0 - Math.PI/4, petalPoints);
  drawPetal(x0, y0, size*wk1, size*hk1, alpa0 + Math.PI/4, petalPoints);
  drawPetal(x0, y0, size*wk2, size*hk2, alpa0, petalPoints);
  drawPetal(x0, y0, size*wk3, size*hk3, alpa0 + Math.PI/2, petalPoints);
  drawPetal(x0, y0, size*wk3, size*hk3, alpa0 - Math.PI/2, petalPoints);  
  scene.context.stroke();
}

function drawMark()
{   
    scene.context.globalAlpha = 0;
    scene.context.fillStyle = "blue";
    scene.context.fillRect(0, 0, w-1, h-1);

    var x0 = w / 2;
    var y0 = h / 2;
    scene.context.globalAlpha = 1;
    scene.context.lineWidth = 15;
    var r = 200;				
    scene.context.fillStyle = 'rgba(60,220,113,1.0)';
    scene.context.strokeStyle = 'rgba(0,0,0,1.0)';
    scene.context.beginPath();
    scene.context.arc(x0, y0, r, 0, 2 * Math.PI, true);
    scene.context.stroke();
    scene.context.fill();

    var r = 185;				
    scene.context.fillStyle = 'rgba(0,0,0,1.0)';
    scene.context.strokeStyle = 'rgba(60,220,113,1.0)';

    scene.context.beginPath();
    scene.context.arc(x0, y0, r, 0, 2 * Math.PI, false);
    scene.context.stroke();
    scene.context.fill();
    //draw petal outline
    var color='rgba(0,0,0,1.0)';
    drawFlower(color, 10, 1.05, 1); 
    //draw petal body
    var color='rgba(60,220,113,1.0)';
    drawFlower(color, 15, 0.95, 2);    
    
    //bottom_center_0
    scene.context.lineWidth = 10;
    scene.context.strokeStyle = 'rgba(0,0,0,1.0)';
    scene.context.beginPath();
    scene.context.arc(x0, y0+1.07*r, r*1.05, -2.8*Math.PI/4, -1.2*Math.PI/4, false);
    scene.context.stroke();

    scene.context.lineWidth = 15;
    scene.context.strokeStyle = 'rgba(60,220,113,1.0)';
    //bottom_center_1
    scene.context.beginPath();
    scene.context.arc(x0, y0+1.07*r, r, -2.8*Math.PI/4, -1.2*Math.PI/4, false);
    scene.context.stroke();
    //bottom_center_2
    scene.context.beginPath();
    scene.context.arc(x0, y0+1.17*r, 0.8*r, -2.5*Math.PI/4, -1.5*Math.PI/4, false);
    scene.context.stroke();
    //bottom_left_1
    scene.context.beginPath();
    scene.context.arc(x0-r, y0+1.17*r, r, -0.5*Math.PI, -Math.PI/25, false);
    scene.context.stroke();
    //bottom_left_2
    scene.context.beginPath();
    scene.context.arc(x0-1.3*r, y0+1.22*r, r, -0.4*Math.PI, -Math.PI/15, false);
    scene.context.stroke();
    //bottom_right_1
    scene.context.beginPath();
    scene.context.arc(x0+r, y0+1.17*r, r, -0.96*Math.PI, -0.5*Math.PI, false);
    scene.context.stroke();
    //bottom_right_2
    scene.context.beginPath();
    scene.context.arc(x0+1.3*r, y0+1.22*r, r, -0.93*Math.PI, -0.6*Math.PI, false);
    scene.context.stroke();
}
drawMark();			
