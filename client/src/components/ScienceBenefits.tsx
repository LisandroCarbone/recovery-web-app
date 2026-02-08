import { Brain, Flame, Moon } from 'lucide-react';

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
            </div>
        </section>
    );
};

export default ScienceBenefits;
