import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';

const Contact = () => {
    const titleRef = useRef();

    useEffect(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
            },
            y: 100,
            opacity: 0,
            skewY: 5,
            duration: 1.5,
            ease: "power4.out"
        });
    }, []);

    const links = [
        { name: "LINKEDIN", url: "https://www.linkedin.com/in/lucas-gonzaga-5a5b90306/", icon: <Linkedin /> },
        { name: "GITHUB", url: "https://github.com/lucasgonzaaga", icon: <Github /> },
        { name: "EMAIL", url: "mailto:lucasgonzagasantoss020106@gmail.com", icon: <Mail /> },
    ];

    return (
        <section id="contact" className="relative min-h-screen bg-black flex flex-col justify-between py-10 md:py-20 px-6 sm:px-10 md:px-20 overflow-hidden">
            {/* Massive Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[15vw] sm:text-[20vw] md:text-[25vw] font-black font-['Syncopate']">OLÁ</span>
            </div>

            <div className="z-10 mt-10 md:mt-20">
                <h2
                    ref={titleRef}
                    className="text-[8vw] sm:text-[10vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase font-['Syncopate'] text-white"
                >
                    Vamos Construir <br /> O Futuro <span className="text-outline">.</span>
                </h2>
            </div>

            <div className="z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10">
                <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            className="group flex items-center justify-between gap-6 md:gap-10 border-b border-white/10 py-4 md:py-6 w-full md:w-96 hover:border-white transition-colors duration-500"
                        >
                            <span className="text-base md:text-xl font-['Syncopate'] tracking-widest text-white/40 group-hover:text-white transition-colors">
                                {link.name}
                            </span>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 flex-shrink-0">
                                {link.icon}
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-left md:text-right flex flex-col items-start md:items-end gap-2">
                    <Globe className="w-12 h-12 md:w-20 md:h-20 text-white animate-spin-slow opacity-20 mb-2 md:mb-4" />
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/40">
                        Disponível para freelance / 2026
                    </p>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/40">
                        Florianópolis, Brasil
                    </p>
                </div>
            </div>

            <footer className="z-10 border-t border-white/5 pt-8 md:pt-10 mt-10 md:mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.5em] md:tracking-[1em]">
                <span>© Lucas Gonzaga 2026</span>
                <span>Criado com GSAP / ThreeJS</span>
            </footer>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Contact;
