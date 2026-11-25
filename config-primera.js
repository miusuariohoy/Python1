/* ============================================================
   CONFIGURACIÓN · PRIMERA EVALUACIÓN
   ------------------------------------------------------------
   Temas 1 a 4: variables, entrada/salida, decisiones,
   contador y acumulador.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-1-primera',
    titulo: 'Primera Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Primera Evaluación. */
window.CONFIG.CLAVE_ACCESO = '3dOUuFiex0';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Pide el nombre con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'Muestra un saludo con f-string', f: function (c) { return /\bf\s*["']/.test(c); } },
        { d: 'Incluye el nombre entre llaves', f: function (c) { return /\{[^}]*nombre[^}]*\}/.test(c); } },
        { d: 'Muestra el saludo con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    c2: [
        { d: 'Pide dos datos con input()', f: function (c) {
            return (c.match(/\binput\s*\(/g) || []).length >= 2;
        } },
        { d: 'Convierte los datos con int()', f: function (c) {
            return (c.match(/\bint\s*\(/g) || []).length >= 2;
        } },
        { d: 'Suma los dos valores con +', f: function (c) { return /\+\s*[a-z_]\w*\s*\)/.test(c); } },
        { d: 'Muestra la suma con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ]
};
