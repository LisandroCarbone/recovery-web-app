import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import BookingScheduler from './BookingScheduler';
import api from '../config/api';

const diagnosisSchema = z.object({
    name: z.string()
        .min(2, { message: 'Tu nombre es importante' })
        .regex(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, { message: 'El nombre solo puede contener letras' })
        .transform(val => val.trim().replace(/\s+/g, ' ')), // Collapses spaces
    dni: z.string()
        .regex(/^\d{8}$/, { message: 'El DNI debe tener exactamente 8 dígitos numéricos' }),
    email: z.string().email({ message: 'Email inválido' }),
    phone: z.string().min(8, { message: 'Ingresa un teléfono válido' }),
    gym: z.string().optional(),
    discipline: z.string().min(1, { message: 'Selecciona tu disciplina principal' }),
    frequency: z.number().min(1).max(7),
    painZone: z.string().min(1, { message: 'Indícanos dónde necesitas atención' }),
    interests: z.array(z.string()).min(1, { message: 'Selecciona al menos un servicio' }),
});

type DiagnosisFormValues = z.infer<typeof diagnosisSchema> & {
    bookingDate?: string;
    bookingTime?: string;
};

const InteractiveDiagnosis = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingData, setBookingData] = useState<{ date: Date, time: string } | null>(null);

    const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<DiagnosisFormValues>({
        resolver: zodResolver(diagnosisSchema),
        defaultValues: {
            discipline: '',
            frequency: 3,
            painZone: '',
            interests: [],
        }
    });

    const onSubmit = async (data: DiagnosisFormValues) => {
        // Only submit if we have booking data when we are at the final step
        if (!bookingData) return;

        setIsSubmitting(true);
        const finalPayload = {
            ...data,
            bookingDate: bookingData.date.toISOString(),
            bookingTime: bookingData.time
        };

        try {
            await api.post('/diagnosis', finalPayload);
            setTimeout(() => {
                setStep(4);
                setIsSubmitting(false);
            }, 1500);
        } catch (error) {
            console.error('Submission failed', error);
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        const isValid = await trigger(['name', 'dni', 'email', 'phone']);
        if (isValid) {
            setStep(2);
        }
    };

    const handleProfileSubmit = async () => {
        const isValid = await trigger(['discipline', 'frequency', 'painZone', 'interests']);
        if (isValid) {
            setStep(3); // Go to Booking
        }
    };

    const disciplines = ['Rugby', 'Fútbol', 'Crossfit', 'Handball', 'Running', 'Powerlifting', 'Basketball', 'Fisicoculturismo', 'Otro'];
    const knowledgeLevels = ['Nulo', 'Poco', 'Normal', 'Mucho'];
    const services = ['Crioterapia', 'Sauna', 'Crio compresión', 'Electrodos']; // 'Elongación', 'Masajes' son servicios que no se ofrecen

    return (
        <section id="diagnosis" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <div className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="mb-8 text-center">
                        <span className="text-secondary text-sm font-medium uppercase tracking-widest">
                            Fase {step} de 4
                        </span>
                        <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 4) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-2">Comencemos</h2>
                                    <p className="text-secondary">Datos básicos para la reserva de tu sesión.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                                        <input
                                            {...register('name')}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="Ej. Juan Rodriguez"
                                        />
                                        {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">DNI</label>
                                        <input
                                            {...register('dni')}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="Ej. 12345678"
                                            type="number"
                                        />
                                        {errors.dni && <span className="text-red-400 text-xs mt-1 block">{errors.dni.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                        <input
                                            {...register('email')}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="tuemail@ejemplo.com"
                                        />
                                        {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Teléfono / Celular</label>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="Ej. 11 1234-5678"
                                        />
                                        {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Club / Gimnasio (Opcional)</label>
                                        <input
                                            {...register('gym')}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="Ej. Club Argentino de Rugby"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={nextStep}
                                    type="button"
                                    className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mt-4"
                                >
                                    Continuar <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">Perfil Atlético</h2>
                                    <p className="text-secondary text-sm">Nos interesa saber de vos.</p>
                                </div>

                                {/* Discipline */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-400">Disciplina Principal</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {disciplines.map(d => (
                                            <label key={d} className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all ${watch('discipline') === d ? 'border-accent bg-accent/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'}`}>
                                                <input type="radio" value={d} {...register('discipline')} className="hidden" />
                                                {d}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.discipline && <span className="text-red-400 text-xs">{errors.discipline.message}</span>}
                                </div>

                                {/* Frequency */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-400 flex justify-between">
                                        Frecuencia de entrenamiento
                                        <span className="text-accent">{watch('frequency')} días/sem</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="7"
                                        step="1"
                                        {...register('frequency', { valueAsNumber: true })}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                </div>

                                {/* Knowledge Level */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-400">Conocimiento sobre el recovery</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {knowledgeLevels.map(k => (
                                            <label key={k} className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all ${watch('painZone') === k ? 'border-accent bg-accent/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'}`}>
                                                <input type="radio" value={k} {...register('painZone')} className="hidden" />
                                                {k}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Interests */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-400">Servicios de interés (Múltiple)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {services.map(s => (
                                            <label key={s} className={`cursor-pointer border rounded-full px-4 py-2 text-xs transition-all ${watch('interests')?.includes(s) ? 'border-accent bg-accent text-slate-900 font-bold' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>
                                                <input type="checkbox" value={s} {...register('interests')} className="hidden" />
                                                {s}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.interests && <span className="text-red-400 text-xs">{errors.interests.message}</span>}
                                </div>

                                <button
                                    onClick={handleProfileSubmit}
                                    type="button"
                                    className="w-full bg-accent text-slate-900 font-bold py-4 rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continuar
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">Reserva tu sesión</h2>
                                    <p className="text-secondary text-sm">Elegí el día y horario que mas te sirva.</p>
                                </div>

                                <BookingScheduler onSelect={(date, time) => setBookingData({ date, time })} />

                                <button
                                    onClick={handleSubmit(onSubmit, (errors) => {
                                        console.log('Form Errors:', errors);
                                        alert('Falta completar datos correctamente: ' + Object.keys(errors).join(', '));
                                    })}
                                    disabled={isSubmitting || !bookingData}
                                    className="w-full bg-accent text-slate-900 font-bold py-4 rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmar Reserva'}
                                </button>

                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">¡Reserva Confirmada!</h2>
                                <p className="text-secondary mb-8">Te hemos enviado los detalles a tu correo. Prepárate para volver a tu 100%.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InteractiveDiagnosis;
