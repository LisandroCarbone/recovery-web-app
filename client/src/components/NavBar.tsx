import { MapPin, MessageCircle, ChevronDown, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const NavBar = ({ onAuthClick, user }: { onAuthClick: () => void, user: any }) => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 pointer-events-auto w-fit"
            >
                {/* Branding */}
                <div className="flex items-center gap-2 pr-2">
                    <img src="/LOGO%20R2%20ICON.png" alt="R2 Recovery" className="w-8 h-8 object-contain" />
                    <span className="font-bold text-white tracking-tight hidden sm:block">R2 Recovery</span>
                </div>

                {/* Contact Dropdown */}
                <div className="relative group">
                    <button
                        onClick={() => setIsContactOpen(!isContactOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-950/30 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800/50 hover:border-accent/50 hover:bg-slate-900/60"
                    >
                        <MessageCircle size={14} className="text-secondary group-hover:text-accent transition-colors" />
                        <span>Contactanos</span>
                        <motion.div animate={{ rotate: isContactOpen ? 180 : 0 }}>
                            <ChevronDown size={12} />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isContactOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-40 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col p-1"
                            >
                                <a
                                    href="https://wa.me/5491164831015"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                >
                                    <MessageCircle size={14} className="text-green-400" />
                                    WhatsApp
                                </a>
                                <a
                                    href="mailto:contacto@r2recovery.com"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                >
                                    <Mail size={14} className="text-blue-400" />
                                    Email
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Direct Links */}
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.+Regimiento+de+Patricios+860,+CABA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group bg-slate-950/30 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800/50 hover:border-accent/50 hover:bg-slate-900/60"
                >
                    <MapPin size={14} className="text-secondary group-hover:text-accent transition-colors" />
                    <span className="hidden sm:inline">Donde Estamos?</span>
                </a>

                {/* Login/Profile */}
                <button
                    onClick={onAuthClick}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors group px-4 py-2 rounded-full border backdrop-blur-md ${user ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20' : 'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700'}`}
                >
                    <User size={14} />
                    <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : 'Ingresar'}</span>
                </button>
            </motion.div>
        </nav>
    );
};

export default NavBar;
