class Persona {
    id;
    nombre;
    apellido;
    edad; //Formato: 'YYYY-MM-DD'

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

}

class Heroe extends Persona {
    alterEgo;
    ciudad;
    publicado;

    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}

class Villano extends Persona {
    enemigo;
    robos;
    asesinatos;

    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
}

let personas = [];
let flagAgregar = false;
let flagModificar = false;
let flagEliminar = false;


// Carga de datos en la tabla del index.html

function MostrarPersonasEnLaTabla(personas) {
    const tablaBody = document.querySelector('#tablaPersonas tbody'); // cambiar el nombre desp
    tablaBody.innerHTML = '';

    personas.forEach(persona => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona.alterEgo ?? 'N/A'}</td>
            <td>${persona.ciudad ?? 'N/A'}</td>
            <td>${persona.publicado ?? 'N/A'}</td>
            <td>${persona.enemigo ?? 'N/A'}</td>
            <td>${persona.robos ?? 'N/A'}</td>
            <td>${persona.asesinatos ?? 'N/A'}</td>
            <td><button class="modificarBtn" data-id="${persona.id}">Modificar</button></td>
            <td><button class="eliminarBtn" data-id="${persona.id}">Eliminar</button></td>
        `;

        // Agregar eventos para los botones Modificar y Eliminar
        const modificarBtn = row.querySelector('.modificarBtn');
        modificarBtn.addEventListener('click', () => abrirFormularioModificar(persona));

        const eliminarBtn = row.querySelector('.eliminarBtn');
        eliminarBtn.addEventListener('click', () => abrirFormularioEliminar(persona));

        tablaBody.appendChild(row);
    });
}


document.addEventListener("DOMContentLoaded", function() { 
    // const tablaBody = document.querySelector('#tablaEmpleados tbody');
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const empleados = JSON.parse(this.responseText);
            MostrarPersonasEnLaTabla(empleados);
            personas.push(...empleados);

        } else if (this.readyState == 4) {
            alert('Error al obtener la lista: ' + this.status);
        }
    };

    xhttp.open("GET", "https://examenesutn.vercel.app/api/PersonasHeroesVillanos", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
});

console.log(personas);

// Agregar un evento al botón de agregar
document.getElementById('addElement').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario, si es necesario
    document.getElementById('container').style.display = 'none';
    document.getElementById('form_container').style.display = 'block';
    // document.getElementById('update').style.display = 'none';
    document.getElementById('lbl_id').style.display = 'none';
    document.getElementById('id').style.display = 'none';
    ResetSelectorTipo();

    //
    flagAgregar = true;
    flagModificar = false;
    flagEliminar = false;

});


// Arreglar eso de id en el agregar elemento porque esta en readonly
// cambio de tipo de persona en el formulario
document.getElementById('tipo_persona').addEventListener('change', function(event) {
    if(event.target.value === 'heroe') { 
        document.getElementById('lbl_alterEgo').style.display = 'block';
        document.getElementById('alterEgo').style.display = 'block';
        document.getElementById('lbl_ciudad').style.display = 'block';
        document.getElementById('ciudad').style.display = 'block';
        document.getElementById('lbl_publicado').style.display = 'block';
        document.getElementById('publicado').style.display = 'block';

        document.getElementById('lbl_enemigo').style.display = 'none';
        document.getElementById('enemigo').style.display = 'none';
        document.getElementById('lbl_robos').style.display = 'none';
        document.getElementById('robos').style.display = 'none';
        document.getElementById('lbl_asesinatos').style.display = 'none';
        document.getElementById('asesinatos').style.display

    } else if(event.target.value === 'villano') {
        document.getElementById('lbl_enemigo').style.display = 'block';
        document.getElementById('enemigo').style.display = 'block';
        document.getElementById('lbl_robos').style.display = 'block';
        document.getElementById('robos').style.display = 'block';
        document.getElementById('lbl_asesinatos').style.display = 'block';
        document.getElementById('asesinatos').style.display = 'block';

        document.getElementById('lbl_alterEgo').style.display = 'none';
        document.getElementById('alterEgo').style.display = 'none';
        document.getElementById('lbl_ciudad').style.display = 'none';
        document.getElementById('ciudad').style.display = 'none';
        document.getElementById('lbl_publicado').style.display = 'none';
        document.getElementById('publicado').style.display = 'none';
    } else {
        ResetSelectorTipo();
    }
});


function ResetSelectorTipo() {
    document.getElementById('lbl_alterEgo').style.display = 'none';
    document.getElementById('alterEgo').style.display = 'none';
    document.getElementById('lbl_ciudad').style.display = 'none';
    document.getElementById('ciudad').style.display = 'none';
    document.getElementById('lbl_publicado').style.display = 'none';
    document.getElementById('publicado').style.display = 'none';
    document.getElementById('lbl_enemigo').style.display = 'none';
    document.getElementById('enemigo').style.display = 'none';
    document.getElementById('lbl_robos').style.display = 'none';
    document.getElementById('robos').style.display = 'none';
    document.getElementById('lbl_asesinatos').style.display = 'none';
    document.getElementById('asesinatos').style.display = 'none';
}

function ValidarDatos() {
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let edad = document.getElementById('edad').value.trim();
    let tipo = document.getElementById('tipo_persona').value.trim();
    // Heroe
    let alterEgo = document.getElementById('alterEgo').value.trim();
    let ciudad = document.getElementById('ciudad').value.trim();
    let publicado = document.getElementById('publicado').value.trim();
    // Villano
    let enemigo = document.getElementById('enemigo').value.trim();
    let robos = document.getElementById('robos').value.trim();
    let asesinatos = document.getElementById('asesinatos').value.trim();

    let regexSoloLetras = /^[a-zA-Z\s]*$/;
    let regexSoloNumeros = /^[0-9]*$/;

    if(nombre === '' || !regexSoloLetras.test(nombre)) {
        alert('El nombre es inválido');
        return false;
    } else if(apellido === '' || !regexSoloLetras.test(apellido)) {
        alert('El apellido es inválido');
        return false;
    } else if(edad === '' || !regexSoloNumeros.test(edad)) {
        alert('La edad es inválida');
        return false;
    }

    if(tipo === 'heroe') {
        if(alterEgo === '' || !regexSoloLetras.test(alterEgo)) {
            alert('El alter ego es inválido');
            return false;
        } else if(ciudad === '' || !regexSoloLetras.test(ciudad)) {
            alert('La ciudad es inválida');
            return false;
        } else if(publicado === '' || !regexSoloNumeros.test(publicado)) {
            alert('Publicado es inválido');
            return false;
        }
    } else if(tipo === 'villano') {
        if(enemigo === '' || !regexSoloLetras.test(enemigo)) {
            alert('El enemigo es inválido');
            return false;
        } else if(robos === '' || !regexSoloNumeros.test(robos)) {
            alert('Los robos son inválidos');
            return false;
        } else if(asesinatos === '' || !regexSoloNumeros.test(asesinatos)) {
            alert('Los asesinatos son inválidos');
            return false;
        }
    } else {
        alert('Tipo de persona inválido');
        return false;
    }

    return true;

   
}



document.getElementById('cancel').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario, si es necesario
    document.getElementById('container').style.display = 'block';
    document.getElementById('form_container').style.display = 'none';
    document.getElementById("tipo_persona").disabled = false;
    ResetSelectorTipo();
    document.getElementById('formulario').reset();
    flagAgregar = false;
    flagModificar = false;
    flagEliminar = false;
    document.getElementById('nombre').disabled = false;
    document.getElementById('apellido').disabled = false;
    document.getElementById('edad').disabled = false;
    document.getElementById('alterEgo').disabled = false;
    document.getElementById('ciudad').disabled = false;
    document.getElementById('publicado').disabled = false;
    document.getElementById('enemigo').disabled = false;
    document.getElementById('robos').disabled = false;
    document.getElementById('asesinatos').disabled = false;
});

document.getElementById('acept').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario, si es necesario

    // Validar los datos del formulario
    if (!ValidarDatos()) {
        return;
    }

    let id = document.getElementById('id').value; // Obtener el ID de la persona (para modificar o eliminar)
    let tipo = document.getElementById('tipo_persona').value; // Obtener el tipo de persona (cliente o empleado)

    if (flagAgregar === true) {
        // Estás en la operación de agregar persona
        console.log("Agregar persona");
        if (tipo === 'heroe') {
            let nuevoHeroe = {
                id: null,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alterEgo: document.getElementById('alterEgo').value,
                ciudad: document.getElementById('ciudad').value,
                publicado: document.getElementById('publicado').value  
            };
            FinalizarAgregar(nuevoHeroe);
            MostrarSpinner(); // Mostrar el Spinner al hacer clic en "Aceptar"
        } else if (tipo === 'villano') {
            let nuevoVillano = {
                id: null,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                enemigo: document.getElementById('enemigo').value,
                robos: document.getElementById('robos').value,
                asesinatos: document.getElementById('asesinatos').value
            };
            FinalizarAgregar(nuevoVillano);
            MostrarSpinner(); // Mostrar el Spinner al hacer clic en "Aceptar"
        } else {
            console.error('Tipo de persona no reconocido:', tipo);
        }
    } 
    else if(flagModificar === true){
        // Estás en la operación de modificar persona
        console.log("Modificar persona");
        let personaActualizada;
        if (tipo === 'heroe') {
            personaActualizada = {
                id: id,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alterEgo: document.getElementById('alterEgo').value,
                ciudad: document.getElementById('ciudad').value,
                publicado: document.getElementById('publicado').value
            };
            actualizarPersona(personaActualizada);
        } else if (tipo === 'villano') {
            personaActualizada = {
                id: id,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                enemigo: document.getElementById('enemigo').value,
                robos: document.getElementById('robos').value,
                asesinatos: document.getElementById('asesinatos').value
            };
            actualizarPersona(personaActualizada);
        }
        MostrarSpinner(); // Mostrar el Spinner al hacer clic en "Aceptar"
    } 
    else if(flagEliminar === true){
        // Estás en la operación de eliminar persona
        console.log("Eliminar persona con ID:", id);
        eliminarPersona(id);
        MostrarSpinner(); // Mostrar el Spinner al hacer clic en "Aceptar"
    } 
    else {
        console.error('Operación no reconocida');
    }

    console.log('Flag agregar:', flagAgregar);
    console.log('Flag modificar:', flagModificar);
    console.log('Flag eliminar:', flagEliminar);
});


function FinalizarAgregar(nuevoRegistro) {
    flagAgregar = false;
    AgregarPersonaFetch(nuevoRegistro)
        .then(data => {
            // Operación exitosa
            console.log('Registro agregado:', data);
            nuevoRegistro.id = data.id;
            personas.push(nuevoRegistro); // Agregar nuevo registro a la lista
            ResetSelectorTipo();
            document.getElementById('formulario').reset();
            MostrarPersonasEnLaTabla(personas);
            OcultarSpinner(); // Ejemplo de ocultar el spinner después de un tiempo
            OcultarFormularioABM(); // Ocultar el formulario ABM
            MostrarFormularioLista(); // Mostrar el formulario Lista actualizado
        })
        .catch(error => {
            // Error al agregar persona
            console.error('Error al agregar persona:', error);
            OcultarSpinner(); // Ejemplo de ocultar el spinner después de un tiempo
            ResetSelectorTipo();
            OcultarFormularioABM(); // Ocultar el formulario ABM
            MostrarFormularioLista(); // Mostrar el formulario Lista
            MostrarAdvertencia(); // Mostrar advertencia de error
        });
}

function AgregarPersonaFetch(persona) {
    return new Promise((resolve, reject) => {
        fetch('https://examenesutn.vercel.app/api/PersonasHeroesVillanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona) // Convierte el objeto a JSON
        })
        .then(response => {
            if (!response.ok) {
                reject(new Error('Error al agregar persona'));
            } else {
                return response.json();
            }
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}


function MostrarSpinner() {
    document.getElementById('spinnerContainer').style.display = 'block';
}

function OcultarSpinner() {
    document.getElementById('spinnerContainer').style.display = 'none';
}

function OcultarFormularioABM() {
    // Implementar según la lógica de tu aplicación
    document.getElementById('form_container').style.display = 'none';
}

function MostrarFormularioLista() {
    // Implementar según la lógica de tu aplicación
    document.getElementById('container').style.display = 'block';
}

function MostrarAdvertencia() {
    // Implementar según la lógica de tu aplicación
    alert('No se pudo realizar la operación');
}


//MODIFICAR
function abrirFormularioModificar(persona) {
    flagModificar = true;
    flagAgregar = false;
    flagEliminar = false;
    console.log('Modificar persona:', persona);
    document.getElementById('container').style.display = 'none';

    // Rellenar el formulario ABM con los datos de la persona
    document.getElementById('lbl_id').style.display = 'block';
    document.getElementById('id').style.display = 'block';
    document.getElementById('id').value = persona.id;
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    
    if(persona.alterEgo != null) {
        document.getElementById('alterEgo').value = persona.alterEgo;
        document.getElementById('ciudad').value = persona.ciudad;
        document.getElementById('publicado').value = persona.publicado;
        document.getElementById("tipo_persona").value = "heroe";
        document.getElementById("tipo_persona").disabled = true;
        document.getElementById('lbl_alterEgo').style.display = 'block';
        document.getElementById('alterEgo').style.display = 'block';
        document.getElementById('lbl_ciudad').style.display = 'block';
        document.getElementById('ciudad').style.display = 'block';
        document.getElementById('lbl_publicado').style.display = 'block';
        document.getElementById('publicado').style.display = 'block';
        document.getElementById('lbl_enemigo').style.display = 'none';
        document.getElementById('enemigo').style.display = 'none';
        document.getElementById('lbl_robos').style.display = 'none';
        document.getElementById('robos').style.display = 'none';
        document.getElementById('lbl_asesinatos').style.display = 'none';
        document.getElementById('asesinatos').style.display = 'none';
    } else {
        document.getElementById('enemigo').value = persona.enemigo;
        document.getElementById('robos').value = persona.robos;
        document.getElementById('asesinatos').value = persona.asesinatos;
        document.getElementById("tipo_persona").value = "villano";
        document.getElementById("tipo_persona").disabled = true;
        document.getElementById('lbl_enemigo').style.display = 'block';
        document.getElementById('enemigo').style.display = 'block';
        document.getElementById('lbl_robos').style.display = 'block';
        document.getElementById('robos').style.display = 'block';
        document.getElementById('lbl_asesinatos').style.display = 'block';
        document.getElementById('asesinatos').style.display = 'block';
        document.getElementById('lbl_alterEgo').style.display = 'none';
        document.getElementById('alterEgo').style.display = 'none';
        document.getElementById('lbl_ciudad').style.display = 'none';
        document.getElementById('ciudad').style.display = 'none';
        document.getElementById('lbl_publicado').style.display = 'none';
        document.getElementById('publicado').style.display = 'none';
    }

    // Mostrar el formulario ABM
    document.getElementById('form_container').style.display = 'block';

    // Asegúrate de manejar la lógica para actualizar la persona cuando se envíe el formulario
    // ...
}

async function actualizarPersona(personaActualizada) {
    try {
        const response = await fetch('https://examenesutn.vercel.app/api/PersonasHeroesVillanos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaActualizada)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar persona');
        }

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        console.log("Respuesta del servidor:", data);
        console.log('Persona actualizada:', personaActualizada);

        personas.forEach(persona => {
            if (persona.id == personaActualizada.id) {
                if (personaActualizada.alterEgo != null) {
                    // heroe
                    persona.nombre = personaActualizada.nombre;
                    persona.apellido = personaActualizada.apellido;
                    persona.edad = personaActualizada.edad;
                    persona.alterEgo = personaActualizada.alterEgo;
                    persona.ciudad = personaActualizada.ciudad;
                    persona.publicado = personaActualizada.publicado;
                } else {
                    persona.nombre = personaActualizada.nombre;
                    persona.apellido = personaActualizada.apellido;
                    persona.edad = personaActualizada.edad;
                    persona.enemigo = personaActualizada.enemigo;
                    persona.robos = personaActualizada.robos;
                    persona.asesinatos = personaActualizada.asesinatos;
                }
            }
        });

        document.getElementById('formulario').reset();
        document.getElementById("tipo_persona").disabled = false;
        MostrarPersonasEnLaTabla(personas);
        OcultarSpinner();
        OcultarFormularioABM();
        MostrarFormularioLista();
        flagModificar = false;

    } catch (error) {
        console.error('Error en actualizarPersona:', error);
        OcultarSpinner();
        OcultarFormularioABM();
        MostrarFormularioLista();
        MostrarAdvertencia();
        flagModificar = false;
    }
}



//ELIMINAR
function abrirFormularioEliminar(persona) {
    flagEliminar = true;
    flagAgregar = false;
    flagModificar = false;
    console.log('Eliminar persona:', persona);
    document.getElementById('container').style.display = 'none';

    // Rellenar el formulario ABM con los datos de la persona
    document.getElementById('id').value = persona.id;
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    document.getElementById('lbl_id').style.display = 'block';
    document.getElementById('id').style.display = 'block';
    document.getElementById('id').disabled = true;
    document.getElementById('nombre').disabled = true;
    document.getElementById('apellido').disabled = true;
    document.getElementById('edad').disabled = true;
    document.getElementById('alterEgo').disabled = true;
    document.getElementById('ciudad').disabled = true;
    document.getElementById('publicado').disabled = true;
    document.getElementById('enemigo').disabled = true;
    document.getElementById('robos').disabled = true;
    document.getElementById('asesinatos').disabled = true;
    
    if(persona.alterEgo != null) {
        document.getElementById('alterEgo').value = persona.alterEgo;
        document.getElementById('ciudad').value = persona.ciudad;
        document.getElementById('publicado').value = persona.publicado;
        document.getElementById("tipo_persona").value = "heroe";
        document.getElementById("tipo_persona").disabled = true;
        document.getElementById('lbl_alterEgo').style.display = 'block';
        document.getElementById('alterEgo').style.display = 'block';
        document.getElementById('lbl_ciudad').style.display = 'block';
        document.getElementById('ciudad').style.display = 'block';
        document.getElementById('lbl_publicado').style.display = 'block';
        document.getElementById('publicado').style.display = 'block';
        document.getElementById('lbl_enemigo').style.display = 'none';
        document.getElementById('enemigo').style.display = 'none';
        document.getElementById('lbl_robos').style.display = 'none';
        document.getElementById('robos').style.display = 'none';
        document.getElementById('lbl_asesinatos').style.display = 'none';
        document.getElementById('asesinatos').style.display = 'none';
    } else {
        document.getElementById('enemigo').value = persona.enemigo;
        document.getElementById('robos').value = persona.robos;
        document.getElementById('asesinatos').value = persona.asesinatos;
        document.getElementById("tipo_persona").value = "villano";
        document.getElementById("tipo_persona").disabled = true;
        document.getElementById('lbl_enemigo').style.display = 'block';
        document.getElementById('enemigo').style.display = 'block';
        document.getElementById('lbl_robos').style.display = 'block';
        document.getElementById('robos').style.display = 'block';
        document.getElementById('lbl_asesinatos').style.display = 'block';
        document.getElementById('asesinatos').style.display = 'block';
        document.getElementById('lbl_alterEgo').style.display = 'none';
        document.getElementById('alterEgo').style.display = 'none';
        document.getElementById('lbl_ciudad').style.display = 'none';
        document.getElementById('ciudad').style.display = 'none';
        document.getElementById('lbl_publicado').style.display = 'none';
        document.getElementById('publicado').style.display = 'none';
    }

    // Mostrar el formulario ABM
    document.getElementById('form_container').style.display = 'block';

    // Asegúrate de manejar la lógica para eliminar la persona cuando se envíe el formulario
    // ...
}


function eliminarPersona(personaAEliminar) { //personaAEliminar es el ID de la persona a eliminar
    // Lógica para enviar la solicitud de eliminación al servidor
    fetch(`https://examenesutn.vercel.app/api/PersonasHeroesVillanos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: personaAEliminar }) // Convierte el objeto a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar persona');
        }
        return response.text(); // Asumimos que la respuesta es texto
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
        console.log('Persona eliminada:', personaAEliminar);

        // Filtrar la persona eliminada de la lista local
        // 
        personas.forEach((persona, index) => {
            if(persona.id == personaAEliminar) {
                personas.splice(index, 1); // Eliminar la persona de la lista
            }
        });

        // Resetear y habilitar los campos del formulario
        document.getElementById('formulario').reset();
        document.getElementById("tipo_persona").disabled = false;
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido').disabled = false;
        document.getElementById('edad').disabled = false;
        document.getElementById('alterEgo').disabled = false;
        document.getElementById('ciudad').disabled = false;
        document.getElementById('publicado').disabled = false;
        document.getElementById('enemigo').disabled = false;
        document.getElementById('robos').disabled = false;
        document.getElementById('asesinatos').disabled = false;

        // Mostrar la tabla actualizada
        MostrarPersonasEnLaTabla(personas);
        OcultarSpinner();
        OcultarFormularioABM();
        MostrarFormularioLista();
        flagEliminar = false;
    })
    .catch(error => {
        console.error('Error en eliminarPersona:', error);
        document.getElementById("tipo_persona").disabled = false;
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido').disabled = false;
        document.getElementById('edad').disabled = false;
        document.getElementById('alterEgo').disabled = false;
        document.getElementById('ciudad').disabled = false;
        document.getElementById('publicado').disabled = false;
        document.getElementById('enemigo').disabled = false;
        document.getElementById('robos').disabled = false;
        document.getElementById('asesinatos').disabled = false;
        // Resetear y habilitar los campos del formulario
        document.getElementById('formulario').reset();
        // Manejo de errores si es necesario
        OcultarSpinner();
        OcultarFormularioABM();
        MostrarFormularioLista();
        MostrarAdvertencia();
        flagEliminar = false;
    });
}
