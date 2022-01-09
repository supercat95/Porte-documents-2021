// I mention "layers" throughout my code, referring to the division of the composition into three horizontal sections: TVs, middle section, floor section

// arrays for wall background
let wallPalette = [];
let wallColors = [];
let xPosWall = [];
let yPosWall = [];
let xSizeWall = [];
let ySizeWall = [];
let roundWall = [];
// colored squares for wall background
let minWall = 10; 
let maxWall = 40;
let spacingOfWall = maxWall;

// arrays for floor background
let floorPalette = [];
let floorColors = [];
let xPosFloor = [];
let yPosFloor = [];
let xSizeFloor = [];
let ySizeFloor = [];
let roundFloor = [];
// colored squares for floor background
let xMinFloor = 100;
let xMaxFloor = 200;
let yMinFloor = 5;
let yMaxFloor = 20;

// declaration of variables for layer 1
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
let xstartWave; // x coord, may rename
let ystartWave; // y coord, may rename
let xPosWave; // for the wave trig, may rename
let yPosWave; // for the wave trig, may rename
let widthOfPed;
let heightsOfPeds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // colors for array for wall 
    wallPalette[0] = color(238,228,194,130); // light beige
    wallPalette[1] = color(218,208,174,130); // dark beige
    wallPalette[2] = color(228,218,184); // medium beige, main color
  
    // floor palette from https://www.schemecolor.com/fancy-mahogany-wood.php
    floorPalette[0] = color(52, 0, 6, 150); // choc brown
    floorPalette[1] = color(101, 0, 11); // rosewood, main color
    floorPalette[2] = color(142, 51, 26, 200); // kobe
    floorPalette[3] = color(192, 64, 0, 100); // mahogany
    
    // wall
    initBackground(wallColors, xPosWall, yPosWall, xSizeWall, ySizeWall, 0, windowWidth, 0, windowHeight*0.8, wallPalette[2], wallPalette, minWall, maxWall, minWall, maxWall, roundWall);
    
    // floor
    initBackground(floorColors, xPosFloor, yPosFloor, xSizeFloor, ySizeFloor, -xMinFloor, windowWidth+xMinFloor, windowHeight*0.8, windowHeight, floorPalette[1], floorPalette, xMinFloor, xMaxFloor, yMinFloor, yMaxFloor, roundFloor);

    // constants for layer 1
    strokeOfTV = 5;
    strokeOfSupports = 3;
    strokeDif = strokeOfTV - strokeOfSupports;
}

function draw() {
    // console.log(pmouseX + ' ' + pmouseY); // for debug
    // noLoop(); // temp while TVs have an error
    assignDynamicVariables(); // variables that rely on Window CALL FIRST
    // wall
    drawBackground(0, windowWidth, spacingOfWall, 0, windowHeight*0.8, spacingOfWall, wallColors, xPosWall, yPosWall, xSizeWall, ySizeWall, roundWall); 
    // floor
    drawBackground(0, windowWidth, xMinFloor, windowHeight*0.8, windowHeight, yMinFloor, floorColors, xPosFloor, yPosFloor, xSizeFloor, ySizeFloor, roundFloor);
    // floor moulding thing
    push();
        rectMode(CORNER);
        fill(238,228,194);
        rect(0, windowHeight*0.8 - minWall, windowWidth, maxWall);
    pop();
    // layer 2
    drawPedestals();
    drawSpotlightsUnderTVs();
    drawDiplomas();
    // layer 3
    drawTable(windowWidth*0.27, windowHeight*0.83, PI/100, heightOfTV, widthOfTV*0.3, "books"); // left table
    drawTable(windowWidth*0.72, windowHeight*0.85, PI/70, heightOfTV, widthOfTV*0.3, "laptop"); // right table
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
    // variables for layer 2
    x1ForLayer2 = windowWidth/3;
    x2ForLayer2 = 2*windowWidth/3;
    widthOfPed = widthOfTV/3.0;
    heightsOfPeds[0] = windowHeight*0.2;
    heightsOfPeds[1] = windowHeight*0.3;
    heightsOfPeds[2] = windowHeight*0.2;
}

// initializes randomized variables for background (overloaded for both the wall and floor) to have multiple colors as texture variety
function initBackground(colors, xPos, yPos, xSize, ySize, xStart, xEnd, yStart, yEnd, mainColor, palette, xMin, xMax, yMin, yMax, roundness) {
  fill(mainColor); // main color
  rect(xStart, yStart, xEnd, yEnd);
  
  // turn 1d arrays into 2d arrays
  for (let i = xStart; i < xEnd; i++) {
    colors[i] = [];
    xPos[i] = [];
    yPos[i] = [];
    xSize[i] = [];
    ySize[i] = [];
    roundness[i] = [];
    // populate 2d arrays with random values
    for (let j = yStart; j < yEnd; j++) {
      colors[i][j] = random(palette); // use for fill
      xPos[i][j] = random(xStart,xEnd);
      yPos[i][j] = random(yStart,yEnd);
      xSize[i][j] = random(xMin, xMax);
      ySize[i][j] = random(yMin, yMax);
      roundness[i][j] = random(2,5);
    }
  }
}

// draws additional colors on background (overloaded for both wall and floor) as texture
function drawBackground(xStart, xEnd, xInc, yStart, yEnd, yInc, colors, xPos, yPos, xSize, ySize, roundness) {
  noStroke();
  for (let i = xStart; i < xEnd; i+=xInc) {
    for (let j = yStart; j < yEnd; j+=yInc) {
      fill(colors[i][j]);
      rect(xPos[i][j], yPos[i][j], xSize[i][j], ySize[i][j], roundness[i][j]);
    }
  }
}

// generic overloaded function to call from other functions in order to embed videos, PDFs, images, etc.
function embedStuff(id, width, height, left, top) {
    let embed = document.getElementById(id);
    if (height != 0) {
        embed.height = height;
    }
    embed.width = width;
    embed.style.left = left + 'px';
    embed.style.top = top + 'px';
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
    else if (i==3) { video = "anim"; }

    embedStuff(video, 
    widthOfTV - strokeOfTV, 
    heightOfTV - strokeOfTV, 
    xPosOfTV - (widthOfTV / 2.2) - (strokeOfTV / 2), (yPosOfTV / 2.0) - (strokeOfTV * 2));
}

// -- layer 2: pedestals, artwork, spotlights, diplomas --
// draws 3 pedestals underneath the code tvs 
function drawPedestals() {
    push();
    fill(248,248,241); // slight off-white

    // horizontally spaces out the pedestals
    for (let i = 0; i < heightsOfPeds.length; i++) {
        xstartWave = widthOfTV/3.0 - widthOfPed/2;
        ystartWave = windowHeight*0.8 - heightsOfPeds[i];
        push();
        translate(xstartWave + (i*windowWidth/2.5), ystartWave);
        drawPedestal(heightsOfPeds[i]);

        drawArtwork(i);
        pop();
    }
    pop();
}

function drawPedestal(heightOfPed) {
  beginShape();
  // left wave
  for(xPosWave=xstartWave; xPosWave<xstartWave+heightOfPed; xPosWave=xPosWave+4) {
    drawWave(7);
  }
  vertex(yPosWave+cos(widthOfPed), xPosWave); // bottom line
  // right wave
  for (xPosWave=xstartWave+heightOfPed; xPosWave>xstartWave-2; xPosWave=xPosWave-4) {
    drawWave(-7);
  }
  endShape(CLOSE); // top line
}

function drawWave(co) {
    yPosWave = co * cos(xPosWave/10) + xstartWave;
    if (co < 0) { // right wave
        widthOfPed = widthOfTV/3;
    } else {  // left wave
        widthOfPed = 0; 
    }
    vertex(yPosWave + widthOfPed, xPosWave);
}

function drawArtwork(slideshow) {
    let slideIds = [];
    if (slideshow == 0) { slideIds = ["bonsai", "mulberry", "sakura"]; }
    else if (slideshow == 1) { slideIds = ["bowl-in-bowl", "vase", "pumpkin"]; }
    //else if (slideshow == 2) { slideIds = [""]; }
    for (let i = 0; i < slideIds.length; i++ ) { 
        embedStuff(slideIds[i], widthOfTV*0.5, 0, xstartWave + (slideshow * windowWidth/2.5) + (widthOfTV*0.08), ystartWave - (widthOfTV*0.25));
    } // change top to be centered on pedestals
}

// draws 2 spotlights between the pedestals
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

// draws SMU diploma and DFP cert over the spotlights
function drawDiplomas() {
    let wsmu = widthOfTV * 0.6;
    let wdfp = widthOfTV * 0.7;
    let xsmu = x1ForLayer2 - (wsmu * 0.45);
    let xdfp = x2ForLayer2 - (wdfp * 0.45); 
    let ysmu = windowHeight * 0.32;
    let ydfp = windowHeight * 0.33

    //SMU -- opens PDF of transcript in new window
    embedStuff("smu", wsmu, 0, xsmu, ysmu); 
    //DFP -- opens cert in new window
    embedStuff("dfp", wdfp, 0, xdfp, ydfp);
}

// ----- layer 3: tables and about me sign -------
// overloaded function, called twice, to draw a table at given locations and sizes
function drawTable(xPos, yPos, rotation, tableHeight, tableWidth, decor) { 
    let legWidth = tableWidth*0.12;
    let legHeight = tableWidth*0.7;
    let legxPos1 = tableHeight/2 - legWidth/2;
    let legxPos2 = tableHeight/2;
    let offset = 5;

    // USE THESE FILL VALUES FOR TEXTURE L8R https://www.color-hex.com/color-palette/5258
    // current colors from https://www.color-hex.com/color-palette/90559
    push();
        rectMode(CENTER);
        translate(xPos, yPos);
        rotate(rotation);
        noStroke();
            // legs 
            fill(134,98,71); // brown-gray
            rect(0 - legxPos1 + offset, legHeight/2, legWidth, tableWidth); // back left leg
            rect(0 - legxPos1, legHeight, legWidth, tableWidth); // front left leg 
            rect(legxPos2 - offset, legHeight, legWidth, tableWidth); // back right leg
            rect(legxPos2, legHeight/2, legWidth, tableWidth); // front right leg

            // table surface
            fill(151,108,66); // brown-green
            rect(offset/2, offset/2, tableHeight+offset, tableWidth+offset); // table side
            fill(175,128,85); // brown-beige
            rect(0, 0, tableHeight, tableWidth); // table top

            if (decor == "books") {
                push();
                    drawBooks(tableWidth, tableHeight, 0, 0, 255);
                pop();
            } else if (decor == "laptop") {
                push();
                    //drawLaptop(tableWidth, tableHeight);
                pop();
            }
    pop();
}

// recursive function to draw books on left table that link to writing sample PDFs. called from within drawTable()'s push/pop
function drawBooks(tableWidth, tableHeight, yPos, newyPos, green) { // add button system for books -> windows
    let bookWidth = tableHeight*0.7;
    let bookHeight = tableWidth*0.25;

    // book 1: ARHS research paper
    // book 2: FREN Japonaise Paris
    // book 3: ARHS visual analysis
    // book 4: another FREN sample (argumentative?)

    // binding
    fill(0,green,0); // REPLACE VALUE *AND* GREEN VARIABLE
    rect(0, newyPos, bookWidth, bookHeight);
    // pages
    fill(250, 245, 235); // paper beige
    rect(bookWidth*0.42, newyPos, bookWidth*0.15, bookHeight-4);

    // decrements newyPos, bookWidth, and green
    if (newyPos >= yPos-(bookHeight*1.5)) { // 3 books
        drawBooks(tableWidth, tableHeight*.95, yPos, newyPos-=bookHeight, green-=20);
    }
}

// draws about me on the right table. called from within drawTable()'s push/pop
function drawLaptop(tableHeight, tableWidth) { // currently not called
    let laptopWidth = tableWidth*0.6;
    let laptopHeight = tableHeight*0.8;

    fill(48,48,48); // same gray and tv frames
    // monitor
    push();
        rotate(PI/36);
        rect(tableWidth*0.1, 0-laptopHeight, laptopWidth, laptopHeight);
    pop();
    // keyboard
    push();
        rotate(PI/6);
        rect(0, 0-laptopHeight*0.1, laptopWidth, laptopHeight);
    pop();
}
  