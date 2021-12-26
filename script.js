// I mention "layers" throughout my code, referring to the division of the composition into three horizontal sections: TVs, middle section, floor section

// arrays for background
bgcolors = [];
colorPerPixel = [];
xLocation = [];
yLocation = [];
xSize = [];
ySize = [];
roundness = [];
// pixel size range of colored squares
let min = 10; 
let max = 40;
let spacing = max;

// declaration of variables for layer 1
let widthOfTV;
let heightOfTV;
let xPosOfTV;
let yPosOfTV;

let strokeOfTV;
let strokeOfSupports;
let strokeDif;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // colors for array for background
    bgcolors[0] = color(238,228,194,130);
    bgcolors[1] = color(218,208,174,130);
    bgcolors[2] = color(228,218,184);
  
    initBackground();

    // constants for layer 1
    strokeOfTV = 5;
    strokeOfSupports = 3;
    strokeDif = strokeOfTV - strokeOfSupports;
}

function draw() {
    // console.log(pmouseX + ' ' + pmouseY); // for debug
    // noLoop(); // temp while TVs have an error
    assignDynamicVariables(); // variables that rely on Window CALL FIRST
    drawBackground();
    // layer 2
    drawArches();
    drawSpotlightsUnderTVs();
    drawDiplomas();
    // layer 3
    drawFloor();
    // layer 1
    drawTVsForCodeVideos(); // call last because of error
}

// allows the canvas to dynamically resize as the window does. not sure if I actually want this.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --------------- universal functions -------------------
// assignment of dynamic variables that rely on windowWidth and windowHeight
function assignDynamicVariables() {
    // assignment of variables for code TVs
    widthOfTV = windowWidth/5.0; // this is the radius
    heightOfTV = windowHeight/4.4; //5.6
    xPosOfTV = (widthOfTV * 1.2) - (widthOfTV / 1.6); // 1.2 2.0
    yPosOfTV = heightOfTV*.75;
}

// initializes randomized variables for background to have 3 colors as texture variety
function initBackground() {
  background(bgcolors[2]); // main color
  
  // turn 1d arrays into 2d arrays
  for (let i = 0; i < windowWidth; i++) {
    colorPerPixel[i] = [];
    xLocation[i] = [];
    yLocation[i] = [];
    xSize[i] = [];
    ySize[i] = [];
    roundness[i] = [];
    // populate 2d arrays with random values
    for (let j = 0; j < windowHeight; j++) {
      colorPerPixel[i][j] = random(bgcolors); // use for fill
      xLocation[i][j] = random(0,windowWidth);
      yLocation[i][j] = random(0,windowHeight);
      xSize[i][j] = random(min, max);
      ySize[i][j] = random(min, max);
      roundness[i][j] = random(2,5);
    }
  }
}

// draws additional colors on background as texture
function drawBackground() {
  noStroke();
  for (let i = 0; i < windowWidth; i+=spacing) {
    for (let j = 0; j < windowHeight; j+=spacing) {
      fill(colorPerPixel[i][j]);
      rect(xLocation[i][j], yLocation[i][j], xSize[i][j], ySize[i][j], roundness[i][j]);
    }
  }
}

// generic overloaded function to call from other functions in order to embed videos, PDFs, images, etc.
function embedStuff(id, width, height, left, top) {
    if (width != 0) {
        document.getElementById(id).width = width;
    }
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
    line(x1 + strokeDif/2, yPosOfTV / 2.0 - strokeOfTV, x1 + strokeDif/2, 0);
    line(x2 - strokeDif/2, yPosOfTV / 2.0 - strokeOfTV, x2 - strokeDif/2, 0);
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
    fill(248,248,241); // slight off-white
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
    let x1ForLayer2 = windowWidth/3;
    let x2ForLayer2 = 2*windowWidth/3;
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
    let xsmu = windowWidth / 3.53; // top left ~ 1/3W
    let xcefr = windowWidth / 1.62; // top right ~ 2W/3
    let xtcc = windowWidth / 3.405; // bottom left ~ 1/3W
    let xdfp = windowWidth / 1.595; // bottom right ~ 2W/3
    let y1 = windowHeight / 3.41; // top ~ 1/3H
    let y2 = windowHeight / 2.4; // bottom ~ H/2
    let large = .7;
    let small = .4;

    fill(0,0,255); // DELETE LATER
    rectMode(CORNER);

    //SMU -- open PDF of transcript
    embedStuff("smu", 0, heightOfTV*large, windowWidth / 3.4, windowHeight / 3.3);
    //rect(xsmu, y1, widthOfTV*large, heightOfTV*large); 
    rect(xtcc, y2, widthOfTV*.4, heightOfTV*small); //TCC -- open photo of awards

    rect(xcefr, y1, widthOfTV*.5, heightOfTV*large); //CEFR -- placeholder ?
    embedStuff("dfp", 0, heightOfTV*.5, xdfp, y2);//DFP -- link to cert (in new tab?)
    //rect(xdfp, y2, widthOfTV*small, heightOfTV*small);
}

// ----- layer 3: floor, tables, and about me sign -------
// draws a wooden floorboard pattern
function drawFloor() { // not called yet
    line(0, windowHeight*.8, windowWidth, windowHeight*.8); // placeholder to separate wall from floor
}

// draws 2 tables and calls more functions to decorate them
function drawTables() { // not called yet
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
  