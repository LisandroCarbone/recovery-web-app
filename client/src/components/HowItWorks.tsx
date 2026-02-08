import { ClipboardList, FileSpreadsheet, Timer } from 'lucide-react';

const HowItWorks = () => {
    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Tu camino a la recuperación</h2>
                    <p className="text-secondary">Cuatro pasos simples. Sin fricción.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-slate-800 z-0"></div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                                <ClipboardList className="w-10 h-10 text-slate-400 group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">1. Reservá tu turno</h3>
                            <p className="text-secondary text-sm px-8">
                                Registra tu perfil atlético y reserva tu turno. Los datos son claves para saber cómo ayudarte.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                                <FileSpreadsheet className="w-10 h-10 text-slate-400 group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">2. Plan de recuperación</h3>
                            <p className="text-secondary text-sm px-8">
                                Diseñamos tu protocolo y circuito de recuperación personalizado. Podés elegirlo o armarlo con los diferentes servicios que ofrecemos.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                                <Timer className="w-10 h-10 text-slate-400 group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">3. Feedback</h3>
                            <p className="text-secondary text-sm px-8">
                                Dejanos tu feedback al terminar, así sabemos cómo seguir mejorando.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                                <Timer className="w-10 h-10 text-slate-400 group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">4. Acción</h3>
                            <p className="text-secondary text-sm px-8">
                                Entrenas duro, recuperas inteligente. Agendá tu sesión y ejecutá.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
