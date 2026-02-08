import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="bg-red-600 py-3 overflow-hidden whitespace-nowrap relative z-20 border-y border-red-500">
            {/* Gradient masks for smooth fade edges (optional) */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-red-600 to-transparent z-10 hidden md:block" />
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-red-600 to-transparent z-10 hidden md:block" />

            <motion.div
                className="inline-flex gap-8 items-center"
                animate={{ x: [0, -1035] }} // Adjust based on content width loop
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20 // Adjust speed
                }}
            >
                {/* Repetimos el contenido suficientes veces para cubrir pantallas grandes y el loop */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <span className="text-white font-black text-lg tracking-widest uppercase italic">
                            PRECIO LANZAMIENTO
                        </span>
                        <span className="text-red-300">•</span>
                        <span className="text-white font-black text-lg tracking-widest uppercase italic">
                            4 X 3
                        </span>
                        <span className="text-red-300">•</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
