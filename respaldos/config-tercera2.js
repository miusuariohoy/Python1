/* ============================================================
   CONFIGURACIÓN · TERCERA EVALUACIÓN · PARTE 2
   ------------------------------------------------------------
   Temas: formulario con MySQL.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-tercera',
    titulo: 'Tercera Evaluación · Parte 2 · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Tercera Evaluación · Parte 2. */
window.CONFIG.CLAVE_ACCESO = 'aH2jb8adig';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Importa mysql.connector', f: function (c) { return /import\s+mysql\.connector/.test(c); } },
        { d: 'Abre la conexión con connect()', f: function (c) { return /\.connect\s*\(/.test(c); } },
        { d: 'Cierra la conexión con close()', f: function (c) { return /\.close\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Importa tkinter', f: function (c) { return /from\s+tkinter\s+import/.test(c); } },
        { d: 'Escribe Entry con mayúscula (Entry)', f: function (c, original) { return /\bEntry\s*\(/.test(original || c); } },
        { d: 'Pasa la ventana como padre: Entry(ventana, ...)', f: function (c, original) { return /\bEntry\s*\(\s*ventana\b/i.test(original || c); } },
        { d: 'Lee el texto con get()', f: function (c) { return /\.get\s*\(\s*\)/.test(c); } },
        { d: 'Muestra el dato con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ]
};
