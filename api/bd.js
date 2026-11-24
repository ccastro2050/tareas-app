// bd.js: la base de datos SQLite (Est2)
import { DatabaseSync } from "node:sqlite";   // SQLite viene dentro de Node.js: no se instala

// Abre el archivo tareas.db; si no existe, lo crea
const bd = new DatabaseSync("tareas.db");

// Crea la tabla tarea, si todavia no existe
bd.exec(`
    CREATE TABLE IF NOT EXISTS tarea (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,   -- el numero de la tarea: lo pone SQLite
        titulo TEXT    NOT NULL,                    -- lo que hay que hacer
        hecha  INTEGER NOT NULL DEFAULT 0           -- 0 = pendiente, 1 = hecha
    )
`);

// Si la tabla esta vacia, guarda 3 tareas de ejemplo
const cuantas = bd.prepare("SELECT COUNT(*) AS total FROM tarea").get().total;
if (cuantas === 0) {
    const insertar = bd.prepare("INSERT INTO tarea (titulo) VALUES (?)");   // ? = el dato que llega
    insertar.run("Crear el repositorio en GitHub");
    insertar.run("Hacer la API con Express");
    insertar.run("Publicar en la nube");
}

export default bd;   // export: para que servidor.js la pueda usar con import
