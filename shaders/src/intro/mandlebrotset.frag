#define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)

uniform vec2 u_resolution;

float mandelBrotSet(vec2 pos) {

	int i = 0, m = 100;
	vec2 z = vec2(0.0, 0.0);
	while (length(z) < 2.0 && i++ < m) {
		z = cx_mul(z, z) + pos; 
	}

	return 1.0 - float(i / m);
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	p = p * 3.0 - 1.5;

	vec3 color = vec3(mandelBrotSet(p));

	gl_FragColor = vec4(color, 1.0);

}