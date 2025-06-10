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
                    <button onclick = "abrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.correo}', ${persona.edad})">Editar</button>
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
} //el id es necesario para eliminar el registro


//PROCESO PARA ACTUALIZAR UN REGISTRO
const modalEditar = document.getElementById("modalEditar");
const cerrarModalEditar = document.getElementById("btnCerrarEditar");

cerrarModalEditar.addEventListener("click", () => {
    modalEditar.close();
});

//Abrimos el modal con los valores ya llenos
function abrirModalEditar(id, nombre, apellido, correo, edad){

    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEd").value = nombre;
    document.getElementById("apellidoEd").value = apellido;
    document.getElementById("edadEd").value = edad;
    document.getElementById("emailEd").value = correo;
    
    //Abrimos el modal con los valores 
    modalEditar.showModal();

}

//Añadimos el evento al formulario del submit

document.getElementById("frmEditarIntegrante").addEventListener("submit", async e =>{

    //Evitamos que se envíe el formulario por default
    e.preventDefault();

    //Capturamos los datos de los campos del modal
    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEd").value.trim();
    const apellido = document.getElementById("apellidoEd").value.trim();
    const edad = document.getElementById("edadEd").value.trim();
    const correo = document.getElementById("emailEd").value.trim();

    //Validamos que no haya campos vacíos.
    if(!nombre || !apellido || !edad || !correo){
        alert("Aún existen campos vacíos. Llénelos para continuar.");
        return;
    }

    //Ahora realizamos el consumo de la API para actualizar
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({edad, correo, nombre, apellido})
    })

    //si todo sale bien, le avisamos al usuario

    if(respuesta.ok){

        alert("El integrante se actualizó correctamente.");

        //Cerramos el modal
        modalEditar.close();

        //Recargamos la lista
        ObtenerPersonas();
    }
    else{
        alert("Ocurrió un error.")
    }
});


