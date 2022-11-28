

uniform vec2 u_resolution;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(1.);

	// bias into the middle
	st -= vec2(0.50, 0.50);

	float r = length(st);

	float angle = atan(st.y, st.x);
	float petals = 0.025 + 0.05 * sin(15. * angle);
	float d = 0.3 + petals;

	vec2 eyes = vec2(abs(st.x) - 0.11, st.y - 0.1);
	float g = step(0.03, length(eyes));
	
	color = (r < d) ? vec3(.9, .8, 0.) * g : vec3(1.);

	gl_FragColor = vec4(color, 1.);
}