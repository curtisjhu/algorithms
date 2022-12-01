uniform vec2 u_resolution;
uniform float u_time;

float drawLine(in vec2 p1, in vec2 p2, vec2 curr) {
	float width = .03;

	// is curr on the line between p1 and p2?
	float d = distance(p1, p2);
	float dcurr = distance(p1, curr);
	vec2 proposedPosition = mix(p1, p2, clamp(dcurr / d, 0.0, 1.0));
	float proposedDistance = distance(curr, proposedPosition);

	float res = (proposedDistance < width) ? 1.0 : 0.0;
	return res;
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	vec2 mid = vec2(.5);
	p -= vec2(.5);

	float angle = atan(p.y, p.x) + 3.14159 / 8.0;
	float petals = 0.05 * abs(sin(angle * 4.));
	float d = 0.3 + 0.6 * pow(petals, 0.8);

	// check mark
	vec2 p0 = vec2(-0.15, 0.03);
	vec2 p1 = vec2(-0.07, -0.1);
	vec2 p2 = vec2(0.15, 0.1);

	float lines = drawLine(p0, p1, p)
				+ drawLine(p1 + vec2(-0.004, -0.01), p2, p);

	float isBlue = (1.0 - step(d, length(p))) * (1.0 - lines);
	
	vec3 color = mix(vec3(1.0), vec3(0.11, 0.61, 0.93), isBlue);
	
	gl_FragColor = vec4(color, 1.);
}