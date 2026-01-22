import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/eu.jpeg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            //parallax da imagem
            gsap.to(imgRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                },
                y: 100,
                scale: 1.1,
                rotate: 2,
            });
            // animação do texto
            gsap.from(textRef.current.querySelectorAll('p'), {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="relative py-20 md:py-40 bg-black overflow-hidden px-6 sm:px-10 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-center">

                <div className="w-full md:w-1/2 relative">
                    <div className="absolute -top-10 -left-10 text-[8vw] sm:text-[10vw] font-black opacity-10 text-outline leading-none select-none uppercase font-['Syncopate']">
                        História
                    </div>
                    <div className="overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                        <img
                            ref={imgRef}
                            src={profileImage}
                            alt="Lucas Gonzaga"
                            className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] object-cover scale-110"
                        />
                    </div>
                </div>

                <div ref={textRef} className="w-full md:w-1/2 space-y-8 md:space-y-12 z-10">
                    <h2 className="text-[8vw] sm:text-[10vw] md:text-[5vw] font-black leading-none tracking-tighter uppercase font-['Syncopate']">
                        Sobre <br /> mim
                    </h2>

                    <div className="space-y-6 md:space-y-8 text-white/70 text-sm sm:text-base md:text-lg lg:text-2xl font-light leading-relaxed">
                        <p>
                            <span className="text-white font-bold block mb-2 underline tracking-widest uppercase text-xs opacity-50 font-['Syncopate']">01. O Inicio</span>
                            Desde o berço eu fui uma pessoa apaixonada por tecnologia, sempre tive muitas curiosidades em saber tudo que eu via e usava funcionava e com isso por volta dos meus 12 anos eu iniciei meus estudos na área de desenvolvimento front-end sendo a minha área de atuação até os dias de hoje.
                        </p>
                        <p>
                            <span className="text-white font-bold block mb-2 underline tracking-widest uppercase text-xs opacity-50 font-['Syncopate']">02. A Paixão</span>
                            Assim que comecei meus estudos na área foi paixão a primeira vista, eu finalmente estava descobrindo como aquela mágica que eu via diante dos meus olhos era por de baixo do pano, e foi assim que eu tive a certeza do que eu queria para mim.
                        </p>
                        <p>
                            <span className="text-white font-bold block mb-2 underline tracking-widest uppercase text-xs opacity-50 font-['Syncopate']">03. O Futuro</span>
                            Eu pretendo para o meu futuro ser uma referência dentro do mercado de desenvolvimento web, sigo muito convicto que num futuro não distante vou me realizar.
                        </p>
                        <p className="pt-4 border-t border-white/10">
                            Morando em <span className="text-outline text-white opacity-40">Florianópolis</span>, criando para o mundo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
