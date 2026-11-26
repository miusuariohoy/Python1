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

/* Parte C: 1 actividad de 4 puntos (total 4). */
window.CONFIG.PUNTOS_EJERCICIO = 4;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · estructura de función sin parámetro con while. */
    c1: [
        { d: 'Define contar() sin parámetros', f: function (c) {
            return /\bdef\s+contar\s*\(\s*\)\s*:/.test(c);
        } },
        { d: 'Usa un bucle while dentro de la función', f: function (c) {
            var def = /\bdef\s+contar\s*\(\s*\)\s*:/.exec(c);
            if (!def) return false;
            return /\bwhile\b[^\n]*:/.test(c.slice(def.index + def[0].length));
        } },
        { d: 'Inicializa el contador en 1', f: function (c) {
            return /\b[a-z_]\w*\s*=\s*1\b/.test(c);
        } },
        { d: 'Repite mientras el contador sea <= 5', f: function (c) {
            return /\bwhile\b\s*\(?\s*[a-z_]\w*\s*(?:<=\s*5|<\s*6)\s*\)?\s*:/.test(c);
        } },
        { d: 'Aumenta el contador con += 1 o = ... + 1', f: function (c) {
            return /\b[a-z_]\w*\s*\+=\s*1\b/.test(c) ||
                /\b([a-z_]\w*)\s*=\s*\1\s*\+\s*1\b/.test(c);
        } },
        { d: 'Muestra el contador con print()', f: function (c) { return /\bprint\s*\(/.test(c); } },
        { d: 'Llama a contar() después de definirla', f: function (c) {
            var sinDefinicion = c.replace(/\bdef\s+contar\s*\(\s*\)\s*:/, '');
            return /\bcontar\s*\(\s*\)/.test(sinDefinicion);
        } }
    ]
};
