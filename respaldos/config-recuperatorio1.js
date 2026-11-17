/* ============================================================
   CONFIGURACIÓN DEL RECUPERATORIO · EVALUACIÓN 1
   ------------------------------------------------------------
   Se carga después de config.js y antes de app.js.
   Mismos temas que la Evaluación Final, con consignas distintas.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-1-recu',
    titulo: 'Recuperatorio de Evaluación Final · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia del recuperatorio (la Evaluación Final usa "Python1"). */
window.CONFIG.CLAVE_ACCESO = 'recu1';

/* Parte C: 2 actividades de 1,5 puntos cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1.5;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · input, int, f-string y if / elif / else. */
    c1: [
        { d: 'Pide un dato con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'Convierte el dato con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Usa un f-string para mostrar el mensaje', f: function (c) { return /\bf\s*["']/.test(c); } },
        { d: 'Usa if / elif / else', f: function (c) {
            return /\bif\b[\s\S]*?\belif\b[\s\S]*?\belse\b/.test(c);
        } },
        { d: 'Compara la temperatura con 10 y con 25', f: function (c) {
            return /\btemp\s*<\s*10\b/.test(c) &&
                (/\btemp\s*<=\s*25\b/.test(c) || /\btemp\s*>\s*25\b/.test(c));
        } },
        { d: 'Muestra "frío", "templado" y "calor"', f: function (c) {
            return /fr[ií]o/.test(c) && /templado/.test(c) && /calor/.test(c);
        } },
        { d: 'Muestra el resultado con print()', f: function (c) { return /\bprint\s*\(/.test(c); } }
    ],

    /* Actividad 2 · while, contador y acumulador. */
    c2: [
        { d: 'Pide un dato con input()', f: function (c) { return /\binput\s*\(/.test(c); } },
        { d: 'Convierte el dato con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
        { d: 'Inicializa el acumulador suma en 0', f: function (c) { return /\bsuma\s*=\s*0\b/.test(c); } },
        { d: 'Inicializa el contador i en 1', f: function (c) { return /\bi\s*=\s*1\b/.test(c); } },
        { d: 'Usa un bucle while', f: function (c) { return /\bwhile\b/.test(c); } },
        { d: 'Recorre mientras i <= n', f: function (c) {
            return /\bwhile\s*\(?\s*i\s*<=\s*n\s*\)?\s*:/.test(c);
        } },
        { d: 'Detecta los números pares con i % 2 == 0', f: function (c) {
            return /\bi\s*%\s*2\s*==\s*0\b/.test(c) || /\bi\s*%\s*2\s*!=\s*1\b/.test(c);
        } },
        { d: 'Acumula con suma += i o suma = suma + i', f: function (c) {
            return /\bsuma\s*\+=\s*i\b/.test(c) || /\bsuma\s*=\s*suma\s*\+\s*i\b/.test(c);
        } },
        { d: 'Avanza el contador con i += 1 o i = i + 1', f: function (c) {
            return /\bi\s*\+=\s*1\b/.test(c) || /\bi\s*=\s*i\s*\+\s*1\b/.test(c);
        } },
        { d: 'Muestra el total con print()', f: function (c) {
            return /\bprint\s*\([^)]*\bsuma\b/.test(c) ||
                /\bf\s*["'][^"']*\{\s*suma\s*\}/.test(c);
        } }
    ]
};
