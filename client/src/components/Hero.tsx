import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

const Hero = () => {
    const scrollToDiagnosis = () => {
        const element = document.getElementById('diagnosis');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Mesh */}
            <div className="absolute inset-0 z-0 bg-background">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="mb-6 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-secondary font-medium tracking-wider uppercase">
                            <Activity size={14} className="text-accent" />
                            Ciencia aplicada al rendimiento
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight mb-8 leading-tight">
                        Recovery to be<span className="text-accent"> ready </span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl mx-auto font-light">
                        Tecnología de élite y metodologías para atletas profesionales o qué viven como uno de ellos.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToDiagnosis}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-background text-lg font-bold rounded-full hover:shadow-[0_0_20px_rgba(190,242,100,0.4)] transition-all duration-300"
                    >
                        Reserva tu espacio
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    {/* Powered by BOSS Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm"
                    >
                        <span>Powered by</span>
                        <a
                            href="https://www.bossrecoveryhealth.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-accent transition-colors flex items-center gap-1"
                        >
                            BOSS<sup className="text-xs">®</sup> Recovery
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-slate-800 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 h-1 bg-secondary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
