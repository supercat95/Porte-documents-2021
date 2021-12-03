// declaration of variables for code TVs
let widthOfTV;
let heightOfTV;
let xPosOfTV;
let yPosOfTV;

let strokeOfTV;
let strokeOfSupports;
let strokeDif;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,0,0);

    // assignment of variables for code TVs
    widthOfTV = windowWidth/5.0; // this is the radius
    heightOfTV = widthOfTV*.56;
    xPosOfTV = (widthOfTV * 1.2) - (widthOfTV / 1.6); // 1.2 2.0
    yPosOfTV = heightOfTV*.75;

    strokeOfTV = 5;
    strokeOfSupports = 3;
    strokeDif = strokeOfTV - strokeOfSupports;
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
        strokeWeight(strokeOfTV);

        rect(xPosOfTV, yPosOfTV, widthOfTV, heightOfTV);

        drawSupportsForTVs();
        embedCodeVideos(i);

        xPosOfTV+=(widthOfTV * 1.09); // 1.2x based off widthOfTV/5.0 to equal 100% of screen width
        if (i==1) { xPosOfTV += widthOfTV/1.8; } // creates a gap in the middle of the screen
    }
}

// draws two verticle lines for each of the TV rectangles
function drawSupportsForTVs() {
    // the widths are halved because rectMode is center
    let x1 = xPosOfTV - (widthOfTV / 2.0);
    let x2 = xPosOfTV + (widthOfTV / 2.0);

    strokeWeight(strokeOfSupports);

    // draws 2 lines from center of rect border to top of window. +- values account for stroke values
    line(x1 + strokeDif, yPosOfTV / 2.0, x1 + strokeDif/2, 0);
    line(x2 - strokeDif, yPosOfTV / 2.0, x2 - strokeDif/2, 0);
}

// align and embed YT videos into the rects
function embedCodeVideos(i) {
    let video;

    // four videos corresponding to 4 tvs. The html for the videos is in index.html
    if (i==0) { video = "enviro"; } 
    else if (i==1) { video = "feral"; }
    else if (i==2) { video = "galaxy"; }
    // else if (i==3) { video = "?"; } // UPDATE LATER

    document.getElementById(video).width = widthOfTV - strokeOfTV;
    document.getElementById(video).height = heightOfTV - strokeOfTV;
    document.getElementById(video).style.left = xPosOfTV - (widthOfTV / 2.2) - (strokeOfTV / 2) + 'px';
    document.getElementById(video).style.top = (yPosOfTV / 2.0) - (strokeOfTV * 2) + 'px';
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

// draws 2 spotlights between the arches
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
    triangle(x1,y1, x1-rad,y1-heightOfTV, x1+rad,y1-heightOfTV);
    triangle(x2,y1, x2-rad,y1-heightOfTV, x2+rad,y1-heightOfTV);
}

  