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
    /* Actividad 1 · función con parámetro + return. */
    c1: [
        { d: 'Define doble(n) con un parámetro', f: function (c) {
            return /\bdef\s+doble\s*\(\s*[a-z_]\w*\s*\)\s*:/.test(c);
        } },
        { d: 'Devuelve el resultado con return', f: function (c) { return /\breturn\b/.test(c); } },
        { d: 'Devuelve el parámetro multiplicado por 2', f: function (c) {
            return /\breturn\s+[a-z_]\w*\s*\*\s*2\b/.test(c) ||
                /\breturn\s+2\s*\*\s*[a-z_]\w*\b/.test(c);
        } },
        { d: 'Llama a doble(8)', f: function (c) { return /\bdoble\s*\(\s*8\s*\)/.test(c); } },
        { d: 'Guarda el resultado en una variable', f: function (c) {
            return /\b[a-z_]\w*\s*=\s*doble\s*\(/.test(c);
        } },
        { d: 'Muestra el resultado con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    /* Actividad 2 · try / except con ValueError. */
    c2: [
        { d: 'Usa un bloque try:', f: function (c) { return /\btry\s*:/.test(c); } },
        { d: 'Pide un número con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'Convierte el dato con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Atrapa el error con except ValueError', f: function (c) {
            return /\bexcept\s+valueerror\b/.test(c);
        } },
        { d: 'Muestra "Número válido" si la conversión funciona', f: function (c) {
            return /v[aá]lido/.test(c);
        } },
        { d: 'Muestra "No es un número" si falla', f: function (c) {
            return /no es un n[uú]mero/.test(c);
        } },
        { d: 'El bloque try tiene sangría', f: function (c) {
            return /\btry\s*:\s*\n(?:\s*#[^\n]*\n)*\s+\S/.test(c);
        } }
    ]
};
