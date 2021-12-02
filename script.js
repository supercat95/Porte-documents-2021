// declaration of variables for code TVs
let widthOfTV;
let yValueOfTV;
let xValOfTV;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);

    // assignment of variables for code TVs
    widthOfTV = windowWidth/5.0; // this is the radius
    yValueOfTV = windowHeight/5.0;
    xValOfTV = (widthOfTV * 1.2) - (widthOfTV / 2.0);
}

function draw() {
    drawTVsForCodeVideos();
}

// --------------- TVs -------------------------------
// MOVE INTO DRAW() ? Uses a loop to create 4 tvs with embedded videos. Calls two other functions.
function drawTVsForCodeVideos() {
    rectMode(CENTER);
    fill(0); //EXTRANEOUS, REMOVE AFTER 4TH VIDEO ?
    stroke(48,48,48); // dark gray
    
    // spaces out the rects and lines for the TVs (horizontal)
    for (let i = 0; i < 4; i++) {
        strokeWeight(5);

        rect(xValOfTV, yValueOfTV, widthOfTV, yValueOfTV);

        drawSupportsForTVs();
        embedCodeVideos(i);
        xValOfTV+=(widthOfTV * 1.2); // based off widthOfTV/5.0 to equal 100% of screen width
    }
}

// draws two verticle lines for each of the TV rectangles
function drawSupportsForTVs() {
    // the widths are halved because rectMode is center
    let x1 = xValOfTV - (widthOfTV / 2.0);
    let x2 = xValOfTV + (widthOfTV / 2.0);

    strokeWeight(3);

    // draws 2 lines from center of rect border to top of window. +- values are based on the difference of the stroke weights between the rects and the lines
    line(x1 +1 , yValueOfTV / 2.0, x1 +1, 0);
    line(x2 -1, yValueOfTV / 2.0, x2 -1, 0);
}
 // align and embed YT videos into the rects
function embedCodeVideos(i) {
    let video;

    // four videos corresponding to 4 tvs. The html for the videos is in index.html
    if (i==0) { video = "enviro"; } 
    else if (i==1) { video = "feral"; }
    else if (i==2) { video = "galaxy"; }
    // else if (i==3) { video = "?"; } // UPDATE LATER

    // the +- values are related to the strokeWeight of the rects
    document.getElementById(video).width = widthOfTV - 5;
    document.getElementById(video).height = yValueOfTV - 5;
    document.getElementById(video).style.left = xValOfTV - (widthOfTV / 2.2) - 2.5 + 'px';
    document.getElementById(video).style.top = yValueOfTV / 2.0 + 10 + 'px';
}