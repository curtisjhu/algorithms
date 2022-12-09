
uniform vec2 u_resolution;
uniform float u_time;

void main()
{
	vec4 color = vec4(0.0);
    vec2 r = u_resolution.xy;
	vec2 I = gl_FragCoord.xy;
    vec2 p = I - r * 0.6;
    
    //Initialize loop iterator and arc angle
    for(float i=0.0 , angle;
        //Loop 300 times
        i++<3e1;
        //Add with ring attenuation
        color += 5e-3 / (abs(length(I=p*mat2(1,-1,2,2)/(r.y-p-p.yx))-i/4e1)+1./r.y)*
        //Limit to arcs
        clamp(cos(angle=atan(I.y,I.x)*ceil(i*.1)+u_time*sin(i*i)+i*i),.0,.6)*
        //Give them color
        (cos(angle-i+vec4(0,1,2,0))+1.0) );
        
	gl_FragColor = color;
}