#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float noise(vec2 xy) {
	return fract(10000. * sin(xy.x * xy.y));
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(noise(st));

	gl_FragColor = vec4(color, 1.);
}