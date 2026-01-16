/**
 * ARCHIVO DE CONFIGURACIÓN EXTERNA
 * Aquí modificamos el diseño y comportamiento sin tocar el HTML base.
 */

console.log("🔥 Patch Extension V1 Cargada");

// 1. MODIFICAR CONFIGURACIÓN GENERAL
if (typeof config !== 'undefined') {
    config.npcCount = 40;        // Más gente en el club
    config.bpm = 140;           // Ritmo inicial más rápido
    config.followRadius = 15;   // Los NPCs te ven desde más lejos
    config.noteSpeed = 1000;    // Notas más rápidas
}

// 2. MODIFICAR DISEÑO DE NPC Y JUGADOR
if (typeof appearance !== 'undefined') {
    appearance.avatar = '(🔥_🔥)'; // Nuevo diseño del jugador
    
    // Cambiar la decoración del club por defecto
    appearance.extraLasers = true;
    appearance.smokeMachine = true;
    appearance.ledLights = true;
}

// 3. SOBREESCRIBIR FUNCIONES DE DIBUJO (Opcional: Cambiar skins de NPCs)
// Podemos interceptar el comportamiento de los NPCs antes de que se dibujen
const originalReiniciarEscena = reiniciarEscena;
reiniciarEscena = function() {
    originalReiniciarEscena(); // Ejecuta la lógica original
    // Y luego cambiamos los caracteres de todos los NPCs creados
    npcs.forEach(n => {
        n.char = '└[∵]┘'; // Convertir NPCs en robots
    });
};

// 4. CAMBIAR COLORES DEL SISTEMA (CSS Variables)
document.documentElement.style.setProperty('--accent-color', '#ff0055'); // Cambiar verde por neón rosa
document.documentElement.style.setProperty('--excellent', '#00ffcc');