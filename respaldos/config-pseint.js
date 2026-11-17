/* ============================================================
   CONFIGURACIÓN DE LA EVALUACIÓN · PSEINT
   ------------------------------------------------------------
   Se carga después de config.js y antes de app.js.
   Define el examen, el valor de cada actividad de la Parte C
   y los requisitos que se revisan en cada una.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'pseint-1',
    titulo: 'PSeInt · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso propia de la evaluación de PSeInt. */
window.CONFIG.CLAVE_ACCESO = 'pseint';

/* Parte C: 3 actividades cortas de 1 punto cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · Variables + Leer + Escribir. */
    c1: [
        { d: 'Empieza con Algoritmo y cierra con FinAlgoritmo', f: function (c) { return /algoritmo/.test(c) && /finalgoritmo/.test(c); } },
        { d: 'Declara nombre como Caracter', f: function (c) { return /definir\s+nombre\s+como\s+caracter/.test(c); } },
        { d: 'Pide el dato con Leer', f: function (c) { return /\bleer\s+\w+/.test(c); } },
        { d: 'Muestra el resultado con Escribir', f: function (c) { return /\bescribir\b/.test(c); } },
        { d: 'El saludo incluye la palabra "Hola"', f: function (c) { return /hola/.test(c); } }
    ],

    /* Actividad 2 · Condicional Si / Sino. */
    c2: [
        { d: 'Usa Si ... Entonces', f: function (c) { return /\bsi\b[\s\S]*\bentonces\b/.test(c); } },
        { d: 'Cierra la estructura con FinSi', f: function (c) { return /\bfinsi\b/.test(c); } },
        { d: 'Incluye la rama Sino', f: function (c) { return /\bsino\b/.test(c); } },
        { d: 'Compara la edad con 18', f: function (c) { return />=\s*18|>\s*17|18\s*<=/.test(c); } },
        { d: 'Muestra "Mayor de edad" y "Menor de edad"', f: function (c) { return /mayor de edad/.test(c) && /menor de edad/.test(c); } }
    ],

    /* Actividad 3 · Subproceso con parámetro y llamada. */
    c3: [
        { d: 'Declara SubProceso Saludar(nombre)', f: function (c) { return /subproceso\s+saludar\s*\(\s*\w+\s*\)/.test(c); } },
        { d: 'Cierra el subproceso con FinSubProceso', f: function (c) { return /finsubproceso/.test(c); } },
        { d: 'El subproceso muestra el saludo con "Hola"', f: function (c) { return /hola/.test(c); } },
        { d: 'Llama al subproceso pasando "Ana"', f: function (c) { return /saludar\s*\(\s*["']?ana["']?\s*\)/.test(c); } },
        { d: 'Tiene un Algoritmo principal con FinAlgoritmo', f: function (c) { return /algoritmo\s+\w+/.test(c) && /finalgoritmo/.test(c); } }
    ]
};
