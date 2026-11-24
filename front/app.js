// app.js: el JavaScript de la pagina (Est1)

// La direccion de la API: publicada en GitHub Pages usa la de Render; en el computador, la local
const API_URL = location.hostname.endsWith("github.io")
    ? "https://PENDIENTE.onrender.com"     // la API en la nube: se cambia al publicar
    : "http://localhost:3001";              // la API en el computador

// probarApi: le pregunta a la API si esta viva y escribe la respuesta en la pagina
async function probarApi() {
    const estado = document.getElementById("estado");   // el <p id="estado"> de index.html
    try {
        const respuesta = await fetch(API_URL + "/");     // GET a la API
        const datos = await respuesta.json();             // convierte el JSON en un objeto
        estado.textContent = "✅ " + datos.mensaje;       // muestra el mensaje de la API
    } catch (error) {
        estado.textContent = "❌ No se pudo conectar con la API en " + API_URL;
    }
}

probarApi();   // se ejecuta al abrir la pagina
