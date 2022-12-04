uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	p -= vec2(0.50, 0.50);

	float d = 0.07;
	float r = 0.07;
	float d2 = 0.2;

	float isWhite = min(step(d2, length(p)) + (1.0 - step(d2-r, length(p))) * step(d, length(p)), 1.0);
	vec3 color = (1.0 - isWhite) * vec3(204, 0, 0) + isWhite * vec3(1.0);

	gl_FragColor = vec4(color, 1.);
	
}