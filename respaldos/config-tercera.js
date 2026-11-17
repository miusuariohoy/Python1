/* ============================================================
   CONFIGURACIÓN · TERCERA EVALUACIÓN
   ------------------------------------------------------------
   Temas 8 a 12: funciones con parámetro, return y alcance,
   Tkinter, try/except y random.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-1-tercera',
    titulo: 'Tercera Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Tercera Evaluación. */
window.CONFIG.CLAVE_ACCESO = 'Tercera1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Define doble(n) con un parámetro', f: function (c) {
            return /\bdef\s+doble\s*\(\s*[a-z_]\w*\s*\)\s*:/.test(c);
        } },
        { d: 'Devuelve el parámetro multiplicado por 2', f: function (c) {
            return /\breturn\s+[a-z_]\w*\s*\*\s*2\b/.test(c);
        } },
        { d: 'Llama a doble(8)', f: function (c) { return /\bdoble\s*\(\s*8\s*\)/.test(c); } },
        { d: 'Muestra el resultado con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Usa un bloque try:', f: function (c) { return /\btry\s*:/.test(c); } },
        { d: 'Convierte con int(input(...))', f: function (c) { return /\bint\s*\(\s*input\s*\(/.test(c); } },
        { d: 'Atrapa el error con except ValueError', f: function (c) {
            return /\bexcept\s+valueerror\b/.test(c);
        } },
        { d: 'Muestra un mensaje con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ]
};
