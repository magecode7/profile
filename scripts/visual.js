let canvas = document.getElementById("audio_visual");
canvas.width = window.screen.width

let ctx = canvas.getContext("2d");

let audioPlayer = document.createElement('audio');
audioPlayer.loop = true;

let musics = ["musics/music1.mp3", "musics/music2.mp3"]
let isPlaying = false;

let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(audioPlayer);

source.connect(analyser);
//this connects our music back to the default output, such as your //speakers 
source.connect(audioCtx.destination);

let data = new Uint8Array(analyser.frequencyBinCount);

requestAnimationFrame(loopingFunction);


function playMusic() {
    audioPlayer.src = musics[Math.round(Math.random() * (musics.length - 1))]
    audioPlayer.load()

    if (isPlaying)
        audioPlayer.pause();
    else
        audioPlayer.play();

    isPlaying = !isPlaying
}

function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
}

function draw(data){
    data = [...data];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    data.forEach((value,i)=>{
        // if (i % 8 != 0)
        //     return;

        ctx.beginPath();
        ctx.strokeStyle = "white";

        ctx.moveTo(space*i,canvas.height); //x,y
        ctx.lineTo(space*i,canvas.height-value * canvas.height/200); //x,y        
        
        ctx.moveTo(canvas.width - space*i,canvas.height); //x,y
        ctx.lineTo(canvas.width - space*i,canvas.height-value * canvas.height/200); //x,y
        
        ctx.stroke();
    })
}

audioPlayer.onplay = ()=>{
    
    audioCtx.resume();
}