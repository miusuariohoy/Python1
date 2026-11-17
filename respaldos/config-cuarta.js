/* ============================================================
   CONFIGURACIÓN · CUARTA EVALUACIÓN
   ------------------------------------------------------------
   Temas: Listas, tuplas y diccionarios.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2-cuarta',
    titulo: 'Cuarta Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Cuarta Evaluación. */
window.CONFIG.CLAVE_ACCESO = 'Cuarta1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Crea una lista con al menos 3 elementos', f: function (c) { return /\b[a-z_]\w*\s*=\s*\[[^\]]*,[^\]]*,[^\]]*\]/.test(c); } },
        { d: 'Lee una posición con [0]', f: function (c) { return /\b[a-z_]\w*\s*\[\s*0\s*\]/.test(c); } },
        { d: 'Usa len() para contar', f: function (c) { return /\blen\s*\(/.test(c); } },
        { d: 'Agrega un elemento con append()', f: function (c) { return /\.append\s*\(/.test(c); } },
        { d: 'Recorre la lista con for', f: function (c) { return /\bfor\b[^\n]*\bin\b/.test(c); } },
        { d: 'Muestra los datos con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Crea el diccionario con llaves', f: function (c) { return /\b[a-z_]\w*\s*=\s*\{/.test(c); } },
        { d: 'Usa claves de texto entre comillas', f: function (c) { return /\{\s*[\"'][a-z_]/.test(c); } },
        { d: 'Lee un valor por su clave', f: function (c) { return /\b[a-z_]\w*\s*\[\s*[\"'][^\"']+[\"']\s*\]/.test(c); } },
        { d: 'Agrega una clave nueva', f: function (c) { return /\b[a-z_]\w*\s*\[\s*[\"'][^\"']+[\"']\s*\]\s*=/.test(c); } },
        { d: 'Recorre con .items()', f: function (c) { return /\.items\s*\(/.test(c); } },
        { d: 'Muestra los datos con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ]
};
