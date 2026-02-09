import { MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative py-12 bg-slate-950 border-t border-slate-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center gap-6">
                    {/* Location */}
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Av.+Regimiento+de+Patricios+860,+CABA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
                    >
                        <MapPin size={18} className="text-secondary group-hover:text-accent transition-colors" />
                        <span>Av. Regimiento de Patricios 860, CABA</span>
                    </a>

                    {/* Powered by BOSS */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-slate-500 text-sm">Powered by</span>
                            <a
                                href="https://www.bossrecoveryhealth.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src="/boss-logo.webp"
                                    alt="BOSS Recovery"
                                    className="h-10 w-auto brightness-90 hover:brightness-100 transition-all"
                                />
                            </a>
                        </div>
                        <p className="text-slate-600 text-xs text-center max-w-md">
                            Tecnología de recuperación utilizada por clubes de élite y atletas profesionales de Argentina.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-px bg-slate-800"></div>

                    {/* Copyright */}
                    {/* <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <span>© 2026 RECOVERY</span>
                        <Heart size={12} className="text-accent" />
                        <span>Science applied to performance</span>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
