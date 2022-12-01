uniform vec2 u_resolution;
uniform float u_time;

float drawLine(in vec2 p1, in vec2 p2, vec2 curr) {
	float width = .003;

	// is curr on the line between p1 and p2?
	float d = distance(p1, p2);
	float dcurr = distance(p1, curr);
	vec2 proposedPosition = mix(p1, p2, clamp(dcurr / d, 0.0, 1.0));
	float proposedDistance = distance(curr, proposedPosition);

	float res = (proposedDistance < width) ? 1.0 : 0.0;
	return res;
}

float drawPoint(vec2 p1, vec2 curr) {
	float r = 0.01;
	return (distance(curr, p1) < r) ? 1.0 : 0.0;
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	vec2 p0 = vec2(0.3, 0.3);
	vec2 p1 = vec2(0.5, 0.6);
	vec2 p2 = vec2(0.7, 0.3);

	float func = 0.5 + 0.5 * sin(u_time);

	vec2 midp1 = mix(p0, p1, func);
	vec2 midp2 = mix(p1, p2, func);
	vec2 mid = mix(midp1, midp2, func);

	float lines = drawLine(p0, p1, p)
				+ drawLine(p1, p2, p)
				+ drawLine(midp1, midp2, p)
				+ drawPoint(mid, p);

	vec3 color = vec3(1.0) * (1.0 - lines) + vec3(0.0) * lines;


	
	gl_FragColor = vec4(color, 1.0);
}