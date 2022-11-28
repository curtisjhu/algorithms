#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float perlin_noise(in vec2 loc) {
	vec2 i = floor(loc);
	vec2 f = fract(loc);

	vec2 u = f*f*(3.-2.*f);

	// corners of square
	float a = random(i);
	float b = random(i + vec2(1., 0.));
	float c = random(i + vec2(0., 1.));
	float d = random(i + vec2(1.));

	return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	st = vec2(st*20.);
	vec3 color = vec3(perlin_noise(st));

	gl_FragColor = vec4(color, 1.);

}