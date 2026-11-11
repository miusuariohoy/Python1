/* ============================================================
   CONFIGURACIÓN
   ------------------------------------------------------------
   Editá este archivo antes de subir a GitHub Pages.

   MODO_ENVIO:
     'directo' -> el navegador llama a la API de GitHub con un
                  token. Es lo más rápido de configurar, pero el
                  token queda visible en el código: usá un token
                  fine-grained limitado SOLO al repo "inform" y
                  solo con permiso "Contents: Read and write".
     'proxy'   -> el navegador llama a un Google Apps Script que
                  guarda el token en el servidor. No expone nada.
                  Requiere desplegar apps-script/Code.gs.
     'ninguno' -> no envía nada (solo muestra la nota y permite
                  descargar el JSON de respaldo).
   ============================================================ */

window.CONFIG = {
    // Clave para entrar a la evaluación (soft gate, ver README)
    CLAVE_ACCESO: '123456',

    // Datos del examen (van al informe)
    EXAMEN: {
        id: 'python-1',
        titulo: 'Programación Estructurada',
        materia: 'Programación'
    },

    // 'directo' | 'proxy' | 'ninguno'
    MODO_ENVIO: 'directo',

    // --- Modo directo ---
    GITHUB: {
        owner: 'miusuariohoy',
        repo: 'inform',
        evento: 'resultado',
        token: 'PEGA_ACA_TU_TOKEN_FINE_GRAINED'
    },

    // --- Modo proxy (Apps Script) ---
    PROXY_URL: ''
};
