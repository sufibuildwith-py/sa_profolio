import React, { useEffect, useRef, useCallback } from 'react'

interface WebGLRippleTransitionProps {
  progress: number // 0.0 to 1.0 (controlled by GSAP ScrollTrigger)
  className?: string
}

// Complete GLSL Shader implementing Componentry's WebGL Ripple Transition
// with Simplex 2D noise warp, expanding refractive wavefront, concentric wave harmonics,
// chromatic aberration (caStrength), and specular wavefront glow.

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  vUv.y = 1.0 - vUv.y; // Flip Y for WebGL texture orientation
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTex1; // Quote Texture
uniform sampler2D uTex2; // Brand (SA PRODUCTION) Texture
uniform float uProgress;
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
  float n = snoise(uv * 4.5 + uProgress * 2.2) * 0.08 * uNoiseWarp;
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
  disp.x /= aspect; // Return to normalized UV space

  // 6. Transition Boundary Mask (Texture 1 -> Texture 2)
  float mask = smoothstep(waveR - uSigma * 1.5, waveR + uSigma * 0.8, dNoisy);

  // 7. Chromatic Aberration Sampling with refractive offsets
  float ca = uCaStrength * envelope;
  vec2 uvR = uv + disp * (1.0 + ca * 2.5);
  vec2 uvG = uv + disp;
  vec2 uvB = uv + disp * (1.0 - ca * 2.5);

  vec4 col1R = texture2D(uTex1, clamp(uvR, 0.0, 1.0));
  vec4 col1G = texture2D(uTex1, clamp(uvG, 0.0, 1.0));
  vec4 col1B = texture2D(uTex1, clamp(uvB, 0.0, 1.0));
  vec4 col1 = vec4(col1R.r, col1G.g, col1B.b, col1G.a);

  vec4 col2R = texture2D(uTex2, clamp(uvR, 0.0, 1.0));
  vec4 col2G = texture2D(uTex2, clamp(uvG, 0.0, 1.0));
  vec4 col2B = texture2D(uTex2, clamp(uvB, 0.0, 1.0));
  vec4 col2 = vec4(col2R.r, col2G.g, col2B.b, col2G.a);

  // If resting at 0 or 1, ensure clean exact sampling
  if (uProgress <= 0.001) {
    gl_FragColor = texture2D(uTex1, uv);
    return;
  }
  if (uProgress >= 0.999) {
    gl_FragColor = texture2D(uTex2, uv);
    return;
  }

  // 8. Blend Textures across the traveling wave
  vec4 finalColor = mix(col2, col1, mask);

  // 9. Specular Violet Refractive Wavefront Glow & Caustic Highlight
  vec3 glowColor = vec3(0.486, 0.431, 0.804); // #7C6ECD violet
  float waveGlow = envelope * uGlow;
  finalColor.rgb += glowColor * waveGlow * 0.85;
  finalColor.rgb += vec3(1.0, 1.0, 1.0) * pow(envelope, 3.5) * waveGlow * 0.75;

  gl_FragColor = finalColor;
}
`

export const WebGLRippleTransition: React.FC<WebGLRippleTransitionProps> = ({
  progress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const tex1Ref = useRef<WebGLTexture | null>(null)
  const tex2Ref = useRef<WebGLTexture | null>(null)
  const uniformsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({})
  const offscreen1Ref = useRef<HTMLCanvasElement | null>(null)
  const offscreen2Ref = useRef<HTMLCanvasElement | null>(null)

  // Render high-resolution 2D typography onto Offscreen Canvas Textures
  const renderTextTextures = useCallback((width: number, height: number, dpr: number) => {
    const w = Math.round(width * dpr)
    const h = Math.round(height * dpr)
    if (w <= 0 || h <= 0) return

    // 1. Texture 1: Romanized Urdu/Hindi Quote
    if (!offscreen1Ref.current) offscreen1Ref.current = document.createElement('canvas')
    const c1 = offscreen1Ref.current
    c1.width = w
    c1.height = h
    const ctx1 = c1.getContext('2d')
    if (ctx1) {
      ctx1.clearRect(0, 0, w, h)
      ctx1.fillStyle = '#09090C'
      ctx1.fillRect(0, 0, w, h)

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1200

      // Editorial Subtitle
      ctx1.fillStyle = 'rgba(244, 241, 232, 0.45)'
      ctx1.font = `${Math.round(11 * dpr)}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`
      ctx1.textBaseline = 'top'
      ctx1.fillText('// EDITORIAL MANIFEST // 01', Math.round(24 * dpr), Math.round(30 * dpr))

      // Main Italic Serif Quote Typography
      const quoteFontSize = isMobile
        ? Math.round(28 * dpr)
        : isTablet
        ? Math.round(38 * dpr)
        : Math.round(50 * dpr)

      ctx1.font = `italic 400 ${quoteFontSize}px 'Instrument Serif', Georgia, serif`
      ctx1.fillStyle = '#C4BEF2' // Elegant soft violet/lilac

      const lineSpacing = quoteFontSize * 1.28
      const startY = isMobile ? Math.round(80 * dpr) : Math.round(95 * dpr)
      const startX = Math.round(24 * dpr)

      if (isMobile) {
        ctx1.fillText('Hum sirf mehfil', startX, startY)
        ctx1.fillText('nahin sanwārte,', startX, startY + lineSpacing)
        ctx1.fillStyle = '#E8E5F8'
        ctx1.fillText('lamhon ko yaadgaar', startX, startY + lineSpacing * 2)
        ctx1.fillText('banate hain.', startX, startY + lineSpacing * 3)
      } else {
        ctx1.fillText('Hum sirf mehfil nahin sanwārte,', startX, startY)
        ctx1.fillStyle = '#F0EDFD'
        ctx1.fillText('lamhon ko yaadgaar banate hain.', startX, startY + lineSpacing)
      }
    }

    // 2. Texture 2: Brand Wordmark (SA PRODUCTION)
    if (!offscreen2Ref.current) offscreen2Ref.current = document.createElement('canvas')
    const c2 = offscreen2Ref.current
    c2.width = w
    c2.height = h
    const ctx2 = c2.getContext('2d')
    if (ctx2) {
      ctx2.clearRect(0, 0, w, h)
      ctx2.fillStyle = '#09090C'
      ctx2.fillRect(0, 0, w, h)

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1200

      // Header Tag
      ctx2.fillStyle = '#7C6ECD'
      ctx2.font = `600 ${Math.round(11 * dpr)}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`
      ctx2.textBaseline = 'top'
      ctx2.fillText('CORE BRAND // VARANASI', Math.round(24 * dpr), Math.round(30 * dpr))

      // Master Brand Typography
      const brandFontSize = isMobile
        ? Math.round(44 * dpr)
        : isTablet
        ? Math.round(68 * dpr)
        : Math.round(96 * dpr)

      ctx2.font = `800 ${brandFontSize}px 'Inter Tight', 'Manrope', -apple-system, sans-serif`
      ctx2.fillStyle = '#FFFFFF'

      const startY = isMobile ? Math.round(85 * dpr) : Math.round(95 * dpr)
      const startX = Math.round(24 * dpr)

      ctx2.fillText('SA PRODUCTION', startX, startY)

      // Sub-label
      const subFontSize = isMobile ? Math.round(14 * dpr) : Math.round(20 * dpr)
      ctx2.font = `italic 400 ${subFontSize}px 'Instrument Serif', Georgia, serif`
      ctx2.fillStyle = 'rgba(244, 241, 232, 0.85)'
      ctx2.fillText('Bring Life to Your Event', startX, startY + brandFontSize * 1.15)
    }

    // Upload to WebGL Textures
    const gl = glRef.current
    if (!gl) return

    if (!tex1Ref.current) tex1Ref.current = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex1Ref.current)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    if (!tex2Ref.current) tex2Ref.current = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex2Ref.current)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c2)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  }, [])

  // Initialize WebGL Context & Shaders
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return
    glRef.current = gl

    // Compile Shaders
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

    // Full-screen quad
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

    // Set Componentry Default Wave Parameters
    gl.uniform2f(uniformsRef.current.uOrigin, 0.45, 0.4) // Center-left origin matching quote center
    gl.uniform1f(uniformsRef.current.uWaveSpeed, 1.45)
    gl.uniform1f(uniformsRef.current.uSigma, 0.18)
    gl.uniform1f(uniformsRef.current.uWaveFreq, 4.8)
    gl.uniform1f(uniformsRef.current.uPushAmt, 0.165) // Strong visible refractive push
    gl.uniform1f(uniformsRef.current.uCaStrength, 0.038) // Crisp chromatic edge
    gl.uniform1f(uniformsRef.current.uGlow, 0.82) // Specular wave lift
    gl.uniform1f(uniformsRef.current.uNoiseWarp, 1.1) // Organic fractal distortion

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
  }, [renderTextTextures])

  // Draw Frame whenever progress changes (driven by GSAP scrub)
  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current
    if (!gl || !program || !tex1Ref.current || !tex2Ref.current) return

    gl.useProgram(program)

    // Bind Textures
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex1Ref.current)
    gl.uniform1i(uniformsRef.current.uTex1, 0)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, tex2Ref.current)
    gl.uniform1i(uniformsRef.current.uTex2, 1)

    // Set Progress
    const clampedProgress = Math.max(0.0, Math.min(1.0, progress))
    gl.uniform1f(uniformsRef.current.uProgress, clampedProgress)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
      }}
    />
  )
}
