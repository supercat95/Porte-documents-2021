// declaration of variables for code TVs
let widthOfTV;
let yValueOfTV;
let xValOfTV;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);

    // assignment of variables for code TVs
    widthOfTV = windowWidth/5.0; // this is the radius
    yValueOfTV = windowHeight/6.0;
    xValOfTV = (widthOfTV * 1.2) - (widthOfTV / 1.6); // 1.2 2.0
}

function draw() {
    // console.log(pmouseX + ' ' + pmouseY);  
    noLoop();
    
    drawArches();
    drawSpotlightsUnderTVs();
    drawTVsForCodeVideos(); // call last because of error
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
        xValOfTV+=(widthOfTV * 1.09); // 1.2x based off widthOfTV/5.0 to equal 100% of screen width
        if (i==1) { xValOfTV += widthOfTV/1.8; }
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

// --------------- arches ----------------------------
// draws 3 arches underneath the code tvs 
function drawArches() {
    let x = widthOfTV / 3.0;
    let y = 3*windowHeight/4.0;
    fill(0,255,0); // REPLACE LATER
    strokeWeight(3); // REPLACE LATER

    // horizontally spaces out the arches
    for (let i = 0; i < 3; i++) {
        // vertices go clockwise from bottom left
        beginShape();
            curveVertex(x, y);
            curveVertex(x, y);

            curveVertex(x + widthOfTV*.05, y - windowHeight*.20); // .05 .20
            curveVertex(x + widthOfTV*.20, y - windowHeight*.35); //.20 .35
            curveVertex(x + widthOfTV*.36, y - windowHeight*.43); //.36 .43

            curveVertex(x + widthOfTV*.50, y - windowHeight*.45); // center point .5 .45

            curveVertex(x + widthOfTV*.64, y - windowHeight*.43); //.64 .43
            curveVertex(x + widthOfTV*.80, y -windowHeight*.35); //.80 .35
            curveVertex(x + widthOfTV*.95, y - windowHeight*.20); //.95 .20

            curveVertex(x + widthOfTV, y);
            curveVertex(x + widthOfTV, y);

            line(x + widthOfTV, y, x, y);
        endShape();
        x += windowWidth/3;
    }
}

function drawSpotlightsUnderTVs() {
    let x1 = windowWidth/3; //2.6 
    let x2 = 2*windowWidth/3; //1.6
    let y1 = 7*windowHeight/10.0;
    let rad = widthOfTV/4;

    fill(237,227,2); // yellow. can change later
    noStroke();

    ellipse(x1, y1, rad);
    ellipse(x2, y1, rad);

    // bottom, left, right
    triangle(x1,y1, x1-rad,y1-yValueOfTV, x1+rad,y1-yValueOfTV);
    triangle(x2,y1, x2-rad,y1-yValueOfTV, x2+rad,y1-yValueOfTV);
}

  