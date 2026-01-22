import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const featuredRepos = ['portfolio-novo', 'lucasgonzaaga'];

    //conexão com github para pegar os repositórios
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users/lucasgonzaaga/repos?sort=updated&per_page=10');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (loading || projects.length === 0) return;

        const section = sectionRef.current;
        const trigger = triggerRef.current;

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop behavior: GSAP Pinning
            const totalWidth = section.scrollWidth;
            const pin = gsap.fromTo(
                section,
                { x: 0 },
                {
                    x: () => -(totalWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        invalidateOnRefresh: true,
                    }
                }
            );

            return () => {
                pin.kill();
            };
        });

        // No GSAP animation for mobile (< 768px), using native CSS scroll instead

        return () => mm.revert();
    }, [loading, projects]);

    if (loading) {
        return (
            <div className="min-h-[50vh] md:h-screen flex items-center justify-center bg-black text-white font-['Syncopate'] text-xs uppercase tracking-[1em] animate-pulse">
                Carregando Repositórios...
            </div>
        );
    }

    return (
        <section id="works" className="relative bg-black pt-0 pb-0 overflow-hidden">
            {/* 
                On Mobile: overflow-x-auto enables native horizontal scroll. 
                snap-x snap-mandatory makes the swipe feel premium.
            */}
            <div
                ref={triggerRef}
                className="overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar"
            >
                <div
                    ref={sectionRef}
                    className="flex h-[60vh] md:h-screen w-max"
                >
                    {projects.map((p, index) => (
                        <div
                            key={p.id}
                            className="w-[100vw] h-[60vh] md:h-screen flex flex-col items-center justify-center relative p-6 md:p-20 group snap-center flex-shrink-0"
                        >
                            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] md:text-[40vw] font-black opacity-[0.03] text-white pointer-events-none select-none font-['Syncopate'] group-hover:opacity-[0.08] transition-opacity duration-1000">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </h2>

                            <div className="z-10 flex flex-col items-center w-full max-w-2xl md:max-w-4xl text-center">
                                <span className="text-[10px] md:text-[10px] uppercase tracking-[1em] text-white/40 mb-3 md:mb-4 block">
                                    {new Date(p.created_at).getFullYear()}
                                </span>

                                <h3 className="text-[8vw] md:text-[8vw] font-black leading-none tracking-tighter font-['Syncopate'] text-white uppercase break-words px-4">
                                    {p.name.replace(/-/g, ' ')}
                                </h3>

                                <p className="mt-6 md:mt-8 text-white/30 text-[10px] md:text-sm uppercase tracking-widest max-w-[80vw] md:max-w-lg">
                                    {p.description || "Página moderna desenvolvida para apresentar o trabalho e atrair potenciais clientes."}
                                </p>

                                <div className="mt-8 md:mt-12 flex gap-4 md:gap-6">
                                    <div
                                        className="w-14 h-14 md:w-32 md:h-32 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/40 active:scale-95 transition-all duration-700 overflow-hidden cursor-pointer relative"
                                        onClick={() => window.open(p.html_url, '_blank')}
                                    >
                                        <div className="absolute inset-x-0 h-0 group-hover:h-full bg-white transition-all duration-700 ease-in-out top-0" />
                                        <Github className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:text-black transition-colors" />
                                    </div>

                                    {p.homepage && (
                                        <div
                                            className="w-14 h-14 md:w-32 md:h-32 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/40 active:scale-95 transition-all duration-700 overflow-hidden cursor-pointer relative"
                                            onClick={() => window.open(p.homepage, '_blank')}
                                        >
                                            <div className="absolute inset-x-0 h-0 group-hover:h-full bg-white transition-all duration-700 ease-in-out top-0" />
                                            <ExternalLink className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:text-black transition-colors" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-[8px] md:text-[10px] text-white/30 tracking-[1em] uppercase flex items-center gap-3 md:gap-4">
                                <Star className="w-2 h-2 md:w-3 md:h-3" /> <span>{p.stargazers_count}</span>
                                <span>•</span>
                                <GitFork className="w-2 h-2 md:w-3 md:h-3" /> <span>{p.forks_count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Works;
