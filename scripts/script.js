let track = document.createElement("audio")
let playingsong = false;
let index = 0;
let gana = document.getElementById('gana')
let ganaimg = document.getElementById('ganaimg')
let Masterplay = document.getElementById('masterplay')
let songRange = document.getElementById('kadi');
let valumeRange = document.getElementById('bidi');
let valumeOff = document.getElementById('valumeoff');
let Musicanim = document.getElementById('musicanim');

let lyricsLines = [];      // store lines with timestamp
let currentLineIndex = 0;  // track which line to show

let songs = [
    { name:"Shravan Mahina", path:"./songs/mp31.mp3", lyricsPath:"./songs/1.txt", image:"img3" },
    { name:"Haan Ke Haan", path:"./songs/mp32.mp3", lyricsPath:"./songs/2.txt", image:"img4" },
    { name:"Jaugrafiya", path:"./songs/mp33.mp3", lyricsPath:"./songs/6.txt", image:"img5" },
    { name:"Dil Se Dil", path:"./songs/mp34.mp3", lyricsPath:"./songs/4.txt", image:"img6" }
]

// Parse timestamped lyrics
function parseLyrics(text) {
    let lines = text.split("\n");
    let result = [];

    lines.forEach(line => {
    // Match [mm:ss] or [mm:ss.xx]
    let match = line.match(/\[(\d+):(\d+)(?:\.(\d+))?\]\s*(.*)/);

    if (match) {
        let minutes = parseInt(match[1]);
        let seconds = parseInt(match[2]);
        let millis = match[3] ? parseInt(match[3].padEnd(3, "0")) : 0; // normalize .45 → 450 ms

        let time = minutes * 60 + seconds + millis / 1000; // total seconds (float)
        let lyricText = match[4];

        result.push({ time: time, text: lyricText });
    }
});


    return result;
}

// Show current lyric
function showCurrentLyric() {
    let lyricsElement = document.getElementById('lyrics');
    if (!lyricsElement) return;

    let line1 = lyricsLines[currentLineIndex]?.text || "";
    let line2 = lyricsLines[currentLineIndex + 1]?.text || "";
    lyricsElement.innerHTML = line1 + "<br>" + line2;
}

// Load song
function nikhil(index) {
    track.src = songs[index].path;
    gana.innerHTML = songs[index].name;
    ganaimg.src = songs[index].image;

    // Fetch lyrics
    fetch(songs[index].lyricsPath)
        .then(response => response.text())
        .then(text => {
            lyricsLines = parseLyrics(text);
            currentLineIndex = 0;
            showCurrentLyric();
        })
        .catch(err => {
            lyricsLines = [{ time: 0, text: "Lyrics not found." }];
            showCurrentLyric();
            console.error(err);
        });

    track.load();
}

// Update lyrics based on current time
track.addEventListener("timeupdate", () => {
    if (lyricsLines.length === 0) return;

    for (let i = 0; i < lyricsLines.length; i++) {
        if (track.currentTime >= lyricsLines[i].time) {
            currentLineIndex = i;
        } else {
            break;
        }
    }
    showCurrentLyric();

    // Update progress bar
    if (!isNaN(track.duration)) {
        songRange.max = track.duration;
        songRange.value = track.currentTime;
    }
});

// Call once initially
nikhil(index);

// Play / Pause
function startstop() {
    if (!playingsong) playsong();
    else pausesong();
}

function playsong() {
    track.play();
    playingsong = true;
    Masterplay.innerHTML = 'pause_circle';
    Musicanim.style.display = "block";
}

function pausesong() {
    track.pause();
    playingsong = false;
    Masterplay.innerHTML = 'play_circle';
    Musicanim.style.display = 'none';
}

// Next / Previous
function privious() {
    index = (index > 0) ? index - 1 : songs.length - 1;
    nikhil(index);
    playsong();
}

function Next() {
    index = (index < songs.length - 1) ? index + 1 : 0;
    nikhil(index);
    playsong();
}

// Change song position via range
function songdur() {
    if (!isNaN(track.duration)) {
        track.currentTime = songRange.value;
    }
}

// Volume control
function Aavaj() {
    track.volume = valumeRange.value / 100;
    if (valumeRange.value == 0) valumeOff.innerHTML = 'volume_off';
    else if (valumeRange.value < 50) valumeOff.innerHTML = 'volume_down';
    else valumeOff.innerHTML = 'volume_up';
}

// Auto play next when song ends
track.addEventListener("ended", Next);

	






    

	    
	
	


