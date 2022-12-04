uniform vec2 u_resolution;

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

}