uniform vec2 u_resolution;

float rect(vec2 corner, vec2 pos) {
	return 1.0 - step(0.1, length(max(abs(pos) - corner, 0.0)));
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	p -= vec2(0.5);

	float tri = (1.0 - step(0.1, abs(p.x-0.03))) * (1.0 - step(0.04 - 0.45 * p.x, abs(p.y)));
	float f = rect(vec2(0.2, 0.1), p) *(1.0 - tri);
	vec3 color = vec3(1.0) * (1.0 - f) + vec3(0.9, 0.2, 0.0) * f;


	gl_FragColor = vec4(color, 1.0);
}