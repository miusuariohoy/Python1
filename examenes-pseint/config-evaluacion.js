/* ============================================================
   EVALUACIÓN · PSEINT · PROGRAMACIÓN ESTRUCTURADA
   ------------------------------------------------------------
   Se carga después de ../config.js y antes de ../app.js.
   Define el examen, la clave, el valor de cada actividad de la
   Parte C y los requisitos que se revisan en cada una.
   ============================================================ */

window.CONFIG = window.CONFIG || {};

window.CONFIG.EXAMEN = {
    id: 'pseint-eval-2026',
    titulo: 'Evaluación · PSeInt · Programación Estructurada',
    materia: 'Programación'
};

/* Clave de acceso de la evaluación. */
window.CONFIG.CLAVE_ACCESO = 'pseint';

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

    /* Busca un Si con la condición indicada y un incremento +1 dentro del bloque. */
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
            { d: 'Declara nombre como Caracter', f: function (c) { return declaracionTexto(c, 'nombre'); } },
            { d: 'Declara edad como Entero', f: function (c) { return declaracion(c, 'edad', 'entero'); } },
            { d: 'Lee el nombre y la edad', f: function (c) { return leeDos(c, 'nombre', 'edad'); } },
            { d: 'Usa Si ... Entonces ... Sino ... FinSi', f: function (c) { return usaSiCompleto(c); } },
            { d: 'Compara la edad con 18', f: function (c) {
                return /edad\s*>=\s*18/.test(c) || /edad\s*>\s*17/.test(c) || /18\s*<=\s*edad/.test(c);
            } },
            { d: 'Muestra el nombre y los mensajes "mayor" y "menor"', f: function (c) {
                var nombreEnSalida = /escribir[^\n]*nombre[^\n]*(mayor|menor)/.test(c) ||
                                     /escribir[^\n]*(mayor|menor)[^\n]*nombre/.test(c);
                return nombreEnSalida && /mayor/.test(c) && /menor/.test(c);
            } }
        ],

        /* Actividad 2 · Mientras + condicional + contador. */
        c2: [
            { d: 'Empieza con Algoritmo y cierra con FinAlgoritmo', f: function (c) { return cierraAlgoritmo(c); } },
            { d: 'Declara edad como Entero', f: function (c) { return declaracion(c, 'edad', 'entero'); } },
            { d: 'Declara un contador entero (mayores, contador, total o cantidad)', f: function (c) {
                return /definir\s+[^;\n]*\b(contador|mayores|total|cantidad)\b[^;\n]*como\s+entero/.test(c);
            } },
            { d: 'Inicializa el contador en 0', f: function (c) {
                return /\b(contador|mayores|total|cantidad)\s*<-\s*0/.test(c);
            } },
            { d: 'Lee una edad antes del Mientras', f: function (c) {
                return /\bleer\s+edad\b[\s\S]*?\bmientras\b/.test(c);
            } },
            { d: 'Repite con Mientras edad <> 0', f: function (c) {
                return /mientras\s*\(?\s*edad\s*(<>|!=)\s*0\s*\)?/.test(c) ||
                       /mientras\s*\(?\s*edad\s*>\s*0\s*\)?/.test(c) ||
                       /mientras\s*\(?\s*edad\s*>=\s*1\s*\)?/.test(c);
            } },
            { d: 'Cuenta solo las edades de 18 o más', f: function (c) {
                return incrementaDentroDeSi(c, '\\(?\\s*edad\\s*>=\\s*18\\s*\\)?');
            } },
            { d: 'Vuelve a leer dentro del bucle y muestra el contador', f: function (c) {
                return /mientras[\s\S]*?\bleer\s+edad\b[\s\S]*?\bfinmientras\b/.test(c) &&
                       /escribir\s+[^;\n]*(contador|mayores|total|cantidad)/.test(c);
            } }
        ],

        /* Actividad 3 · Subproceso + Para + acumulador. */
        c3: [
            { d: 'Declara SubProceso SumarHasta(limite)', f: function (c) {
                return /subproceso\s+sumarhasta\s*\(\s*\w+\s*\)/.test(c);
            } },
            { d: 'Cierra el subproceso con FinSubProceso', f: function (c) { return /finsubproceso/.test(c); } },
            { d: 'Declara i y suma como Entero', f: function (c) { return declaraDosEnteros(c, 'i', 'suma'); } },
            { d: 'Inicializa el acumulador suma en 0', f: function (c) { return /suma\s*<-\s*0/.test(c); } },
            { d: 'Recorre del 1 al limite con Para', f: function (c) {
                return /para\s+i\s*<-\s*1\s+hasta\s+limite/.test(c);
            } },
            { d: 'Acumula suma <- suma + i', f: function (c) {
                return /suma\s*<-\s*suma\s*\+\s*i/.test(c);
            } },
            { d: 'Muestra el total con Escribir', f: function (c) {
                return /escribir\s+[^;\n]*suma/.test(c);
            } },
            { d: 'Cierra el Para con FinPara', f: function (c) { return /finpara/.test(c); } },
            { d: 'Llama a SumarHasta(5) desde el algoritmo principal', f: function (c) {
                return /sumarhasta\s*\(\s*5\s*\)/.test(c) && cierraAlgoritmo(c);
            } }
        ]
    };
})();
