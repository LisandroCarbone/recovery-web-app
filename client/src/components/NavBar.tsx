import { MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NavBar = () => {
    const navLinks = [
        {
            label: "Contactanos",
            href: "https://wa.me/5491178266263",
            icon: MessageCircle
        },
        {
            label: "Donde Estamos?",
            href: "https://www.google.com/maps/search/?api=1&query=Av.+Regimiento+de+Patricios+860,+CABA",
            icon: MapPin
        },
        // {
        //     label: "Boss RH",
        //     href: "https://www.bossrecoveryhealth.com/",
        //     icon: ExternalLink
        // }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-6 pointer-events-auto w-fit"
            >
                {navLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group bg-slate-950/30 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800/50 hover:border-accent/50 hover:bg-slate-900/60"
                    >
                        <link.icon size={14} className="text-secondary group-hover:text-accent transition-colors" />
                        <span>{link.label}</span>
                    </a>
                ))}
            </motion.div>
        </nav>
    );
};

export default NavBar;
