// app.js: el JavaScript de la pagina (Est1 y Est3)

// La direccion de la API: publicada en GitHub Pages usa la de Render; en el computador, la local
const API_URL = location.hostname.endsWith("github.io")
    ? "https://PENDIENTE.onrender.com"     // la API en la nube: se cambia al publicar
    : "http://localhost:3001";              // la API en el computador

const estado = document.getElementById("estado");   // el <p id="estado"> de index.html

// cargarTareas: GET a la API y muestra las tareas en la lista (Est3)
async function cargarTareas() {
    try {
        const respuesta = await fetch(API_URL + "/api/tareas");   // GET: pedir las tareas
        if (!respuesta.ok) {                                      // ok = false si respondio 404, 500...
            estado.textContent = "⚠️ La API respondió " + respuesta.status + ": todavía no tiene /api/tareas";
            return;                                               // no sigue: no hay tareas que mostrar
        }
        const tareas = await respuesta.json();                    // el JSON se vuelve un arreglo
        const lista = document.getElementById("lista");           // el <ul id="lista">
        lista.innerHTML = "";                                     // borra lo que habia
        for (const tarea of tareas) {                             // una fila <li> por tarea
            const li = document.createElement("li");
            if (tarea.hecha) li.className = "hecha";              // tachada si ya esta hecha
            li.innerHTML = `<span></span>
                <button onclick="completar(${tarea.id})">✓</button>
                <button onclick="borrar(${tarea.id})">🗑</button>`;
            li.querySelector("span").textContent = tarea.titulo; // textContent: el titulo como texto, no como HTML
            lista.append(li);                                     // agrega la fila a la lista
        }
        estado.textContent = "✅ " + tareas.length + " tareas";
    } catch (error) {
        estado.textContent = "❌ No se pudo conectar con la API en " + API_URL;
    }
}

// pedir: hace una peticion a la API y avisa si la ruta todavia no existe (Est3)
async function pedir(metodo, ruta, cuerpo) {
    try {
        const respuesta = await fetch(API_URL + ruta, {
            method: metodo,                                    // POST, PUT o DELETE
            headers: { "Content-Type": "application/json" },   // se envia JSON
            body: cuerpo ? JSON.stringify(cuerpo) : undefined  // el objeto se vuelve texto JSON
        });
        if (respuesta.status === 404) {                        // 404: la API no tiene esa ruta
            alert("La API todavía no tiene esa ruta (404)");
        }
    } catch (error) {                                          // la API no responde
        alert("No se pudo conectar con la API");
    }
    cargarTareas();   // vuelve a pintar la lista
}

// Al enviar el formulario: POST con la tarea nueva (Est3)
document.getElementById("formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();                               // que la pagina no se recargue
    const campo = document.getElementById("titulo");
    pedir("POST", "/api/tareas", { titulo: campo.value }); // crea la tarea
    campo.value = "";                                      // limpia el cuadro de texto
});

// Los botones de cada tarea: sus rutas las hacen Est2 (PUT) y Est3 (DELETE) en la Ronda 2
function completar(id) { pedir("PUT", "/api/tareas/" + id); }
function borrar(id)    { pedir("DELETE", "/api/tareas/" + id); }

cargarTareas();   // se ejecuta al abrir la pagina
