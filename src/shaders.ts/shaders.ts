/**
 * # 着色器代码集合 🎨
 * - 包含雨滴效果所需的GLSL着色器代码
 * - 片段着色器和顶点着色器分离定义
 */

/** # 雨滴片段着色器 🎨 */
export const RAIN_FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform sampler2D u_tex0;
uniform vec2 u_tex0_resolution;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform float u_intensity;
uniform float u_normal;
uniform float u_brightness;
uniform float u_blur_intensity;
uniform float u_zoom;
uniform int u_blur_iterations;
uniform bool u_panning;
uniform bool u_post_processing;
uniform bool u_lightning;
uniform bool u_texture_fill;

// 平滑过渡宏定义
#define S(a, b, t) smoothstep(a, b, t)

// 数学常量
const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;
const float HALF_PI = 1.57079632679;

// 恢复原版：完整的噪声函数集合
vec3 generateNoise3D(float seed) {
    vec3 p3 = fract(vec3(seed) * vec3(.1031, .11369, .13787));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

vec4 generateNoise4D(float time) {
    return fract(sin(time * vec4(123., 1024., 1456., 264.)) * vec4(6547., 345., 8799., 1564.));
}

float generateNoise1D(float time) {
    return fract(sin(time * 12345.564) * 7658.76);
}

float sawtoothWave(float frequency, float time) {
    return S(0., frequency, time) * S(1., frequency, time);
}

// 恢复原版：保持雨滴自然随机性
vec2 calculateDropletLayer(vec2 coord, float time) {
    vec2 originalCoord = coord;
    coord.y += time * 0.75;
    
    vec2 gridSize = vec2(6.0, 1.0);
    vec2 gridMultiplier = gridSize * 2.0;
    vec2 cellId = floor(coord * gridMultiplier);
    
    float columnOffset = generateNoise1D(cellId.x);
    coord.y += columnOffset;
    cellId = floor(coord * gridMultiplier);
    
    vec3 noise = generateNoise3D(cellId.x * 35.2 + cellId.y * 2376.1);
    vec2 localPos = fract(coord * gridMultiplier) - vec2(0.5, 0.0);
    
    float xOffset = noise.x - 0.5;
    float yWave = originalCoord.y * 30.0;
    float wiggle = sin(yWave + sin(yWave));
    xOffset += wiggle * (0.5 - abs(xOffset)) * (noise.z - 0.5);
    xOffset *= 0.7;
    
    float timeOffset = fract(time + noise.z);
    float yPos = (sawtoothWave(0.85, timeOffset) - 0.5) * 0.9 + 0.5;
    vec2 dropPos = vec2(xOffset, yPos);
    
    float distance = length((localPos - dropPos) * gridSize.yx);
    float mainDrop = S(0.4, 0.0, distance);
    
    float radius = sqrt(S(1.0, yPos, localPos.y));
    float centerDist = abs(localPos.x - xOffset);
    float trail = S(0.23 * radius, 0.15 * radius * radius, centerDist);
    float trailFront = S(-0.02, 0.02, localPos.y - yPos);
    trail *= trailFront * radius * radius;
    
    yPos = originalCoord.y;
    float trail2 = S(0.2 * radius, 0.0, centerDist);
    float smallDroplets = max(0.0, (sin(yPos * (1.0 - yPos) * 120.0) - localPos.y)) * trail2 * trailFront * noise.z;
    
    yPos = fract(yPos * 10.0) + (localPos.y - 0.5);
    float smallDropDist = length(localPos - vec2(xOffset, yPos));
    smallDroplets = S(0.3, 0.0, smallDropDist);
    
    float mask = mainDrop + smallDroplets * radius * trailFront;
    return vec2(mask, trail);
}

// 优化：简化静态雨滴计算
float calculateStaticDrops(vec2 coord, float time) {
    coord *= 60.0;
    vec2 cellId = floor(coord);
    vec2 localPos = fract(coord) - 0.5;
    
    vec3 noise = generateNoise3D(cellId.x * 107.45 + cellId.y * 3543.654);
    vec2 dropPos = (noise.xy - 0.5) * 0.7;
    
    float distance = length(localPos - dropPos);
    float fade = sawtoothWave(0.025, fract(time + noise.z));
    float drop = S(0.3, 0.0, distance) * fract(noise.z * 10.0) * fade;
    
    return drop;
}

// 恢复原版：保持正确的强度混合
vec2 calculateDrops(vec2 coord, float time, float staticIntensity, float layer1Intensity, float layer2Intensity) {
    float staticDrops = calculateStaticDrops(coord, time) * staticIntensity;
    vec2 layer1 = calculateDropletLayer(coord, time) * layer1Intensity;
    vec2 layer2 = calculateDropletLayer(coord * 1.85, time) * layer2Intensity;
    
    float combined = staticDrops + layer1.x + layer2.x;
    combined = S(0.3, 1.0, combined);
    
    return vec2(combined, max(layer1.y * staticIntensity, layer2.y * layer1Intensity));
}

// 恢复原版：保持原有的2D噪声特性
float generateNoise2D(vec2 position) {
    position = fract(position * vec2(123.34, 345.45));
    position += dot(position, position + 34.345);
    return fract(position.x * position.y);
}

void main() {
    // 标准化屏幕坐标 - 使用固定参考尺寸确保雨滴大小一致
    const float REFERENCE_SIZE = 1000.0; // 固定参考尺寸
    vec2 normalizedCoord = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / REFERENCE_SIZE;
    vec2 textureCoord = gl_FragCoord.xy / u_resolution.xy;
    
    float currentTime = u_time;
    
    // 纹理适配 - 保持宽高比
    if(u_texture_fill) {
        float screenAspect = u_resolution.x / u_resolution.y;
        float textureAspect = u_tex0_resolution.x / u_tex0_resolution.y;
        
        float scaleX = 1.0, scaleY = 1.0;
        if(textureAspect > screenAspect) {
            scaleX = screenAspect / textureAspect;
        } else {
            scaleY = textureAspect / screenAspect;
        }
        
        textureCoord = vec2(scaleX, scaleY) * (textureCoord - 0.5) + 0.5;
    }
    
    // 时间相关参数
    float animationTime = currentTime * 0.2 * u_speed;
    float rainIntensity = u_intensity;
    
    // 缩放和平移效果 - 优化缩放逻辑，1.0为标准尺寸
    float panningOffset = u_panning ? -cos(currentTime * 0.2) : 0.0;
    normalizedCoord *= (1.0 + panningOffset * 0.3) / u_zoom;
    
    // 雨滴层强度
    float staticDropIntensity = S(-0.5, 1.0, rainIntensity) * 2.0;
    float layer1Intensity = S(0.25, 0.75, rainIntensity);
    float layer2Intensity = S(0.0, 0.5, rainIntensity);
    
    // 计算雨滴效果
    vec2 rainEffect = calculateDrops(normalizedCoord, animationTime, staticDropIntensity, layer1Intensity, layer2Intensity);
    
    // 法线偏移计算 - 优化缓存计算结果
    const float NORMAL_OFFSET = 0.001;
    vec2 normalOffset = vec2(NORMAL_OFFSET, 0.0) * u_normal;
    
    // 缓存法线偏移计算结果
    vec2 offsetX = normalizedCoord + normalOffset;
    vec2 offsetY = normalizedCoord + normalOffset.yx;
    
    float normalX = calculateDrops(offsetX, animationTime, staticDropIntensity, layer1Intensity, layer2Intensity).x;
    float normalY = calculateDrops(offsetY, animationTime, staticDropIntensity, layer1Intensity, layer2Intensity).x;
    vec2 normalVector = vec2(normalX - rainEffect.x, normalY - rainEffect.x);
    
    // 应用法线偏移到纹理采样
    vec3 finalColor = texture2D(u_tex0, textureCoord + normalVector).rgb;
    vec4 textureSample = vec4(textureCoord.x + normalVector.x, textureCoord.y + normalVector.y, 0.0, 1.0);
    
    // 模糊效果 - 预计算优化
    if(u_blur_iterations > 1) {
        const float BLUR_SCALE = 0.01;
        const float RANDOM_SEED = 546.0;
        const float RANDOM_MULTIPLIER = 5424.0;
        
        float blurAmount = u_blur_intensity * BLUR_SCALE;
        float baseAngle = generateNoise2D(gl_FragCoord.xy) * TWO_PI;
        
        // 预计算三角函数值
        float sinBase = sin(baseAngle);
        float cosBase = cos(baseAngle);
        
        for(int iteration = 0; iteration < 64; iteration++) {
            if(iteration >= u_blur_iterations) break;
            
            // 优化随机数生成
            float randomValue = fract(sin(float(iteration + 1) * RANDOM_SEED) * RANDOM_MULTIPLIER);
            float scaledRandom = sqrt(randomValue);
            
            // 使用预计算的三角函数值
            vec2 offset = vec2(sinBase, cosBase) * (blurAmount * scaledRandom);
            
            finalColor += texture2D(u_tex0, textureSample.xy + offset).rgb;
            
            // 角度递增优化
            baseAngle += 1.0;
            sinBase = sin(baseAngle);
            cosBase = cos(baseAngle);
        }
        
        finalColor /= float(u_blur_iterations);
    }
    
    // 后处理效果
    float postTime = (currentTime + 3.0) * 0.5;
    if(u_post_processing) {
        finalColor *= mix(vec3(1.0), vec3(0.8, 0.9, 1.3), 1.0);
    }
    
    // 闪电效果 - 预计算优化
    if(u_lightning) {
        const float LIGHTNING_FREQUENCY = 10.0;
        const float LIGHTNING_POWER = 10.0;
        const float LIGHTNING_MIX_FACTOR = 0.1;
        
        float fadeIn = S(0.0, 10.0, currentTime);
        
        // 预计算内部sin值
        float innerSin = sin(postTime);
        float lightning = sin(postTime * sin(postTime * LIGHTNING_FREQUENCY));
        lightning *= pow(max(0.0, sin(postTime + innerSin)), LIGHTNING_POWER);
        
        finalColor *= 1.0 + lightning * fadeIn * mix(1.0, LIGHTNING_MIX_FACTOR, 0.0);
    }
    
    // 边缘暗角效果
    textureCoord -= 0.5;
    finalColor *= 1.0 - dot(textureCoord, textureCoord) * 1.0;
    
    gl_FragColor = vec4(finalColor * u_brightness, 1.0);
}
`

/** # 雨滴顶点着色器 📐 */
export const RAIN_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`
