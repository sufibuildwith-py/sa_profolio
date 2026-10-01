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
// 2. Calibrated Gaussian ripple envelope (substantial physical wave band)
// 3. Concentric wave oscillation harmonics
// 4. Directional radial refractive displacement (pushAmt calibrated for glyph bending)
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

uniform sampler2D uTex1; // Texture A: Quote Typography (Transparent Canvas)
uniform sampler2D uTex2; // Texture B: Brand Identity (Transparent Canvas)
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
  
  // If resting at initial quote state before scroll
  if (uProgress <= 0.01) {
    gl_FragColor = texture2D(uTex1, uv);
    return;
  }
  // If resting at final brand state after transition completes
  if (uProgress >= 0.95) {
    gl_FragColor = texture2D(uTex2, uv);
    return;
  }

  // Aspect-corrected coordinate space for circular wave propagation
  vec2 p = uv;
  p.x *= aspect;
  vec2 origin = uOrigin;
  origin.x *= aspect;

  float dist = length(p - origin);
  
  // 1. Organic Simplex Noise Warp along wavefront
  float noise = snoise(uv * 3.8 + uProgress * 1.8) * 0.10 * uNoiseWarp;
  float dNoisy = dist + noise;

  // 2. Calibrated Wavefront Radius mapped smoothly across scroll progress
  float waveProg = smoothstep(0.10, 0.88, uProgress);
  float maxTravel = (aspect + 0.6) * uWaveSpeed;
  float waveR = waveProg * maxTravel;
  float distToWave = dNoisy - waveR;

  // 3. Gaussian Ripple Envelope (Primary Wave Thickness)
  float envelope = exp(-pow(distToWave / max(uSigma, 0.01), 2.0));

  // 4. Concentric Ripple Harmonics
  float waveOsc = sin(distToWave * uWaveFreq * 6.28318);

  // 5. Directional Radial Displacement (Refractive Push)
  vec2 dir = normalize(p - origin + vec2(0.0001));
  vec2 disp = dir * (envelope * waveOsc * uPushAmt);
  disp.x /= aspect; // Return to normalized UV space

  // 6. Transition Boundary Mask (Texture 1 -> Texture 2)
  float mask = smoothstep(waveR - uSigma * 1.2, waveR + uSigma * 0.6, dNoisy);

  // 7. Chromatic Aberration Sampling with refractive offsets
  float ca = uCaStrength * envelope;
  vec2 uvR = clamp(uv + disp * (1.0 + ca * 3.5), 0.0, 1.0);
  vec2 uvG = clamp(uv + disp, 0.0, 1.0);
  vec2 uvB = clamp(uv + disp * (1.0 - ca * 3.5), 0.0, 1.0);

  vec4 col1R = texture2D(uTex1, uvR);
  vec4 col1G = texture2D(uTex1, uvG);
  vec4 col1B = texture2D(uTex1, uvB);
  vec4 col1 = vec4(col1R.r, col1G.g, col1B.b, col1G.a);

  vec4 col2R = texture2D(uTex2, uvR);
  vec4 col2G = texture2D(uTex2, uvG);
  vec4 col2B = texture2D(uTex2, uvB);
  vec4 col2 = vec4(col2R.r, col2G.g, col2B.b, col2G.a);

  // 8. Blend between distorted typography states across wavefront
  vec4 finalColor = mix(col2, col1, mask);

  // 9. Specular Violet Refractive Wavefront Shimmer (Applies over glyphs & immediate water edge)
  vec3 glowColor = vec3(0.486, 0.431, 0.804); // #7C6ECD violet
  float waveGlow = envelope * uGlow;
  
  float textAlpha = max(col1.a, col2.a);
  finalColor.rgb += glowColor * (waveGlow * 0.85 * max(textAlpha, 0.18));
  finalColor.rgb += vec3(1.0, 1.0, 1.0) * (pow(envelope, 3.2) * waveGlow * 0.65 * textAlpha);
  finalColor.a = max(finalColor.a, envelope * 0.35 * waveGlow);

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
        ? Math.round(40 * dpr)
        : Math.round(52 * dpr)

      ctx1.font = `italic 400 ${quoteFontSize}px 'Instrument Serif', Georgia, serif`
      ctx1.fillStyle = '#D6CEF6' // Elegant soft violet-tinted off-white
      ctx1.textBaseline = 'middle'

      const lineSpacing = quoteFontSize * 1.25
      const startX = Math.round(16 * dpr)
      const centerY = isMobile ? Math.round(h * 0.40) : Math.round(h * 0.42)

      if (isMobile) {
        ctx1.fillText('Hum sirf mehfil', startX, centerY - lineSpacing * 1.5)
        ctx1.fillText('nahin sanwārte,', startX, centerY - lineSpacing * 0.5)
        ctx1.fillStyle = '#F4F1E8'
        ctx1.fillText('lamhon ko yaadgaar', startX, centerY + lineSpacing * 0.5)
        ctx1.fillText('banate hain.', startX, centerY + lineSpacing * 1.5)
      } else {
        ctx1.fillText('Hum sirf mehfil nahin sanwārte,', startX, centerY - lineSpacing * 0.55)
        ctx1.fillStyle = '#F4F1E8'
        ctx1.fillText('lamhon ko yaadgaar banate hain.', startX, centerY + lineSpacing * 0.55)
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
        ? Math.round(44 * dpr)
        : isTablet
        ? Math.round(72 * dpr)
        : Math.round(92 * dpr)

      ctx2.font = `800 ${brandFontSize}px 'Inter Tight', 'Manrope', -apple-system, sans-serif`
      ctx2.fillStyle = '#FFFFFF'
      ctx2.textBaseline = 'middle'

      const startX = Math.round(16 * dpr)
      const centerY = isMobile ? Math.round(h * 0.40) : Math.round(h * 0.42)

      ctx2.fillText('SA PRODUCTION', startX, centerY - Math.round(brandFontSize * 0.2))

      // Tagline Typography
      const subFontSize = isMobile ? Math.round(16 * dpr) : Math.round(24 * dpr)
      ctx2.font = `italic 400 ${subFontSize}px 'Instrument Serif', Georgia, serif`
      ctx2.fillStyle = 'rgba(244, 241, 232, 0.88)'
      ctx2.fillText('Bring Life to Your Event', startX, centerY + Math.round(brandFontSize * 0.55))
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

    // Componentry Reference Parameter Setup (Calibrated for visible glyph water refraction)
    gl.uniform2f(uniformsRef.current.uOrigin, 0.15, 0.45) // Natural left-origin wave travelling across the quote
    gl.uniform1f(uniformsRef.current.uWaveSpeed, 1.35)
    gl.uniform1f(uniformsRef.current.uSigma, 0.28) // Substantial physical water wave band
    gl.uniform1f(uniformsRef.current.uWaveFreq, 4.5) // Fluid concentric wave harmonics
    gl.uniform1f(uniformsRef.current.uPushAmt, 0.32) // Strong, visible physical glyph bending
    gl.uniform1f(uniformsRef.current.uCaStrength, 0.045) // Crisp chromatic refraction at wave crest
    gl.uniform1f(uniformsRef.current.uGlow, 0.85) // Specular violet shimmer
    gl.uniform1f(uniformsRef.current.uNoiseWarp, 1.15) // Organic Simplex 2D noise warp

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
