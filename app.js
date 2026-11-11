/* ============================================================
   Evaluación interactiva · Programación Estructurada
   Lógica: acceso, corrección, envío al informe y bloqueo.
   ============================================================ */
(function () {
    'use strict';

    var cfg = window.CONFIG || {};
    var EXAMEN = cfg.EXAMEN || { id: 'python-1', titulo: 'Programación Estructurada', materia: 'Programación' };

    var MAX_PUNTOS = 10;
    var PUNTOS_POR_SALIDA = 0.5;
    var PUNTOS_POR_EJERCICIO = 1.5;

    var CLAVE_ACCESO = 'eval_acceso_' + EXAMEN.id;
    var CLAVE_ENVIO = 'eval_' + EXAMEN.id + '_enviada_v1';

    var bloqueada = false;
    var ultimoResultado = null;
    var ultimoPayload = null;

    /* ---------- Helpers DOM ---------- */
    function $(sel, raiz) { return (raiz || document).querySelector(sel); }
    function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

    /* ---------- Utilidades ---------- */
    function normalizar(texto) {
        return String(texto == null ? '' : texto)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[.,;:!?¡¿"']/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function formatear(n) {
        return Number.isInteger(n) ? String(n) : n.toFixed(1);
    }

    function redondear(n) {
        return Math.round(n * 10) / 10;
    }

    function numero(pregunta) {
        var el = pregunta.querySelector('.num-preg');
        return el ? el.textContent.trim() : '?';
    }

    function fechaLegible(iso) {
        try {
            return new Date(iso).toLocaleDateString('es-AR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { return ''; }
    }

    /* ---------- Corrección de código ---------- */
    function variableAcumuladora(codigo) {
        var m = codigo.match(/\b([a-z_][a-z0-9_]*)\s*=\s*0\b/);
        return m ? m[1] : null;
    }

    var EJERCICIOS = {
        c1: [
            { d: 'Pide al menos dos datos con input()', f: function (c) { return (c.match(/\binput\s*\(/g) || []).length >= 2; } },
            { d: 'Convierte la edad con int()', f: function (c) { return /\bint\s*\(/.test(c); } },
            { d: 'Usa un f-string', f: function (c) { return /\bf\s*["']/.test(c); } },
            { d: 'Muestra el mensaje con print()', f: function (c) { return /\bprint\s*\(/.test(c); } },
            { d: 'Incluye el nombre y la edad en el mensaje', f: function (c) { return /nombre/.test(c) && /edad/.test(c); } }
        ],
        c2: [
            { d: 'Usa un bucle for o while', f: function (c) { return /\b(for|while)\b/.test(c); } },
            { d: 'Recorre del 1 al 10', f: function (c) { return /range\s*\(\s*1\s*,\s*11\s*\)/.test(c) || /range\s*\(\s*(0\s*,\s*)?10\s*\)/.test(c) || /while[^\n]*<=\s*10/.test(c); } },
            { d: 'Inicializa un acumulador en 0 (puede llamarse a, suma, total...)', f: function (c) { return variableAcumuladora(c) !== null; } },
            { d: 'Acumula con += o con variable = variable + ...', f: function (c) { return /\+=/.test(c) || /\b([a-z_]\w*)\s*=\s*\1\s*\+/.test(c); } },
            { d: 'Imprime los números y el total', f: function (c) { return (c.match(/\bprint\s*\(/g) || []).length >= 2; } },
            { d: 'Imprime el acumulador al final', f: function (c) {
                var v = variableAcumuladora(c);
                if (!v) return false;
                return new RegExp('\\bprint\\s*\\([^)]*\\b' + v + '\\b').test(c);
            } }
        ]
    };

    /* ---------- Evaluación ---------- */
    function evaluar() {
        var puntosA = 0, puntosB = 0, puntosC = 0;
        var erroresA = [], erroresB = [], erroresC = [];
        var lineas = [];
        var respuestas = { mc: {}, salidas: {}, codigo: {} };

        /* Parte A */
        $$('.mc').forEach(function (pregunta) {
            var n = numero(pregunta);
            var correcta = pregunta.dataset.correcta;
            var marcada = pregunta.querySelector('input[type="radio"]:checked');
            var elegida = marcada ? marcada.value : null;

            pregunta.classList.remove('correcta', 'incorrecta');
            $$('.opciones label', pregunta).forEach(function (label) {
                label.classList.remove('opcion-correcta', 'opcion-elegida-mal');
            });

            var labelCorrecta = pregunta.querySelector('.opciones label[data-op="' + correcta + '"]');
            if (labelCorrecta) labelCorrecta.classList.add('opcion-correcta');

            var textoCorrecta = labelCorrecta ? labelCorrecta.textContent.trim() : correcta;
            var textoElegida = '(sin responder)';
            if (marcada) {
                var labelElegida = marcada.closest('label');
                textoElegida = labelElegida ? labelElegida.textContent.trim() : elegida;
            }

            var primero = pregunta.querySelector('input');
            if (primero) respuestas.mc[primero.name] = elegida || '';

            if (elegida === correcta) {
                puntosA++;
                pregunta.classList.add('correcta');
            } else {
                pregunta.classList.add('incorrecta');
                erroresA.push(n);
                if (marcada) {
                    var labelMal = pregunta.querySelector('.opciones label[data-op="' + elegida + '"]');
                    if (labelMal) labelMal.classList.add('opcion-elegida-mal');
                }
            }

            lineas.push(n + ') Opción múltiple');
            lineas.push('   Respuesta: ' + textoElegida);
            lineas.push('   Correcta:  ' + textoCorrecta);
            lineas.push('   Resultado: ' + (elegida === correcta ? 'OK' : 'ERROR'));
        });

        /* Parte B */
        $$('.salida').forEach(function (pregunta) {
            var n = numero(pregunta);
            var aceptadas = pregunta.dataset.aceptadas.split('|').map(normalizar);
            var campo = pregunta.querySelector('input');
            var valor = normalizar(campo.value);
            var ok = aceptadas.indexOf(valor) !== -1;

            respuestas.salidas[campo.id] = campo.value;

            pregunta.classList.remove('correcta', 'incorrecta');
            if (ok) {
                puntosB += PUNTOS_POR_SALIDA;
                pregunta.classList.add('correcta');
            } else {
                pregunta.classList.add('incorrecta');
                erroresB.push(valor === '' ? n + ' (sin responder)' : n);
            }

            lineas.push(n + ') Salida de programa');
            lineas.push('   Respuesta: ' + (campo.value.trim() || '(sin responder)'));
            lineas.push('   Esperada:  ' + pregunta.dataset.aceptadas.split('|')[0]);
            lineas.push('   Resultado: ' + (ok ? 'OK' : 'ERROR'));
        });

        /* Parte C */
        Object.keys(EJERCICIOS).forEach(function (id) {
            var area = document.getElementById(id);
            var contenedor = document.getElementById('res-' + id);
            if (!area || !contenedor) return;

            var codigo = area.value.toLowerCase();
            var checks = EJERCICIOS[id];
            var aprobados = 0;

            respuestas.codigo[id] = area.value;

            var items = checks.map(function (check) {
                var paso = false;
                try { paso = check.f(codigo); } catch (e) { paso = false; }
                if (paso) aprobados++;
                return '<li class="' + (paso ? 'ok' : 'fail') + '">' +
                    (paso ? '✔' : '✘') + ' ' + check.d + '</li>';
            }).join('');

            var puntos = (aprobados / checks.length) * PUNTOS_POR_EJERCICIO;
            puntosC += puntos;

            var card = area.closest('.pregunta');
            var n = card ? numero(card) : id;
            if (puntos < PUNTOS_POR_EJERCICIO) {
                erroresC.push(n + ' (faltan requisitos)');
            }

            contenedor.innerHTML =
                '<strong class="puntos-code">' + formatear(redondear(puntos)) + ' / ' + PUNTOS_POR_EJERCICIO + ' puntos</strong>' +
                '<ul>' + items + '</ul>';

            lineas.push(n + ') Ejercicio de código (' + formatear(redondear(puntos)) + ' / ' + PUNTOS_POR_EJERCICIO + ' puntos)');
            checks.forEach(function (check) {
                var paso = false;
                try { paso = check.f(codigo); } catch (e) { paso = false; }
                lineas.push('   ' + (paso ? 'OK: ' : 'FALTA: ') + check.d);
            });
            lineas.push('   Código enviado:');
            area.value.split('\n').forEach(function (l) { lineas.push('   ' + l); });
        });

        var total = redondear(puntosA + puntosB + puntosC);

        $('#puntaje-total').textContent = formatear(total);
        $('#puntos-a').textContent = puntosA;
        $('#puntos-b').textContent = formatear(redondear(puntosB));
        $('#puntos-c').textContent = formatear(redondear(puntosC));
        $('#barra-fill').style.width = (total / MAX_PUNTOS * 100) + '%';

        var mensaje;
        if (total >= 9) mensaje = '🌟 Excelente. Dominás los fundamentos de la programación estructurada.';
        else if (total >= 7) mensaje = '✅ Muy bien. Tenés una base sólida; revisá los puntos marcados.';
        else if (total >= 6) mensaje = '👍 Aprobado. Repasá condicionales y bucles antes de avanzar.';
        else mensaje = '📚 A repasar. Volvé a la guía y practicá los ejercicios.';
        $('#mensaje').textContent = mensaje;
        $('#nota-resultado').style.display = 'block';

        var partesError = [];
        if (erroresA.length) partesError.push('Preguntas ' + erroresA.join(', '));
        if (erroresB.length) partesError.push('Salidas ' + erroresB.join(', '));
        if (erroresC.length) partesError.push('Código ' + erroresC.join(', '));
        var erroresTexto = partesError.join(' · ');

        var resumen = $('#resumen-errores');
        if (!erroresTexto) {
            resumen.className = 'resumen-errores sin-errores';
            resumen.innerHTML = '🎯 <b>Sin errores.</b> Respondiste todo correctamente.';
        } else {
            resumen.className = 'resumen-errores';
            resumen.innerHTML = '⚠️ <b>Errores a revisar:</b> ' + erroresTexto +
                '. Mirá la explicación de cada consigna marcada en rojo.';
        }

        $('.resultado').classList.add('visible');
        document.body.classList.add('calificado');

        return {
            total: total,
            puntosA: puntosA,
            puntosB: redondear(puntosB),
            puntosC: redondear(puntosC),
            erroresA: erroresA,
            erroresB: erroresB,
            erroresC: erroresC,
            erroresTexto: erroresTexto,
            detalle: lineas.join('\n'),
            respuestas: respuestas
        };
    }

    /* ---------- Datos del alumno ---------- */
    function datosAlumno() {
        return {
            apellido: $('#alumno-apellido').value.trim(),
            nombre: $('#alumno-nombre').value.trim(),
            curso: $('#alumno-curso').value.trim(),
            materia: ($('#alumno-materia').value.trim() || EXAMEN.materia)
        };
    }

    function validarAlumno() {
        var campos = ['#alumno-apellido', '#alumno-nombre', '#alumno-curso'];
        var faltan = false;
        campos.forEach(function (sel) {
            var el = $(sel);
            el.classList.remove('invalido');
            if (!el.value.trim()) {
                el.classList.add('invalido');
                faltan = true;
            }
        });
        if (faltan) {
            var aviso = $('#aviso-envio');
            aviso.className = 'aviso-envio error visible';
            aviso.innerHTML = '⚠️ Completá <b>apellido</b>, <b>nombre</b> y <b>curso</b> antes de enviar.';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        }
        return true;
    }

    /* ---------- Payload ---------- */
    function construirPayload(res) {
        var a = datosAlumno();
        return {
            examen: EXAMEN.id,
            titulo: EXAMEN.titulo,
            materia: a.materia,
            apellido: a.apellido,
            nombre: a.nombre,
            curso: a.curso,
            nota: res.total,
            puntosA: res.puntosA,
            puntosB: res.puntosB,
            puntosC: res.puntosC,
            errores: res.erroresTexto || 'Sin errores',
            detalle: res.detalle,
            respuestas: res.respuestas,
            momento: new Date().toISOString(),
            navegador: navigator.userAgent,
            origen: location.href
        };
    }

    /* ---------- Envío ---------- */
    function enviarDirecto(payload) {
        var gh = cfg.GITHUB || {};
        if (!gh.token || gh.token.indexOf('PEGA') === 0) {
            return Promise.reject(new Error('Falta configurar el token en config.js'));
        }
        return fetch('https://api.github.com/repos/' + gh.owner + '/' + gh.repo + '/dispatches', {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer ' + gh.token,
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: gh.evento || 'resultado',
                client_payload: payload
            })
        }).then(function (r) {
            if (r.status === 204) return true;
            return r.text().then(function (t) {
                throw new Error('GitHub ' + r.status + ': ' + t.slice(0, 200));
            });
        });
    }

    function enviarProxy(payload) {
        if (!cfg.PROXY_URL) {
            return Promise.reject(new Error('Falta configurar PROXY_URL en config.js'));
        }
        return fetch(cfg.PROXY_URL, {
            method: 'POST',
            // text/plain evita el preflight CORS que Apps Script no responde
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); })
          .then(function (d) {
              if (!d || !d.ok) throw new Error((d && d.error) || 'El proxy rechazó el envío');
              return true;
          });
    }

    function enviar(payload) {
        var modo = cfg.MODO_ENVIO || 'ninguno';
        if (modo === 'directo') return enviarDirecto(payload);
        if (modo === 'proxy') return enviarProxy(payload);
        return Promise.reject(new Error('Envío desactivado (MODO_ENVIO = ninguno)'));
    }

    function mostrarEstadoEnvio(texto, clase) {
        var el = $('#estado-envio');
        el.className = 'estado-envio ' + (clase || '');
        el.innerHTML = texto;
    }

    /* ---------- Guardado local (un intento por navegador) ---------- */
    function guardar(datos) {
        try { localStorage.setItem(CLAVE_ENVIO, JSON.stringify(datos)); } catch (e) { /* sin storage */ }
    }

    function leerGuardado() {
        try {
            var raw = localStorage.getItem(CLAVE_ENVIO);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function restaurar(d) {
        if (!d) return;
        if (d.alumno) {
            $('#alumno-apellido').value = d.alumno.apellido || '';
            $('#alumno-nombre').value = d.alumno.nombre || '';
            $('#alumno-curso').value = d.alumno.curso || '';
            $('#alumno-materia').value = d.alumno.materia || EXAMEN.materia;
        }
        var r = d.respuestas || {};
        Object.keys(r.mc || {}).forEach(function (name) {
            var radio = document.querySelector('input[name="' + name + '"][value="' + r.mc[name] + '"]');
            if (radio) radio.checked = true;
        });
        Object.keys(r.salidas || {}).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.value = r.salidas[id];
        });
        Object.keys(r.codigo || {}).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.value = r.codigo[id];
        });
    }

    function bloquear(mensaje) {
        bloqueada = true;
        document.body.classList.add('enviada');
        $$('input, textarea').forEach(function (el) { el.disabled = true; });
        var corrige = $('#btn-corregir');
        var reinicia = $('#btn-reiniciar');
        if (corrige) corrige.style.display = 'none';
        if (reinicia) reinicia.style.display = 'none';

        var aviso = $('#aviso-envio');
        aviso.className = 'aviso-envio visible';
        aviso.innerHTML = mensaje;
    }

    /* ---------- Corrección principal ---------- */
    function corregir() {
        if (bloqueada) return;
        if (!validarAlumno()) return;

        var res = evaluar();
        var payload = construirPayload(res);
        ultimoResultado = res;
        ultimoPayload = payload;

        var registro = {
            alumno: datosAlumno(),
            total: res.total,
            puntosA: res.puntosA,
            puntosB: res.puntosB,
            puntosC: res.puntosC,
            erroresTexto: res.erroresTexto,
            respuestas: res.respuestas,
            momento: payload.momento
        };
        guardar(registro);

        var aviso = $('#aviso-envio');
        aviso.className = 'aviso-envio visible';
        aviso.innerHTML = '🔒 <b>Evaluación enviada.</b> Tu nota es <b>' + formatear(res.total) +
            ' / 10</b>. No se puede volver a realizar ni modificar.';

        bloquear('🔒 <b>Evaluación enviada.</b> Tu nota es <b>' + formatear(res.total) +
            ' / 10</b>. No se puede volver a realizar ni modificar.');

        mostrarEstadoEnvio('Enviando el resultado al informe del docente…');

        enviar(payload)
            .then(function () {
                mostrarEstadoEnvio('✅ Resultado guardado en el informe del docente.');
            })
            .catch(function (err) {
                var detalle = err && err.message ? err.message : 'Error desconocido';
                mostrarEstadoEnvio(
                    '⚠️ No se pudo guardar automáticamente (' + detalle + '). ' +
                    'Descargá el comprobante y entregalo al docente.',
                    'fail'
                );
                $('#enviar-fallback').classList.add('visible');
            });

        $('#resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ---------- Reinicio ---------- */
    function reiniciar() {
        if (bloqueada) return;
        if (!confirm('¿Borrar todas tus respuestas y empezar de nuevo?')) return;

        $$('input[type="radio"]').forEach(function (r) { r.checked = false; });
        $$('.salida input').forEach(function (i) { i.value = ''; });
        $$('.editor').forEach(function (t) { t.value = ''; });
        $$('.mc, .salida').forEach(function (q) { q.classList.remove('correcta', 'incorrecta'); });
        $$('.opciones label').forEach(function (l) { l.classList.remove('opcion-correcta', 'opcion-elegida-mal'); });
        $$('.resultado-codigo').forEach(function (r) { r.innerHTML = ''; });
        $$('.invalido').forEach(function (i) { i.classList.remove('invalido'); });

        document.body.classList.remove('calificado');
        $('.resultado').classList.remove('visible');
        $('#puntaje-total').textContent = '0';
        $('#puntos-a').textContent = '0';
        $('#puntos-b').textContent = '0';
        $('#puntos-c').textContent = '0';
        $('#barra-fill').style.width = '0';
        $('#mensaje').textContent = 'Corregí la evaluación para ver tu puntaje.';
        $('#nota-resultado').style.display = 'none';
        $('#estado-envio').textContent = '';
        $('#resumen-errores').innerHTML = '';
        $('#resumen-errores').className = 'resumen-errores';
        $('#enviar-fallback').classList.remove('visible');
        var aviso = $('#aviso-envio');
        aviso.className = 'aviso-envio';
        aviso.innerHTML = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ---------- Comprobante ---------- */
    function textoComprobante() {
        if (!ultimoResultado) return '';
        var a = datosAlumno();
        return 'EVALUACIÓN: ' + EXAMEN.titulo + ' (' + EXAMEN.id + ')\n' +
            'Apellido: ' + a.apellido + '\n' +
            'Nombre: ' + a.nombre + '\n' +
            'Curso: ' + a.curso + '\n' +
            'Materia: ' + a.materia + '\n' +
            'Fecha y hora: ' + fechaLegible(ultimoPayload ? ultimoPayload.momento : new Date().toISOString()) + '\n' +
            'NOTA: ' + formatear(ultimoResultado.total) + ' / 10\n' +
            'Parte A: ' + ultimoResultado.puntosA + ' / 5\n' +
            'Parte B: ' + formatear(ultimoResultado.puntosB) + ' / 2\n' +
            'Parte C: ' + formatear(ultimoResultado.puntosC) + ' / 3\n' +
            'Errores: ' + (ultimoResultado.erroresTexto || 'Sin errores') + '\n\n' +
            ultimoResultado.detalle;
    }

    function copiar() {
        var texto = textoComprobante();
        if (!texto) return;
        var boton = $('#btn-copiar');
        function listo() {
            var original = boton.textContent;
            boton.textContent = '✅ Copiado';
            setTimeout(function () { boton.textContent = original; }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(listo).catch(copiarFallback);
        } else {
            copiarFallback();
        }
        function copiarFallback() {
            var ta = document.createElement('textarea');
            ta.value = texto;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); listo(); } catch (e) { /* nada */ }
            document.body.removeChild(ta);
        }
    }

    function descargar() {
        if (!ultimoPayload) return;
        var a = datosAlumno();
        var nombreArchivo = 'evaluacion-' + EXAMEN.id + '-' +
            (a.apellido + '-' + a.nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() +
            '.json';
        var blob = new Blob([JSON.stringify(ultimoPayload, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = nombreArchivo;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    /* ---------- Acceso ---------- */
    function mostrarApp() {
        $('#acceso').hidden = true;
        $('#app').hidden = false;
        $('#alumno-materia').value = EXAMEN.materia;
        var primero = $('#alumno-apellido');
        if (primero) primero.focus();
    }

    function iniciarAcceso() {
        try {
            if (sessionStorage.getItem(CLAVE_ACCESO) === '1') {
                mostrarApp();
                return;
            }
        } catch (e) { /* sin storage */ }

        $('#form-acceso').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var valor = $('#clave').value.trim();
            if (valor === String(cfg.CLAVE_ACCESO)) {
                try { sessionStorage.setItem(CLAVE_ACCESO, '1'); } catch (e) { /* sin storage */ }
                $('#acceso-error').textContent = '';
                mostrarApp();
            } else {
                $('#acceso-error').textContent = 'Clave incorrecta. Volvé a intentar.';
                $('#clave').value = '';
                $('#clave').focus();
            }
        });
    }

    /* ---------- Arranque ---------- */
    function iniciar() {
        iniciarAcceso();

        $('#btn-corregir').addEventListener('click', corregir);
        $('#btn-reiniciar').addEventListener('click', reiniciar);
        $('#btn-imprimir').addEventListener('click', function () { window.print(); });
        $('#btn-copiar').addEventListener('click', copiar);
        $('#btn-descargar').addEventListener('click', descargar);

        var guardado = leerGuardado();
        if (guardado) {
            restaurar(guardado);
            var res = evaluar();
            ultimoResultado = res;
            ultimoPayload = construirPayload(res);
            bloquear('🔒 <b>Esta evaluación ya fue enviada</b>' +
                (guardado.momento ? ' el ' + fechaLegible(guardado.momento) : '') +
                ' con una nota de <b>' + formatear(guardado.total) + ' / 10</b>. ' +
                'Solo se puede realizar una vez por navegador. ' +
                'Si necesitás rendirla de nuevo, hablá con el docente.');
            setTimeout(function () {
                $('#resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
