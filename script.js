let widthOfTV;
let yValueOfTV;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);

    widthOfTV = windowWidth/5.0; // this is the radius
    yValueOfTV = windowHeight/5.0;
}

function draw() {
    drawTVsForCodeVideos();
}

// --------------- TVs -------------------------------
function drawTVsForCodeVideos() {
    let xVal = (widthOfTV * 1.2) - (widthOfTV / 2.0);

    rectMode(CENTER);
    fill(0);
    stroke(48,48,48); // dark gray
    
    // spaces out the rects and lines for the TVs
    for (let i = 0; i < 4; i++) {
        strokeWeight(5);

        rect(xVal, yValueOfTV, widthOfTV, yValueOfTV);

        drawSupportsForTVs(xVal);
        embedCodeVideos(i, xVal);
        xVal+=(widthOfTV * 1.2); // based off /5.0
    }
}

function drawSupportsForTVs(xVal) {
    x1 = xVal - (widthOfTV / 2.0);
    x2 = xVal + (widthOfTV / 2.0);

    strokeWeight(3);

    line(x1 +1 , yValueOfTV / 2.0, x1 +1, 0);
    line(x2 -1, yValueOfTV / 2.0, x2 -1, 0);
}

function embedCodeVideos(i, xVal) {
    let video;
    if (i==0) { video = "enviro"; } 
    else if (i==1) { video = "feral"; }
    else if (i==2) { video = "galaxy"; }
    // else if (i==3) { video = ""; }

    document.getElementById(video).width = widthOfTV - 5;
    document.getElementById(video).height = yValueOfTV - 5;
    document.getElementById(video).style.left = xVal - (widthOfTV / 2.2) - 2.5 + 'px';
    document.getElementById(video).style.top = yValueOfTV / 2.0 + 10 + 'px';
    // console.log(pmouseX + ' ' + pmouseY + ' ' + xVal);
}