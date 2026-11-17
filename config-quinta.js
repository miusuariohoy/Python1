/* ============================================================
   CONFIGURACIÓN · QUINTA EVALUACIÓN
   ------------------------------------------------------------
   Temas: Text, lambda y state.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-quinta',
    titulo: 'Quinta Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Quinta Evaluación. */
window.CONFIG.CLAVE_ACCESO = 'Quinta1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Crea un widget Text', f: function (c) { return /\btext\s*\(/.test(c); } },
        { d: 'Empaqueta con pack()', f: function (c) { return /\.pack\s*\(/.test(c); } },
        { d: 'Inserta al final con insert(END, ...)', f: function (c) { return /insert\s*\(\s*end/.test(c); } },
        { d: 'Agrega un salto de línea', f: function (c) { return /\\n/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /\bmainloop\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Define una función con parámetro', f: function (c) { return /\bdef\s+\w+\s*\(\s*\w+\s*\)/.test(c); } },
        { d: 'Conecta un botón con command=lambda', f: function (c) { return /\bbutton\s*\([^)]*command\s*=\s*lambda/.test(c); } },
        { d: 'La lambda pasa un texto a la función', f: function (c) { return /lambda\s*:\s*\w+\s*\(\s*[\"'][^\"']+[\"']\s*\)/.test(c); } },
        { d: 'Crea un botón con state=DISABLED', f: function (c) { return /\bbutton\s*\([^)]*state\s*=\s*disabled/.test(c); } },
        { d: 'Habilita con config(state=NORMAL)', f: function (c) { return /\.config\s*\(\s*state\s*=\s*normal/.test(c); } },
        { d: 'Conecta el botón habilitar con command', f: function (c) { return /\bbutton\s*\([^)]*command\s*=/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /\bmainloop\s*\(/.test(c); } }
    ]
};
