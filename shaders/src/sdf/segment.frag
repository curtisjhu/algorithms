uniform vec2 u_resolution;

float lineSDF(in vec3 p, in vec3 a, in vec3 b) {
	float h = clamp(dot(p-a, b-a)/length(b-a)^2, 0.0, 1.0);
	return length(p-a - h * (b-a));
}

void main() {

}