
function setup() {
    const width = 400;
    const height = 400;
    const depth = 40;

    createCanvas(width, height);
    noiseSeed(3000)
    noiseDetail(8, 0.65)


    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            for (var z = 0; z < depth; z++) {
                var alpha = map(noise(x, y, z), 0, 1, 0, 255);
                var c = color(0, alpha)
                set(x, y, c);
            }
        }
    }
    updatePixels();
}