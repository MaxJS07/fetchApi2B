//URL DE LA API

const API_URL = "https://retoolapi.dev/hhHhvo/expo";


//Función para llamar a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos las respuestas del servidor
    const res = await fetch(API_URL);

    //Ahora convertimos la respuesta del servidor a formato JSON
    const data = await res.json();

    console.log(data);

    CrearTabla(data); //Enviamos el JSON a la función "CrearTabla"
}

//Función que creará las filas de las tablas en base a los registros que vienen de la tabla
function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API

    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody"); //El querySelector nos permite agarrar las cosas por cualquier cosa, por etiqueta, por id, por nombre, etc. Cuando llamamos por ID, se usa la almohadilla (#)

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla, para que cada vez que se agreguen nuevos registros, la tabla se actualice

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    });
}

ObtenerPersonas();
