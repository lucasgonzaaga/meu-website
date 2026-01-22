import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, loading }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Sobre mim', href: '#about' },
        { name: 'Trabalhos', href: '#works' },
        { name: 'Feedbacks', href: '#feedback' },
        { name: 'Contato', href: '#contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[10001] px-6 md:px-12 py-6 md:py-10 bg-transparent">
                <div className="flex items-center justify-between w-full">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-4 font-bold tracking-[0.5em] uppercase text-[10px] text-[var(--color-text)]">
                        <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
                        Lucas Gonzaga
                    </div>

                    {/* Desktop Links - Center */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--color-text)] opacity-50 hover:opacity-100 transition-opacity relative group"
                            >
                                {link.name}
                                <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-text)] transition-all duration-500 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Right Side - Theme & Mobile Toggle */}
                    <div className="flex items-center gap-4 md:gap-6">


                        {/* Mobile Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="p-2 md:hidden text-[var(--color-text)]"
                            type="button"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-screen bg-[var(--color-bg)] z-[1000] flex flex-col items-center justify-center md:hidden pt-20 animate-in fade-in slide-in-from-top duration-300">
                    <div className="flex flex-col items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[var(--color-text)] font-['Syncopate'] hover:text-[var(--color-primary)] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
