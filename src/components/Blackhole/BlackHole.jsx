import { useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, Vector2 } from "three";
import styles from "./BlackHole.module.css";
import blackHoleImage from "../../../assets/hero/BlackHole.jpeg";
import flowImage from "../../../assets/hero/BlackHoleFlow.png";

// Fullscreen quad in clip space: no camera, no perspective, no edges.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// The image is never bent or rotated. Each pixel is read from a point that
// slides a tiny distance ALONG the streak it sits on (direction taken from
// the flow map), so the stars travel around the hole while the streaks,
// colors and shapes stay exactly as in the original picture.
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uFlow;      // RG = streak direction, B = speed
  uniform float uTime;
  uniform vec2  uResolution;
  uniform float uImageAspect;
  uniform vec2  uFocus;         // hole centre in image UV (y up)
  uniform vec2  uAnchor;        // where that centre lands on screen (0..1)
  uniform float uZoom;          // 1 = whole image visible (cover)
  uniform float uAmount;        // how far stars slide per cycle (image widths)
  uniform float uPeriod;        // seconds per cycle
  uniform float uDirection;     // 1 or -1

  varying vec2 vUv;

  vec3 flowAt(vec2 uv) {
    vec3 f = texture2D(uFlow, uv).rgb;
    return vec3(f.rg * 2.0 - 1.0, f.b);
  }

  // slide along the streak; 2 steps so it follows the curve of the rings
  vec3 advected(vec2 uv, float p) {
    float d = p * uAmount * uDirection;
    vec3 f = flowAt(uv);
    vec2 mid = uv - vec2(f.x, f.y * uImageAspect) * f.z * d * 0.5;
    f = flowAt(mid);
    vec2 src = uv - vec2(f.x, f.y * uImageAspect) * f.z * d;
    return texture2D(uTexture, src).rgb;
  }

  void main() {
    // object-fit: cover, so the image is never stretched
    float screenAspect = uResolution.x / uResolution.y;
    vec2 s = screenAspect > uImageAspect
      ? vec2(1.0, uImageAspect / screenAspect)
      : vec2(screenAspect / uImageAspect, 1.0);
    s /= uZoom;
    vec2 c = clamp(uFocus - (uAnchor - 0.5) * s, 0.5 * s, 1.0 - 0.5 * s);
    vec2 uv = c + (vUv - 0.5) * s;

    // two overlapping cycles, cross-faded, so the slide never accumulates
    float t  = uTime / uPeriod;
    float p1 = fract(t);
    float p2 = fract(t + 0.5);
    float w1 = 1.0 - abs(2.0 * p1 - 1.0);

    vec3 col = advected(uv, p1) * w1 + advected(uv, p2) * (1.0 - w1);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function AnimatedBlackHole() {
  const [texture, flow] = useLoader(TextureLoader, [blackHoleImage, flowImage]);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uFlow: { value: flow },
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uImageAspect: { value: texture.image.width / texture.image.height },
      uFocus: { value: new Vector2(0.52, 0.46) },
      uAnchor: { value: new Vector2(0.6, 0.5) },
      uZoom: { value: 1.1 },      // 1.0 = show the whole picture
      uAmount: { value: 0.02 },   // bigger = faster / more travel
      uPeriod: { value: 5.0 },    // smaller = faster
      uDirection: { value: 1 },   // -1 reverses the spin
    }),
    [texture, flow]
  );

  useFrame((state) => {
    const mobile = size.width < 830;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uAnchor.value.set(mobile ? 0.5 : 0.6, mobile ? 0.42 : 0.5);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export const BlackHole = () => (
  <div className={styles.container}>
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>
      <AnimatedBlackHole />
    </Canvas>
  </div>
);