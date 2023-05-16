uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;
// Simple hash function
float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}


float noise(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0;
    return mix(mix(hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}

void main() {
    vec2 uv = v_uv;

    // Adjust the scale to change the size of the pattern
    float scale = 3.0;

    // Generate Perlin noise
    float n = noise(uv * scale);

    // Threshold for creating the cow pattern
    float threshold = 0.5;

    // Create the cow pattern
    float pattern = step(threshold, n);

    // Set the color as black or white based on the pattern
    vec3 color = vec3(pattern);

    gl_FragColor = vec4(color, 1.0);
}
