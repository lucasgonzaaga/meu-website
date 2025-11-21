import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2;
            sphereRef.current.rotation.y = t * 0.3;
            sphereRef.current.position.y = Math.sin(t) * 0.2;
        }
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2} ref={sphereRef}>
            <MeshDistortMaterial
                color="#8352FD"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    );
};

const Hero = () => {
    return (
        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--color-bg)]">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <AnimatedSphere />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
            <div className="z-10 text-center pointer-events-none px-4">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-pink-600 tracking-tight">
                    Hello, I'm Lucas
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                    Creative Developer & UI/UX Designer crafting immersive digital experiences.
                </p>
            </div>
        </section>
    );
};

export default Hero;
