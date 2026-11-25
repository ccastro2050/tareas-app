// servidor.js: la API de tareas (Est1)
import express from "express";      // express: la libreria que crea el servidor web
import cors from "cors";            // cors: deja que la pagina (otra direccion) le pida datos a la API
import bd from "./bd.js";           // la base de datos (Est2)

// El puerto: en la nube lo pone Render (process.env.PORT); en el computador es el 3001
const PUERTO = process.env.PORT || 3001;

const app = express();              // crea la aplicacion
app.use(cors());                    // permite peticiones desde la pagina
app.use(express.json());            // convierte el JSON que llega en un objeto (req.body)

// GET / -> un mensaje para saber que la API esta viva
app.get("/", (req, res) => {
    res.json({ mensaje: "API de tareas funcionando", tareas: "/api/tareas" });
});

// GET /api/tareas -> todas las tareas (Est2)
app.get("/api/tareas", (req, res) => {
    const tareas = bd.prepare("SELECT * FROM tarea ORDER BY id").all();   // all(): todas las filas
    res.json(tareas);                                                       // 200 con el arreglo
});

// POST /api/tareas -> crea una tarea (Est2)
app.post("/api/tareas", (req, res) => {
    const titulo = (req.body?.titulo || "").trim();   // el titulo que llega, sin espacios a los lados
    if (titulo === "") {                               // regla: el titulo es obligatorio
        return res.status(400).json({ error: "El titulo es obligatorio" });
    }
    const resultado = bd.prepare("INSERT INTO tarea (titulo) VALUES (?)").run(titulo);
    const nueva = bd.prepare("SELECT * FROM tarea WHERE id = ?").get(resultado.lastInsertRowid);
    res.status(201).json(nueva);                      // 201 = creada
});

// === Cada uno agrega su ruta aqui ===

// Pone la API a escuchar en el puerto. error = lo que fallo (por ejemplo, el puerto ocupado)
app.listen(PUERTO, (error) => {
    if (error) {                                        // no pudo prender
        console.error("❌ No se pudo prender la API: el puerto " + PUERTO + " está ocupado (" + error.code + ")");
        return;
    }
    console.log("API de tareas en http://localhost:" + PUERTO);
});
