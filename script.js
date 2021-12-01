
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);
}

function draw() {
    rectMode(CENTER);
    fill(0);
    stroke(48,48,48); // dark gray
    drawTVsForCodeVideos();
}

// --------------- TVs -------------------------------
function drawTVsForCodeVideos() {
    let widthOfTV = windowWidth/8.0;
    let yVal = windowHeight/6.0;
    let xVal = widthOfTV;
    
    for (let i = 0; i < 4; i++) {
        strokeWeight(5);

        rect(xVal, yVal, windowWidth/6.0, windowHeight/6.0);

        drawSupportsForTVs(widthOfTV,xVal,yVal);
        embedCodeVideos(i);
        xVal+=(widthOfTV*2);
    }
}

function drawSupportsForTVs(widthOfTV, xVal, yVal) {
    x1 = xVal - (widthOfTV / 2.0);
    x2 = xVal + (widthOfTV / 2.0);

    strokeWeight(3);

    line(x1, yVal, x1, 0);
    line(x2, yVal, x2, 0);
}

function embedCodeVideos(i) {
    if (i == 0) { 
        document.getElementById("enviro").innerHTML = '<iframe> width="'widthOfTV'" height="'windowHeight/6.0'" src="https://www.youtube.com/embed/wCTVcycdYDg" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
}