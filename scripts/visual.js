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


input_audio.onchange = function(e){
    audioPlayer.src = URL.createObjectURL(this.files[0]);
    // not really needed in this exact case, but since it is really important in other cases,
    // don't forget to revoke the blobURI when you don't need it
    audioPlayer.onend = function(e) {
      URL.revokeObjectURL(this.src);
    }
    audioPlayer.play();
    isPlaying = true;
  }

function playMusic() {
    if (audioPlayer.src == '')
        audioPlayer.src = musics[Math.round(Math.random() * (musics.length - 1))]
    audioPlayer.load();

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    }
    else {
        audioPlayer.play();
        isPlaying = true;
    }
}

function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
}

function draw(data){
    data = [...data];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length / 2;
    data.forEach((value,i)=>{
        // if (i % 8 != 0)
        //     return;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 1";

        ctx.moveTo(space*i,canvas.height); //x,y
        ctx.lineTo(space*i,canvas.height-value * canvas.height/300); //x,y        
        
        ctx.moveTo(canvas.width - space*i,canvas.height); //x,y
        ctx.lineTo(canvas.width - space*i,canvas.height-value * canvas.height/300); //x,y
        
        ctx.stroke();
    })
}

audioPlayer.onplay = ()=>{
    
    audioCtx.resume();
}