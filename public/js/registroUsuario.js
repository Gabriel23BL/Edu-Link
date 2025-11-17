const creandoUsuario = document.getElementById('registroUsuario');

creandoUsuario.addEventListener('submit', creandoUsuario);

async function creandoUsuario(event) {
    // Prevenir la recarga automática del formulario
    event.preventDefault();
    
    try {
        // Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        // Hacer la peticion fetch al backend
        const respuesta = await fetch('/api/registro-usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, clave })
        });

        // Manejar la respuesta del servidor
        if (respuesta.ok) {
            const datos = await respuesta.json();
            alert('Usuario registrado con éxito: ' + datos.mensaje);
        } else {
            const errorDatos = await respuesta.json();
            alert('Error al registrar usuario: ' + errorDatos.error);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
}