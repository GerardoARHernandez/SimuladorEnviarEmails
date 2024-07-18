document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

const correo = {
    email: '', 
    asunto: '', 
    mensaje: ''
}

//Seleccionar los elementos de la interfaz
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#formulario');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const spinner = document.querySelector('#spinner')
const inputCC = document.querySelector('#cc');

function iniciarApp(){
    //Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validarCC)
    
    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        reiniciarFormulario();
    });

    formulario.addEventListener('submit', enviarEmail);

}

function validar(e){
    if (e.target.value.trim() === '') {
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        correo[e.target.name] = '';
        comprobarCorreo();
        return;
    }

    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarAlerta('El email no es valido', e.target.parentElement);
        correo[e.target.name] = '';
        comprobarCorreo();
        return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    correo[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar el objeto de email
    comprobarCorreo();
}

function validarCC(e){
    
    if ( e.target.value !=='' &&  !validarEmail(e.target.value)){
        mostrarAlerta('El email no es valido', e.target.parentElement);
        return;
     } 
     limpiarAlerta(e.target.parentElement)
};

function mostrarAlerta(mensaje, referencia){

    //Comprueba si ya existe alguna alerta
    limpiarAlerta(referencia);

    //Generar alerta con HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    //Creando clases
    error.classList.add('bg-red-600', 'text-white', 'text-center', 'font-bold', 'p-2', 'uppercase');

    //Inyectar el error al formulario
    referencia.appendChild(error);
}

function limpiarAlerta(referencia){
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
        alerta.remove();
    }
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const resultado = regex.test(email);
    return resultado;
}

function comprobarCorreo(){
    
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    if ( Object.values(correo).includes('') ) {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return;
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
    
}

function reiniciarFormulario(){
    //Reiniciar el objeto
    correo.email = '';
    correo.asunto = '';
    correo.mensaje = '';

    formulario.reset();
    comprobarCorreo();
}

function enviarEmail(e){
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        reiniciarFormulario();

        //Crear una alerta
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje enviado con exito';

        formulario.appendChild(alertaExito);
        setTimeout(() => {
            alertaExito.remove();
        }, 3000);


    }, 3000);
}

