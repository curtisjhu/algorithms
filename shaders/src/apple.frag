uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(1.);
	gl_FragColor = vec4(color, 1.);
}