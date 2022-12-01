uniform vec2 u_resolution;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise(in vec2 loc) {
	vec2 i = floor(loc);
	vec2 f = fract(loc);

	// cubic hermine curve
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

// brownian brownian motion;
float fbm(vec2 p) {
	float f = 0.0;
	// octaves
	f += 0.5000 * noise(p); f *= 2.02;
	f += 0.2500 * noise(p); f *= 2.01;
	f += 0.1250 * noise(p); f *= 2.03;
	f += 0.0625 * noise(p); f *= 2.04;
	f /= 0.9375;
	return f;
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	// remap from from -1 to 1;
	p = -1.0 + 2.0 * p;
	float background = 1.0;

	float f = fbm(32.0 * p);
	vec3 color = vec3(f);

	gl_FragColor = vec4(color, 1.0);
} 