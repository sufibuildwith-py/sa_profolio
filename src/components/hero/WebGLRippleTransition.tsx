import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react'

export interface WebGLRippleTransitionHandle {
  setProgress: (progress: number) => void
  getDebugInfo: () => {
    progress: number
    canvasSize: string
    textureSize: string
    dpr: number
  }
}

interface WebGLRippleTransitionProps {
  initialProgress?: number
  className?: string
}

// ============================================================================
// COMPONENTRY RIPPLE TRANSITION GLSL SHADER (Transparent Text Texture Adaptation)
// ============================================================================
// Features:
// 1. Simplex 2D noise-driven wavefront warp
// 2. Gaussian ripple envelope (primary wave thickness)
// 3. Concentric wave oscillation harmonics
// 4. Directional radial refractive displacement (pushAmt)
// 5. Chromatic aberration splitting (caStrength)
// 6. Specular violet wavefront sheen (#7C6ECD)
// 7. 100% Transparent alpha preservation — ZERO background box or border artifacts

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  vUv.y = 1.0 - vUv.y; // Flip Y for WebGL texture coordinate alignment
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTex1; // Texture A: Quote Typography (Transparent PNG/Canvas)
uniform sampler2D uTex2; // Texture B: Brand Identity (Transparent PNG/Canvas)
uniform float uProgress; // Normalized 0.0 -> 1.0 driven by ScrollTrigger
uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform float uWaveSpeed;
uniform float uSigma;
uniform float uWaveFreq;
uniform float uPushAmt;
uniform float uCaStrength;
uniform float uGlow;
uniform float uNoiseWarp;

// Simplex 2D Noise Implementation
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  
  // Aspect-corrected coordinate space for circular wave propagation
  vec2 p = uv;
  p.x *= aspect;
  vec2 origin = uOrigin;
  origin.x *= aspect;

  float d = length(p - origin);
  
  // 1. Organic Simplex Noise Warp along wavefront
  float n = snoise(uv * 4.2 + uProgress * 2.0) * 0.08 * uNoiseWarp;
  float dNoisy = d + n;

  // 2. Wavefront propagation parameters
  float maxDist = length(vec2(aspect, 1.0));
  float waveR = uProgress * maxDist * uWaveSpeed;
  float distToWave = dNoisy - waveR;

  // 3. Gaussian Ripple Envelope (Primary Wave Thickness)
  float envelope = exp(-pow(distToWave / max(uSigma, 0.001), 2.0));

  // 4. Concentric Ripple Harmonics
  float waveOsc = sin(distToWave * uWaveFreq * 18.8495); // 3 * 2 * PI

  // 5. Directional Radial Displacement (Refractive Push)
  vec2 dir = normalize(p - origin + vec2(0.0001));
  vec2 disp = dir * (envelope * waveOsc * uPushAmt);
  disp.x /= aspect; // Normalize back to UV space

  // 6. Transition Boundary Mask (Texture 1 -> Texture 2)
  float mask = smoothstep(waveR - uSigma * 1.4, waveR + uSigma * 0.8, dNoisy);

  // 7. Chromatic Aberration Sampling with refractive offsets
  float ca = uCaStrength * envelope;
  vec2 uvR = clamp(uv + disp * (1.0 + ca * 3.0), 0.0, 1.0);
  vec2 uvG = clamp(uv + disp, 0.0, 1.0);
  vec2 uvB = clamp(uv + disp * (1.0 - ca * 3.0), 0.0, 1.0);

  vec4 col1R = texture2D(uTex1, uvR);
  vec4 col1G = texture2D(uTex1, uvG);
  vec4 col1B = texture2D(uTex1, uvB);
  vec4 col1 = vec4(col1R.r, col1G.g, col1B.b, col1G.a);

  vec4 col2R = texture2D(uTex2, uvR);
  vec4 col2G = texture2D(uTex2, uvG);
  vec4 col2B = texture2D(uTex2, uvB);
  vec4 col2 = vec4(col2R.r, col2G.g, col2B.b, col2G.a);

  // If resting at edges, output clean exact texture directly
  if (uProgress <= 0.001) {
    gl_FragColor = texture2D(uTex1, uv);
    return;
  }
  if (uProgress >= 0.999) {
    gl_FragColor = texture2D(uTex2, uv);
    return;
  }

  // 8. Blend between distorted typography states across wavefront
  vec4 finalColor = mix(col2, col1, mask);

  // 9. Restrained Violet Refractive Wavefront Shimmer (Applies over glyphs & immediate water edge)
  vec3 glowColor = vec3(0.486, 0.431, 0.804); // #7C6ECD violet
  float waveGlow = envelope * uGlow;
  
  // Apply sheen proportional to local alpha + subtle water surface refraction
  float textAlpha = max(col1.a, col2.a);
  finalColor.rgb += glowColor * (waveGlow * 0.65 * max(textAlpha, 0.15));
  finalColor.rgb += vec3(1.0, 1.0, 1.0) * (pow(envelope, 3.5) * waveGlow * 0.45 * textAlpha);
  finalColor.a = max(finalColor.a, envelope * 0.25 * waveGlow);

  gl_FragColor = finalColor;
}
`

export const WebGLRippleTransition = forwardRef<
  WebGLRippleTransitionHandle,
  WebGLRippleTransitionProps
>(({ initialProgress = 0, className = '' }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const tex1Ref = useRef<WebGLTexture | null>(null)
  const tex2Ref = useRef<WebGLTexture | null>(null)
  const uniformsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({})
  const offscreen1Ref = useRef<HTMLCanvasElement | null>(null)
  const offscreen2Ref = useRef<HTMLCanvasElement | null>(null)
  const currentProgressRef = useRef(initialProgress)
  const lastDprRef = useRef(1)

  // Render Transparent High-DPI Typography Textures
  const renderTextTextures = useCallback((width: number, height: number, dpr: number) => {
    const w = Math.round(width * dpr)
    const h = Math.round(height * dpr)
    if (w <= 0 || h <= 0) return
    lastDprRef.current = dpr

    // 1. Texture 1: Romanized Urdu/Hindi Quote on 100% TRANSPARENT Canvas
    if (!offscreen1Ref.current) offscreen1Ref.current = document.createElement('canvas')
    const c1 = offscreen1Ref.current
    c1.width = w
    c1.height = h
    const ctx1 = c1.getContext('2d')
    if (ctx1) {
      ctx1.clearRect(0, 0, w, h) // 100% Pure Transparent Background

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1200

      // Main Italic Serif Quote Typography
      const quoteFontSize = isMobile
        ? Math.round(26 * dpr)
        : isTablet
        ? Math.round(38 * dpr)
        : Math.round(48 * dpr)

      ctx1.font = `italic 400 ${quoteFontSize}px 'Instrument Serif', Georgia, serif`
      ctx1.fillStyle = '#C4BEF2' // Elegant soft violet/lilac
      ctx1.textBaseline = 'alphabetic'

      const lineSpacing = quoteFontSize * 1.25
      const startX = Math.round(4 * dpr)
      const startY = isMobile ? Math.round(60 * dpr) : Math.round(80 * dpr)

      if (isMobile) {
        ctx1.fillText('Hum sirf mehfil', startX, startY)
        ctx1.fillText('nahin sanwārte,', startX, startY + lineSpacing)
        ctx1.fillStyle = '#EBE8FB'
        ctx1.fillText('lamhon ko yaadgaar', startX, startY + lineSpacing * 2)
        ctx1.fillText('banate hain.', startX, startY + lineSpacing * 3)
      } else {
        ctx1.fillText('Hum sirf mehfil nahin sanwārte,', startX, startY)
        ctx1.fillStyle = '#F2EFFE'
        ctx1.fillText('lamhon ko yaadgaar banate hain.', startX, startY + lineSpacing)
      }
    }

    // 2. Texture 2: Master Brand Wordmark on 100% TRANSPARENT Canvas
    if (!offscreen2Ref.current) offscreen2Ref.current = document.createElement('canvas')
    const c2 = offscreen2Ref.current
    c2.width = w
    c2.height = h
    const ctx2 = c2.getContext('2d')
    if (ctx2) {
      ctx2.clearRect(0, 0, w, h) // 100% Pure Transparent Background

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1200

      // Master Brand Typography
      const brandFontSize = isMobile
        ? Math.round(42 * dpr)
        : isTablet
        ? Math.round(68 * dpr)
        : Math.round(92 * dpr)

      ctx2.font = `800 ${brandFontSize}px 'Inter Tight', 'Manrope', -apple-system, sans-serif`
      ctx2.fillStyle = '#FFFFFF'
      ctx2.textBaseline = 'alphabetic'

      const startX = Math.round(4 * dpr)
      const startY = isMobile ? Math.round(70 * dpr) : Math.round(95 * dpr)

      ctx2.fillText('SA PRODUCTION', startX, startY)

      // Tagline Typography
      const subFontSize = isMobile ? Math.round(15 * dpr) : Math.round(22 * dpr)
      ctx2.font = `italic 400 ${subFontSize}px 'Instrument Serif', Georgia, serif`
      ctx2.fillStyle = 'rgba(244, 241, 232, 0.85)'
      ctx2.fillText('Bring Life to Your Event', startX, startY + brandFontSize * 0.45)
    }

    // Upload Textures to WebGL
    const gl = glRef.current
    if (!gl) return

    if (!tex1Ref.current) tex1Ref.current = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex1Ref.current)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    if (!tex2Ref.current) tex2Ref.current = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex2Ref.current)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c2)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  }, [])

  // Draw WebGL Frame
  const drawFrame = useCallback((progress: number) => {
    const gl = glRef.current
    const program = programRef.current
    if (!gl || !program || !tex1Ref.current || !tex2Ref.current) return

    gl.useProgram(program)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex1Ref.current)
    gl.uniform1i(uniformsRef.current.uTex1, 0)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, tex2Ref.current)
    gl.uniform1i(uniformsRef.current.uTex2, 1)

    const clampedProgress = Math.max(0.0, Math.min(1.0, progress))
    gl.uniform1f(uniformsRef.current.uProgress, clampedProgress)

    gl.clearColor(0, 0, 0, 0) // Transparent WebGL Clear
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }, [])

  // Expose Imperative Handle for 0-Re-render GSAP Updates
  useImperativeHandle(ref, () => ({
    setProgress: (progress: number) => {
      currentProgressRef.current = progress
      drawFrame(progress)
    },
    getDebugInfo: () => ({
      progress: Number(currentProgressRef.current.toFixed(3)),
      canvasSize: canvasRef.current ? `${canvasRef.current.width} × ${canvasRef.current.height}` : '0 × 0',
      textureSize: offscreen1Ref.current ? `${offscreen1Ref.current.width} × ${offscreen1Ref.current.height}` : '0 × 0',
      dpr: lastDprRef.current,
    }),
  }))

  // WebGL Context Initialization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true, // Transparent WebGL background
      premultipliedAlpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return
    glRef.current = gl

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    programRef.current = program
    gl.useProgram(program)

    // Screen-filling quad
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Cache Uniform Locations
    uniformsRef.current = {
      uTex1: gl.getUniformLocation(program, 'uTex1'),
      uTex2: gl.getUniformLocation(program, 'uTex2'),
      uProgress: gl.getUniformLocation(program, 'uProgress'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uOrigin: gl.getUniformLocation(program, 'uOrigin'),
      uWaveSpeed: gl.getUniformLocation(program, 'uWaveSpeed'),
      uSigma: gl.getUniformLocation(program, 'uSigma'),
      uWaveFreq: gl.getUniformLocation(program, 'uWaveFreq'),
      uPushAmt: gl.getUniformLocation(program, 'uPushAmt'),
      uCaStrength: gl.getUniformLocation(program, 'uCaStrength'),
      uGlow: gl.getUniformLocation(program, 'uGlow'),
      uNoiseWarp: gl.getUniformLocation(program, 'uNoiseWarp'),
    }

    // Componentry Reference Parameter Setup
    gl.uniform2f(uniformsRef.current.uOrigin, 0.35, 0.38) // Organic center-left origin aligned with quote
    gl.uniform1f(uniformsRef.current.uWaveSpeed, 1.55)
    gl.uniform1f(uniformsRef.current.uSigma, 0.16)
    gl.uniform1f(uniformsRef.current.uWaveFreq, 5.0)
    gl.uniform1f(uniformsRef.current.uPushAmt, 0.155) // Refractive wave displacement
    gl.uniform1f(uniformsRef.current.uCaStrength, 0.032) // Chromatic aberration
    gl.uniform1f(uniformsRef.current.uGlow, 0.75) // Restrained violet sheen
    gl.uniform1f(uniformsRef.current.uNoiseWarp, 1.05) // Organic Simplex noise

    const handleResize = () => {
      if (!canvas || !gl) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0)
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
        if (uniformsRef.current.uResolution) {
          gl.uniform2f(uniformsRef.current.uResolution, w, h)
        }
        renderTextTextures(rect.width, rect.height, dpr)
        drawFrame(currentProgressRef.current)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (tex1Ref.current) gl.deleteTexture(tex1Ref.current)
      if (tex2Ref.current) gl.deleteTexture(tex2Ref.current)
      if (program) gl.deleteProgram(program)
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      if (buf) gl.deleteBuffer(buf)
    }
  }, [renderTextTextures, drawFrame])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none ${className}`}
      style={{
        background: 'transparent',
        touchAction: 'none',
      }}
    />
  )
})

WebGLRippleTransition.displayName = 'WebGLRippleTransition'
