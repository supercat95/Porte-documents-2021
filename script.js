// I mention "layers" throughout my code, referring to the division of the composition into three horizontal sections for organization purposes: TVs, middle section, floor section

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
let heightsOfPed  = [];
let pedSpacing;

// variables for layer 3
let tableColors = [];
let xTable1;
let yTable1;
let xTable2;
let yTable2;
let widthOfTable;
let heightOfTable;
let widthOfBook;
let heightOfBook;
let numBooks = 6;
let yBooks = [];
let widthOfBooks = [];
let essayNames = [];
let isHoveringOverBooks = [];

// JSON parsing for legends in layer 2
let data = {};
let indexOfLegends = 0;

function preload() {
    data = loadJSON('artwork.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    
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

    // layer 3
    tableColors[0] = color(151,108,66); // table edge color
    tableColors[1] = color(175,128,85); // tabletop color
    tableColors[2] = color(134,98,71); // table legs color
    essayNames = ['Document de recherche', 'Analyse visuelle', 'Examen final', 'Recherche des arts', 'Proposition', 'Réflexion'];
    // initializes boolean to false by default
    for (let i = 0; i < numBooks; i++) {
        isHoveringOverBooks[i] = false;
    }
}

function draw() {
    // console.log(pmouseX + ' ' + pmouseY); // for debug
    // noLoop(); // uncommenting repositions (bad) and opens dfp file for smu (bad)

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
    drawLegends();
    drawPedestals();
    drawSpotlightsUnderTVs();
    drawDiplomas();
    // layer 3
    drawTable(xTable1, yTable1, PI/100, "left"); // left table
    drawTable(xTable2, yTable2, PI/70, "right"); // right table
     checkForBookHover();

    // layer 1
    drawTVsForCodeVideos(); // call last because of error
}

// allows the canvas to dynamically resize as the window does. not sure if I actually want this, since it breaks a lot of code and sometimes looks really ugly.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* ===========================================================
------------------- universal functions ----------------------
============================================================*/
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
    heightOfPed = windowHeight*0.2;
    xstartWave = widthOfTV/3.0 - widthOfPed/2;
    ystartWave = windowHeight*0.8 - heightOfPed;
    pedSpacing = windowWidth/2.5;

    // variables for layer 3
    xTable1 = windowWidth*0.25;
    yTable1 = windowHeight*0.83;
    xTable2 = windowWidth*0.75;
    yTable2 = windowHeight*0.85;
    widthOfTable = widthOfTV*0.3;
    heightOfTable = heightOfTV;
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
/* ===========================================================
----------------------- layer 1: TVs -------------------------
============================================================*/
// Uses a loop to create 4 tvs with embedded videos. Calls two other functions.
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

        xPosOfTV+=(widthOfTV * 1.09);
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

/* ===========================================================
--layer 2: legends, pedestals, artwork, spotlights, diplomas--
============================================================*/
// parses data from artwork.JSON and prints
function drawLegends() { 
    let xLegend = yPosWave + widthOfPed;
    let yLegend = windowHeight * 0.32;
    let group;

    for (let i = 0; i < 3; i++) {
        stroke(tableColors[0]);
        fill(tableColors[1]);
        
        rect(xLegend + pedSpacing*i, windowHeight * 0.36, widthOfPed*1.25, widthOfTV*0.3);

        if (i == 0) {
            group = "glass";
        } else if (i == 1) {
            group = "ceramics";
        } else if (i == 2) {
            group = "other";
        }

        textSize(18);
        //let leading = 20;
        //let spacing = 20;
        textAlign(CENTER, CENTER);
        stroke(0,0,0);
        strokeWeight(0.5);
        fill(255,255,255);
        
        text(data.artwork[group][indexOfLegends].Title, xLegend + pedSpacing*i, windowHeight * 0.36, widthOfPed*1.25, widthOfTV);
        // if (textWidth(legend.Title) > int(widthOfPed*1.25)) {
        //     leading += spacing;
        // }
        //text(legend.Author, xLegend, yLegend + leading);
        //text(legend.Technique, xLegend, yLegend + leading); // + spacing);
        //text(legend.Date, xLegend, yLegend + leading + spacing); //*2 );
        //text(legend.Statement, xLegend, yLegend + leading + spacing*4, widthOfPed*1.25, widthOfTV);
    }

    if (frameCount%60==0) {
        indexOfLegends++;
    }
    if (indexOfLegends == 4) {
        indexOfLegends = 0;
    }
}

// draws 3 pedestals underneath the code tvs and places artwork on top. calls 2 other functions
function drawPedestals() {
    push();
    // horizontally spaces out the pedestals and images
    for (let i = 0; i < 3; i++) {
        push();
        translate(xstartWave + (i*pedSpacing), ystartWave);
        drawPedestal();
        embedArtwork(i);
        pop();
    }
    pop();
}

// draws a pedestal using two drawWave() and a line
function drawPedestal() {
    fill(248,248,241); // slight off-white
    noStroke();
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

// draws a left and right wave
function drawWave(co) {
    yPosWave = co * cos(xPosWave/10) + xstartWave;
    if (co < 0) { // right wave
        widthOfPed = widthOfTV/3;
    } else {  // left wave
        widthOfPed = 0; 
    }
    vertex(yPosWave + widthOfPed, xPosWave);
}

// embeds artwork on the pedestals based off art type
function embedArtwork(slideshow) {
    let slideIds = [];
    if (slideshow == 0) { slideIds = ["kitten", "bonsai", "mulberry", "sakura"]; }
    else if (slideshow == 1) { slideIds = ["bowl-in-bowl", "vase", "pumpkin"]; }
    //else if (slideshow == 2) { slideIds = [""]; }
    for (let i = 0; i < slideIds.length; i++) { 
        embedStuff(slideIds[i], widthOfTV*0.5, 0, xstartWave + (slideshow * windowWidth/2.5) + (widthOfTV*0.08), ystartWave - (widthOfTV*0.33));
    }
}

// draws 2 spotlights between pedestals, shining up at diplomas
function drawSpotlightsUnderTVs() {
    let y1 = windowHeight*.7;
    let y2 = y1 - (heightOfTV*.75);
    let rad = widthOfTV/4;

    fill(246, 240, 114); // yellow
    noStroke();

    ellipse(x1ForLayer2, y1, rad);
    ellipse(x2ForLayer2, y1, rad);

    fill(246, 240, 114, 180); // transparent yellow
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

/* ===========================================================
------------ layer 3: tables and about me sign ---------------
============================================================*/
// overloaded function, called twice from draw(), to draw a table at given locations and sizes
function drawTable(xPos, yPos, rotation, decor) { 
    let legWidth = widthOfTable*0.12;
    let legHeight = widthOfTable*0.7;
    let legxPos1 = heightOfTable/2 - legWidth/2;
    let legxPos2 = heightOfTable/2;
    let offset = 5;

    // USE THESE FILL VALUES FOR TEXTURE L8R https://www.color-hex.com/color-palette/5258
    // current colors from https://www.color-hex.com/color-palette/90559
    push();
        rectMode(CENTER);
        translate(xPos, yPos);
        rotate(rotation);
        noStroke();
            // legs 
            fill(tableColors[2]);
            rect(0 - legxPos1 + offset, legHeight/2, legWidth, widthOfTable); // back left leg
            rect(0 - legxPos1, legHeight, legWidth, widthOfTable); // front left leg 
            rect(legxPos2 - offset, legHeight, legWidth, widthOfTable); // back right leg
            rect(legxPos2, legHeight/2, legWidth, widthOfTable); // front right leg

            // table surface
            fill(tableColors[0]);
            rect(offset/2, offset/2, heightOfTable+offset, widthOfTable+offset); // table side
            fill(tableColors[1]);
            rect(0, 0, heightOfTable, widthOfTable); // table top

            push();
                rotate(-rotation);
                if (decor == "left") { // purple
                drawBooks(heightOfTable, 0, 0, 165, 128, 230, 0, (255), 0);
                } else if (decor == "right") { // green
                drawBooks(heightOfTable, 0, 0, 126, 229, 123, 255, tableColors[2], numBooks/2);
                }
            pop();
    pop();
}

// draws 3 books per table. called from drawTable()
function drawBooks(heightOfTable, yPos, y1, red, green, blue, outline, filling, index) { 
    heightOfBook = widthOfTable*0.33; // static
    
    widthOfBooks[index] = heightOfTable*0.85;
    yBooks[index] = yPos;

    // binding
    fill(red, green, blue);
    rect(0, yBooks[index], widthOfBooks[index], heightOfBook);
    // pages
    fill(250, 245, 235); // paper beige
    rect(widthOfBooks[index]*0.42, yBooks[index], widthOfBooks[index]*0.15, heightOfBook-4);
    // titles
    push();
    fill(filling);
    stroke(color(outline));
    strokeWeight(1);
    textSize((heightOfBook * widthOfBooks[index] / textWidth(essayNames[index])) * 0.5);
    text(essayNames[index], -widthOfBooks[index]*0.07, yBooks[index]);
    pop();
    
    // recursive function to decrement heightOfTable, yPos, red, green; increment index; called twice, for 3 books total
    if (yBooks[index] >= y1-(heightOfBook*1.5)) {
        drawBooks(heightOfTable*0.95, yBooks[index]-heightOfBook, y1, red+15, green+15, blue, outline, filling, index+1);
    }
}

// constantly checks if the cursor is positioned over a book and returns isHoveringOverBooks. called from draw()
function checkForBookHover() {
    let mouse = createImg('','');
    
    let xTable;
    let ytable;
    
    for (let i = 0; i < numBooks; i++) {
        if (i < numBooks/2) {
            xTable = xTable1;
            yTable = yTable1;
        } else {
            xTable = xTable2;
            yTable = yTable2;
        }
        if (mouseX >= xTable - widthOfBooks[i]/2 && mouseX <= xTable + widthOfBooks[i]/2 && mouseY >= yTable - heightOfBook/2 + yBooks[i] && mouseY <= yTable + heightOfBook/2 + yBooks[i]) {
            isHoveringOverBooks[i] = true;
            // CSS "hack" to change cursor to pointer
            mouse.size(widthOfBooks[i], heightOfBook);
            mouse.position(xTable - widthOfBooks[i]/2 + widthOfBooks[i]*0.07, yTable + yBooks[i]);
            mouse.style("cursor", "pointer");
            mouse.style("opacity", "0");
      } else {
            isHoveringOverBooks[i] = false;
      }
    }
}


function mouseClicked() {
    // left table
    if (isHoveringOverBooks[0]) { // Dutch-Japanese Trade
window.open("https://drive.google.com/file/d/1i3ciYSyNHDl9H2-QKNwZSkbjiXK6yypp/view?usp=sharing", "", "height=700,width=800");
    } else if (isHoveringOverBooks[1]) { // visual analysis
window.open("https://drive.google.com/file/d/1Q-XImrmsaFj1-LA1_tFyJj0DZSpiFsJm/view?usp=sharing", "", "height=700,width=800");
    } else if (isHoveringOverBooks[2]) { // 1330 final
window.open("https://drive.google.com/file/d/1VWyDc2xbQxsyrK8TxBMDFDpb3kZwZ5sT/view?usp=sharing", "", "height=700,width=800");
    }
    // right table
    else if (isHoveringOverBooks[3]) { // Japonaise Paris
window.open("https://drive.google.com/file/d/1g6vIzqogWmG5xVtyo-PldZTCV6f0_W98/view?usp=sharing", "", "height=700,width=800");
    }
    else if (isHoveringOverBooks[4]) { // proposition
window.open("https://drive.google.com/file/d/17u9y4GXJG1anETmzGCBBZe7Bij9Y_C9p/view?usp=sharing", "", "height=700,width=800");
    }
    else if (isHoveringOverBooks[5]) { // l'identité française  
window.open("https://drive.google.com/file/d/1URNNNkKEUMNhcYLXcG7l3zhYsIHQ0ltJ/view?usp=sharing", "", "height=700,width=800");
    }
}
  