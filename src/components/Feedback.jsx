import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { gsap } from 'gsap';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 0,
        message: ''
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const titleRef = useRef();

    useEffect(() => {
        fetchFeedbacks();
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const { data, error } = await supabase
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setFeedbacks(data || []);
        } catch (error) {
            console.error('Erro ao buscar feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.rating || !formData.message) {
            setSubmitStatus({ type: 'error', message: 'Preencha todos os campos' });
            return;
        }
        setSubmitting(true);
        try {
            const { error } = await supabase.from('feedbacks').insert([formData]);
            if (error) throw error;
            setSubmitStatus({ type: 'success', message: 'Feedback enviado com sucesso!' });
            setFormData({ name: '', email: '', rating: 0, message: '' });
            fetchFeedbacks();
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Erro ao enviar feedback.' });
        } finally {
            setSubmitting(false);
        }
    };

    const StarRating = ({ rating, onRate, onHover, interactive = true }) => {
        return (
            <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => interactive && onRate && onRate(star)}
                        onMouseEnter={() => interactive && onHover && onHover(star)}
                        onMouseLeave={() => interactive && onHover && onHover(0)}
                        className={`transition-all duration-300 ${interactive ? 'hover:scale-125' : ''}`}
                    >
                        <Star
                            className={`w-10 h-10 ${star <= (interactive ? (hoverRating || rating) : rating)
                                ? 'fill-white text-white'
                                : 'text-white/10'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <section id="feedback" className="min-h-screen bg-black text-white py-40 px-10 md:px-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">

                {/* Modern Form */}
                {/* Modern Form */}
                <div className="space-y-16">
                    <h2 ref={titleRef} className="text-[12vw] md:text-[6vw] font-black leading-none font-['Syncopate'] uppercase">
                        Feedback <br /><span className="text-outline">Clientes</span>
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="group relative border-b border-white/20 focus-within:border-white transition-colors duration-500">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-transparent py-4 outline-none text-2xl font-light placeholder:text-white/10"
                                placeholder="SEU NOME"
                            />
                        </div>

                        <div className="group relative border-b border-white/20 focus-within:border-white transition-colors duration-500">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-transparent py-4 outline-none text-2xl font-light placeholder:text-white/10"
                                placeholder="SEU EMAIL"
                            />
                        </div>

                        <div className="py-4">
                            <StarRating
                                rating={formData.rating}
                                onRate={(rating) => setFormData({ ...formData, rating })}
                                onHover={setHoverRating}
                            />
                        </div>

                        <div className="group relative border-b border-white/20 focus-within:border-white transition-colors duration-500">
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="3"
                                className="w-full bg-transparent py-4 outline-none text-2xl font-light placeholder:text-white/10 resize-none"
                                placeholder="SUA MENSAGEM"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-liquid w-full uppercase tracking-[0.5em] font-bold text-[12px] border border-white/20 hover:bg-white hover:text-black transition-all duration-700 disabled:opacity-30"
                        >
                            {submitting ? 'ENVIANDO...' : 'ENVIAR FEEDBACK'}
                        </button>

                        <AnimatePresence>
                            {submitStatus && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-widest text-center mt-4">
                                    {submitStatus.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Cinematic List */}
                <div className="relative">
                    {/* Mobile Header & Swipe Hint */}
                    <div className="md:hidden mb-6 flex items-end justify-between px-1">
                        <h3 className="text-2xl font-black font-['Syncopate'] uppercase tracking-tighter text-white">
                            Mural de <span className="text-outline">Amor</span>
                        </h3>
                        <span className="text-[10px] items-center gap-2 text-white/40 tracking-widest uppercase animate-pulse hidden xs:flex">
                            Deslize <span className="text-lg">→</span>
                        </span>
                    </div>

                    <div className="hidden md:block absolute -top-20 -right-20 text-[10vw] font-black opacity-[0.03] select-none font-['Syncopate'] uppercase pointer-events-none whitespace-nowrap">
                        Feedback
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 hide-scrollbar md:block md:space-y-12 md:max-h-[80vh] md:overflow-y-auto md:pr-4 md:custom-scrollbar md:pb-0">
                        {loading ? (
                            <div className="space-y-4 animate-pulse w-full">
                                {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white/5 w-full rounded-sm" />)}
                            </div>
                        ) : feedbacks.map((f, i) => (
                            <div
                                key={f.id}
                                className="group relative border-l border-white/5 pl-10 py-6 hover:border-white transition-colors duration-700 min-w-[85vw] snap-center shrink-0 md:w-auto md:min-w-0"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-bold font-['Syncopate'] uppercase tracking-tighter">
                                        {f.name}
                                    </h4>
                                    <div className="flex gap-1">
                                        {[...Array(f.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-white text-white" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-white/40 text-lg leading-relaxed group-hover:text-white transition-colors duration-500 line-clamp-4 md:line-clamp-none">
                                    "{f.message}"
                                </p>
                                <span className="block mt-4 text-[10px] opacity-20 tracking-widest uppercase">
                                    {new Date(f.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
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

export default Feedback;
