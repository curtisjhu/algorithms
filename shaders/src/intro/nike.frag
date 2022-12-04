uniform vec2 u_resolution;
uniform float u_time;

void main() {
	
	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	p -= 0.25;

	float angle = 0.5;
	p *= mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

	float y1 = 5.8 * pow(p.x, 2.0);
	float y2 = 10.0 * pow((p.x - 0.07), 2.0)-0.2;

	float black = step(y2, p.y) * (1.0 - step(y1, p.y));

	vec3 color = vec3(1.0) * (1.0 - black);

	gl_FragColor = vec4(color, 1.0);
}