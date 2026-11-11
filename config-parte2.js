/* ============================================================
   CONFIGURACIÓN DE LA EVALUACIÓN · PARTE 2
   ------------------------------------------------------------
   Se carga después de config.js y antes de app.js.
   Define el examen y los requisitos que se revisan en la
   Parte C (ejercicios de código).
   ============================================================ */

window.CONFIG.EXAMEN = {
    id: 'python-2',
    titulo: 'Parte 2 · Estructuras, Multimedia y Base de Datos',
    materia: 'Programación'
};

window.CONFIG.EJERCICIOS = {
    c1: [
        { d: 'Define la función mostrar_tabla(n)', f: function (c) { return /def\s+mostrar_tabla\s*\(\s*n\s*\)/.test(c); } },
        { d: 'Crea un widget Text', f: function (c) { return /\btext\s*\(/.test(c); } },
        { d: 'Borra el contenido con delete("1.0", END)', f: function (c) { return /delete\s*\(\s*["']?1\.0["']?\s*,\s*end\s*\)/.test(c); } },
        { d: 'Recorre del 1 al 10 con range(1, 11)', f: function (c) { return /range\s*\(\s*1\s*,\s*11\s*\)/.test(c); } },
        { d: 'Inserta cada línea con insert(END, ...)', f: function (c) { return /insert\s*\(\s*end\b/.test(c); } },
        { d: 'Arma la línea con un f-string que usa n*i', f: function (c) { return /f["'][^"']*\{n\s*\*\s*i\}/.test(c); } },
        { d: 'Crea un Button', f: function (c) { return /\bbutton\s*\(/.test(c); } },
        { d: 'Usa command=lambda: mostrar_tabla(7)', f: function (c) { return /command\s*=\s*lambda\s*:\s*mostrar_tabla\s*\(\s*7\s*\)/.test(c); } },
        { d: 'Cierra con mainloop()', f: function (c) { return /mainloop\s*\(\s*\)/.test(c); } }
    ],
    c2: [
        { d: 'Importa mysql.connector', f: function (c) { return /import\s+mysql\.connector/.test(c); } },
        { d: 'Define la función conectar()', f: function (c) { return /def\s+conectar\s*\(\s*\)/.test(c); } },
        { d: 'Devuelve mysql.connector.connect(...)', f: function (c) { return /mysql\.connector\.connect\s*\(/.test(c); } },
        { d: 'Incluye host, user, password y database', f: function (c) { return /host\s*=/.test(c) && /user\s*=/.test(c) && /password\s*=/.test(c) && /database\s*=/.test(c); } },
        { d: 'Define la función guardar()', f: function (c) { return /def\s+guardar\s*\(\s*\)/.test(c); } },
        { d: 'Lee el nombre con .get()', f: function (c) { return /\.get\s*\(\s*\)/.test(c); } },
        { d: 'Usa INSERT INTO alumnos', f: function (c) { return /insert\s+into\s+alumnos/.test(c); } },
        { d: 'Usa los huecos %s en VALUES', f: function (c) { return /values\s*\(\s*%s\s*,\s*%s\s*\)/.test(c); } },
        { d: 'Crea el cursor con .cursor()', f: function (c) { return /\.cursor\s*\(\s*\)/.test(c); } },
        { d: 'Ejecuta con cursor.execute(sql, (nombre, curso))', f: function (c) { return /cursor\.execute\s*\(/.test(c) && /\(\s*nombre\s*,\s*curso\s*\)/.test(c); } },
        { d: 'Confirma con commit()', f: function (c) { return /\.commit\s*\(\s*\)/.test(c); } },
        { d: 'Cierra con close()', f: function (c) { return /\.close\s*\(\s*\)/.test(c); } },
        { d: 'Protege con try/except', f: function (c) { return /try\s*:/.test(c) && /except\b/.test(c); } },
        { d: 'Avisa el error con messagebox.showerror(...)', f: function (c) { return /messagebox\.showerror\s*\(/.test(c); } }
    ]
};
