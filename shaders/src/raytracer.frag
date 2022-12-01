uniform vec2 u_resolution;
uniform float u_time;

float iSphere(in vec3 origin, in vec3 direction) {
	// <xyz, xyz> = r^2
	// xyz = origin + t * direction
	// |origin|^2 + 2<origin, direction>t + t^2 = r^2
	float r = 1.0;

	float b = 2.0 * dot(origin, direction);
	float c = dot(origin, origin) - r*r;

	float h = b * b - 4.0 * c;
	if (h < 0.0)
		return -1.0;

	// solved for t
	float t = -b - sqrt(h) / 2.0;
	return t;

}

float intersect( in vec3 origin, in vec3 direction) {
	// intersect scene, a sphere.
	float t = iSphere(origin, direction);
	return t;
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution.xy;

	// ray with origin, direction
	vec3 origin = vec3(0.0, 1.0, 2.0);
	vec3 direction = normalize(vec3(-1.0 + 2.0 + p, -1.0 ));

	// we intersect with the 3d scene
	float hit = intersect(origin, direction);

	// draw black by default
	vec3 color = vec3(0.0);
	if (hit > 0.0) {
		// if we hit something, we draw white
		color = vec3(1.0);
	}

	gl_FragColor = vec4(color, 1.);
}