# Python1 · Guía + Evaluación interactiva

Sitio de GitHub Pages con la guía de **Programación Estructurada** y una evaluación
protegida por clave. Al corregir, el resultado se guarda automáticamente en el
repositorio privado [`inform`](https://github.com/miusuariohoy/inform).

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `index.html` | Parte 1 de la guía (teoría, autoevaluación, simuladores). |
| `parte2.html` | Parte 2 de la guía (listas, Canvas, MySQL). |
| `evaluacion.html` | Pantalla de acceso + evaluación completa (11 consignas). |
| `styles.css` | Estilos de la evaluación. |
| `app.js` | Acceso, corrección, bloqueo de segundo intento y envío. |
| `config.js` | **Lo único que tenés que editar**: clave, repo y token. |

La evaluación se abre desde el ítem **🎓 Evaluación** del menú, al lado de
**Parte 2**, o directo en `https://miusuariohoy.github.io/Python1/evaluacion.html`.

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

## Configurar el envío (modo directo)

1. Crear el repo privado **`inform`** y subir el contenido de la carpeta `inform/`.
2. GitHub → *Settings* → *Developer settings* → **Personal access tokens** →
   **Fine-grained tokens** → *Generate new token*.
   - **Repository access**: *Only select repositories* → `inform`
   - **Permissions** → *Repository permissions* → **Contents: Read and write**
   - Expiración: la que prefieras (ej. 90 días)
3. Copiar el token y pegarlo en `config.js`:

```js
GITHUB: {
    owner: 'miusuariohoy',
    repo: 'inform',
    evento: 'resultado',
    token: 'github_pat_...'
}
```

4. Commit y push. Listo.

### Modo más seguro (proxy)

Si no querés que el token quede en el navegador:

1. Desplegá `inform/apps-script/Code.gs` como aplicación web (instrucciones en el
   encabezado del archivo).
2. En `config.js`:

```js
MODO_ENVIO: 'proxy',
PROXY_URL: 'https://script.google.com/macros/s/XXXX/exec'
```

Así el navegador nunca ve el token.

## Cómo probar

1. Abrí `https://miusuariohoy.github.io/Python1/evaluacion.html` (o el ítem
   **🎓 Evaluación** del menú), ingresá la clave `123456`.
2. Completá apellido, nombre y curso.
3. Respondé y presioná **Corregir y enviar**.
4. En el repo `inform`: pestaña **Actions** (el workflow corre), después abrí
   `INFORME.md`. Tiene que aparecer tu entrega.

## Detalles a tener en cuenta

- **La clave es un filtro blando.** GitHub Pages no tiene login de servidor: la
  clave está en `config.js` y alguien con conocimientos puede verla. Sirve para
  ordenar el acceso, no como seguridad real.
- **Un intento por navegador.** Se guarda en `localStorage`. Si el alumno cambia
  de navegador, de dispositivo o usa incógnito, puede repetir. Sin legajo no hay
  forma de impedirlo desde el navegador; el informe mostrará las entregas
  duplicadas para que las detectes.
- **Las respuestas correctas están en el HTML.** Un alumno con conocimientos
  puede verlas con F12. Si necesitás corrección realmente segura, hay que mover
  la corrección a un servidor (Apps Script o Supabase).
- **El token del modo directo es visible.** Usalo solo con permiso *Contents:
  Read and write* sobre `inform`, nunca con acceso a toda la cuenta.

## Cambiar de examen

En `config.js`:

```js
EXAMEN: { id: 'python-2', titulo: 'Otro examen', materia: 'Programación' }
```

El `id` separa los intentos y los resultados en el informe. Para un examen nuevo
conviene duplicar `evaluacion.html` y editar las preguntas.
