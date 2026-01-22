import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const [counter, setCounter] = useState(0);
    const containerRef = useRef(null);
    const counterRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        let count = { value: 0 };

        // Count animation
        gsap.to(count, {
            value: 100,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: () => {
                setCounter(Math.floor(count.value));
            },
            onComplete: () => {
                // Intro animation sequence
                const tl = gsap.timeline({
                    onComplete: onComplete
                });

                tl.to(counterRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.in"
                })
                    .to(progressRef.current, {
                        scaleX: 0,
                        transformOrigin: "right",
                        duration: 0.8,
                        ease: "power4.in"
                    }, "-=0.5")
                    .to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.2,
                        ease: "power4.inOut"
                    }, "-=0.2");
            }
        });
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] bg-[#000] flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="relative overflow-hidden mb-8">
                <span
                    ref={counterRef}
                    className="text-[15vw] md:text-[10vw] font-bold text-white block leading-none font-['Syncopate']"
                >
                    {counter}%
                </span>
            </div>

            <div className="w-1/2 max-w-md h-[1px] bg-white/10 overflow-hidden relative">
                <div
                    ref={progressRef}
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{ width: `${counter}%` }}
                ></div>
            </div>

            <div className="absolute bottom-10 left-10 text-[10px] uppercase tracking-[0.5em] text-white/40">
                Lucas Gonzaga / Creative Studio / Vol 2025
            </div>
        </div>
    );
};

export default Preloader;
