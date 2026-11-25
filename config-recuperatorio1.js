/* ============================================================
   CONFIGURACIÓN DEL RECUPERATORIO · EVALUACIÓN 1
   ------------------------------------------------------------
   Se carga después de config.js y antes de app.js.
   Mismos temas que la Evaluación Final, con consignas distintas.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-1-recu',
    titulo: 'Recuperatorio de Evaluación Final · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia del recuperatorio (la Evaluación Final usa "Python1"). */
window.CONFIG.CLAVE_ACCESO = 'cQmEMIGqZr';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Pide la temperatura con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'La convierte con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Usa if / else', f: function (c) { return /\bif\b[\s\S]*\belse\b/.test(c); } },
        { d: 'Compara la temperatura con 10', f: function (c) { return /\btemp\s*<\s*10\b/.test(c); } },
        { d: 'Muestra los mensajes con print()', f: function (c) {
            return (c.match(/\bprint\s*\(/g) || []).length >= 2;
        } }
    ],

    c2: [
        { d: 'Usa un for con range()', f: function (c) { return /\bfor\b[^\n]*\brange\s*\(/.test(c); } },
        { d: 'Recorre del 1 al 5 con range(1, 6)', f: function (c) {
            return /range\s*\(\s*1\s*,\s*6\s*\)/.test(c);
        } },
        { d: 'Muestra cada número con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ]
};
