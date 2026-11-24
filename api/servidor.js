// servidor.js: la API de tareas (Est1)
import express from "express";      // express: la libreria que crea el servidor web
import cors from "cors";            // cors: deja que la pagina (otra direccion) le pida datos a la API

// El puerto: en la nube lo pone Render (process.env.PORT); en el computador es el 3001
const PUERTO = process.env.PORT || 3001;

const app = express();              // crea la aplicacion
app.use(cors());                    // permite peticiones desde la pagina
app.use(express.json());            // convierte el JSON que llega en un objeto (req.body)

// GET / -> un mensaje para saber que la API esta viva
app.get("/", (req, res) => {
    res.json({ mensaje: "API de tareas funcionando", tareas: "/api/tareas" });
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
