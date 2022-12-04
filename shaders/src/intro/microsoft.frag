
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	vec2 mid = vec2(.5);
	p -= mid;

	vec3 red = vec3(0.95, 0.314, 0.133);
	vec3 green = vec3(0.5, 0.73, 0.0);
	vec3 blue = vec3(0.0, 0.643, 0.937);
	vec3 yellow = vec3(1.0, 0.725, 0.0);

	float size = 0.3;
	float gap = 0.01;
	float onRight = step(gap, p.x) * (1.0 - step(size, p.x));
	float onLeft = (1.0 - step(-gap, p.x)) * (step(-size, p.x));
	float onUp = step(gap, p.y) * (1.0 - step(size, p.y));
	float onBottom = (1.0 - step(-gap, p.y)) * (step(-size, p.y));

	vec3 color = red * onLeft * onUp
				+ green * onRight * onUp
				+ blue * onLeft * onBottom
				+ yellow * onRight * onBottom;

	gl_FragColor = vec4(color, 1.0);
}