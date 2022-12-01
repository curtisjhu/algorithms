# My shaders
The purpose of a fragment shader is to set up the gl_FragColor variable.
The purpose of a vertex shader is to set up the gl_Position variable.

Boolean
float isBlack = 1.0;
float isBlue = 0.0;
float isRed = 1.0;

Comparators
NEGATE: 1.0 - isBlack;
AND: isBlack * isRed;
OR: clamp(isBlack + isRed, 0.0, 1.0);
XAND: isBlack * isRed + (1.0 - isBlack) * (1.0 - isRed);
XOR: abs(isBlack - isBlue);

Point between

percent between two points
float function = ...;
mix(p1, p2, function);
