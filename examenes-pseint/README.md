# Exámenes de PSeInt · Evaluación y recuperatorio

Dos instancias distintas con el **mismo temario** y la **misma estructura**:

- **Evaluación** · 12 consignas · 10 puntos · clave `pseint`
- **Recuperatorio** · 12 consignas · 10 puntos · clave `pseint-recu`

Cada una tiene 5 preguntas de opción múltiple, 4 predicciones de salida y 3 actividades de pseudocódigo. La corrección es automática, muestra explicaciones y guarda el resultado en el informe del docente.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Portal con enlaces a las dos instancias. La clave docente no está enlazada. |
| `evaluacion.html` | Evaluación completa. |
| `recuperatorio.html` | Recuperatorio completo. |
| `config-evaluacion.js` | Identificador, clave y requisitos de la Parte C de la evaluación. |
| `config-recuperatorio.js` | Identificador, clave y requisitos de la Parte C del recuperatorio. |
| `clave-docente.html` | Respuestas, soluciones, rúbrica y errores frecuentes. |
| `examenes.css` | Estilos propios del portal y de las páginas nuevas. |

Las páginas reutilizan:

- `../styles.css` para la estética general.
- `../config.js` para el canal de envío de resultados (`ntfy`).
- `../app.js` para el acceso, la corrección, el envío y el comprobante.

## Publicación

La carpeta está pensada para publicarse dentro del sitio de `Python1`:

```text
https://miusuariohoy.github.io/Python1/examenes-pseint/
```

Desde el portal se llega a las dos instancias. Si preferís publicarla como sitio independiente, subí la carpeta completa y mantené la referencia a `../styles.css`, `../config.js` y `../app.js`; o copiá esos tres archivos dentro de la carpeta y ajustá las rutas.

El material docente queda en `clave-docente.html`, pero **no está enlazado desde el portal**. El docente lo abre con la URL directa:

```text
https://miusuariohoy.github.io/Python1/examenes-pseint/clave-docente.html
```

Ese archivo contiene las respuestas y las soluciones. Si el sitio es público, no lo enlaces ni lo difundas antes de rendir.

## Cambiar las claves

Editá estas líneas:

```js
// config-evaluacion.js
window.CONFIG.CLAVE_ACCESO = 'pseint';

// config-recuperatorio.js
window.CONFIG.CLAVE_ACCESO = 'pseint-recu';
```

La clave es una barrera blanda: se valida en el navegador. No uses contraseñas reales ni datos sensibles.

## Cambiar preguntas y actividades

- **Parte A:** cada `<article class="pregunta mc" data-correcta="a">` tiene la opción correcta en `data-correcta` (`a`, `b`, `c` o `d`). Las opciones se marcan con `data-op`.
- **Parte B:** cada `<article class="pregunta salida" data-aceptadas="...">` acepta una o varias respuestas separadas por `|`. El corrector normaliza mayúsculas, acentos, comas y espacios.
- **Parte C:** cada actividad tiene un `textarea` con `id` (`c1`, `c2`, `c3`) y un contenedor `res-c1`, etc. Los requisitos se definen en `window.CONFIG.EJERCICIOS` dentro del `config-*.js`.

Cada requisito es un objeto:

```js
{ d: 'Texto que ve el alumno', f: function (codigo) { return /patron/.test(codigo); } }
```

El código se recibe en minúsculas. La nota de la actividad es proporcional a la cantidad de requisitos cumplidos.

## Importante sobre la corrección

El corrector revisa la **estructura** del pseudocódigo con expresiones regulares. **No ejecuta** el programa. Por eso:

- Se controlan declaraciones, estructuras, contadores, acumuladores y llamadas.
- Una solución alternativa válida puede no coincidir exactamente con los patrones; en ese caso, el docente puede revisar el código manualmente.
- Las soluciones de referencia se muestran después de corregir, no antes.

## Resultados

Las páginas cargan `../config.js`, que ya tiene configurado el envío cifrado a `ntfy` y el canal del informe. Cada envío incluye `examen: 'pseint-eval-2026'` o `'pseint-recu-2026'`, así que el informe del docente puede separar ambas instancias.

Si no querés enviar resultados, cambiá en `../config.js`:

```js
MODO_ENVIO: 'ninguno'
```

En ese caso, el alumno puede descargar el comprobante en JSON desde la pantalla de resultado.

## Reiniciar una prueba

Para probar varias veces en la misma computadora:

1. En la pantalla de resultado, usá **Hacer otra evaluación**.
2. O borrá la clave de `localStorage` desde la consola del navegador:

```js
localStorage.removeItem('eval_pseint-eval-2026_enviada_v1');
localStorage.removeItem('eval_pseint-recu-2026_enviada_v1');
```

También podés borrar `sessionStorage` para volver a pedir la clave:

```js
sessionStorage.clear();
```

## Verificación rápida

- Abrir `index.html` y comprobar los enlaces.
- Entrar a cada examen con su clave.
- Responder todo mal y corregir: debe dar 0/10 y mostrar las explicaciones.
- Responder todo bien y corregir: debe dar 10/10.
- En la Parte C, probar una solución de referencia y confirmar que la lista de requisitos queda toda en verde.
- Revisar la consola del navegador: no debe haber errores de JavaScript.

## Temario común

1. Algoritmos y programación estructurada.
2. Variables y tipos de datos.
3. Leer / Escribir.
4. Condicionales.
5. Mientras.
6. Para.
7. Contador.
8. Acumulador.
9. Subprocesos.
