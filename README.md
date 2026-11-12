# Python1 · Guía + Evaluación interactiva

Sitio de GitHub Pages con la guía de **Programación Estructurada** y dos
evaluaciones protegidas por clave (Parte 1 y Parte 2). Al corregir, el resultado
se guarda automáticamente en el repositorio privado
[`inform`](https://github.com/miusuariohoy/inform).

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `index.html` | Parte 1 de la guía (teoría, autoevaluación, simuladores). |
| `parte2.html` | Parte 2 de la guía (listas, Canvas, MySQL). |
| `evaluacion.html` | Evaluación de la **Parte 1** (11 consignas). |
| `evaluacion-parte2.html` | Evaluación de la **Parte 2** (12 consignas). |
| `styles.css` | Estilos de la evaluación. |
| `app.js` | Acceso, corrección, envío y reinicio para el siguiente alumno. |
| `config.js` | Configuración general: clave, canal cifrado y examen de la Parte 1. |
| `config-parte2.js` | Examen y requisitos de código de la Parte 2. |

Cada guía abre su evaluación desde el ítem **🎓 Evaluación** del menú:

- Parte 1 → `https://miusuariohoy.github.io/Python1/evaluacion.html`
- Parte 2 → `https://miusuariohoy.github.io/Python1/evaluacion-parte2.html`

## Publicar (una sola vez)

```bash
cd Python1
git init
git add .
git commit -m "evaluación con acceso e informe automático"
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

1. Abrí la evaluación que corresponda desde el menú de cada guía e ingresá su
   clave:
   - Parte 1: `https://miusuariohoy.github.io/Python1/evaluacion.html` → clave **`pro1`**
   - Parte 2: `https://miusuariohoy.github.io/Python1/evaluacion-parte2.html` → clave **`pro2`**
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

La evaluación de la Parte 1 se configura en `config.js`:

```js
EXAMEN: { id: 'python-1', titulo: 'Programación Estructurada', materia: 'Programación' }
```

La de la Parte 2 se configura en `config-parte2.js`, que también define los
requisitos que se revisan en la Parte C (`EJERCICIOS`) y cuánto vale cada
actividad (`PUNTOS_EJERCICIO`). Las actividades se corrigen con expresiones
regulares sobre el texto: la teórica pide completar cada acción con el método
de MySQL que corresponde.

El `id` separa los intentos y los resultados en el informe. Para un examen nuevo
conviene duplicar la página de evaluación que corresponda y editar las preguntas.
