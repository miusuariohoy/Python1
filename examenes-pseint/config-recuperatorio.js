/* ============================================================
   RECUPERATORIO · PSEINT · PROGRAMACIÓN ESTRUCTURADA
   ------------------------------------------------------------
   Se carga después de ../config.js y antes de ../app.js.
   Mismos temas que la evaluación, distintas consignas.
   ============================================================ */

window.CONFIG = window.CONFIG || {};

window.CONFIG.EXAMEN = {
    id: 'pseint-recu-2026',
    titulo: 'Recuperatorio · PSeInt · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso del recuperatorio. */
window.CONFIG.CLAVE_ACCESO = 'pseint-recu';

/* Parte C: 3 actividades de 1 punto cada una (total 3). */
window.CONFIG.PUNTOS_EJERCICIO = 1;

(function () {
    'use strict';

    /* ---------- Helpers de revisión estructural ---------- */

    function declaracion(codigo, nombre, tipo) {
        return new RegExp('definir\\s+[^;\\n]*\\b' + nombre + '\\b[^;\\n]*como\\s+' + tipo).test(codigo);
    }

    function declaracionTexto(codigo, nombre) {
        return new RegExp('definir\\s+[^;\\n]*\\b' + nombre + '\\b[^;\\n]*como\\s+(caracter|cadena)').test(codigo);
    }

    function leeDos(codigo, a, b) {
        var lineas = codigo.match(/\bleer\b[^;\n]*/g) || [];
        var leeA = false;
        var leeB = false;
        lineas.forEach(function (linea) {
            if (new RegExp('\\b' + a + '\\b').test(linea)) leeA = true;
            if (new RegExp('\\b' + b + '\\b').test(linea)) leeB = true;
        });
        return leeA && leeB;
    }

    function usaSiCompleto(codigo) {
        return /\bsi\s+[^\n]*\bentonces\b/.test(codigo) &&
               /\bsino\b/.test(codigo) &&
               /\bfinsi\b/.test(codigo);
    }

    function cierraAlgoritmo(codigo) {
        return /algoritmo\s+\w+/.test(codigo) && /finalgoritmo/.test(codigo);
    }

    function declaraDosEnteros(codigo, a, b) {
        return new RegExp('definir\\s+[^;\\n]*\\b' + a + '\\b[^;\\n]*como\\s+entero').test(codigo) &&
               new RegExp('definir\\s+[^;\\n]*\\b' + b + '\\b[^;\\n]*como\\s+entero').test(codigo);
    }

    function incrementaDentroDeSi(codigo, condicion) {
        var re = new RegExp(
            'si\\s+' + condicion +
            '[\\s\\S]*?\\b([a-z_][a-z0-9_]*)\\s*<-\\s*\\1\\s*\\+\\s*1' +
            '[\\s\\S]*?finsi'
        );
        return re.test(codigo);
    }

    /* ---------- Requisitos de la Parte C ---------- */

    window.CONFIG.EJERCICIOS = {

        /* Actividad 1 · Variables + Leer + condicional. */
        c1: [
            { d: 'Empieza con Algoritmo y cierra con FinAlgoritmo', f: function (c) { return cierraAlgoritmo(c); } },
            { d: 'Declara producto como Caracter', f: function (c) { return declaracionTexto(c, 'producto'); } },
            { d: 'Declara precio como Real', f: function (c) { return declaracion(c, 'precio', 'real'); } },
            { d: 'Lee el producto y el precio', f: function (c) { return leeDos(c, 'producto', 'precio'); } },
            { d: 'Usa Si ... Entonces ... Sino ... FinSi', f: function (c) { return usaSiCompleto(c); } },
            { d: 'Compara el precio con 1000', f: function (c) {
                return /precio\s*>\s*1000/.test(c) || /1000\s*<\s*precio/.test(c);
            } },
            { d: 'Muestra el producto y los mensajes "precio alto" y "precio accesible"', f: function (c) {
                var nombreEnSalida = /escribir[^\n]*producto[^\n]*(precio alto|precio accesible)/.test(c) ||
                                     /escribir[^\n]*(precio alto|precio accesible)[^\n]*producto/.test(c);
                return nombreEnSalida && /precio alto/.test(c) && /precio accesible/.test(c);
            } }
        ],

        /* Actividad 2 · Mientras + condicional + contador. */
        c2: [
            { d: 'Empieza con Algoritmo y cierra con FinAlgoritmo', f: function (c) { return cierraAlgoritmo(c); } },
            { d: 'Declara nota como Real', f: function (c) { return declaracion(c, 'nota', 'real'); } },
            { d: 'Declara un contador entero (aprobadas, contador, total o cantidad)', f: function (c) {
                return /definir\s+[^;\n]*\b(aprobadas|contador|total|cantidad)\b[^;\n]*como\s+entero/.test(c);
            } },
            { d: 'Inicializa el contador en 0', f: function (c) {
                return /\b(aprobadas|contador|total|cantidad)\s*<-\s*0/.test(c);
            } },
            { d: 'Lee una nota antes del Mientras', f: function (c) {
                return /\bleer\s+nota\b[\s\S]*?\bmientras\b/.test(c);
            } },
            { d: 'Repite con Mientras nota <> -1', f: function (c) {
                return /mientras\s*\(?\s*nota\s*(<>|!=)\s*-1\s*\)?/.test(c) ||
                       /mientras\s*\(?\s*nota\s*>=\s*0\s*\)?/.test(c);
            } },
            { d: 'Cuenta solo las notas de 6 o más', f: function (c) {
                return incrementaDentroDeSi(c, '\\(?\\s*nota\\s*>=\\s*6\\s*\\)?');
            } },
            { d: 'Vuelve a leer dentro del bucle y muestra el contador', f: function (c) {
                return /mientras[\s\S]*?\bleer\s+nota\b[\s\S]*?\bfinmientras\b/.test(c) &&
                       /escribir\s+[^;\n]*(aprobadas|contador|total|cantidad)/.test(c);
            } }
        ],

        /* Actividad 3 · Subproceso + Mientras + acumulador. */
        c3: [
            { d: 'Declara SubProceso SumarPares(limite)', f: function (c) {
                return /subproceso\s+sumarpares\s*\(\s*\w+\s*\)/.test(c);
            } },
            { d: 'Cierra el subproceso con FinSubProceso', f: function (c) { return /finsubproceso/.test(c); } },
            { d: 'Declara i y suma como Entero', f: function (c) { return declaraDosEnteros(c, 'i', 'suma'); } },
            { d: 'Inicializa suma en 0 e i en 2', f: function (c) {
                return /suma\s*<-\s*0/.test(c) && /\bi\s*<-\s*2/.test(c);
            } },
            { d: 'Repite con Mientras i <= limite', f: function (c) {
                return /mientras\s*\(?\s*i\s*<=\s*limite\s*\)?/.test(c);
            } },
            { d: 'Acumula suma <- suma + i', f: function (c) {
                return /suma\s*<-\s*suma\s*\+\s*i/.test(c);
            } },
            { d: 'Avanza de 2 en 2 con i <- i + 2', f: function (c) {
                return /\bi\s*<-\s*i\s*\+\s*2/.test(c);
            } },
            { d: 'Muestra el total con Escribir', f: function (c) {
                return /escribir\s+[^;\n]*suma/.test(c);
            } },
            { d: 'Cierra el Mientras con FinMientras', f: function (c) { return /finmientras/.test(c); } },
            { d: 'Llama a SumarPares(10) desde el algoritmo principal', f: function (c) {
                return /sumarpares\s*\(\s*10\s*\)/.test(c) && cierraAlgoritmo(c);
            } }
        ]
    };
})();
