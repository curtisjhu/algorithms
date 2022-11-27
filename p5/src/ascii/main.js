const shade  = '@$#*!=;:~=,.';
var img;

function preload() {
    img = loadImage("./rickroll.jpeg");
}

function setup() {
    img.loadPixels();
    var w = 600, h = 600;
    createCanvas(w, h);
    img.resize(w, h);

    // image(img, 0, 0)
    var textheight = 8, textwidth = 4;
    const area = textheight * textwidth;
    textFont('monospace', textheight);
    textStyle(NORMAL);
    noStroke();
    fill(0);


    for (let i = 0; i < w; i += textwidth) {
        for (let j = 0; j < h; j += textheight) {

            var b = 0;
            for (var o = i; o < i + textwidth; o++)
                for (var k = j; k < j + textheight; k++)
                    b += brightness(img.get(o, k));
            b = b / area;

            var shadeIndex = round(map(b, 0, 255, 0, shade.length));
            text(shade[shadeIndex], i, j);
        }
    }
    
    noLoop();
}