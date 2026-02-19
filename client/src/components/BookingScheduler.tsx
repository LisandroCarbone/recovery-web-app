import { useState, useEffect } from 'react';
import { format, addDays, startOfToday, isSameDay, isAfter, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import api from '../config/api';

interface BookingSchedulerProps {
    onSelect: (date: Date, time: string) => void;
}

const BookingScheduler = ({ onSelect }: BookingSchedulerProps) => {
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<{ time: string, spots: number }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Generate next 14 days
    const upcomingDates = Array.from({ length: 21 }, (_, i) => addDays(startOfToday(), i))
        .filter(date => {
            const day = date.getDay();
            return day !== 0 && day !== 6; // 0 Sunday, 6 Saturday
        });

    useEffect(() => {
        const fetchAvailability = async () => {
            setIsLoading(true);
            setAvailableSlots([]); // Clear previous slots while loading

            try {
                const formattedDate = format(selectedDate, 'yyyy-MM-dd');
                // Call our backend, which acts as a proxy/cache for n8n
                const response = await api.get('/availability', {
                    params: { date: formattedDate }
                });

                let slots = response.data;

                // Normalize response: If n8n returns strings (fallback or old logic), convert to objects
                if (Array.isArray(slots) && typeof slots[0] === 'string') {
                    slots = slots.map((time: string) => ({ time, spots: 2 }));
                }

                // Filter past hours if "today" is selected
                const now = new Date();
                if (isSameDay(selectedDate, now)) {
                    slots = slots.filter((slot: { time: string }) => {
                        const [hour, minute] = slot.time.split(':').map(Number);
                        const slotDate = setMinutes(setHours(selectedDate, hour), minute);
                        return isAfter(slotDate, now);
                    });
                }

                setAvailableSlots(slots);
            } catch (error) {
                console.error('Error fetching availability:', error);
            } finally {
                setIsLoading(false);
                setSelectedTimeSlot(null);
            }
        };

        fetchAvailability();
    }, [selectedDate]);

    const handleSlotClick = (time: string) => {
        setSelectedTimeSlot(time);
        onSelect(selectedDate, time);
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4 text-slate-300">
                <CalendarIcon size={18} className="text-accent" />
                <h3 className="text-lg font-bold">Selecciona tu día</h3>
            </div>

            {/* Date Selector Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {upcomingDates.map((date) => {
                    const isSelected = isSameDay(date, selectedDate);
                    return (
                        <motion.button
                            key={date.toString()}
                            onClick={() => setSelectedDate(date)}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-shrink-0 w-20 flex flex-col items-center justify-center p-3 rounded-xl border transition-all snap-start ${isSelected
                                ? 'bg-accent text-slate-950 border-accent shadow-[0_0_15px_rgba(190,242,100,0.3)]'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            <span className="text-xs uppercase font-bold">{format(date, 'EE', { locale: es })}</span>
                            <span className="text-2xl font-bold">{format(date, 'd')}</span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2 mb-4 mt-6 text-slate-300 justify-between">
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-accent" />
                    <h3 className="text-lg font-bold">Horarios disponibles</h3>
                </div>

                {/* Legend */}
                <div className="flex gap-3 text-[10px] uppercase font-bold tracking-wider">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <span className="text-green-500 hidden sm:block">2 Disp.</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                        <span className="text-yellow-400 hidden sm:block">1 Disp.</span>
                    </div>
                </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar min-h-[100px]">
                {isLoading ? (
                    <div className="col-span-full flex items-center justify-center py-8 text-slate-500">
                        <Loader2 className="animate-spin mr-2" /> cargando...
                    </div>
                ) : availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                        <motion.button
                            key={slot.time}
                            onClick={() => handleSlotClick(slot.time)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all relative overflow-hidden group ${selectedTimeSlot === slot.time
                                ? 'bg-white text-slate-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                : 'bg-slate-900/80 hover:bg-slate-800'
                                } ${selectedTimeSlot !== slot.time && slot.spots >= 2 ? 'border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:border-green-400' : ''} 
                                  ${selectedTimeSlot !== slot.time && slot.spots === 1 ? 'border-yellow-500/50 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.1)] hover:border-yellow-400' : ''}`}
                        >
                            {slot.time}

                            {/* Spots Badge (Mobile/Desktop) */}
                            {selectedTimeSlot !== slot.time && (
                                <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${slot.spots >= 2 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
                            )}
                        </motion.button>
                    ))
                ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                        No hay turnos disponibles para hoy
                    </div>
                )}
            </div>

            {selectedTimeSlot && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between"
                >
                    <div>
                        <span className="text-xs text-slate-400 uppercase block">Estás reservando para:</span>
                        <span className="text-white font-bold text-lg capitalize">
                            {format(selectedDate, 'EEEE d', { locale: es })} a las {selectedTimeSlot}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-slate-400 uppercase block">Duración</span>
                        <span className="text-accent font-bold">60 min</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default BookingScheduler;
