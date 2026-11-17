# Python1 · Guía + Evaluaciones interactivas

Sitio de GitHub Pages con la guía de **Programación Estructurada**: Parte 1
(12 temas) y Parte 2 (temas **13 a 21**). Incluye las evaluaciones protegidas
por clave de la Parte 1 (Primera, Segunda, Tercera, **Evaluación Final** y su
**Recuperatorio**), las tres de la Parte 2 (**Primera2, Segunda2 y Tercera2**) y
la evaluación original de la Parte 2, que se dejó sin cambios. Los exámenes de
PSeInt viven en el repositorio [`pseint`](https://github.com/miusuariohoy/pseint).
Al corregir, el resultado se guarda en el repositorio privado
[`inform`](https://github.com/miusuariohoy/inform), donde también se entregan
todas las evaluaciones y la tabla de claves al principio de su README.

Todas las evaluaciones mantienen **11 consignas y 10 puntos** (5 de opción
múltiple, 4 de salida y 2 de código), pero los dos ejercicios de código son
**cortos y sencillos**: programas de 2 a 6 líneas con requisitos claros.

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `index.html` | Guía de la Parte 1: 12 temas, autoevaluación y simuladores. |
| `parte2.html` | Parte 2 de la guía: temas 13 a 21 (listas, tuplas, diccionarios, Text, lambda, state, MySQL, Canvas y pygame). |
| `primera-evaluacion.html` | **Primera evaluación** de la Parte 1 (temas 1 a 4). |
| `segunda-evaluacion.html` | **Segunda evaluación** de la Parte 1 (temas 2, 5, 6 y 7). Conserva su ejercicio de tabla de multiplicar. |
| `tercera-evaluacion.html` | **Tercera evaluación** de la Parte 1 (temas 8 a 12). |
| `primera2-evaluacion.html` | **Primera evaluación · Parte 2** (temas 13, 14 y 15). |
| `segunda2-evaluacion.html` | **Segunda evaluación · Parte 2** (temas 16, 17 y 18). |
| `tercera2-evaluacion.html` | **Tercera evaluación · Parte 2** (tema 19). |
| `evaluacion.html` | **Evaluación Final** de la Parte 1 (11 consignas). |
| `recuperatorio.html` | **Recuperatorio de Evaluación Final** (11 consignas, mismos temas). |
| `evaluacion-parte2.html` | Evaluación original de la **Parte 2** (12 consignas). Sin cambios. |
| `evaluacion-pseint.html` | Evaluación de PSeInt (copia local; se publica en el repo `pseint`). |
| `styles.css` | Estilos de las evaluaciones. |
| `app.js` | Acceso, corrección, envío y reinicio para el siguiente alumno. |
| `config.js` | Configuración general, clave de la Evaluación Final y requisitos simples de su Parte C. |
| `config-primera.js` | Examen y requisitos de código de la Primera evaluación. |
| `config-segunda.js` | Examen y requisitos de código de la Segunda evaluación. |
| `config-tercera.js` | Examen y requisitos de código de la Tercera evaluación. |
| `config-primera2.js` | Examen y requisitos de código de la Primera evaluación · Parte 2. |
| `config-segunda2.js` | Examen y requisitos de código de la Segunda evaluación · Parte 2. |
| `config-tercera2.js` | Examen y requisitos de código de la Tercera evaluación · Parte 2. |
| `config-recuperatorio1.js` | Examen y requisitos del Recuperatorio de Evaluación Final. |
| `config-parte2.js` | Examen y requisitos de código de la Parte 2. Sin cambios. |
| `CLAVES.md` | Claves de acceso vigentes de cada evaluación. |
| `respaldos/` | Copia de todas las evaluaciones y sus configuraciones. |

Cada guía abre solo sus evaluaciones desde su barra de menú.

**Menú de la Parte 1** (`index.html`):

- Primera evaluación → `https://miusuariohoy.github.io/Python1/primera-evaluacion.html`
- Segunda evaluación → `https://miusuariohoy.github.io/Python1/segunda-evaluacion.html`
- Tercera evaluación → `https://miusuariohoy.github.io/Python1/tercera-evaluacion.html`
- Evaluación Final → `https://miusuariohoy.github.io/Python1/evaluacion.html`
- Recuperatorio de Evaluación Final → `https://miusuariohoy.github.io/Python1/recuperatorio.html`
- Parte 2 (guía) → `https://miusuariohoy.github.io/Python1/parte2.html`

**Menú de la Parte 2** (`parte2.html`):

- Evaluación Parte 2 → `https://miusuariohoy.github.io/Python1/evaluacion-parte2.html`
- Primera evaluación · Parte 2 → `https://miusuariohoy.github.io/Python1/primera2-evaluacion.html`
- Segunda evaluación · Parte 2 → `https://miusuariohoy.github.io/Python1/segunda2-evaluacion.html`
- Tercera evaluación · Parte 2 → `https://miusuariohoy.github.io/Python1/tercera2-evaluacion.html`

PSeInt → `https://miusuariohoy.github.io/pseint/examenes/`

## Publicar (una sola vez)

```bash
cd Python1
git init
git add .
git commit -m "guía Parte 2 temas 13-21 y evaluaciones Primera2, Segunda2 y Tercera2"
git branch -M main
git remote add origin https://github.com/miusuariohoy/Python1.git
git push -u origin main
```

Después, en GitHub:

1. Repo **Python1** → *Settings* → *Pages*
2. *Source*: **Deploy from a branch** → Branch: **main** → carpeta **/ (root)** → Save
3. En 1–2 minutos queda en `https://miusuariohoy.github.io/Python1/`

## Cómo llegan los resultados (modo `ntfy`, por defecto)

La página **no guarda ningún token**. Al corregir:

1. Cifra el resultado en el navegador (RSA + AES).
2. Lo publica en un canal de `ntfy.sh` (`NTFY_TOPIC` en `config.js`).
3. El repo privado `inform` lo recoge cada 30 minutos con el workflow
   `recoger.yml`, lo descifra con la clave privada y reconstruye `INFORME.md`.

El canal es público, pero los mensajes van cifrados: nadie sin la clave privada
puede leer nombres ni notas.

Para cambiar el canal o las claves, hay que regenerar el par en `inform/claves/` y actualizar `NTFY_TOPIC` y `CLAVE_PUBLICA` en `config.js`.

### Alternativas

- **`proxy`**: Google Apps Script guarda el token en el servidor. Requiere
  desplegar `inform/apps-script/Code.gs` y poner `MODO_ENVIO: 'proxy'` +
  `PROXY_URL`.
- **`directo`**: el navegador llama a la API de GitHub con un token. GitHub
  **bloquea** el push de tokens a repos públicos, así que no es usable.
- **`ninguno`**: no envía nada; el alumno descarga el comprobante.

## Cómo probar

1. Abrí la evaluación que corresponda desde el menú de la guía e ingresá su clave:
   - Primera evaluación: clave **`Primera1`**
   - Segunda evaluación: clave **`Segunda1`**
   - Tercera evaluación: clave **`Tercera1`**
   - Primera evaluación · Parte 2: clave **`Primera2`**
   - Segunda evaluación · Parte 2: clave **`Segunda2`**
   - Tercera evaluación · Parte 2: clave **`Tercera2`**
   - Evaluación Final: clave **`Python1`**
   - Recuperatorio de Evaluación Final: clave **`recu1`**
   - Parte 2: clave **`pro2`**
   - PSeInt: clave **`pseint`**
2. Completá apellido, nombre y curso.
3. Respondé y presioná **Corregir y enviar**.
4. En el repo `inform`: pestaña **Actions** → **Recoger resultados** →
   *Run workflow* (o esperá 30 minutos), después abrí `INFORME.md`.

## Detalles a tener en cuenta

- **La clave es un filtro blando.** GitHub Pages no tiene login de servidor: la
  clave está en `config.js` y alguien con conocimientos puede verla. Sirve para
  ordenar el acceso, no como seguridad real.
- **Varios intentos permitidos.** Por defecto `UN_SOLO_INTENTO: false` en
  `config.js`: cualquiera puede rendir la evaluación las veces que quiera y cada
  envío queda registrado. Al terminar aparece **Hacer otra evaluación**. Si
  querés bloquear el navegador después de enviar, poné `UN_SOLO_INTENTO: true`.
- **Las respuestas correctas están en el HTML.** Un alumno con conocimientos
  puede verlas con F12. Para una corrección realmente segura hay que mover la
  corrección a un servidor (Apps Script o Supabase).
- **El canal es público, pero va cifrado.** Sin la clave privada (que está solo
  en `inform`) los mensajes no se pueden descifrar.
- **Puede tardar hasta 30 minutos** en aparecer en `INFORME.md`.
- **Los mensajes del canal duran 12 horas.** El workflow corre cada 30 minutos.
- **GitHub pausa los workflows programados** después de 60 días sin actividad.

## Cambiar de examen

Cada evaluación tiene su propia configuración, clave e `id`:

| Página | Configuración | Clave | `id` | Temas |
| --- | --- | --- | --- | --- |
| `primera-evaluacion.html` | `config-primera.js` | `Primera1` | `python-1-primera` | 1 a 4 |
| `segunda-evaluacion.html` | `config-segunda.js` | `Segunda1` | `python-1-segunda` | 2, 5, 6 y 7 |
| `tercera-evaluacion.html` | `config-tercera.js` | `Tercera1` | `python-1-tercera` | 8 a 12 |
| `primera2-evaluacion.html` | `config-primera2.js` | `Primera2` | `python-2-primera` | 13, 14 y 15 |
| `segunda2-evaluacion.html` | `config-segunda2.js` | `Segunda2` | `python-2-segunda` | 16, 17 y 18 |
| `tercera2-evaluacion.html` | `config-tercera2.js` | `Tercera2` | `python-2-tercera` | 19 |
| `evaluacion.html` | `config.js` | `Python1` | `python-1` | Evaluación Final |
| `recuperatorio.html` | `config-recuperatorio1.js` | `recu1` | `python-1-recu` | Recuperatorio |

Todas usan 5 preguntas de opción múltiple (5 puntos), 4 salidas (2 puntos) y
2 ejercicios de código simples (1,5 puntos cada uno), con un total de 10
puntos. Cada `config-*.js` define los requisitos que se revisan en la Parte C
(`EJERCICIOS`) y cuánto vale cada actividad (`PUNTOS_EJERCICIO`). La Evaluación
Final los define al final de `config.js`.

La evaluación original de la Parte 2 se configura en `config-parte2.js` y quedó
intacta, igual que su página `evaluacion-parte2.html`.

Los exámenes de PSeInt se configuran en el repo
[`pseint`](https://github.com/miusuariohoy/pseint), dentro de `examenes/`.

El `id` separa los intentos y los resultados en el informe. Para un examen nuevo
conviene duplicar la página de evaluación que corresponda y editar las preguntas.

## Entrega en `inform`

El repo `inform` incluye una carpeta `evaluaciones/` con una copia de **todas**
las páginas y configuraciones, y la tabla completa de claves al principio de su
`README.md`. No existe un repo `import` en la cuenta; `inform` es el destino
usado para centralizar la entrega.
