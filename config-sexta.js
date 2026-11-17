/* ============================================================
   CONFIGURACIÓN · SEXTA EVALUACIÓN
   ------------------------------------------------------------
   Temas: formulario con MySQL.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-sexta',
    titulo: 'Sexta Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Sexta Evaluación. */
window.CONFIG.CLAVE_ACCESO = 'Sexta1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Importa mysql.connector', f: function (c) { return /import\s+mysql\.connector/.test(c); } },
        { d: 'Define la función conectar()', f: function (c) { return /\bdef\s+conectar\s*\(\s*\)/.test(c); } },
        { d: 'Usa connect(...) con los datos', f: function (c) { return /\.connect\s*\(/.test(c); } },
        { d: 'Crea el cursor con cursor()', f: function (c) { return /\.cursor\s*\(/.test(c); } },
        { d: 'Usa INSERT INTO', f: function (c) { return /\binsert\s+into\b/.test(c); } },
        { d: 'Deja un hueco %s', f: function (c) { return /%s/.test(c); } },
        { d: 'Confirma con commit()', f: function (c) { return /\.commit\s*\(/.test(c); } },
        { d: 'Cierra con close()', f: function (c) { return /\.close\s*\(/.test(c); } },
        { d: 'Protege con try / except', f: function (c) { return /\btry\s*:/.test(c) && /\bexcept\b/.test(c); } }
    ],

    c2: [
        { d: 'Importa tkinter', f: function (c) { return /from\s+tkinter\s+import|import\s+tkinter/.test(c); } },
        { d: 'Importa messagebox', f: function (c) { return /messagebox/.test(c); } },
        { d: 'Crea un Entry', f: function (c) { return /\bentry\s*\(/.test(c); } },
        { d: 'Lee el dato con .get()', f: function (c) { return /\.get\s*\(\s*\)/.test(c); } },
        { d: 'Usa INSERT INTO', f: function (c) { return /\binsert\s+into\b/.test(c); } },
        { d: 'Deja un hueco %s', f: function (c) { return /%s/.test(c); } },
        { d: 'Confirma con commit()', f: function (c) { return /\.commit\s*\(/.test(c); } },
        { d: 'Avisa con messagebox', f: function (c) { return /messagebox\s*\./.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /\bmainloop\s*\(/.test(c); } }
    ]
};
