// declaration of variables for code TVs
let widthOfTV;
let heightOfTV;
let xPosOfTV;
let yPosOfTV;

let strokeOfTV;
let strokeOfSupports;
let strokeDif;

// variables for layer 2
let x1ForLayer2;
let x2ForLayer2;

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

    x1ForLayer2 = windowWidth/3; //2.6 
    x2ForLayer2 = 2*windowWidth/3; //1.6
}

function draw() {
    // console.log(pmouseX + ' ' + pmouseY);  
    noLoop();

    drawArches();
    drawSpotlightsUnderTVs();
    drawDiplomas();
    drawTables();
    drawTVsForCodeVideos(); // call last because of error
}

function embedStuff(id, width, height, left, top) {
    document.getElementById(id).width = width;
    document.getElementById(id).height = height;
    document.getElementById(id).style.left = left + 'px';
    document.getElementById(id).style.top = top + 'px';
}

// ------------------ layer 1: TVs ----------------------
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

    embedStuff(video, 
    widthOfTV - strokeOfTV, 
    heightOfTV - strokeOfTV, 
    xPosOfTV - (widthOfTV / 2.2) - (strokeOfTV / 2), (yPosOfTV / 2.0) - (strokeOfTV * 2));
}

// ------- layer 2: arches, spotlights, diplomas ---------
// draws 3 arches underneath the code tvs 
function drawArches() {
    let x = widthOfTV / 3.0;
    let y = windowHeight*.75;
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
    let y1 = windowHeight*.7;
    let y2 = y1 - (heightOfTV*.75);
    let rad = widthOfTV/4;

    fill(237,227,2); // yellow. can change later
    noStroke();

    ellipse(x1ForLayer2, y1, rad);
    ellipse(x2ForLayer2, y1, rad);

    // bottom, left, right
    triangle(x1ForLayer2,y1, x1ForLayer2-rad,y2, x1ForLayer2+rad,y2);
    triangle(x2ForLayer2,y1, x2ForLayer2-rad,y2, x2ForLayer2+rad,y2);
}

// draws 2 diplomas and 2 French certs over the spotlights
// REPLACE RECTS WITH SCANS/REPS OF DIPS AND CERTS
function drawDiplomas() {
    let y1 = windowHeight * .35;
    let y2 = y1 * 1.32;

    // REPLACE/REMOVE LATER
    fill(0,0,255);
    rectMode(CENTER);

    rect(x1ForLayer2, y1, widthOfTV*.5, heightOfTV*.5); //SMU -- open PDF of transcript
    rect(x1ForLayer2, y2, widthOfTV*.4, heightOfTV*.4); //TCC -- open photo of awards

    rect(x2ForLayer2, y1, widthOfTV*.5, heightOfTV*.5); //CEFR -- placeholder ?
    rect(x2ForLayer2, y2, widthOfTV*.4, heightOfTV*.4); //DFP -- link to cert (in new tab?)
}

// ----- layer 3: floor, tables, and about me sign -------
// draws a wooden floorboard pattern
function drawFloor() {
    line(0, windowHeight*.8, windowWidth, windowHeight*.8); // placeholder to separate wall from floor
}

// draws 2 tables and calls more functions to decorate them
function drawTables() {
    stroke(255);
    rectMode(CORNERS);

    // left table
    drawBooks();

    // right table
    drawLaptop();
}

// draws books on left table that link to writing sample PDFs
function drawBooks() {
    // book 1: ARHS research paper
    // book 2: FREN Japonaise Paris
    // book 3: ARHS visual analysis
    // book 4: another FREN sample (argumentative?)
}

// draws laptop on the right table showing video of animation final
function drawLaptop() {
    // REPLACE VALUES
    embedStuff("anim", 
    widthOfTV*.66 - strokeOfTV, 
    heightOfTV*.66 - strokeOfTV, 
    windowWidth*.66, 
    windowHeight*.66);
}
  