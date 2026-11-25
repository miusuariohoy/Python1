/* ============================================================
   CONFIGURACIÓN · SEGUNDA EVALUACIÓN
   ------------------------------------------------------------
   Temas 2, 5, 6 y 7: entrada de datos, for, while y
   funciones sin parámetro.
   Se carga después de config.js y antes de app.js.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-1-segunda',
    titulo: 'Segunda Evaluación · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la Segunda Evaluación. */
window.CONFIG.CLAVE_ACCESO = 'VNHE81B4Bc';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · input, int, for y tabla de multiplicar. */
    c1: [
        { d: 'Pide un número con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'Convierte el número con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Usa un bucle for', f: function (c) { return /\bfor\b/.test(c); } },
        { d: 'Recorre del 1 al 10 con range(1, 11)', f: function (c) {
            return /\brange\s*\(\s*1\s*,\s*(?:11|10\s*\+\s*1)\s*\)/.test(c);
        } },
        { d: 'Multiplica el número por la variable del for', f: function (c) {
            return /\*/.test(c) && /\bi\b/.test(c);
        } },
        { d: 'Muestra cada resultado con print()', f: function (c) {
            return /\bprint\s*\(/.test(c) && (c.match(/\bprint\s*\(/g) || []).length >= 1;
        } }
    ],

    /* Actividad 2 · función sin parámetro con while. */
    c2: [
        { d: 'Define contar() sin parámetros', f: function (c) {
            return /\bdef\s+contar\s*\(\s*\)\s*:/.test(c);
        } },
        { d: 'Usa un bucle while', f: function (c) { return /\bwhile\b[^\n]*:/.test(c); } },
        { d: 'Inicializa el contador en 1', f: function (c) {
            return /\b[a-z_]\w*\s*=\s*1\b/.test(c);
        } },
        { d: 'Repite mientras el contador sea <= 5', f: function (c) {
            return /<=\s*5\b/.test(c) || /<\s*6\b/.test(c);
        } },
        { d: 'Aumenta el contador con += 1 o = ... + 1', f: function (c) {
            return /\b[a-z_]\w*\s*\+=\s*1\b/.test(c) ||
                /\b([a-z_]\w*)\s*=\s*\1\s*\+\s*1\b/.test(c);
        } },
        { d: 'Muestra el contador con print()', f: function (c) { return /\bprint\s*\(/.test(c); } },
        { d: 'Llama a contar() después de definirla', f: function (c) {
            return (c.match(/\bcontar\s*\(\s*\)/g) || []).length >= 2;
        } }
    ]
};
