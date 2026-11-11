/* ============================================================
   CONFIGURACIÓN
   ------------------------------------------------------------
   Editá este archivo antes de subir a GitHub Pages.

   MODO_ENVIO:
     'ntfy'    -> (recomendado) la página cifra el resultado y lo
                  publica en un canal; el repo "inform" lo recoge
                  cada 10 minutos. No hay tokens ni secretos acá.
     'proxy'   -> el navegador llama a un Google Apps Script que
                  guarda el token en el servidor.
     'directo' -> el navegador llama a la API de GitHub con un
                  token. GitHub bloquea el push de tokens a repos
                  públicos, así que en la práctica no se puede usar.
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

    // 'ntfy' | 'proxy' | 'directo' | 'ninguno'
    MODO_ENVIO: 'ntfy',

    // --- Modo ntfy (canal cifrado) ---
    // El tema es público, pero los mensajes van cifrados.
    NTFY_TOPIC: 'py1-inform-7ae6582c6449a0fd',
    // Clave pública (SPKI, base64). La privada está en el repo inform.
    CLAVE_PUBLICA: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy4M/CjOEBBmnmgPc2B+yj5O55KOVGE7voIQ41DWI8OMuuQVNlWgzUPgTxW58x7hOW/my1uiUNbNZvm3oixTZJtBw8Lxi8rMVCv9gRArhU8QELEyY1EjB9VCYxZ0UysC1375+m+J757GB3nweSvjRY5esbKzvYOLwh7Lj+sRY6mNgygm/RkeQKhqQ2u/L+PkIVZ7J9evXDofKYP6MOayW6kM61wqFjh32pE5kjDwMkIBmX73BgTD2elxP8iIfvKhr+dqVgft93Gn9x21SxbF1/Ih0ObpCzzTzbMsl2MRiZKR7PndaO7Wtbt1MxbvtvrpV/nTct6bMx1Rl9amYxtsdRwIDAQAB',

    // --- Modo proxy (Apps Script) ---
    PROXY_URL: '',

    // --- Modo directo (bloqueado por GitHub en repos públicos) ---
    GITHUB: {
        owner: 'miusuariohoy',
        repo: 'inform',
        evento: 'resultado',
        token: ''
    }
};
