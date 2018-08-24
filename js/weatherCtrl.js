
function sing() {
    var audio = document.getElementsByTagName('audio')[0];
    var play = document.getElementById("ic_play_img");
    var coverAlum = document.getElementById("cover_alum");
    if (audio.paused) {
        audio.play();
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
    } else {
        audio.pause();
        //适配各种浏览器
        coverAlum.style.animationName = "go";
        coverAlum.style.animationPlayState = "paused";
        coverAlum.style.webkitAnimationName = "go";
        coverAlum.style.webkitAnimationPlayState = "paused";
        coverAlum.style.mozAnimationName = "go";
        coverAlum.style.mozAnimationPlayState = "paused";
        coverAlum.style.oAnimationName = "go";
        coverAlum.style.oAnimationPlayState = "paused";
        play.style.display = "block";
    }
}

