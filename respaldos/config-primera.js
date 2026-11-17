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
window.CONFIG.CLAVE_ACCESO = 'Primera1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · input, int, f-string y print. */
    c1: [
        { d: 'Pide el nombre y la edad con input()', f: function (c) {
            return (c.match(/\binput\s*\(/g) || []).length >= 2;
        } },
        { d: 'Convierte la edad con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Usa un f-string para armar el mensaje', f: function (c) { return /\bf\s*["']/.test(c); } },
        { d: 'Incluye el nombre y la edad entre llaves', f: function (c) {
            var fs = c.match(/\bf\s*(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g) || [];
            return fs.some(function (s) {
                return (s.match(/\{[^}]+\}/g) || []).length >= 2;
            });
        } },
        { d: 'Muestra el mensaje con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    /* Actividad 2 · tres notas, contador y condición. */
    c2: [
        { d: 'Pide las tres notas con input()', f: function (c) {
            return (c.match(/\binput\s*\(/g) || []).length >= 3;
        } },
        { d: 'Convierte las notas con int()', f: function (c) {
            return (c.match(/\bint\s*\(/g) || []).length >= 3;
        } },
        { d: 'Inicializa un contador en 0', f: function (c) {
            return /\b[a-z_]\w*\s*=\s*0\b/.test(c);
        } },
        { d: 'Compara cada nota con 6 (>= 6 o > 5)', f: function (c) {
            return />=\s*6\b/.test(c) || />\s*5\b/.test(c);
        } },
        { d: 'Suma 1 al contador por cada aprobada', f: function (c) {
            return /\b[a-z_]\w*\s*\+=\s*1\b/.test(c) ||
                /\b([a-z_]\w*)\s*=\s*\1\s*\+\s*1\b/.test(c);
        } },
        { d: 'Muestra el contador con print()', f: function (c) {
            var m = c.match(/\b([a-z_]\w*)\s*\+=\s*1\b/) ||
                c.match(/\b([a-z_]\w*)\s*=\s*\1\s*\+\s*1\b/);
            if (!m) return /\bprint\s*\(/.test(c);
            return new RegExp('\\bprint\\s*\\([^)]*\\b' + m[1] + '\\b').test(c);
        } }
    ]
};
