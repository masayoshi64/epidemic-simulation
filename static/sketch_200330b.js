let N = 100;
let X = Array(N);
let Y = Array(N);
let Vx = Array(N);
let Vy = Array(N);
let status = Array(N).fill(0);
let cure_time = 600;
let eps = 10;
let dt = 0.7;
let H = 400;
let W = 400;
let nh = Math.floor(H/eps);
let nw = Math.floor(W/eps);
let r = 0.1;
let normal = [N-1];
let t = 0;
let end = 10000;
var myLineChart;
let update_interval = 100;
var infected = Array(end/update_interval).fill(0);
let infected_num = 1;
let labels = Array.from({length: end/update_interval}, (v, k) => k);


window.onload = function() {
  var ctx = document.getElementById("myLineChart");
  myLineChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
 
    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            lineTension: 0,
            pointRadius: 1,
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: infected,
        }]
    },
 
    // Configuration options go here
    options: {}
  });
  
};
status[0] = 1;

function setup() {
  createCanvas(H, W);
  stroke(0);
  for(let i = 0; i<N; i++){
    X[i] = random(0, 400);
    Y[i] = random(0, 400);
    Vx[i] = random(0, 3);
    Vy[i] = random(0, 3);
  }
}


function draw() {
  t++;
  if(t>end)noLoop();
  if(t%update_interval == 0){updateChart();}
  background(255);
  is_infected = Array(nh);
  infect();
  for(let i = 0; i<N; i++){
    if(status[i] == 0) fill(255);
    else if(status[i] == -1) fill(0, 100, 0, 80);
    else fill(0);
    ellipse(X[i], Y[i], eps);
  }
  move();
}

function move(){
  for(let i = 0; i<N; i++){
    X[i]+=Vx[i]*dt;
    Y[i]+=Vy[i]*dt;
    if(X[i]<0 || X[i]>H){
      Vx[i]*=-1;
      X[i]+=Vx[i]*dt;
    }
    if(Y[i]<0 || Y[i]>W){
      Vy[i]*=-1;
      Y[i]+=Vy[i]*dt;
    }
  }
}

function infect(){
  is_infected = Array(nh);
  for(let i = 0; i<nh; i++) {
    is_infected[i] = [];
    for(let j = 0; j<nh; j++) {
      is_infected[i][j] = 0;
    }
  }
  for(let i = 0; i < N; i++) {
    if(status[i] > 0){
      is_infected[Math.floor(X[i]/eps)][Math.floor(Y[i]/eps)] = 1;
    }
  }
  for(let i = 0; i < N; i++) {
    if(status[i] == 0){
      if(is_infected[Math.floor(X[i]/eps)][Math.floor(Y[i]/eps)] == 1 && 
      prob(r)){
        status[i] = 1;
        infected_num ++;
      }
    }else if(status[i] > 0){
      status[i]++;
      if(status[i]>cure_time){
        status[i] = -1;
        infected_num--;
      }
    }
  }
}

function prob(x){
  if(random(0, 1)<x) return true;
  return false;
}

function updateChart(){
    myLineChart.data.datasets[0].data[t/update_interval] = infected_num;
    myLineChart.update();
}
