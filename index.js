
let timer=50;
let values = [];
let w = .01;
let started=false;
let states = [];
let sort_start=false;

document.querySelector(".gear").addEventListener("click",function(){
  document.querySelector(".set").classList.toggle("opened")
  document.querySelector(".gear").classList.toggle("click")
});


document.querySelector(".btn").addEventListener("click",start);
function start(){
  if(sort_start!=true&&started==true){  
  sort_start=true;  
mergeSort(values, 0, values.length - 1);
}
}
document.querySelector("#rand").addEventListener("click",randomiz);
function randomiz(){
  if(sort_start!=true){
  timer=2
  started=true;
  w=3;
  createCanvas(windowWidth-10, windowHeight-20);
  values = new Array(floor((windowWidth-10)/w));
  states = new Array(floor((windowWidth-10)/w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height-120);
    states[i] = -1;
  }


}
}



document.querySelector("#man").addEventListener("click",manual);
function manual(){
  if(sort_start!=true){
    started=true;
  timer=200;
  let textarr=[]
  if(document.querySelector(".arr-inp").value!=""){
  textarr=document.querySelector(".arr-inp").value.trim().split(/\s+/);}
  createCanvas(windowWidth-10, windowHeight-10);
  values = new Array(textarr.length);
  states = new Array(textarr.length);
  const temp=[]
  
  for(let i=0;i<textarr.length;i++){
     temp[i]=parseInt(textarr[i]);
  }
 
  w=((windowWidth-10)/temp.length);
   

  let max=Math.max(...temp)
  for(let i=0;i<temp.length;i++){
    values[i]=(temp[i]/max)*(height-110);
    states[i]=-1;
 }
  }
}


async function mergeSort(arr,l, r){
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    await Promise.all([
    mergeSort(arr,l,m),
    mergeSort(arr,m+1,r)]);
    states[l] = 1;
    states[m] = 2;
    states[m+1] = 1;
    states[r] = 2;
    await merge(arr,l,m,r);
    if(l==0&&r==arr.length-1)
    sort_start=false;
}

async function merge(arr, l, m, r)
{   await sleep(timer);
    var n1 = m - l + 1;
    var n2 = r - m;
 
    
    var L = new Array(n1);
    var R = new Array(n2);
 
    
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    var i = 0;
    var j = 0;
    var k = l;
 
    while (i < n1 && j < n2) {
        await sleep(timer);
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;

        }
        if(k!=l&&k!=r)
        states[k]=3;
        k++;
    }

    while (i < n1) {
        await sleep(timer);
        arr[k] = L[i];
        i++;
        if(k!=l&&k!=r)
        states[k]=3;
        k++;
    }
 
    while (j < n2) {
        await sleep(timer);
        arr[k] = R[j];
        j++;
        if(k!=l&&k!=r)
        states[k]=3;
        k++;
    }
}

function draw() {
    if(started){
    background(0);
  
    for (let i = 0; i < values.length; i++) {
      stroke(0);
      if(states[i]==1){
        fill("#db1a1a");
      }
      if(states[i]==2){
        fill("#2a1adb");
      }
      else if(states[i]==3){
        fill("#66ff99");}
  
      else if(states[i]==-1){
      fill("#db841a");}


      rect(i * w, height-values[i], w, values[i]);
    }}
  }
  
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
