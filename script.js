"use strict";

function setup() {
    let c = createCanvas(512, 512); //,SVG);

    let y = 10;

    let button = createButton("save");
    button.position(260, y);
    button.mousePressed((x) => {
        saveCanvas(c, "save.png");
    });

    let inputWidth = createInput("512");
    inputWidth.position(20, y);
    inputWidth.style("width", "50px");
    let inputHeight = createInput("512");
    inputHeight.position(80, y);
    inputHeight.style("width", "50px");
    inputWidth.input(() => {
        resizeCanvas(Number(inputWidth.value()), Number(inputHeight.value()));
    });
    inputHeight.input(() => {
        resizeCanvas(Number(inputWidth.value()), Number(inputHeight.value()));
    });

    y += 25;

    let offsetXSlider = createSlider(0, 400, 0);
    offsetXSlider.position(10, y);
    offsetXSlider.style("width", "100px");
    offsetXSlider.input((x) => {
        offset = createVector(
            400 - Number(offsetXSlider.value()),
            Number(offsetYSlider.value())
        );
        redrawFast();
    });
    let offsetYSlider = createSlider(0, 400, 0);
    offsetYSlider.position(110, y);
    offsetYSlider.style("width", "100px");
    offsetYSlider.input((x) => {
        offset = createVector(
            400 - Number(offsetXSlider.value()),
            Number(offsetYSlider.value())
        );
        redrawFast();
    });
    offset = createVector(
        400 - Number(offsetXSlider.value()),
        Number(offsetYSlider.value())
    );

    let s = createSpan("transaltion");
    s.position(220, y);

    y += 20;

    let hexSSlider = createSlider(50, 400, 200);
    hexSSlider.position(10, y);
    hexSSlider.style("width", "200px");
    hexSSlider.input((x) => {
        let v = minHexS / hexS;
        hexS = Number(hexSSlider.value());
        minHexSSlider.elt.value = minHexS = hexS * v;
        minHexSSlider.elt.max = hexS;
        if (minHexSSlider.elt.max < minHexSSlider.value())
            minHexSSlider.elt.value = minHexSSlider.elt.max;
        redrawFast();
    });
    hexS = Number(hexSSlider.value());

    s = createSpan("scale");
    s.position(220, y);

    y += 20;

    let minHexSSlider = createSlider(1, 200, 0);
    minHexSSlider.position(10, y);
    minHexSSlider.style("width", "200px");
    minHexSSlider.input(() => {
        minHexS = Number(minHexSSlider.value());
        redrawFast();
    });
    minHexS = Number(minHexSSlider.value());

    s = createSpan("center size");
    s.position(220, y);

    y += 20;

    let rotSlider = createSlider(-60, 0, -10);
    rotSlider.position(10, y);
    rotSlider.style("width", "200px");
    rotSlider.input(() => {
        rot = Number(rotSlider.value());
        redrawFast();
    });
    rot = Number(rotSlider.value());

    s = createSpan("rotation");
    s.position(220, y);

    y += 20;

    let swirlSlider = createSlider(0, 360, 90);
    swirlSlider.position(10, y);
    swirlSlider.style("width", "200px");
    swirlSlider.input(() => {
        swirl = Number(swirlSlider.value());
        redrawFast();
    });
    swirl = Number(swirlSlider.value());

    s = createSpan("twist");
    s.position(220, y);

    y += 20;

    let layerSlider = createSlider(0, log(1024 * 8), log(20), 0.01);
    layerSlider.position(10, y);
    layerSlider.style("width", "200px");
    layerSlider.input(() => {
        layerCnt = round(min(2048, exp(Number(layerSlider.value()))));
        redrawFast();
    });
    layerCnt = round(min(2048, exp(Number(layerSlider.value()))));

    s = createSpan("line count");
    s.position(220, y);

    y += 20;

    let strokeSlider = createSlider(log(0.001), log(2), log(1), 0.002);
    strokeSlider.position(10, y);
    strokeSlider.style("width", "200px");
    strokeSlider.input(() => {
        strokeW = exp(Number(strokeSlider.value()));
        redrawFast();
    });
    strokeW = exp(Number(strokeSlider.value()));

    s = createSpan("line width");
    s.position(220, y);

    // y += 20;

    // let multiplierSlider = createSlider(1, 10, 1, 1);
    // multiplierSlider.position(10, y);
    // multiplierSlider.style("width", "200px");
    // multiplierSlider.input(() => {
    //     multiplier = Number(multiplierSlider.value());
    //     redrawFast();
    // });
    // multiplier = Number(multiplierSlider.value());

    y += 20;

    let colorCenterPicker = createColorPicker("#000");
    colorCenterPicker.position(10, y);
    colorCenterPicker.style("height", "20px");
    colorCenterPicker.input(() => {
        colorCenter = colorCenterPicker.color();
        redrawFast();
    });
    colorCenter = colorCenterPicker.color();

    let colorCenterSlider = createSlider(0, 1, 0.5, 0.01);
    colorCenterSlider.position(80, y);
    colorCenterSlider.style("width", "130px");
    colorCenterSlider.input(() => {
        colorCenterStrength = Number(colorCenterSlider.value());
        redrawFast();
    });
    colorCenterStrength = Number(colorCenterSlider.value());

    s = createSpan("center color/strength");
    s.position(220, y);

    y += 20;

    let colorBorderPicker = createColorPicker("#fff");
    colorBorderPicker.position(10, y);
    colorBorderPicker.style("height", "20px");
    colorBorderPicker.input(() => {
        colorBorder = colorBorderPicker.color();
        redrawFast();
    });
    colorBorder = colorBorderPicker.color();

    let colorBorderSlider = createSlider(0, 1, 0.1, 0.01);
    colorBorderSlider.position(80, y);
    colorBorderSlider.style("width", "130px");
    colorBorderSlider.input(() => {
        colorBorderStrength = Number(colorBorderSlider.value());
        redrawFast();
    });
    colorBorderStrength = Number(colorBorderSlider.value());

    s = createSpan("border color/strength");
    s.position(220, y);

    angleMode(DEGREES);

    colorA = color("#FFBB03");
    //ca = createVector(1800,20);
    ca = createVector(460, 300);

    colorAPicker = createColorPicker(colorA);
    colorAPicker.position(ca.x, ca.y);
    colorAPicker.style("height", "20px");
    colorAPicker.input(() => {
        colorA = colorAPicker.color();
        redrawFast();
    });

    colorB = color("#FF0075");
    //cb = createVector(120,1800);
    cb = createVector(0, 480);

    colorBPicker = createColorPicker(colorB);
    colorBPicker.position(cb.x, cb.y);
    colorBPicker.style("height", "20px");
    colorBPicker.input(() => {
        colorB = colorBPicker.color();
        redrawFast();
    });

    loop();
}

let colorAPicker;
let colorBPicker;
let mPosD;
let mPicker;
let mPickCenter;

function mousePressed() {
    let posD = createVector(mouseX, mouseY);

    if (posD.dist(ca) < 80) {
        mPosD = posD;
        mPicker = colorAPicker;
        mPickCenter = ca;
    } else if (posD.dist(cb) < 80) {
        mPosD = posD;
        mPicker = colorBPicker;
        mPickCenter = cb;
    }
    print(posD);
    print(mPosD)
}

function mouseReleased() {
    mPosD = null;
    redrawFast();
}

function mouseDragged() {
    if (mPosD) {
        let posD = createVector(mouseX, mouseY);
        mPosD.sub(posD);

        mPickCenter.sub(mPosD);
        mPicker.position(mPickCenter.x, mPickCenter.y);
        print(mPosD);

        mPosD = posD;

        redrawFast();
    }
}

let cancle = true;

function redrawFast() {
    cancle = true;
    loop();
}

//params
let layerCnt = 1048;
let layerNr = 0;
let multiplier = 1;
let hexS;
let minHexS;
let rot;
let swirl;
let strokeW;
let colorCenter;
let colorBorder;
let colorCenterStrength;
let colorBorderStrength;
let offset;
let r;

function draw() {
    if (cancle) {
        cancle = false;
        layerNr = 0;
        background(0);
    }

    strokeWeight(strokeW);

    let hexH = sin(60) * hexS;
    let hexW = hexS;
    let dO = createVector(hexW * 1.5, 0).rotate(rot);

    let dV = createVector(0, hexH).rotate(rot);
    let dH = createVector(hexW, 0).rotate(rot);
    let dH3 = dH.copy().mult(3);

    let cHeight = height;
    let cWidth = width;

    let maxY = cHeight + hexS - dH.y * ceil(width / dH.x);

    for (let tStart = performance.now();
        (performance.now() - tStart < 33) && layerNr < layerCnt * multiplier; layerNr++) {

        let sizeStep = (hexS - minHexS) / layerCnt;

        let nr = layerNr % layerCnt;
        if (nr == 0)
            r = rot;

        let size = minHexS + sizeStep * (layerCnt - nr);
        let prevSize = minHexS + sizeStep * (layerCnt - nr - 1);

        let lineNr = 1;

        for (
            let pVert = createVector(0, 0).sub(offset); pVert.y < maxY; pVert.add(dV), lineNr++
        ) {
            if (lineNr % 2 == 1) {
                dO = createVector(0, 0);
            } else {
                dO = createVector(hexW * 1.5, 0).rotate(rot);
            }

            let pHor = dH.copy().add(pVert).add(dO);

            pHor.sub(dH3.copy().mult(floor((pHor.x + hexS) / dH3.x)));

            for (; pHor.x < cWidth + hexS && pHor.y > -hexS; pHor.add(dH3)) {
                if (pHor.y > cHeight + hexS)
                    continue;

                if (nr == 0)
                    drawHex(pHor, size, r, 6, true);
                else
                    drawHex(pHor, size, r);
            }
        }
        r -= getRotation(size, prevSize);
    }

    let finished = layerNr == layerCnt * multiplier;

    if (finished) {
        noLoop();
    }
}

function getRotation(s, ps) {
    return min(((s - ps) / s) * swirl, 30);
}

let colorA;
let ca;

let colorB;
let cb;

function setColor(v, d) {
    let ab = p5.Vector.sub(cb, ca);
    let av = p5.Vector.sub(v, ca);

    let p = av.dot(ab) / ab.magSq();

    let c = lerpColor(colorA, colorB, p);

    c = lerpColor(colorCenter, c, lerp(1 - colorCenterStrength, 1, d / hexS));
    c = lerpColor(c, colorBorder, lerp(0, colorBorderStrength, d / hexS));

    stroke(c);
}

function drawHex(p, s, r, sides = 6, drawHalf = false) {
    noFill();

    let pO = createVector(s, 0);
    pO.rotate(r);
    r = 360 / sides;

    if (drawHalf) sides /= 2;

    let lp = pO.copy().add(p);
    for (let i = 0; i < sides; i++) {
        pO.rotate(r);
        let pp = pO.copy().add(p);
        setColor(
            createVector(pp.x + 0.5 * (lp.x - pp.x), pp.y + 0.5 * (lp.y - pp.y)),
            s
        );
        line(lp.x, lp.y, pp.x, pp.y);
        lp = pp;
    }
    endShape(CLOSE);
}