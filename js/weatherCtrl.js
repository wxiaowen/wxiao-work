//听歌
function jump() {
    window.location.href = "./music.html";

}

function sing() {
    var audio = document.getElementsByTagName('audio')[0];
    var play = document.getElementById("ic_play_img");
    var coverAlum = document.getElementById("cover_alum");
      //适配各种浏览器
        coverAlum.style.animationName = "go";
        coverAlum.style.animationPlayState = "running";
        coverAlum.style.webkitAnimationName = "go";
        coverAlum.style.webkitAnimationPlayState = "running";
        coverAlum.style.mozAnimationName = "go";
        coverAlum.style.mozAnimationPlayState = "running";
        coverAlum.style.oAnimationName = "go";
        coverAlum.style.oAnimationPlayState = "running";
        coverAlum.style.oAnimationPlayState = "running";
        play.style.display = "none";
        load("./song/C400001J5QJL1pRQYB.mp3");
    // if (audio.paused) {
    //     audio.play();
    //     //适配各种浏览器
    //     coverAlum.style.animationName = "go";
    //     coverAlum.style.animationPlayState = "running";
    //     coverAlum.style.webkitAnimationName = "go";
    //     coverAlum.style.webkitAnimationPlayState = "running";
    //     coverAlum.style.mozAnimationName = "go";
    //     coverAlum.style.mozAnimationPlayState = "running";
    //     coverAlum.style.oAnimationName = "go";
    //     coverAlum.style.oAnimationPlayState = "running";
    //     coverAlum.style.oAnimationPlayState = "running";
    //     play.style.display = "none";
    // } else {
    //     audio.pause();
    //     //适配各种浏览器
    //     coverAlum.style.animationName = "go";
    //     coverAlum.style.animationPlayState = "paused";
    //     coverAlum.style.webkitAnimationName = "go";
    //     coverAlum.style.webkitAnimationPlayState = "paused";
    //     coverAlum.style.mozAnimationName = "go";
    //     coverAlum.style.mozAnimationPlayState = "paused";
    //     coverAlum.style.oAnimationName = "go";
    //     coverAlum.style.oAnimationPlayState = "paused";
    //     play.style.display = "block";
    // }
}



function $(s){
    return document.querySelectorAll(s);
}

//ajax
var xhr=new XMLHttpRequest();
var ac =new (window.AudioContext||window.webkitAudioContext)();
var gainNode=ac[ac.createGain?"createGain":"createGainNode"]();
gainNode.connect(ac.destination);
var analyser=ac.createAnalyser();
var size=128;
analyser.fftSize=size*8;
analyser.connect(gainNode);
var source=null;
var count=0;
var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);

function resize(){
height=box.clientHeight;
width=box.clientWidth;
canvas.height=height;
canvas.width=width;
var line=ctx.createLinearGradient(0,0,0,height);
line.addColorStop(0,"red");
line.addColorStop(0.25,"blue");
line.addColorStop(0.5,"green");
line.addColorStop(0.75,"yellow");
line.addColorStop(1,"orange");
ctx.fillStyle=line;
}
resize();
window.onresize =resize;
function draw (arr){
    ctx.clearRect(0,0,width,height);
    var w=width/size;

 for(var i=0;i<size;i++){
var h=arr[i]/256*height;
ctx.fillRect(w*i,height-h,w*0.6,h);
 }
}
function load(url){
    var n=++count;
    source&&source[source.stop?"stop":"noneOff"]();
    xhr.abort();
    xhr.open("GET",url,true);
    xhr.responseType="arraybuffer";
    xhr.onload=function(){
if(n!=count) return;

        ac.decodeAudioData(xhr.response,function(buffer){
            if(n!=count) return;
            var bufferSource =ac.createBufferSource();
            bufferSource.buffer=buffer;
            bufferSource.connect(analyser);
            bufferSource[bufferSource.start?"start":"noteOn"](0);
      source=bufferSource;
     
        },function(err){
            console.log(err);
        })
        console.log(xhr.response);
    }
    xhr.send();
}
 visulaLizer();
function visulaLizer(){
    var arr=new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(arr);
    console.log(arr);

    requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
    function v(){
analyser.getByteFrequencyData(arr);
    draw(arr);
requestAnimationFrame(v);
    }
    requestAnimationFrame(v);}
function changeVolume(per){
    gainNode.gain.value=per*per;
}



