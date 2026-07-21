import { motion } from 'framer-motion';
import { Check, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';

const plans = [
    {
        name: 'Básica',
        price: '60.000',
        otherPaymentPrice: '66.000',
        recoverySessions: '2 sesiones de Recovery al mes',
        massageSessions: 'No incluye masajes',
        features: [
            '2 Sesiones de Recovery (Sauna, Crio, Botas, Electrodos)',
            'Acceso a todas las tecnologías de recuperación',
            'Soporte y asesoramiento básico'
        ],
        theme: {
            bg: 'bg-slate-900/60',
            border: 'border-amber-700/30 hover:border-amber-600/50',
            accent: 'text-amber-500',
            glow: 'shadow-[0_0_30px_rgba(217,119,6,0.05)]',
            button: 'bg-amber-600 hover:bg-amber-500 text-white',
            badge: 'Bronze'
        }
    },
    {
        name: 'Plata',
        price: '110.000',
        otherPaymentPrice: '121.000',
        recoverySessions: '4 sesiones de Recovery al mes',
        massageSessions: 'No incluye masajes',
        features: [
            '4 Sesiones de Recovery (Sauna, Crio, Botas, Electrodos)',
            'Acceso prioritario a turnos',
            'Asesoramiento personalizado de recuperación',
            'Ideal para deportistas activos (1 sesión semanal)'
        ],
        theme: {
            bg: 'bg-slate-900/60',
            border: 'border-slate-500/30 hover:border-slate-400/50',
            accent: 'text-slate-400',
            glow: 'shadow-[0_0_30px_rgba(148,163,184,0.05)]',
            button: 'bg-slate-700 hover:bg-slate-600 text-white',
            badge: 'Silver'
        }
    },
    {
        name: 'Oro',
        price: '150.000',
        otherPaymentPrice: '165.000',
        recoverySessions: '4 sesiones de Recovery al mes',
        massageSessions: '1 sesión de Masajista al mes',
        features: [
            '4 Sesiones de Recovery (Sauna, Crio, Botas, Electrodos)',
            '1 turno con nuestro masajista al mes',
            'Seguimiento de prevención de lesiones',
            'Acceso total a turnos de Masajes'
        ],
        theme: {
            bg: 'bg-slate-900/60',
            border: 'border-yellow-600/30 hover:border-yellow-500/50',
            accent: 'text-yellow-500',
            glow: 'shadow-[0_0_30px_rgba(234,179,8,0.08)]',
            button: 'bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-extrabold',
            badge: 'Gold'
        }
    },
    {
        name: 'Black',
        price: '220.000',
        otherPaymentPrice: '242.000',
        recoverySessions: 'Sesiones libres de Recovery (Ilimitadas)',
        massageSessions: '2 sesiones de Masajista al mes',
        features: [
            'Recovery Total Ilimitado (Sesiones libres)',
            '2 turnos con nuestro masajista al mes',
            'Atención hiper-prioritaria',
            'El plan definitivo para deportistas de élite'
        ],
        theme: {
            bg: 'bg-slate-950 border-2 border-accent',
            border: 'border-accent hover:shadow-[0_0_20px_rgba(190,242,100,0.2)]',
            accent: 'text-accent',
            glow: 'shadow-[0_0_45px_rgba(190,242,100,0.1)]',
            button: 'bg-accent hover:bg-lime-400 text-slate-950 font-extrabold',
            badge: 'Premium/Elite'
        },
        popular: true
    }
];

const Memberships = () => {
    const handleMembershipRequest = (name: string) => {
        const text = encodeURIComponent(
            `¡Hola Cristóbal! Me interesa sumarme a la Membresía ${name.toUpperCase()} de R2 Recovery. ¿Me pasás los datos para coordinar el pago y arrancar?`
        );
        window.open(`https://wa.me/5491164831015?text=${text}`, '_blank');
    };

    return (
        <section id="memberships" className="py-24 bg-slate-900/30 border-y border-slate-800/50 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-accent font-semibold uppercase tracking-wider mb-4">
                        <Sparkles size={12} />
                        Suscripciones R2
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                        Lleva tu rendimiento al siguiente nivel
                    </h2>
                    <p className="text-lg text-slate-400 font-light">
                        Elegí la membresía mensual que mejor se adapte a tu ritmo de entrenamiento y disfrutá de beneficios exclusivos.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className={`relative rounded-3xl p-6 flex flex-col justify-between border ${plan.theme.bg} ${plan.theme.border} ${plan.theme.glow} backdrop-blur-xl`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-accent/20">
                                    RECOMENDADA
                                </span>
                            )}

                            <div>
                                {/* Header */}
                                <div className="mb-6">
                                    <span className="text-xs uppercase font-bold tracking-widest text-slate-500 block mb-1">
                                        Plan {plan.theme.badge}
                                    </span>
                                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                                </div>

                                {/* Price */}
                                <div className="mb-2 flex items-baseline">
                                    <span className="text-3xl font-black text-white">$</span>
                                    <span className="text-5xl font-extrabold text-white tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-slate-500 text-sm font-semibold ml-2">/ mes</span>
                                </div>

                                {/* Payment Breakdown Note */}
                                <div className="mb-6 text-xs text-slate-400 font-medium space-y-0.5 leading-snug">
                                    <p>Valor con transferencia o efectivo.</p>
                                    <p><span className="text-slate-300 font-semibold">${plan.otherPaymentPrice}</span> con otros medios de pago.</p>
                                </div>

                                {/* Main Session Highlights */}
                                <div className="space-y-2 mb-6 pb-6 border-b border-slate-800/80">
                                    <div className="flex items-start gap-2.5">
                                        <div className="mt-1 p-0.5 rounded-full bg-accent/20 text-accent">
                                            <Check size={12} className="stroke-[3]" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-200 leading-snug">
                                            {plan.recoverySessions}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className={`mt-1 p-0.5 rounded-full ${plan.massageSessions.includes('No') ? 'bg-slate-800 text-slate-500' : 'bg-accent/20 text-accent'}`}>
                                            <Check size={12} className="stroke-[3]" />
                                        </div>
                                        <p className={`text-sm leading-snug ${plan.massageSessions.includes('No') ? 'text-slate-500 line-through' : 'font-semibold text-slate-200'}`}>
                                            {plan.massageSessions}
                                        </p>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-3.5 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <Check size={14} className="text-slate-500 mt-1 shrink-0" />
                                            <span className="text-xs text-slate-400 leading-normal">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => handleMembershipRequest(plan.name)}
                                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10 group ${plan.theme.button}`}
                            >
                                <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                                Quiero mi membresía
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Important Notes */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
                    <div className="p-4 bg-slate-950/80 rounded-2xl text-amber-500 border border-slate-800">
                        <ShieldAlert size={28} />
                    </div>
                    <div className="space-y-2 text-center md:text-left flex-grow">
                        <h4 className="text-lg font-bold text-white">Términos y condiciones de membresías</h4>
                        <ul className="text-sm text-slate-400 list-disc pl-5 space-y-1 font-light">
                            <li>Las membresías son mensuales y no se acumulan para meses subsiguientes.</li>
                            <li>Tanto las sesiones de Recovery como las de masajes son de uso exclusivo del titular de la membresía y no son transferibles.</li>
                            <li>La coordinación de todos los turnos se realiza de manera prioritaria directamente por WhatsApp.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Memberships;
