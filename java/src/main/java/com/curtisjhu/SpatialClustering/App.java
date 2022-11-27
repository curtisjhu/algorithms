package com.curtisjhu.SpatialClustering;

import processing.core.*;

public class App extends PApplet {

    @Override
    public void settings() {
        randomSeed(10);
        size(640, 480);

    }

    @Override
    public void setup() {
        background(255);
        noStroke();
        fill(0, 180);

        int individualSize = 10;
        int radius = 40;
        int averageClusters = 5;
        int clusterDeviation = 3;

        int averageClusterSize = 40;
        int clusterSizeDeviation = 7;

        int clusters = round(averageClusters + randomGaussian() * clusterDeviation);

        for (int i = 0; i < clusters; i++){

            PVector center = new PVector(random(0, width), random(0, height));
            int size = round(averageClusterSize + randomGaussian() * clusterSizeDeviation);
            for (int j = 0; j < size; j++){
                PVector position = new PVector(randomGaussian() * radius, randomGaussian() * radius);
                position.add(center);

                circle(position.x, position.y, individualSize);
            }
        }
        noLoop();
    }

    public static void main(String[] args) {
        String[] appArgs = new String[]{"Spatial Clustering"};
        App sketch = new App();
        PApplet.runSketch(appArgs, sketch);
    }
}
