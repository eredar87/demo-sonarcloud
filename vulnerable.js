// vulnerable.js

// 1. Vulnerabilidad: Uso de eval() para evaluar entrada del usuario.
//    Severidad: Alta
//    Descripción: El uso de eval() permite la ejecución arbitraria de código, lo que puede ser aprovechado para ejecutar código malicioso.
//    Fix: Evitar eval() y utilizar métodos seguros para interpretar la entrada o validarla.
function executeUserInput(userInput) {
    // Vulnerable: Uso de eval en la entrada proporcionada por el usuario.
    let result = eval(userInput);
    return result;
    // FIX: Reemplazar eval() por una función de parseo seguro, por ejemplo, JSON.parse() si se espera JSON.
    // let result = JSON.parse(userInput);
}

// 2. Vulnerabilidad: Credenciales hardcoded.
//    Severidad: Alta
//    Descripción: Incluir credenciales o datos sensibles directamente en el código puede exponerlos si el código es compartido o subido a repositorios públicos.
//    Fix: Usar variables de entorno o servicios de gestión de secretos.
const hardcodedPassword = "SuperSecret123"; // Vulnerable: contraseña hardcoded
// FIX: Obtener la contraseña de una variable de entorno, por ejemplo:
// const password = process.env.DB_PASSWORD;

// 3. Vulnerabilidad: Construcción insegura de consultas SQL.
//    Severidad: Alta
//    Descripción: Concatenar directamente parámetros de entrada del usuario en una consulta SQL puede llevar a inyección SQL.
//    Fix: Utilizar consultas parametrizadas o un ORM que se encargue de sanear la entrada.
function getUserByUsername(req) {
    // Vulnerable: Se construye la consulta concatenando la entrada del usuario.
    let query = "SELECT * FROM users WHERE username = '" + req.query.username + "'";
    console.log("Ejecutando consulta:", query);
    return query;
    // FIX: Utilizar consultas parametrizadas, por ejemplo, con una librería como 'pg' para PostgreSQL:
    // let query = "SELECT * FROM users WHERE username = $1";
    // client.query(query, [req.query.username]);
}

// 4. Vulnerabilidad: Cross-Site Scripting (XSS).
//    Severidad: Media
//    Descripción: Insertar datos del usuario sin sanitizar en una respuesta HTML puede permitir la inyección de scripts maliciosos.
//    Fix: Sanitizar la entrada del usuario o utilizar frameworks que escapen automáticamente la salida.
function greetUser(req, res) {
    // Vulnerable: Inserta directamente la entrada del usuario en el HTML.
    res.send("<h1>Hola, " + req.query.name + "!</h1>");
    // FIX: Sanitizar la entrada o utilizar un motor de plantillas que escape el contenido.
    // Por ejemplo, usando una librería como DOMPurify o validando el input:
    // const name = sanitize(req.query.name);
    // res.send(`<h1>Hola, ${name}!</h1>`);
}

// 5. Vulnerabilidad: Uso de HTTP en lugar de HTTPS para solicitudes externas.
//    Severidad: Baja
//    Descripción: Realizar solicitudes mediante HTTP (no seguro) puede exponer la comunicación a ataques de intermediarios (man-in-the-middle).
//    Fix: Utilizar HTTPS para garantizar la seguridad de la conexión.
const http = require('http');
function fetchData() {
    // Vulnerable: Se usa HTTP en lugar de HTTPS.
    http.get("http://example.com/api/data", (res) => {
        res.on('data', (chunk) => {
            console.log("Datos recibidos:", chunk.toString());
        });
    }).on('error', (err) => {
        console.error("Error en la solicitud:", err);
    });
    // FIX: Utilizar la librería 'https' y cambiar la URL a https://
    // const https = require('https');
    // https.get("https://example.com/api/data", (res) => { ... });
}

// Exportar funciones para evitar advertencias de variables no usadas y facilitar pruebas.
module.exports = {
    executeUserInput,
    getUserByUsername,
    greetUser,
    fetchData,
    hardcodedPassword
};
