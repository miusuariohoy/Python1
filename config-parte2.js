/* ============================================================
   CONFIGURACIÓN DE LA EVALUACIÓN · PARTE 2
   ------------------------------------------------------------
   Se carga después de config.js y antes de app.js.
   Define el examen, el valor de cada actividad de la Parte C
   y los requisitos que se revisan en cada una.
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2',
    titulo: 'Parte 2 · Estructuras, Multimedia y Base de Datos',
    materia: 'Programación'
};

/* Clave de acceso propia de la Parte 2 (la Parte 1 usa "pro1"). */
window.CONFIG.CLAVE_ACCESO = 'pro2';

/* Parte C: 3 actividades cortas de 1 punto cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1;

window.CONFIG.EJERCICIOS = {
    /* Actividad 1 · Tkinter: crear un Label y configurarlo. */
    c1: [
        { d: 'Crea la ventana con Tk()', f: function (c) { return /tk\s*\(\s*\)/.test(c); } },
        { d: 'Crea un Label', f: function (c) { return /label\s*\(/.test(c); } },
        { d: 'El label dice "Hola"', f: function (c) { return /["']hola["']/.test(c); } },
        { d: 'Usa config(bg=...) para el color de fondo', f: function (c) { return /\.config\s*\([^)]*bg\s*=/.test(c); } },
        { d: 'Usa config(font=...) para la fuente', f: function (c) { return /\.config\s*\([^)]*font\s*=/.test(c); } },
        { d: 'Muestra el label con pack()', f: function (c) { return /\.pack\s*\(/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /mainloop\s*\(\s*\)/.test(c); } }
    ],

    /* Actividad 2 · Tkinter: función def que cambia el label. */
    c2: [
        { d: 'Define la función def cambiar():', f: function (c) { return /def\s+cambiar\s*\(\s*\)\s*:/.test(c); } },
        { d: 'Cambia el texto con .config(text=...)', f: function (c) { return /\.config\s*\([^)]*text\s*=/.test(c); } },
        { d: 'El texto nuevo dice "Apretaste"', f: function (c) { return /apretaste/.test(c); } },
        { d: 'Crea un Button', f: function (c) { return /button\s*\(/.test(c); } },
        { d: 'Conecta el botón con command=cambiar (sin paréntesis)', f: function (c) { return /command\s*=\s*(?:cambiar\s*(?!\s*\()|lambda\s*:\s*cambiar\s*\(\s*\))/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /mainloop\s*\(\s*\)/.test(c); } }
    ],

    /* Actividad 3 · Teórico de base de datos: unir cada acción con su método.
       El orden de los requisitos acompaña el orden desordenado de la consigna. */
    c3: [
        { d: 'Ejecutar la consulta SQL: execute', f: function (c) { return /ejecutar la consulta[^\n]*:\s*(?:cursor\.)?execute/.test(c); } },
        { d: 'Cerrar la conexión: close', f: function (c) { return /cerrar la conexi[oó]n\s*:\s*(?:cnx\.)?close/.test(c); } },
        { d: 'Abrir la conexión: connect', f: function (c) { return /abrir la conexi[oó]n\s*:\s*(?:mysql\.connector\.)?connect/.test(c); } },
        { d: 'Confirmar y guardar los cambios: commit', f: function (c) { return /(confirmar|guardar)[^\n]*:\s*(?:cnx\.)?commit/.test(c); } },
        { d: 'Crear el cursor: cursor', f: function (c) { return /crear el cursor\s*:\s*(?:cnx\.)?cursor/.test(c); } }
    ]
};
