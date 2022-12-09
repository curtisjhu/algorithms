uniform vec2 u_resolution;

float boxSDF(in vec3 p, in vec3 r) {
	return length(max(abs(p) - r, 0));
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

}