uniform vec2 u_resolution;

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv - vec2(0.3, 0.7);

    // Time varying pixel color
    vec3 col = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), uv.y);
    
    // tree leaves
    float r = 0.2 + 0.1 * cos(10.0 * atan(p.y, p.x) + 20.0 * p.x + 1.0);
    col *= smoothstep(r, r+0.01, length(p));
    
    // column
    float width = 0.015 + 0.002* cos(120.0 * p.y);
    col *= 1. - (1. - smoothstep(width, width+0.001, abs(p.x - 0.2 * sin(2.0 * p.y)))) * (smoothstep(0.11, 0.10, p.y));
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}