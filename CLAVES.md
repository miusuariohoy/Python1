# Claves de acceso · Python1

Claves vigentes de las evaluaciones publicadas en
`https://miusuariohoy.github.io/Python1/`.

| N.º | Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- | --- |
| 1 | Primera evaluación (temas 1 a 4) | `primera-evaluacion.html` | `config-primera.js` | `Primera1` | `python-1-primera` |
| 2 | Segunda evaluación (temas 2, 5, 6 y 7) | `segunda-evaluacion.html` | `config-segunda.js` | `Segunda1` | `python-1-segunda` |
| 3 | Tercera evaluación (temas 8 a 12) | `tercera-evaluacion.html` | `config-tercera.js` | `Tercera1` | `python-1-tercera` |
| 4 | Evaluación original Parte 1 | `evaluacion.html` | `config.js` | `Python1` | `python-1` |
| 5 | Recuperatorio Parte 1 | `recuperatorio.html` | `config-recuperatorio1.js` | `recu1` | `python-1-recu` |

## Evaluaciones de otras materias

| Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- |
| Parte 2 | `evaluacion-parte2.html` | `config-parte2.js` | `pro2` | `python-2` |
| PSeInt | repo [`pseint`](https://github.com/miusuariohoy/pseint) | — | `pseint` | — |

## Estructura de las tres evaluaciones nuevas

Las tres tienen la misma estructura y suman **10 puntos**:

| Parte | Consigna | Puntos |
| --- | --- | --- |
| A | 5 preguntas de opción múltiple | 5 |
| B | 4 predicciones de salida (0,5 cada una) | 2 |
| C | 2 ejercicios de código (1,5 cada uno) | 3 |

## Dónde se cambia cada clave

- **Primera evaluación:** `config-primera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Segunda evaluación:** `config-segunda.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Tercera evaluación:** `config-tercera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Evaluación original Parte 1:** `config.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Recuperatorio Parte 1:** `config-recuperatorio1.js` → `window.CONFIG.CLAVE_ACCESO`.

## Importante

- La clave es un **filtro blando**: GitHub Pages no tiene login de servidor y el
  archivo `config-*.js` es público. Sirve para ordenar el acceso, no como
  seguridad real.
- Las respuestas correctas también están en el HTML. Para una corrección
  realmente segura habría que moverla a un servidor (Apps Script o Supabase).
- Cada evaluación guarda un resultado separado en el informe porque usa un `id`
  distinto.
- Hay una copia de todas las evaluaciones y sus configuraciones en la carpeta
  `respaldos/`.
