

uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	p -= vec2(.5, .5);

	float radius = sqrt( dot(p, p));

	float angle = atan(p.y, p.x) + u_time * 0.1;
	float petals = 0.1 + 0.1 * sin(angle * 3.);
	float d = 0.15 + 0.3 * pow(petals, 0.4);
	d += 0.04 * pow(0.5 + 0.5 * cos(6.0 * angle), 0.4);

	float gradient = 0.3 + 2. * radius;
	vec3 color = (radius < d) ? vec3(0.1, .9, 0.) * gradient : vec3(1.);

	gl_FragColor = vec4(color, 1.);
}