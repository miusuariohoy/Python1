# Claves de acceso · Python1

Claves vigentes de todas las evaluaciones publicadas en
`https://miusuariohoy.github.io/Python1/`. La tabla completa (incluidas las
copias entregadas en el repo `inform`) está al principio de `inform/README.md`.

| N.º | Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- | --- |
| 1 | Primera evaluación (temas 1 a 4) | `primera-evaluacion.html` | `config-primera.js` | `Primera1` | `python-1-primera` |
| 2 | Segunda evaluación (temas 2, 5, 6 y 7) | `segunda-evaluacion.html` | `config-segunda.js` | `Segunda1` | `python-1-segunda` |
| 3 | Tercera evaluación (temas 8 a 12) | `tercera-evaluacion.html` | `config-tercera.js` | `Tercera1` | `python-1-tercera` |
| 4 | Primera evaluación · Parte 2 (temas 13, 14 y 15) | `primera2-evaluacion.html` | `config-primera2.js` | `Primera2` | `python-2-primera` |
| 5 | Segunda evaluación · Parte 2 (temas 16, 17 y 18) | `segunda2-evaluacion.html` | `config-segunda2.js` | `Segunda2` | `python-2-segunda` |
| 6 | Tercera evaluación · Parte 2 (tema 19) | `tercera2-evaluacion.html` | `config-tercera2.js` | `Tercera2` | `python-2-tercera` |
| 7 | Evaluación Final (Parte 1) | `evaluacion.html` | `config.js` | `Python1` | `python-1` |
| 8 | Recuperatorio de Evaluación Final | `recuperatorio.html` | `config-recuperatorio1.js` | `recu1` | `python-1-recu` |

## Evaluaciones de otras materias

| Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- |
| Evaluación Parte 2 | `evaluacion-parte2.html` | `config-parte2.js` | `pro2` | `python-2` |
| PSeInt | repo [`pseint`](https://github.com/miusuariohoy/pseint) | — | `pseint` | — |

## Estructura de las evaluaciones

Todas mantienen **11 consignas y 10 puntos**:

| Parte | Consigna | Puntos |
| --- | --- | --- |
| A | 5 preguntas de opción múltiple | 5 |
| B | 4 predicciones de salida (0,5 cada una) | 2 |
| C | 2 ejercicios de código cortos y sencillos (1,5 cada uno) | 3 |

Los dos programas de la Parte C son de 2 a 6 líneas y se corrigen por estructura,
no por ejecución. La evaluación original de la Parte 2 quedó intacta.

## Dónde se cambia cada clave

- **Primera evaluación:** `config-primera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Segunda evaluación:** `config-segunda.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Tercera evaluación:** `config-tercera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Primera evaluación · Parte 2:** `config-primera2.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Segunda evaluación · Parte 2:** `config-segunda2.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Tercera evaluación · Parte 2:** `config-tercera2.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Evaluación Final:** `config.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Recuperatorio de Evaluación Final:** `config-recuperatorio1.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Evaluación Parte 2:** `config-parte2.js` → `window.CONFIG.CLAVE_ACCESO`.

## Importante

- La clave es un **filtro blando**: GitHub Pages no tiene login de servidor y el
  archivo `config-*.js` es público. Sirve para ordenar el acceso, no como
  seguridad real.
- Las respuestas correctas también están en el HTML. Para una corrección
  realmente segura habría que moverla a un servidor (Apps Script o Supabase).
- Cada evaluación guarda un resultado separado en el informe porque usa un `id`
  distinto.
- Hay una copia de todas las evaluaciones y sus configuraciones en `respaldos/`
  y en `inform/evaluaciones/`.
