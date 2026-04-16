import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, CalendarX2, Loader2 } from 'lucide-react';
import api from '../config/api';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
    const [mode, setMode] = useState<'login' | 'register' | 'dashboard'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);

    const [form, setForm] = useState({
        email: '', password: '', name: '', dni: '', phone: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkProfile();
        }
    }, [isOpen]);

    const checkProfile = async () => {
        try {
            const { data } = await api.get('/auth/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUser(data);
            setMode('dashboard');
            onLoginSuccess(data);
            fetchAppointments();
        } catch {
            localStorage.removeItem('token');
            setMode('login');
        }
    };

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAppointments(data);
        } catch (e) {
            console.error('Failed to load appointments', e);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
            const { data } = await api.post(endpoint, form);
            localStorage.setItem('token', data.access_token);
            setUser(data.user);
            onLoginSuccess(data.user);
            setMode('dashboard');
            fetchAppointments();
        } catch (e) {
            alert('Error en la autenticación. Revisa tus datos.');
        } finally {
            setIsLoading(false);
        }
    };

    const cancelAppointment = async (id: string) => {
        if (!confirm('¿Estás seguro de cancelar este turno?')) return;
        try {
            const app = appointments.find(a => a.id === id);
            await api.delete(`/appointments/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            if (app) {
                const formattedDate = app.bookingDate.split('T')[0].split('-').reverse().join('/');
                const timeText = app.bookingTime;
                const waText = encodeURIComponent(`Disculpame. Acabo de cancelar el turno de ${formattedDate} a las ${timeText}hs.`);
                window.open(`https://wa.me/5491164831015?text=${waText}`, '_blank');
            }

            fetchAppointments();
        } catch (e) {
            alert('No se pudo cancelar el turno.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setMode('login');
        onLoginSuccess(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl z-10 m-4 overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
                            <X size={20} />
                        </button>

                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            {mode === 'dashboard' && user ? (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                            <User size={32} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Hola, {user.name}</h2>
                                        <p className="text-sm text-slate-400">{user.email}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3">Tus Turnos</h3>
                                        {appointments.length === 0 ? (
                                            <div className="p-4 bg-slate-800 rounded-xl text-center text-sm text-slate-400">
                                                No tienes turnos registrados.
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {appointments.map(app => (
                                                    <div key={app.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center">
                                                        <div>
                                                            <p className="font-bold text-white text-sm">{app.service}</p>
                                                            <p className="text-xs text-slate-400 mt-1">
                                                                {new Date(app.bookingDate).toLocaleDateString()} - {app.bookingTime}
                                                            </p>
                                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-2 inline-block ${app.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                                                {app.status}
                                                            </span>
                                                        </div>
                                        {app.status !== 'CANCELLED' && (
                                                            <button 
                                                                onClick={() => cancelAppointment(app.id)}
                                                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                                                                title="Cancelar turno"
                                                            >
                                                                <CalendarX2 size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => {
                                            onClose();
                                            const target = document.getElementById('diagnosis');
                                            if (target) {
                                                target.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }} className="flex-1 bg-accent text-slate-900 font-bold py-3 rounded-xl hover:bg-lime-400 transition-colors">
                                            Reservar Turno
                                        </button>
                                        <button onClick={onClose} className="flex-1 border border-slate-700 text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors">
                                            Quiero Navegar
                                        </button>
                                    </div>

                                    <button onClick={logout} className="w-full flex items-center justify-center gap-2 border border-slate-700 text-slate-300 py-3 rounded-xl hover:bg-slate-800 transition-colors mt-4">
                                        <LogOut size={16} /> Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
                                    <p className="text-sm text-slate-400 mb-6">Para no tener que llenar tus datos cada vez que reserves.</p>
                                    
                                    <form onSubmit={handleAuth} className="space-y-4">
                                        {mode === 'register' && (
                                            <>
                                                <div>
                                                    <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Nombre</label>
                                                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Nombre completo" />
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-1/2">
                                                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">DNI</label>
                                                        <input required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="DNI" />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Celular</label>
                                                        <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="WhatsApp" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Email</label>
                                            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="tu@email.com" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Contraseña</label>
                                            <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="••••••••" />
                                        </div>

                                        <button type="submit" disabled={isLoading} className="w-full bg-accent text-slate-900 font-bold py-4 rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center mt-2 disabled:opacity-75">
                                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (mode === 'login' ? 'Entrar' : 'Registrarse')}
                                        </button>
                                    </form>

                                    <div className="text-center mt-4 pt-4 border-t border-slate-800/50">
                                        <button 
                                            type="button" 
                                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                            className="text-sm font-medium text-slate-400 hover:text-accent transition-colors"
                                        >
                                            {mode === 'login' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
