import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import BookingScheduler from './BookingScheduler';
import api from '../config/api';

const SERVICES = [
    { id: 'Recovery Total', name: 'Recovery Total', desc: '(Sauna, Pileta, Botas)', price: 35000 },
    { id: 'Full Relax', name: 'Full Relax', desc: '(Sauna y Botas)', price: 30000 },
    { id: 'Botas Compresión', name: 'Botas Compresión', desc: '(Botas)', price: 25000 },
    { id: 'Masajista', name: 'Masajista', desc: 'Lunes, Martes y Jueves', price: 45000 }
];

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
    service: z.string().min(1, { message: 'Selecciona tu servicio principal' }),
    painZone: z.string().min(1, { message: 'Indícanos dónde necesitas atención' }),
});

type DiagnosisFormValues = z.infer<typeof diagnosisSchema> & {
    bookingDate?: string;
    bookingTime?: string;
};

const InteractiveDiagnosis = ({ user }: { user?: any }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingData, setBookingData] = useState<{ date: Date, time: string } | null>(null);

    const { register, handleSubmit, formState: { errors }, watch, trigger, reset } = useForm<DiagnosisFormValues>({
        resolver: zodResolver(diagnosisSchema),
        defaultValues: {
            service: '',
            painZone: '',
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                dni: user.dni || '',
                service: '',
                painZone: ''
            });
            // Auto skip to step 2 since we have their info
            setStep(2);
        }
    }, [user, reset]);

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
        const isValid = await trigger(['service', 'painZone']);
        if (isValid) {
            setStep(3); // Go to Booking
        }
    };

    const knowledgeLevels = ['Nulo', 'Poco', 'Normal', 'Mucho'];

    return (
        <section id="diagnosis" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <div className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {step < 4 && (
                        <div className="mb-8 text-center">
                            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
                                Paso {step} de 3
                            </span>
                            <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 3) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    )}

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
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Establecimiento / Profesional (Opcional)</label>
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
                                    <h2 className="text-2xl font-bold text-white mb-2">Servicio</h2>
                                    <p className="text-secondary text-sm">Nos interesa saber de vos.</p>
                                </div>

                                {/* Service (formerly Discipline) */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-slate-400">Servicio Principal</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {SERVICES.map(s => (
                                            <label key={s.id} className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center text-center text-sm transition-all ${watch('service') === s.id ? 'border-accent bg-accent/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'}`}>
                                                <input type="radio" value={s.id} {...register('service')} className="hidden" />
                                                <span className="font-bold text-base">{s.name}</span>
                                                {s.desc && <span className="text-xs text-slate-500 mt-1">{s.desc}</span>}
                                            </label>
                                        ))}
                                    </div>
                                    <AnimatePresence>
                                        {watch('service') === 'Masajista' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-yellow-400 text-xs flex items-center gap-1 mt-2 bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20"
                                            >
                                                ⚠️ El servicio de Masajista es únicamente los días Lunes, Martes y Jueves.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {errors.service && <span className="text-red-400 text-xs">{errors.service.message}</span>}
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
                                    {errors.painZone && <span className="text-red-400 text-xs block mt-2 text-center">{errors.painZone.message}</span>}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        type="button"
                                        className="w-1/3 bg-slate-800 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-700 transition-colors"
                                    >
                                        Volver
                                    </button>
                                    <button
                                        onClick={handleProfileSubmit}
                                        type="button"
                                        className="w-2/3 bg-accent text-slate-900 font-bold py-4 rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continuar
                                    </button>
                                </div>
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

                                <BookingScheduler onSelect={(date, time) => setBookingData({ date, time })} service={watch('service')} />

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => setStep(2)}
                                        type="button"
                                        className="w-1/3 bg-slate-800 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-700 transition-colors"
                                    >
                                        Volver
                                    </button>
                                    <button
                                        onClick={handleSubmit(onSubmit, (errors) => {
                                            console.log('Form Errors:', errors);
                                            alert('Falta completar datos correctamente: ' + Object.keys(errors).join(', '));
                                        })}
                                        disabled={isSubmitting || !bookingData}
                                        className="w-2/3 bg-accent text-slate-900 font-bold py-4 rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmar Reserva'}
                                    </button>
                                </div>

                            </motion.div>
                        )}

                        {step === 4 && (() => {
                            const selectedService = SERVICES.find(s => s.id === watch('service'));
                            const amount = selectedService?.price || 0;
                            const waText = encodeURIComponent(`¡Hola! Acabo de hacer la reserva de ${selectedService?.name}. Te envío el comprobante de pago por $${amount}.`);
                            return (
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
                                    <p className="text-secondary mb-6">Te hemos enviado los detalles a tu correo. Por favor, completa el pago para confirmar.</p>

                                    <div className="bg-slate-800/80 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto border border-slate-700">
                                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Detalles de Pago</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-400">{selectedService?.name}</span>
                                            <span className="text-white font-bold">${amount.toLocaleString()}</span>
                                        </div>
                                        <div className="mt-4 p-4 bg-slate-900 rounded-xl">
                                            <p className="text-sm text-slate-400 mb-1">Transferir a Cuenta BruBank</p>
                                            <p className="text-white font-mono font-bold tracking-wider">r2recovery</p>
                                            <p className="text-xs text-slate-500 mt-2">Cristobal Carbone</p>
                                        </div>
                                    </div>

                                    <a
                                        href={`https://wa.me/5491112341015?text=${waText}`} // TODO: Replace with real number
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 mb-8"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        Avisar por WhatsApp
                                    </a>

                                    <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto mt-4">Al concurrir y utilizar los servicios de R2 Recovery, el usuario acepta que la marca y sus responsables no se hacen cargo por consecuencias o efectos secundarios antes, durante o posteriores a la sesión.</p>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InteractiveDiagnosis;
