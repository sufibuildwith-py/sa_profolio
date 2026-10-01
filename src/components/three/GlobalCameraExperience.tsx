import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap, ScrollTrigger } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CameraDebugState {
  viewport: string
  canvasSize: string
  progress: number
  section: string
  pos: [number, number, number]
  userOffset: [number, number]
  rot: [number, number, number]
  scale: number
  responsiveMode: string
  isDragging: boolean
  isHovered: boolean
  fps: number
}

// Master scale multiplier (scaled down ~60-65% for restraint & editorial breathing room)
const CAMERA_BASE_SCALE = 0.62

// 8 Waypoints art-directed for SA Production's desktop editorial layout
const DESKTOP_WAYPOINTS = [
  {
    name: '01 Hero',
    progress: 0.0,
    pos: { x: 2.3, y: 0.7, z: -1.0 },
    rot: { x: 0.12, y: -0.35, z: 0.05 },
    scale: 0.48 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '02 Introduction',
    progress: 0.14,
    pos: { x: 2.0, y: -0.2, z: 0.5 },
    rot: { x: -0.06, y: 0.42, z: -0.05 },
    scale: 0.56 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '03 Spaces & Worlds (Prominent Moment 1)',
    progress: 0.28,
    pos: { x: 1.35, y: 0.1, z: 1.6 },
    rot: { x: 0.18, y: -0.65, z: 0.1 },
    scale: 0.76 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '04 Services',
    progress: 0.44,
    pos: { x: -2.4, y: -0.35, z: -0.3 },
    rot: { x: -0.12, y: 0.85, z: -0.1 },
    scale: 0.44 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '05 Selected Productions',
    progress: 0.58,
    pos: { x: 2.3, y: -0.55, z: -1.1 },
    rot: { x: 0.2, y: -1.15, z: 0.08 },
    scale: 0.40 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '06 Process & Pipeline',
    progress: 0.72,
    pos: { x: -1.8, y: 0.15, z: 0.75 },
    rot: { x: -0.14, y: 0.38, z: 0.05 },
    scale: 0.58 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '07 Technical Matrix (Prominent Moment 2)',
    progress: 0.86,
    pos: { x: 1.6, y: -0.05, z: 1.5 },
    rot: { x: 0.12, y: -0.75, z: 0.08 },
    scale: 0.74 * (CAMERA_BASE_SCALE / 0.62),
  },
  {
    name: '08 Contact & Footer',
    progress: 1.0,
    pos: { x: 2.1, y: -1.1, z: -0.7 },
    rot: { x: 0.06, y: 0.18, z: 0.0 },
    scale: 0.38 * (CAMERA_BASE_SCALE / 0.62),
  },
]

// 8 Waypoints art-directed for 9:16 Mobile Portrait Frustums (|x| <= 0.85, compact 16-22vw footprint)
const MOBILE_WAYPOINTS = [
  {
    name: '01 Hero',
    progress: 0.0,
    pos: { x: 0.65, y: 1.15, z: -0.4 },
    rot: { x: 0.12, y: -0.35, z: 0.05 },
    scale: 0.28,
  },
  {
    name: '02 Introduction',
    progress: 0.14,
    pos: { x: 0.55, y: -0.1, z: 0.3 },
    rot: { x: -0.06, y: 0.42, z: -0.05 },
    scale: 0.32,
  },
  {
    name: '03 Spaces & Worlds (Prominent Moment 1)',
    progress: 0.28,
    pos: { x: 0.45, y: 0.15, z: 0.9 },
    rot: { x: 0.18, y: -0.65, z: 0.1 },
    scale: 0.38,
  },
  {
    name: '04 Services',
    progress: 0.44,
    pos: { x: -0.65, y: -0.2, z: -0.2 },
    rot: { x: -0.12, y: 0.85, z: -0.1 },
    scale: 0.26,
  },
  {
    name: '05 Selected Productions',
    progress: 0.58,
    pos: { x: 0.60, y: -0.3, z: -0.5 },
    rot: { x: 0.2, y: -1.15, z: 0.08 },
    scale: 0.24,
  },
  {
    name: '06 Process & Pipeline',
    progress: 0.72,
    pos: { x: -0.50, y: 0.2, z: 0.3 },
    rot: { x: -0.14, y: 0.38, z: 0.05 },
    scale: 0.30,
  },
  {
    name: '07 Technical Matrix (Prominent Moment 2)',
    progress: 0.86,
    pos: { x: 0.50, y: 0.0, z: 0.8 },
    rot: { x: 0.12, y: -0.75, z: 0.08 },
    scale: 0.36,
  },
  {
    name: '08 Contact & Footer',
    progress: 1.0,
    pos: { x: 0.55, y: -1.15, z: -0.3 },
    rot: { x: 0.06, y: 0.18, z: 0.0 },
    scale: 0.22,
  },
]

export const GlobalCameraExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hitProxyRef = useRef<HTMLDivElement>(null)
  const isDebug =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('cameraDebug') === '1'

  const [debugState, setDebugState] = useState<CameraDebugState | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // State refs to prevent re-renders on animation frames
  const isDraggingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const userOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Verify WebGL availability
    const testCanvas = document.createElement('canvas')
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
    if (!gl) return

    // 1. SCENE SETUP
    const scene = new THREE.Scene()
    const container = containerRef.current
    const hitProxy = hitProxyRef.current
    const width = window.innerWidth
    const height = window.innerHeight
    const isInitialMobile = width < 768

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    })
    
    const getDPR = () => {
      const isMobile = window.innerWidth < 768
      return isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 2.0)
    }

    renderer.setPixelRatio(getDPR())
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // Explicit absolute non-blocking styles for WebGL canvas
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'none'

    container.appendChild(renderer.domElement)

    // 2. STUDIO LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.4)
    keyLight.position.set(5, 7, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xe4e2ec, 1.2)
    fillLight.position.set(-6, -2, 4)
    scene.add(fillLight)

    const violetRimLight = new THREE.DirectionalLight(0x7c6ecd, 1.9)
    violetRimLight.position.set(4, -3, -5)
    scene.add(violetRimLight)

    const underGlow = new THREE.PointLight(0x9e92e8, 0.9, 10)
    underGlow.position.set(0, -3.5, 2)
    scene.add(underGlow)

    // 3. HIERARCHICAL RIG STRUCTURE
    const initialWaypoints = isInitialMobile ? MOBILE_WAYPOINTS : DESKTOP_WAYPOINTS
    const masterJourneyGroup = new THREE.Group()
    masterJourneyGroup.position.set(initialWaypoints[0].pos.x, initialWaypoints[0].pos.y, initialWaypoints[0].pos.z)
    masterJourneyGroup.rotation.set(initialWaypoints[0].rot.x, initialWaypoints[0].rot.y, initialWaypoints[0].rot.z)
    masterJourneyGroup.scale.setScalar(initialWaypoints[0].scale)

    const userOffsetGroup = new THREE.Group()
    masterJourneyGroup.add(userOffsetGroup)

    const hoverScaleGroup = new THREE.Group()
    userOffsetGroup.add(hoverScaleGroup)

    const ambientFloatGroup = new THREE.Group()
    hoverScaleGroup.add(ambientFloatGroup)

    const modelContainerGroup = new THREE.Group()
    ambientFloatGroup.add(modelContainerGroup)

    scene.add(masterJourneyGroup)

    // 4. LOAD LOCAL CANON CAMERA MODEL
    const loader = new GLTFLoader()
    loader.load(
      '/camera/scene.gltf',
      (gltf) => {
        const root = gltf.scene

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = false
            mesh.receiveShadow = false
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial
              mat.roughness = Math.max(mat.roughness, 0.28)
              mat.metalness = Math.min(mat.metalness, 0.92)
              mat.needsUpdate = true
            }
          }
        })

        const box = new THREE.Box3().setFromObject(root)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        root.position.set(-center.x, -center.y, -center.z)

        const maxDim = Math.max(size.x, size.y, size.z)
        const normScale = (2.4 / (maxDim || 1)) * CAMERA_BASE_SCALE
        root.scale.setScalar(normScale)

        modelContainerGroup.add(root)
      },
      undefined,
      (err) => {
        console.warn('GlobalCameraExperience: GLTF load fallback', err)
      }
    )

    // 5. RESPONSIVE GSAP MATCHMEDIA SCROLL JOURNEY TIMELINES
    const mm = gsap.matchMedia()

    const buildJourneyTimeline = (waypoints: typeof DESKTOP_WAYPOINTS) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#main-content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            if (isDebug) {
              const p = self.progress
              let activeIdx = 0
              for (let i = 0; i < waypoints.length - 1; i++) {
                if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
                  activeIdx = i
                  break
                }
              }
              const isMobile = window.innerWidth < 768
              setDebugState({
                viewport: `${window.innerWidth} × ${window.innerHeight}`,
                canvasSize: `${Math.round(renderer.domElement.clientWidth)} × ${Math.round(renderer.domElement.clientHeight)}`,
                progress: Math.round(p * 100),
                section: waypoints[activeIdx].name,
                pos: [
                  Number((masterJourneyGroup.position.x + userOffsetGroup.position.x).toFixed(2)),
                  Number((masterJourneyGroup.position.y + userOffsetGroup.position.y).toFixed(2)),
                  Number(masterJourneyGroup.position.z.toFixed(2)),
                ],
                userOffset: [
                  Number(userOffsetGroup.position.x.toFixed(2)),
                  Number(userOffsetGroup.position.y.toFixed(2)),
                ],
                rot: [
                  Number(ambientFloatGroup.rotation.x.toFixed(2)),
                  Number(ambientFloatGroup.rotation.y.toFixed(2)),
                  Number(ambientFloatGroup.rotation.z.toFixed(2)),
                ],
                scale: Number(masterJourneyGroup.scale.x.toFixed(2)),
                responsiveMode: isMobile ? 'Mobile (9:16 Portrait)' : 'Desktop',
                isDragging: isDraggingRef.current,
                isHovered: isHoveredRef.current,
                fps: 60,
              })
            }
          },
        },
      })

      masterJourneyGroup.position.set(waypoints[0].pos.x, waypoints[0].pos.y, waypoints[0].pos.z)
      masterJourneyGroup.rotation.set(waypoints[0].rot.x, waypoints[0].rot.y, waypoints[0].rot.z)
      masterJourneyGroup.scale.setScalar(waypoints[0].scale)

      for (let i = 1; i < waypoints.length; i++) {
        const prevWP = waypoints[i - 1]
        const currWP = waypoints[i]
        const duration = currWP.progress - prevWP.progress

        tl.to(
          masterJourneyGroup.position,
          {
            x: currWP.pos.x,
            y: currWP.pos.y,
            z: currWP.pos.z,
            duration,
            ease: 'power1.inOut',
          },
          prevWP.progress
        )

        tl.to(
          masterJourneyGroup.rotation,
          {
            x: currWP.rot.x,
            y: currWP.rot.y,
            z: currWP.rot.z,
            duration,
            ease: 'power1.inOut',
          },
          prevWP.progress
        )

        tl.to(
          masterJourneyGroup.scale,
          {
            x: currWP.scale,
            y: currWP.scale,
            z: currWP.scale,
            duration,
            ease: 'power1.inOut',
          },
          prevWP.progress
        )
      }

      return tl
    }

    mm.add('(min-width: 769px)', () => {
      buildJourneyTimeline(DESKTOP_WAYPOINTS)
    })

    mm.add('(max-width: 768px)', () => {
      buildJourneyTimeline(MOBILE_WAYPOINTS)
    })

    // 6. CONTINUOUS ZERO-G AMBIENT FLOATING & ROTATION LOOP
    const clock = new THREE.Clock()
    let ambientTime = 0
    let animationFrameId: number
    const tempWorldPos = new THREE.Vector3()

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const delta = clock.getDelta()

      if (!prefersReducedMotion) {
        if (!isDraggingRef.current) {
          ambientTime += delta

          ambientFloatGroup.rotation.y = ambientTime * 0.18

          ambientFloatGroup.rotation.x =
            Math.sin(ambientTime * 0.35) * 0.08 + Math.cos(ambientTime * 0.17) * 0.03
          ambientFloatGroup.rotation.z =
            Math.cos(ambientTime * 0.28) * 0.06 + Math.sin(ambientTime * 0.45) * 0.02

          ambientFloatGroup.position.x = Math.sin(ambientTime * 0.42) * 0.08
          ambientFloatGroup.position.y = Math.cos(ambientTime * 0.55) * 0.12
          ambientFloatGroup.position.z = Math.sin(ambientTime * 0.31) * 0.06
        }
      }

      // Synchronize 2D Screen-space Hit Target proxy with 3D model world position
      if (hitProxy) {
        modelContainerGroup.getWorldPosition(tempWorldPos)
        const projected = tempWorldPos.clone().project(camera)
        const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth
        const screenY = (-(projected.y * 0.5) + 0.5) * window.innerHeight

        const dist = Math.max(0.5, camera.position.z - tempWorldPos.z)
        const vFOV = (camera.fov * Math.PI) / 180
        const visibleHeightAtDepth = 2 * Math.tan(vFOV / 2) * dist
        const isMobile = window.innerWidth < 768
        const minHit = isMobile ? 80 : 110
        const maxHit = isMobile ? 150 : 220
        const hitSize = Math.max(
          minHit,
          Math.min(maxHit, (1.2 / visibleHeightAtDepth) * window.innerHeight * masterJourneyGroup.scale.x * 2.2)
        )

        hitProxy.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`
        hitProxy.style.width = `${hitSize}px`
        hitProxy.style.height = `${hitSize}px`
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    // 7. POINTER GRAB & DRAG EVENT SYSTEM
    const handlePointerEnter = () => {
      isHoveredRef.current = true
      gsap.to(hoverScaleGroup.scale, {
        x: 1.04,
        y: 1.04,
        z: 1.04,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    const handlePointerLeave = () => {
      isHoveredRef.current = false
      if (!isDraggingRef.current) {
        gsap.to(hoverScaleGroup.scale, {
          x: 1.0,
          y: 1.0,
          z: 1.0,
          duration: 0.35,
          ease: 'power2.out',
        })
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (!hitProxy) return
      e.stopPropagation()
      try {
        hitProxy.setPointerCapture(e.pointerId)
      } catch {
        // Fallback for browsers without pointerCapture
      }

      isDraggingRef.current = true
      lastPointerRef.current = { x: e.clientX, y: e.clientY }

      gsap.to(hoverScaleGroup.scale, {
        x: 1.06,
        y: 1.06,
        z: 1.06,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return

      const dx = e.clientX - lastPointerRef.current.x
      const dy = e.clientY - lastPointerRef.current.y
      lastPointerRef.current = { x: e.clientX, y: e.clientY }

      modelContainerGroup.getWorldPosition(tempWorldPos)
      const dist = Math.max(0.5, camera.position.z - tempWorldPos.z)
      const vFOV = (camera.fov * Math.PI) / 180
      const visibleHeightAtDepth = 2 * Math.tan(vFOV / 2) * dist
      const visibleWidthAtDepth = visibleHeightAtDepth * (window.innerWidth / window.innerHeight)

      const deltaWorldX = (dx / window.innerWidth) * visibleWidthAtDepth
      const deltaWorldY = (-dy / window.innerHeight) * visibleHeightAtDepth

      const isMobile = window.innerWidth < 768
      const clampX = isMobile ? 1.2 : 4.5
      const clampY = isMobile ? 2.5 : 3.5

      const nextX = THREE.MathUtils.clamp(userOffsetGroup.position.x + deltaWorldX, -clampX, clampX)
      const nextY = THREE.MathUtils.clamp(userOffsetGroup.position.y + deltaWorldY, -clampY, clampY)

      userOffsetGroup.position.x = nextX
      userOffsetGroup.position.y = nextY
      userOffsetRef.current = { x: nextX, y: nextY }
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      if (hitProxy) {
        try {
          hitProxy.releasePointerCapture(e.pointerId)
        } catch {
          // Ignore
        }
      }
      isDraggingRef.current = false

      const targetScale = isHoveredRef.current ? 1.04 : 1.0
      gsap.to(hoverScaleGroup.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    if (hitProxy) {
      hitProxy.addEventListener('pointerenter', handlePointerEnter)
      hitProxy.addEventListener('pointerleave', handlePointerLeave)
      hitProxy.addEventListener('pointerdown', handlePointerDown)
      hitProxy.addEventListener('pointermove', handlePointerMove)
      hitProxy.addEventListener('pointerup', handlePointerUp)
      hitProxy.addEventListener('pointercancel', handlePointerUp)
    }

    // 8. RESPONSIVE RESIZE HANDLER
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(getDPR())
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // 9. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize)
      if (hitProxy) {
        hitProxy.removeEventListener('pointerenter', handlePointerEnter)
        hitProxy.removeEventListener('pointerleave', handlePointerLeave)
        hitProxy.removeEventListener('pointerdown', handlePointerDown)
        hitProxy.removeEventListener('pointermove', handlePointerMove)
        hitProxy.removeEventListener('pointerup', handlePointerUp)
        hitProxy.removeEventListener('pointercancel', handlePointerUp)
      }
      cancelAnimationFrame(animationFrameId)
      mm.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === '#main-content') st.kill()
      })

      renderer.dispose()
      scene.clear()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [prefersReducedMotion, isDebug])

  return (
    <>
      {/* Global Independent 3D Canvas Layer — Non-blocking, 0 layout height contribution */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[4] overflow-hidden"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
      />

      {/* Localized Camera Hit Proxy — Only intercepts pointers directly over the camera object */}
      <div
        ref={hitProxyRef}
        className={`fixed top-0 left-0 rounded-full z-[6] pointer-events-auto cursor-grab active:cursor-grabbing select-none ${
          isDebug
            ? 'border-2 border-dashed border-[#7C6ECD] bg-[#7C6ECD]/15 flex items-center justify-center font-mono text-[9px] text-[#7C6ECD] font-bold uppercase'
            : ''
        }`}
        aria-label="Interactive Floating Production Camera (Drag to reposition)"
        style={{
          willChange: 'transform, width, height',
          touchAction: 'pan-y',
        }}
      >
        {isDebug && <span>CAM HITBOX</span>}
      </div>

      {/* Development Camera Trajectory & Drag Diagnostic Overlay (?cameraDebug=1) */}
      {isDebug && debugState && (
        <div className="fixed bottom-4 left-4 z-50 rounded-xl bg-black/95 p-4 font-mono text-[11px] text-white/90 backdrop-blur-md border border-[#7C6ECD]/40 max-w-xs pointer-events-none shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 font-bold text-[#7C6ECD]">
            <span>CAMERA RESPONSIVE DEBUG</span>
            <span>{debugState.progress}%</span>
          </div>
          <div className="space-y-1 text-white/80">
            <div>
              <span className="text-white/40">Mode: </span>
              <span className="text-emerald-300 font-semibold">{debugState.responsiveMode}</span>
            </div>
            <div>
              <span className="text-white/40">Viewport: </span>
              <span>{debugState.viewport}</span>
            </div>
            <div>
              <span className="text-white/40">Canvas Size: </span>
              <span>{debugState.canvasSize}</span>
            </div>
            <div>
              <span className="text-white/40">Section: </span>
              <span className="text-amber-300 font-semibold">{debugState.section}</span>
            </div>
            <div>
              <span className="text-white/40">Pos (X,Y,Z): </span>
              <span>{debugState.pos.join(', ')}</span>
            </div>
            <div>
              <span className="text-white/40">User Offset: </span>
              <span className="text-cyan-300 font-semibold">{debugState.userOffset.join(', ')}</span>
            </div>
            <div>
              <span className="text-white/40">Scale: </span>
              <span>{debugState.scale}x</span>
            </div>
            <div>
              <span className="text-white/40">Dragging: </span>
              <span className={debugState.isDragging ? 'text-emerald-400 font-bold' : 'text-white/50'}>
                {debugState.isDragging ? 'YES (Ambient Paused)' : 'NO'}
              </span>
            </div>
            <div className="pt-1 text-[10px] text-emerald-400 border-t border-white/10 mt-1">
              ● Pin-Spacers: 0px (Independent Layer)
            </div>
          </div>
        </div>
      )}
    </>
  )
}
