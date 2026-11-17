/* ============================================================
   CONFIGURACIÓN · PRIMERA EVALUACIÓN · PARTE 2
   ------------------------------------------------------------
   Temas: Listas, tuplas y diccionarios.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-primera',
    titulo: 'Primera Evaluación · Parte 2 · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Primera Evaluación · Parte 2. */
window.CONFIG.CLAVE_ACCESO = 'Primera2';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Crea una lista con corchetes', f: function (c) { return /\b[a-z_]\w*\s*=\s*\[/.test(c); } },
        { d: 'La lista tiene al menos 3 elementos', f: function (c) {
            return /\[[^\]]*,[^\]]*,[^\]]*\]/.test(c);
        } },
        { d: 'Muestra la lista con print()', f: function (c) { return /\bprint\s*\(\s*[a-z_]\w*\s*\)/.test(c); } }
    ],

    c2: [
        { d: 'Crea un diccionario con llaves', f: function (c) { return /\b[a-z_]\w*\s*=\s*\{/.test(c); } },
        { d: 'Usa claves de texto entre comillas', f: function (c) { return /\{\s*["'][a-z_]/.test(c); } },
        { d: 'Muestra el diccionario con print()', f: function (c) { return /\bprint\s*\(\s*[a-z_]\w*\s*\)/.test(c); } }
    ]
};
