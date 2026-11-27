/* ============================================================
   ENTREGAS DE ACTIVIDADES · GUÍAS DE PYTHON
   ------------------------------------------------------------
   El alumno entra con su DNI, escribe la resolución en Sublime Text
   y la pega en la caja del ejercicio (o carga el .py). El código se
   cifra con la misma clave pública que las evaluaciones y se publica
   en ntfy.sh. El repo privado "inform" lo recoge y guarda con DNI,
   actividad, fecha y hora.
   ============================================================ */
(function () {
    'use strict';

    var CLAVE_DNI = 'py_alumno_dni';
    var CLAVE_ENTREGAS = 'py_entregas_';
    var cfg = window.CONFIG || {};

    function $(selector, raiz) { return (raiz || document).querySelector(selector); }
    function $$(selector, raiz) {
        return Array.prototype.slice.call((raiz || document).querySelectorAll(selector));
    }

    function dni() {
        try { return localStorage.getItem(CLAVE_DNI) || ''; } catch (e) { return ''; }
    }

    function guardarDni(valor) {
        try { localStorage.setItem(CLAVE_DNI, valor); } catch (e) { /* sin storage */ }
    }

    function leerEntregas() {
        try {
            var raw = localStorage.getItem(CLAVE_ENTREGAS + dni());
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }

    function guardarEntregas(datos) {
        try { localStorage.setItem(CLAVE_ENTREGAS + dni(), JSON.stringify(datos)); } catch (e) { /* sin storage */ }
    }

    function fechaLegible(iso) {
        try {
            return new Intl.DateTimeFormat('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires',
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }).format(new Date(iso));
        } catch (e) { return iso; }
    }

    /* ---------- Cifrado híbrido RSA + AES (igual que app.js) ---------- */
    function b64DeBuffer(buffer) {
        var bytes = new Uint8Array(buffer);
        var bin = '';
        for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return btoa(bin);
    }

    function bufferDeB64(texto) {
        var bin = atob(texto);
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    }

    function comprimir(datos) {
        if (!window.CompressionStream || !window.Response || !window.Blob) {
            return Promise.resolve({ datos: datos, z: 0 });
        }
        try {
            var flujo = new Blob([datos]).stream().pipeThrough(new window.CompressionStream('gzip'));
            return new Response(flujo).arrayBuffer().then(function (buffer) {
                return { datos: new Uint8Array(buffer), z: 1 };
            }).catch(function () {
                return { datos: datos, z: 0 };
            });
        } catch (e) {
            return Promise.resolve({ datos: datos, z: 0 });
        }
    }

    function cifrarPayload(payload) {
        if (!window.crypto || !window.crypto.subtle) {
            return Promise.reject(new Error('Este navegador no soporta cifrado (usá Chrome o Firefox por HTTPS)'));
        }
        var datos = new TextEncoder().encode(JSON.stringify(payload));
        return comprimir(datos).then(function (paquete) {
            return window.crypto.subtle.importKey(
                'spki',
                bufferDeB64(cfg.CLAVE_PUBLICA),
                { name: 'RSA-OAEP', hash: 'SHA-256' },
                false,
                ['encrypt']
            ).then(function (clavePublica) {
                return window.crypto.subtle.generateKey(
                    { name: 'AES-GCM', length: 256 }, true, ['encrypt']
                ).then(function (claveAes) {
                    var iv = window.crypto.getRandomValues(new Uint8Array(12));
                    return window.crypto.subtle.encrypt(
                        { name: 'AES-GCM', iv: iv }, claveAes, paquete.datos
                    ).then(function (cifrado) {
                        return window.crypto.subtle.exportKey('raw', claveAes).then(function (cruda) {
                            return window.crypto.subtle.encrypt(
                                { name: 'RSA-OAEP' }, clavePublica, cruda
                            ).then(function (claveCifrada) {
                                return {
                                    k: b64DeBuffer(claveCifrada),
                                    i: b64DeBuffer(iv),
                                    d: b64DeBuffer(cifrado),
                                    z: paquete.z
                                };
                            });
                        });
                    });
                });
            });
        });
    }

    function enviar(payload) {
        if (!cfg.NTFY_TOPIC || !cfg.CLAVE_PUBLICA) {
            return Promise.reject(new Error('Falta configurar el canal de envío en config.js'));
        }
        return cifrarPayload(payload).then(function (sobre) {
            return fetch('https://ntfy.sh/' + encodeURIComponent(cfg.NTFY_TOPIC), {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(sobre)
            }).then(function (r) {
                if (!r.ok) throw new Error('El canal respondió ' + r.status);
                return true;
            });
        });
    }

    /* ---------- Acceso con DNI ---------- */
    function actualizarBarra() {
        var barra = $('#barra-alumno');
        var badge = $('#dni-badge');
        var valor = dni();
        if (barra) barra.hidden = !valor;
        if (badge) badge.textContent = valor ? 'DNI ••••' + valor.slice(-4) : '';
    }

    function initAcceso() {
        var overlay = $('#acceso-dni');
        var form = $('#form-dni');
        if (!overlay || !form) { actualizarBarra(); return; }

        overlay.hidden = !!dni();
        actualizarBarra();

        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var campo = $('#dni');
            var error = $('#dni-error');
            var valor = campo.value.replace(/[\s.\-]/g, '');
            if (!/^\d{7,9}$/.test(valor)) {
                error.textContent = 'Ingresá un DNI de 7 a 9 números, sin puntos.';
                campo.focus();
                return;
            }
            guardarDni(valor);
            overlay.hidden = true;
            error.textContent = '';
            actualizarBarra();
        });

        var cambiar = $('#cambiar-dni');
        if (cambiar) {
            cambiar.addEventListener('click', function () {
                try { localStorage.removeItem(CLAVE_DNI); } catch (e) { /* nada */ }
                location.reload();
            });
        }
    }

    /* ---------- Entregas ---------- */
    function estado(texto, clase, bloque) {
        var el = $('.entrega-estado', bloque);
        if (!el) return;
        el.textContent = texto;
        el.className = 'entrega-estado' + (clase ? ' ' + clase : '');
    }

    function tituloDe(bloque) {
        var ejercicio = bloque.closest ? bloque.closest('.exercise') : null;
        var h4 = ejercicio && ejercicio.querySelector('h4');
        return (h4 ? h4.textContent : 'Actividad').replace(/^[^\wñáéíóú]+/i, '').trim();
    }

    function initEntregas() {
        var bloques = $$('.entrega');
        if (!bloques.length) return;

        bloques.forEach(function (bloque) {
            var id = bloque.getAttribute('data-entrega') || 'actividad';
            var titulo = tituloDe(bloque);
            var sitio = document.body.getAttribute('data-sitio') || 'guia';
            var archivo = $('.entrega-archivo', bloque);
            var area = document.getElementById(bloque.getAttribute('data-codigo')) ||
                       $('.entrega-codigo', bloque);
            var boton = $('.entrega-enviar', bloque);
            if (!area || !boton) return;

            var guardados = leerEntregas();
            var registro = guardados[id] || {};
            if (registro.codigo && !area.value.trim()) area.value = registro.codigo;
            if (registro.momento) estado('Enviado el ' + fechaLegible(registro.momento), 'ok', bloque);

            function sincronizar() {
                var actuales = leerEntregas();
                actuales[id] = actuales[id] || {};
                actuales[id].codigo = area.value;
                if (!actuales[id].momento && registro.momento) actuales[id].momento = registro.momento;
                guardarEntregas(actuales);
            }

            area.addEventListener('input', sincronizar);

            if (archivo) {
                archivo.addEventListener('change', function () {
                    var elegido = archivo.files && archivo.files[0];
                    if (!elegido) return;
                    var lector = new FileReader();
                    lector.onload = function () {
                        area.value = String(lector.result || '');
                        area.dispatchEvent(new Event('input', { bubbles: true }));
                        var actuales = leerEntregas();
                        actuales[id] = actuales[id] || {};
                        actuales[id].archivo = elegido.name;
                        guardarEntregas(actuales);
                        estado('Archivo ' + elegido.name + ' cargado. Revisá el código y enviá.', '', bloque);
                    };
                    lector.readAsText(elegido);
                });
            }

            boton.addEventListener('click', function () {
                var codigo = area.value.trim();
                if (!dni()) {
                    var overlay = $('#acceso-dni');
                    if (overlay) overlay.hidden = false;
                    estado('Ingresá tu DNI antes de enviar.', 'fail', bloque);
                    return;
                }
                if (!codigo) {
                    estado('Pegá la resolución o cargá el archivo .py antes de enviar.', 'fail', bloque);
                    return;
                }

                var momento = new Date().toISOString();
                boton.disabled = true;
                estado('Cifrando y enviando…', '', bloque);

                var payload = {
                    examen: 'entrega-actividad-' + sitio + '-' + id,
                    titulo: 'Actividad · ' + titulo + ' · Guía de Python',
                    materia: 'Programación',
                    dni: dni(),
                    apellido: 'DNI',
                    nombre: dni(),
                    curso: 'Guía ' + sitio,
                    actividad: id,
                    tema: titulo,
                    codigo: codigo.slice(0, 20000),
                    resolucion: codigo.slice(0, 20000),
                    errores: 'Sin corrección automática',
                    detalle: codigo.slice(0, 20000),
                    respuestas: { codigo: codigo.slice(0, 20000), resolucion: codigo.slice(0, 20000) },
                    momento: momento,
                    navegador: navigator.userAgent,
                    origen: location.href
                };

                enviar(payload).then(function () {
                    var actuales = leerEntregas();
                    actuales[id] = {
                        codigo: codigo,
                        momento: momento,
                        archivo: (archivo && archivo.files && archivo.files[0]) ? archivo.files[0].name : ''
                    };
                    guardarEntregas(actuales);
                    registro = actuales[id];
                    estado('✅ Enviado el ' + fechaLegible(momento), 'ok', bloque);
                }).catch(function (e) {
                    estado('⚠️ No se pudo enviar: ' + (e && e.message ? e.message : 'error de red'), 'fail', bloque);
                }).finally(function () {
                    boton.disabled = false;
                });
            });
        });
    }

    function iniciar() {
        initAcceso();
        initEntregas();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
