/* ============================================================
   CONFIGURACIÓN · SEGUNDA EVALUACIÓN · PARTE 2
   ------------------------------------------------------------
   Temas: Text, lambda y state.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-segunda',
    titulo: 'Segunda Evaluación · Parte 2 · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Segunda Evaluación · Parte 2. */
window.CONFIG.CLAVE_ACCESO = '7vmDNKbIK1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Importa tkinter', f: function (c) { return /from\s+tkinter\s+import/.test(c); } },
        { d: 'Crea la ventana con Tk()', f: function (c) { return /\btk\s*\(\s*\)/.test(c); } },
        { d: 'Escribe Label con mayúscula (Label)', f: function (c, original) { return /\bLabel\s*\(/.test(original || c); } },
        { d: 'Pasa la ventana como padre: Label(ventana, ...)', f: function (c, original) { return /\bLabel\s*\(\s*ventana\b/i.test(original || c); } },
        { d: 'Crea un Label con text=', f: function (c) { return /text\s*=/.test(c) && /[\"']hola[\"']/.test(c); } },
        { d: 'Empaqueta con pack()', f: function (c) { return /\.pack\s*\(/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /\bmainloop\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Define saludar() sin parámetros', f: function (c) {
            return /\bdef\s+saludar\s*\(\s*\)\s*:/.test(c);
        } },
        { d: 'Muestra un saludo con print()', f: function (c) { return /\bprint\s*\(/.test(c); } },
        { d: 'Escribe Button con mayúscula (Button)', f: function (c, original) { return /\bButton\s*\(/.test(original || c); } },
        { d: 'Pasa la ventana como padre: Button(ventana, ...)', f: function (c, original) { return /\bButton\s*\(\s*ventana\b/i.test(original || c); } },
        { d: 'Conecta con command=lambda', f: function (c, original) { return /\bButton\s*\(\s*ventana\b[^)]*command\s*=\s*lambda/i.test(original || c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /\bmainloop\s*\(/.test(c); } }
    ]
};
