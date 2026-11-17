# Claves de acceso · Python1

Claves vigentes de todas las evaluaciones publicadas en
`https://miusuariohoy.github.io/Python1/`. La tabla completa (incluidas las
copias entregadas en el repo `inform`) está al principio de `inform/README.md`.

| N.º | Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- | --- |
| 1 | Primera evaluación (temas 1 a 4) | `primera-evaluacion.html` | `config-primera.js` | `Primera1` | `python-1-primera` |
| 2 | Segunda evaluación (temas 2, 5, 6 y 7) | `segunda-evaluacion.html` | `config-segunda.js` | `Segunda1` | `python-1-segunda` |
| 3 | Tercera evaluación (temas 8 a 12) | `tercera-evaluacion.html` | `config-tercera.js` | `Tercera1` | `python-1-tercera` |
| 4 | Cuarta evaluación (temas 13, 14 y 15) | `cuarta-evaluacion.html` | `config-cuarta.js` | `Cuarta1` | `python-2-cuarta` |
| 5 | Quinta evaluación (temas 16, 17 y 18) | `quinta-evaluacion.html` | `config-quinta.js` | `Quinta1` | `python-2-quinta` |
| 6 | Sexta evaluación (tema 19) | `sexta-evaluacion.html` | `config-sexta.js` | `Sexta1` | `python-2-sexta` |
| 7 | Evaluación Final (Parte 1) | `evaluacion.html` | `config.js` | `Python1` | `python-1` |
| 8 | Recuperatorio de Evaluación Final | `recuperatorio.html` | `config-recuperatorio1.js` | `recu1` | `python-1-recu` |

## Evaluaciones de otras materias

| Evaluación | Página | Configuración | Clave | `id` del examen |
| --- | --- | --- | --- | --- |
| Evaluación Parte 2 | `evaluacion-parte2.html` | `config-parte2.js` | `pro2` | `python-2` |
| PSeInt | repo [`pseint`](https://github.com/miusuariohoy/pseint) | — | `pseint` | — |

## Estructura de las evaluaciones nuevas

Primera, Segunda, Tercera, Cuarta, Quinta y Sexta tienen la misma estructura y
suman **10 puntos**:

| Parte | Consigna | Puntos |
| --- | --- | --- |
| A | 5 preguntas de opción múltiple | 5 |
| B | 4 predicciones de salida (0,5 cada una) | 2 |
| C | 2 ejercicios de código (1,5 cada uno) | 3 |

La Evaluación Final y su recuperatorio también suman 10 puntos con la misma
distribución. La evaluación de la Parte 2 quedó intacta.

## Dónde se cambia cada clave

- **Primera evaluación:** `config-primera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Segunda evaluación:** `config-segunda.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Tercera evaluación:** `config-tercera.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Cuarta evaluación:** `config-cuarta.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Quinta evaluación:** `config-quinta.js` → `window.CONFIG.CLAVE_ACCESO`.
- **Sexta evaluación:** `config-sexta.js` → `window.CONFIG.CLAVE_ACCESO`.
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
