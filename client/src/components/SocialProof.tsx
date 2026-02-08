import { Building2, Trophy, Medal, Star } from 'lucide-react';

const SocialProof = () => {
    return (
        <section className="py-12 border-y border-slate-900/50 bg-slate-950/50">
            <div className="container mx-auto px-6">
                <p className="text-center text-slate-500 text-sm font-medium tracking-widest uppercase mb-8">
                    Confían y trabajan con nuestras máquinas
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos using Lucide Icons for demo purposes */}
                    <div className="flex items-center gap-2 group cursor-default">
                        <Trophy className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                        <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">Argentino de Rugby</span>
                    </div>

                    <div className="flex items-center gap-2 group cursor-default">
                        <Star className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                        <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">Boca Juniors</span>
                    </div>

                    <div className="flex items-center gap-2 group cursor-default">
                        <Medal className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                        <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">Atletas Pro</span>
                    </div>

                    <div className="flex items-center gap-2 group cursor-default">
                        <Building2 className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                        <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">River Plate</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
