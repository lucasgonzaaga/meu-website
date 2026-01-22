import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Large circle follows with slight delay
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: "power3.out"
            });

            // Small dot follows instantly
            gsap.to(dot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "none"
            });
        };

        const onMouseDown = () => gsap.to(cursor, { scale: 0.7, duration: 0.3 });
        const onMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.3 });

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <>
            {/* The Outer Lens */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-16 h-16 border border-white/20 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
            >
                <div className="w-1 h-1 bg-white rounded-full opacity-50" />
            </div>

            {/* The Inner Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
        </>
    );
};

export default CustomCursor;
