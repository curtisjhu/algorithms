package com.curtisjhu.LorenzAttractor;

import processing.core.PVector;

class LorenzSystem {
	/**
	 * Lorenz System:
	 * x' = sigma * ( x - y )
	 * y' = x * ( rho - z ) - y
	 * z' = x * y - beta * z
	 *
	 */

	private final float deltaTime = 0.001f;
	private final float rho, beta, sigma;
	private PVector position;


	LorenzSystem(float rho, float beta, float sigma) {
		this.rho = rho;
		this.beta = beta;
		this.sigma = sigma;
		position = new PVector(0.01f, 0, 0);


	}

	/**
	 * Using Euler's Integration as a good approximation.
	 */
	public void step() {
		float dx = sigma * ( position.x - position.y );
		float dy = position.x * ( rho - position.z ) - position.y;
		float dz = position.x * position.y - beta * position.z;
		PVector differential = new PVector(dx, dy, dz);
		differential.mult(deltaTime);

		position.add(differential);
	}

	public void render(App win) {
		win.translate(win.width/2, win.height/2);
		win.scale(2);
		win.point(position.x, position.y);
	}
}