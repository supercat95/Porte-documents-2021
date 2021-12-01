let widthOfTV;
let yValueOfTV;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);

    widthOfTV = windowWidth/8.0;
    yValueOfTV = windowHeight/6.0;
}

function draw() {
    rectMode(CENTER);
    fill(0);
    stroke(48,48,48); // dark gray
    drawTVsForCodeVideos();
}

// --------------- TVs -------------------------------
function drawTVsForCodeVideos() {
    let xVal = widthOfTV;
    
    for (let i = 0; i < 4; i++) {
        strokeWeight(5);

        rect(xVal, yValueOfTV, windowWidth/6.0, yValueOfTV);

        drawSupportsForTVs(xVal);
        embedCodeVideos(i);
        xVal+=(widthOfTV*2);
    }
}

function drawSupportsForTVs(xVal) {
    x1 = xVal - (widthOfTV / 2.0);
    x2 = xVal + (widthOfTV / 2.0);

    strokeWeight(3);

    line(x1, yValueOfTV / 2.0, x1, 0);
    line(x2, yValueOfTV / 2.0, x2, 0);
}

function embedCodeVideos(i) {
    if (i == 0) { 
        document.getElementById("enviro").innerHTML = '<iframe> width="' + widthOfTV + '" height="' + yValueOfTV + '" src="https://www.youtube.com/embed/wCTVcycdYDg" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
}