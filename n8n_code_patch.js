// Configuración
const startHour = 8;
const endHour = 20;
const capacity = 2;

// --- 1. PROCESAR EVENTOS ---
// Mapear eventos existentes de Google Calendar
// Convertimos todo a timestamps numéricos para comparar fácilmente
const existingEvents = items
    .filter(item => item.json.start && item.json.start.dateTime)
    .map(item => ({
        start: new Date(item.json.start.dateTime).getTime(),
        end: new Date(item.json.end.dateTime).getTime()
    }));

const availableSlots = [];

// --- 2. DETERMINAR FECHA SOLICITADA ---
let requestedDateStr;
try {
    // Intentamos leer la fecha del Webhook query
    requestedDateStr = $('Webhook').first().json.query.date;
} catch (e) {
    // Si falla, usamos HOY (Argentina -03:00)
    // Truco: restamos 3 horas al UTC para obtener la fecha en AR
    const now = new Date();
    const arTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
    requestedDateStr = arTime.toISOString().split('T')[0];
}

// --- 3. GENERAR SLOTS (Lógica Robusta de Texto) ---
// En lugar de usar objetos Date que dependen de la zona horaria del servidor (Docker),
// construimos strings ISO explícitos con offset -03:00.
// Ejemplo: "2026-01-24T08:00:00-03:00"

for (let h = startHour; h < endHour; h++) {
    // Formatear hora a 2 dígitos (08, 09, 10...)
    const hh = h.toString().padStart(2, '0');

    // Construir fechas de inicio y fin del slot en formato ISO Argentina
    const slotStartISO = `${requestedDateStr}T${hh}:00:00-03:00`;
    const slotEndISO = `${requestedDateStr}T${(h + 1).toString().padStart(2, '0')}:00:00-03:00`;

    const slotStartMs = new Date(slotStartISO).getTime();
    const slotEndMs = new Date(slotEndISO).getTime();

    // --- 4. VERIFICAR DISPONIBILIDAD ---
    const concurrentEvents = existingEvents.filter(event => {
        // Superposición: (InicioEvento < FinSlot) Y (FinEvento > InicioSlot)
        return (event.start < slotEndMs && event.end > slotStartMs);
    });

    if (concurrentEvents.length < capacity) {
        availableSlots.push(`${hh}:00`);
    }
}

// Return valid n8n structure (json property MUST be an Object, not an Array)
return [{ json: { slots: availableSlots } }];
