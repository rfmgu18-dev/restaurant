const estatusPedido = document.querySelector('#parrafoEstatus');
const resultadoPedido = document.querySelector('#resultadoPedido');
const btnEnviarPedido = document.querySelector('#enviarPedido');
const pizza = document.querySelector('#estatusPizza');
const bebida = document.querySelector('#estatusBebida');
const postre = document.querySelector('#estatusPostre');

const estatusDelPedido = () => {
    return Math.random() < 0.5;
};

const actualizarEstado = (elemento, mensaje) => {
    elemento.textContent = mensaje;
};

const prepararItem = (elemento, mensaje, tiempo) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            actualizarEstado(elemento, mensaje + ' ✅');
            resolve();
        }, tiempo);
    });
};
//Preparación con éxito
const preparacionPedido = async () => {
    try {
        await prepararItem(pizza, 'Pizza lista', 3000);
        await prepararItem(bebida, 'Bebida lista', 3000);
        await prepararItem(postre, 'Postre listo', 3000);
        actualizarEstado(estatusPedido, 'Tu pedido está listo ✅');
    } catch (error) {
        console.log(error);
    }

    btnEnviarPedido.disabled = false;
    btnEnviarPedido.textContent = 'Enviar pedido';
};

//Fase de espera
btnEnviarPedido.addEventListener('click', () => {
    actualizarEstado(estatusPedido, 'Procesando pedido...');
    actualizarEstado(pizza, 'Preparando...');
    actualizarEstado(bebida, 'Preparando...');
    actualizarEstado(postre, 'Preparando...');

    btnEnviarPedido.disabled = true;
    btnEnviarPedido.textContent = 'Preparando...';

    const pedidoAprobado = estatusDelPedido();

    //Pedido rechazado
    if (!pedidoAprobado) {
        actualizarEstado(resultadoPedido, 'Pedido rechazado...');
        resultadoPedido.className = 'resultado resultado--error';
        actualizarEstado(estatusPedido, 'Ocurrió un error al preparar tu pedido. Porfavor, intente nuevamente ❌.');
        btnEnviarPedido.disabled = false;
        btnEnviarPedido.textContent = 'Volver a enviar pedido';
        return;
    }

    actualizarEstado(resultadoPedido, '¡Pedido aprobado! 🎉');
    resultadoPedido.className = 'resultado resultado--exito';
    actualizarEstado(estatusPedido, 'Tu pedido ha sido procesado con éxito ✅');
    preparacionPedido();
});
