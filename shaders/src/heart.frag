uniform vec2 u_resolution;
uniform float u_time;

vec3 square(vec3 v){return v*v;}
vec3 cube(vec3 v){return v*v*v;}
float num_cube(float f){return f*f*f;}
float heart_function(vec3 v){return num_cube(square(v).x + 2.25 * square(v).y + square(v).z - 1.0) - (square(v).x + 0.1125 * square(v).y) * cube(v).z;}

float h(float x, float z){
    float a = 0.0, b = 0.75, y = 0.5;
    for (int i = 0; i < 10; i++){
        if (heart_function(vec3(x, y, z)) <= 0.0) a = y;
        else b = y;
        y = (a + b) * 0.5;
    }
    return y;
}

vec3 nml(vec2 p){
    vec3 v = vec3(p.x, h(p.x, p.y), p.y);
    float a = -1.0 + dot(square(v), vec3(1, 2.25, 1));a *= a;   
    float x = -2.0 * v.x * cube(v).z +  6.0 * v.x * a;
    float y = -0.225 * v.y * cube(v).z + 13.5 * v.y * a;
    float z = v.z * (-3.0 * square(v).x * v.z - 0.3375 * square(v).y * v.z + 6.0 * a);
  	return normalize(vec3(x, y, z));
}

void main(){
    vec3 col;
    float t = sin(u_time * 4.0);
    t = t * t * t * t * -0.1;
    vec3 p = vec3((2.0 * gl_FragCoord.xy - u_resolution.xy) / min(u_resolution.y, u_resolution.x),0);
    vec3 itime_p = p * vec3(1.0 + t, 1.0 + t, 0.0) * 4.5;
    if (heart_function(itime_p.xzy) <= 0.0){
        vec3 n = nml(itime_p.xy);
        float diffuse = dot(n, normalize(vec3(-1, 1, 1))) * 0.5 + 0.5;
        float rim = 1.0 - dot(n, vec3(0.0, 1.0, 0.0));
        col = diffuse * vec3(1.0, 0, 0) + rim * vec3(0.5);
    }
	else
        col = vec3(1, 0.75, 0.8) * (1.1 - 0.25 * length(p));
	gl_FragColor = vec4(col, 1.0);
}