

uniform vec2 u_resolution;
uniform float u_time;

float segment(vec2 p0,vec2 p1,vec2 uv)
{
	vec2 dir = normalize(p1 - p0);
	uv = (uv - p0) * mat2(dir.x, dir.y,-dir.y, dir.x);
	return distance(uv, clamp(uv, vec2(0), vec2(distance(p0, p1), 0)));   
}


void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(1.);

	// bias into the middle
	st -= vec2(0.50, 0.50);

	float r = length(st);

	float angle = atan(st.y, st.x);
	float petals = 0.025 + 0.05 * sin(15. * angle);
	float d = 0.3 + petals;

	vec2 eyes = vec2(abs(st.x) - 0.1, st.y - 0.02);
	float eye_ang = atan(eyes.y, eyes.x);
	float g = 1.0 - (step(0.03, length(eyes))
			* (1.0 - step(0.06, length(eyes)))
			* step(0.14, eye_ang));
	

	float f = (r < d) ? 1.0 : 0.0;
	
	color = mix(vec3(1.0), vec3(0.9, 0.8, 0.0) * g, f);

	gl_FragColor = vec4(color, 1.);
}