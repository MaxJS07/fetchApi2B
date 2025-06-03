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
                    <button onclick = "EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}

ObtenerPersonas();







//PROCESOS PARA AGREGAR UN NUEVO REGISTRO
const modal = document.getElementById("modalAgregar"); // Cuadro de diálogo
const btnAdd = document.getElementById("btnAbrirModal"); //Boton para abrir
const btnClose = document.getElementById("btnCerrarModal"); //Boton para cerrar el modal

btnAdd.addEventListener("click", () => {
    modal.showModal();
});

btnClose.addEventListener("click", () =>{
    modal.close()
});

//Agregar un nuevo integrante desde el form
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault(); //La "e" representa al evento "submit" del formulario - El preventDefault evita que el formulario se envíe

    //Capturamos los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();

    //Validación básica de campos vacíos

    if(!nombre || !apellido || !edad || !correo){
        alert("Complete todos los campos.")
        return;
    };
    
    //Si la validación es correcta, pasamos a llamar a la API
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado de manera correcta.");

        //Entonces limpiamos el form
        document.getElementById("frmAgregarIntegrante").reset();

        //Cerramos el formulario automáticamente
        modal.close();

        //Recargamos la tabla volviendo a hacer el get ya hecho anteriormente
        ObtenerPersonas();

    }
    else{
        alert("Ocurrió un error al agregar el nuevo integrante");
    }

}); //Fin del formulario



//PROCESO PARA ELIMINAR UN REGISTRO
async function EliminarRegistro(id){
    if(confirm("¿Está seguro de eliminar el registro?")){
        await fetch(`${API_URL}/${id}`, {method : "DELETE" });
        
        ObtenerPersonas();
    }
} //el id es necario para eliminr el registro
