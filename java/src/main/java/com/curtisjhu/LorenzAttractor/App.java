package com.curtisjhu.LorenzAttractor;

import processing.core.*;

/** Fix bugs soon */
class App extends PApplet {
	LorenzSystem system;
	PVector dimensions;

	@Override
	public void settings() {
		dimensions = new PVector(400, 400, 400);
		size((int) dimensions.x, (int) dimensions.y, P3D);
		pixelDensity(2);
	}

	@Override
	public void setup() {
		background(0);
		stroke(255);
		system = new LorenzSystem(28, (float) 8/3, 10);
	}

	@Override
	public void draw() {
		system.step();
		system.render(this);
	}

	public static void main(String[] args) {
		String[] appArgs = new String[]{ "LorenzSystem" };
		App sketch = new App();
		PApplet.runSketch(appArgs, sketch);
	}
}