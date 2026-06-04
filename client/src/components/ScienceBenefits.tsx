import { Brain, Flame, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
    {
        icon: Flame,
        title: 'Reducción de Inflamación',
        description: 'Protocolos de contraste térmico y compresión para acelerar el barrido de metabolitos y reducir el edema post-esfuerzo.'
    },
    {
        icon: Moon,
        title: 'Optimización del Sueño',
        description: 'Estrategias para maximizar la fase REM y profunda, donde ocurre la verdadera regeneración hormonal y tisular.'
    },
    {
        icon: Brain,
        title: 'Wellness',
        description: 'La combinación de nuestras técnicas, el contraste calor-frío y la presión, promueve la eliminación de toxinas y mejora la oxigenación, lo que ayuda a reducir la celulitis edematosa y la apariencia de piel.'
    }
];

const ScienceBenefits = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ciencia con datos.</h2>
                    <p className="text-secondary max-w-2xl mx-auto text-lg">
                        Dejamos de lado las modas pasajeras para centrarnos en lo que la fisiología deportiva ha demostrado que funciona.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((item, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-accent/30 transition-colors group">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-slate-900 transition-colors duration-300">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-slate-100">{item.title}</h3>
                            <p className="text-secondary leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const element = document.getElementById('diagnosis');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-background text-lg font-bold rounded-full hover:shadow-[0_0_20px_rgba(190,242,100,0.4)] transition-all duration-300"
                    >
                        Reserva tu espacio
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="group-hover:translate-x-1 transition-transform"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ScienceBenefits;
