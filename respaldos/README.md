# Python1 · Guía + Evaluaciones interactivas

Sitio de GitHub Pages con la guía de **Programación Estructurada**: Parte 1
(12 temas) y Parte 2 (temas **13 a 21**). Incluye las evaluaciones protegidas
por clave de la Parte 1 (Primera, Segunda, Tercera, **Evaluación Final** y su
**Recuperatorio**), de la Parte 2 (Cuarta, Quinta y Sexta) y la evaluación
original de la Parte 2, que se dejó sin cambios. Los exámenes de PSeInt viven en
el repositorio [`pseint`](https://github.com/miusuariohoy/pseint). Al corregir,
el resultado se guarda automáticamente en el repositorio privado
[`inform`](https://github.com/miusuariohoy/inform), donde también se entregan
todas las evaluaciones y la tabla de claves al principio de su README.

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `index.html` | Guía de la Parte 1: 12 temas, autoevaluación y simuladores. |
| `parte2.html` | Parte 2 de la guía: temas 13 a 21 (listas, tuplas, diccionarios, Text, lambda, state, MySQL, Canvas y pygame). |
| `primera-evaluacion.html` | **Primera evaluación** de la Parte 1 (temas 1 a 4). |
| `segunda-evaluacion.html` | **Segunda evaluación** de la Parte 1 (temas 2, 5, 6 y 7). |
| `tercera-evaluacion.html` | **Tercera evaluación** de la Parte 1 (temas 8 a 12). |
| `cuarta-evaluacion.html` | **Cuarta evaluación** de la Parte 2 (temas 13, 14 y 15). |
| `quinta-evaluacion.html` | **Quinta evaluación** de la Parte 2 (temas 16, 17 y 18). |
| `sexta-evaluacion.html` | **Sexta evaluación** de la Parte 2 (tema 19). |
| `evaluacion.html` | **Evaluación Final** de la Parte 1 (11 consignas). |
| `recuperatorio.html` | **Recuperatorio de Evaluación Final** (11 consignas, mismos temas). |
| `evaluacion-parte2.html` | Evaluación original de la **Parte 2** (12 consignas). Sin cambios. |
| `evaluacion-pseint.html` | Evaluación de PSeInt (copia local; se publica en el repo `pseint`). |
| `styles.css` | Estilos de las evaluaciones. |
| `app.js` | Acceso, corrección, envío y reinicio para el siguiente alumno. |
| `config.js` | Configuración general: clave, canal cifrado y examen de la Evaluación Final. |
| `config-primera.js` | Examen y requisitos de código de la Primera evaluación. |
| `config-segunda.js` | Examen y requisitos de código de la Segunda evaluación. |
| `config-tercera.js` | Examen y requisitos de código de la Tercera evaluación. |
| `config-cuarta.js` | Examen y requisitos de código de la Cuarta evaluación. |
| `config-quinta.js` | Examen y requisitos de código de la Quinta evaluación. |
| `config-sexta.js` | Examen y requisitos de código de la Sexta evaluación. |
| `config-recuperatorio1.js` | Examen y requisitos del Recuperatorio de Evaluación Final. |
| `config-parte2.js` | Examen y requisitos de código de la Parte 2. Sin cambios. |
| `CLAVES.md` | Claves de acceso vigentes de cada evaluación. |
| `respaldos/` | Copia de todas las evaluaciones y sus configuraciones. |

La guía abre las evaluaciones desde la barra de menú:

- Primera evaluación → `https://miusuariohoy.github.io/Python1/primera-evaluacion.html`
- Segunda evaluación → `https://miusuariohoy.github.io/Python1/segunda-evaluacion.html`
- Tercera evaluación → `https://miusuariohoy.github.io/Python1/tercera-evaluacion.html`
- Cuarta evaluación → `https://miusuariohoy.github.io/Python1/cuarta-evaluacion.html`
- Quinta evaluación → `https://miusuariohoy.github.io/Python1/quinta-evaluacion.html`
- Sexta evaluación → `https://miusuariohoy.github.io/Python1/sexta-evaluacion.html`
- Evaluación Final → `https://miusuariohoy.github.io/Python1/evaluacion.html`
- Recuperatorio de Evaluación Final → `https://miusuariohoy.github.io/Python1/recuperatorio.html`
- Parte 2 → `https://miusuariohoy.github.io/Python1/evaluacion-parte2.html`
- PSeInt → `https://miusuariohoy.github.io/pseint/examenes/`

## Publicar (una sola vez)

```bash
cd Python1
git init
git add .
git commit -m "guía Parte 2 temas 13-21 y evaluaciones Cuarta, Quinta y Sexta"
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

Para cambiar el canal o las claves, hay que regenerar el par en `inform/claves/`
y actualizar `NTFY_TOPIC` y `CLAVE_PUBLICA` en `config.js`.

### Alternativas

- **`proxy`**: Google Apps Script guarda el token en el servidor. Requiere
  desplegar `inform/apps-script/Code.gs` y poner `MODO_ENVIO: 'proxy'` +
  `PROXY_URL`.
- **`directo`**: el navegador llama a la API de GitHub con un token. GitHub
  **bloquea** el push de tokens a repos públicos, así que no es usable.
- **`ninguno`**: no envía nada; el alumno descarga el comprobante.

## Cómo probar

1. Abrí la evaluación que corresponda desde el menú de la guía e ingresá su
   clave:
   - Primera evaluación: `https://miusuariohoy.github.io/Python1/primera-evaluacion.html` → clave **`Primera1`**
   - Segunda evaluación: `https://miusuariohoy.github.io/Python1/segunda-evaluacion.html` → clave **`Segunda1`**
   - Tercera evaluación: `https://miusuariohoy.github.io/Python1/tercera-evaluacion.html` → clave **`Tercera1`**
   - Cuarta evaluación: `https://miusuariohoy.github.io/Python1/cuarta-evaluacion.html` → clave **`Cuarta1`**
   - Quinta evaluación: `https://miusuariohoy.github.io/Python1/quinta-evaluacion.html` → clave **`Quinta1`**
   - Sexta evaluación: `https://miusuariohoy.github.io/Python1/sexta-evaluacion.html` → clave **`Sexta1`**
   - Evaluación Final: `https://miusuariohoy.github.io/Python1/evaluacion.html` → clave **`Python1`**
   - Recuperatorio de Evaluación Final: `https://miusuariohoy.github.io/Python1/recuperatorio.html` → clave **`recu1`**
   - Parte 2: `https://miusuariohoy.github.io/Python1/evaluacion-parte2.html` → clave **`pro2`**
   - PSeInt: `https://miusuariohoy.github.io/pseint/examenes/` → clave **`pseint`**
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
  envío queda registrado con apellido, nombre, día y hora. Al terminar aparece
  **Hacer otra evaluación**, que limpia el formulario para el siguiente alumno.
  Si querés bloquear el navegador después de enviar, poné `UN_SOLO_INTENTO: true`.
- **Las respuestas correctas están en el HTML.** Un alumno con conocimientos
  puede verlas con F12. Si necesitás corrección realmente segura, hay que mover
  la corrección a un servidor (Apps Script o Supabase).
- **El canal es público, pero va cifrado.** `NTFY_TOPIC` se puede leer en el
  código, pero sin la clave privada (que está solo en `inform`) los mensajes no
  se pueden descifrar.
- **Puede tardar hasta 30 minutos** en aparecer en `INFORME.md`. Si necesitás
  que sea inmediato, entrá a `inform` → **Actions** → **Recoger resultados** →
  *Run workflow*.
- **Los mensajes del canal duran 12 horas.** El workflow corre cada 30 minutos,
  así que en condiciones normales no se pierde ninguno. Si Actions está caído
  más de 12 horas, el alumno igual recibe su comprobante descargable.
- **GitHub pausa los workflows programados** después de 60 días sin actividad en
  el repo. Se reactivan con un clic en **Actions**.

## Cambiar de examen

La Evaluación Final de la Parte 1 se configura en `config.js` (clave `Python1`,
examen `python-1`):

```js
EXAMEN: { id: 'python-1', titulo: 'Evaluación Final · Programación Estructurada', materia: 'Programación' }
```

Las evaluaciones nuevas tienen su propia configuración y su propia clave:

| Página | Configuración | Clave | `id` | Temas |
| --- | --- | --- | --- | --- |
| `primera-evaluacion.html` | `config-primera.js` | `Primera1` | `python-1-primera` | 1 a 4 |
| `segunda-evaluacion.html` | `config-segunda.js` | `Segunda1` | `python-1-segunda` | 2, 5, 6 y 7 |
| `tercera-evaluacion.html` | `config-tercera.js` | `Tercera1` | `python-1-tercera` | 8 a 12 |
| `cuarta-evaluacion.html` | `config-cuarta.js` | `Cuarta1` | `python-2-cuarta` | 13, 14 y 15 |
| `quinta-evaluacion.html` | `config-quinta.js` | `Quinta1` | `python-2-quinta` | 16, 17 y 18 |
| `sexta-evaluacion.html` | `config-sexta.js` | `Sexta1` | `python-2-sexta` | 19 |

Todas usan 5 preguntas de opción múltiple (5 puntos), 4 salidas (2 puntos) y
2 ejercicios de código (1,5 puntos cada uno), con un total de 10 puntos. Cada
`config-*.js` define los requisitos que se revisan en la Parte C (`EJERCICIOS`)
y cuánto vale cada actividad (`PUNTOS_EJERCICIO`).

El Recuperatorio de Evaluación Final se configura en `config-recuperatorio1.js`
(clave `recu1`, examen `python-1-recu`), que también define los requisitos de la
Parte C. Usa las mismas 5 preguntas de opción múltiple, 4 salidas y 2 programas
que la Evaluación Final, con consignas distintas.

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
