import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Waves, Zap, Heart } from 'lucide-react';

const services = [
    {
        id: 1,
        title: 'Sauna',
        icon: Heart,
        shortDesc: 'Mejora cardiovascular y relajación mental total.',
        fullDesc: 'Reduce el estrés y promueve la relajación. Mejora la salud cardiovascular y la circulación. Ayuda a la recuperación muscular y alivia el dolor crónico. Desintoxica el cuerpo a través del sudor. Alivia problemas respiratorios.',
        sensation: 'Un calor intenso que provoca sudoración profusa.',
        benefit: 'Mejora cardiovascular y relajación mental total.'
    },
    {
        id: 2,
        title: 'Crioterapia',
        icon: Snowflake,
        shortDesc: 'Reset metabólico total.',
        fullDesc: 'Exposición breve a temperaturas ultra-bajas para desencadenar una respuesta antiinflamatoria sistémica y liberar endorfinas.',
        sensation: 'Un frío intenso pero soportable que te despierta al instante.',
        benefit: 'Reducción drástica de inflamación y dolor.'
    },
    {
        id: 3,
        title: 'Electrodos',
        icon: Zap,
        shortDesc: 'Recuperación muscular acelerada y reducción del dolor.',
        fullDesc: 'Electroestimulación muscular que imita el bombeo muscular natural, eliminando residuos metabólicos y reduciendo la pesadez en las piernas.',
        sensation: 'Un hormigueo, cosquilleo, vibración o ligeros golpecitos en la piel.',
        benefit: 'Recuperación muscular acelerada y reducción del dolor.'
    },
    {
        id: 4,
        title: 'Sauna Infrarrojo',
        icon: Waves,
        shortDesc: 'Detoxificación profunda.',
        fullDesc: 'Calor penetrante que eleva la temperatura central, promoviendo la vasodilatación, la relajación muscular y la eliminación de toxinas a nivel celular.',
        sensation: 'Calor envolvente y relajante, sin el agobio del vapor.',
        benefit: 'Mejora cardiovascular y relajación mental total.'
    },
    {
        id: 5,
        title: 'Kinesiología + Masaje Deportivo',
        icon: Heart,
        shortDesc: 'PRÓXIMAMENTE.',
        fullDesc: 'Terapia manual dirigida a liberar adherencias, reducir el tono muscular excesivo y mejorar la circulación local en zonas críticas.',
        sensation: 'Presión profunda y liberación de puntos gatillo.',
        benefit: 'Restauración de la longitud y función muscular.'
    }
];

const ServicesGrid = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Informacion de nuestros servicios</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <motion.div
                            layout
                            key={service.id}
                            onClick={() => setSelectedId(selectedId === service.id ? null : service.id)}
                            className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-slate-700 transition-colors ${selectedId === service.id ? 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-slate-800/50' : ''}`}
                        >
                            <motion.div layout className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-slate-950 rounded-lg text-accent">
                                    <service.icon size={24} />
                                </div>
                                <motion.span layout className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    {selectedId === service.id ? 'Detalle' : 'Explorar'}
                                </motion.span>
                            </motion.div>

                            <motion.h3 layout className="text-xl font-bold text-white mb-2">
                                {service.title}
                            </motion.h3>

                            <AnimatePresence mode='wait'>
                                {selectedId === service.id ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 space-y-4"
                                    >
                                        <p className="text-slate-300 leading-relaxed">{service.fullDesc}</p>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700/50">
                                            <div>
                                                <span className="text-xs text-secondary uppercase block mb-1">Qué se siente</span>
                                                <p className="text-sm text-white font-medium">{service.sensation}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-secondary uppercase block mb-1">Beneficio directo</span>
                                                <p className="text-sm text-accent font-medium">{service.benefit}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.p layout className="text-secondary text-sm">
                                        {service.shortDesc}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
