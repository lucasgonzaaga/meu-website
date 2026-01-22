import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Custom Liquid Shader Material
const LiquidMaterial = () => {
    const meshRef = useRef();
    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor1: { value: new THREE.Color("#050505") },
        uColor2: { value: new THREE.Color("#8352FD") },
    }), []);

    useFrame((state) => {
        const { clock, mouse, size } = state;
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
            meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
            // Smoothly interpolate mouse
            meshRef.current.material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
                meshRef.current.material.uniforms.uMouse.value.x,
                mouse.x,
                0.1
            );
            meshRef.current.material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
                meshRef.current.material.uniforms.uMouse.value.y,
                mouse.y,
                0.1
            );
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      float dist = distance(st, uMouse * 0.5 + 0.5);
      
      float noise = sin(st.x * 10.0 + uTime) * cos(st.y * 10.0 + uTime) * 0.2;
      float strength = 1.0 - smoothstep(0.0, 0.5 + noise, dist);
      
      vec3 color = mix(uColor1, uColor2, strength * 0.5);
      
      // Add some scanning lines for tech vibe
      float scanline = sin(st.y * 800.0) * 0.04;
      color += scanline;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

const Hero = ({ theme, loading }) => {
    const title1Ref = useRef();
    const title2Ref = useRef();
    const containerRef = useRef();

    useEffect(() => {
        if (!loading) {
            // Reveal text items with a "stretchy" entry
            const tl = gsap.timeline();
            tl.from([title1Ref.current, title2Ref.current], {
                y: 300,
                rotateX: -90,
                skewY: 10,
                opacity: 0,
                duration: 2,
                stagger: 0.1,
                ease: "power4.out",
            });
        }

        // Subtle parallax on mouse move using GSAP
        const handleMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            gsap.to([title1Ref.current, title2Ref.current], {
                x: x * 1.5,
                y: y * 0.5,
                duration: 2,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [loading]);

    return (
        <section id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[var(--color-bg)] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <LiquidMaterial />
                </Canvas>
            </div>

            <div className="relative z-10 text-center flex flex-col items-center pointer-events-none">
                <div className="overflow-hidden md:pb-4">
                    <h1
                        ref={title1Ref}
                        className="text-[14vw] sm:text-[16vw] md:text-[18vw] font-black leading-none tracking-tighter text-white font-['Syncopate'] uppercase mix-blend-exclusion"
                    >
                        LUCAS
                    </h1>
                </div>
                <div className="overflow-hidden md:py-4">
                    <h1
                        ref={title2Ref}
                        className="text-[14vw] sm:text-[16vw] md:text-[18vw] font-black leading-none tracking-tighter text-white font-['Syncopate'] uppercase mix-blend-exclusion"
                    >
                        GONZAGA
                    </h1>
                </div>

                <p className="mt-8 text-[var(--color-text)] opacity-50 uppercase tracking-[0.5em] text-[10px] md:text-sm animate-pulse">
                    Creative Developer
                </p>
            </div>

            <div className="absolute top-10 right-6 sm:right-10 flex flex-col items-end gap-2 text-[8px] sm:text-[10px] uppercase tracking-widest opacity-30">
                <span>Florianópolis / SC</span>
                <div className="w-16 sm:w-20 h-[1px] bg-white"></div>
            </div>
        </section>
    );
};

export default Hero;
