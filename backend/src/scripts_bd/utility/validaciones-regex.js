function validarTelefono(telefono) {
    const telefonoRegex = /^(11|15)-\d{4}-\d{4}$/;
    if (!telefonoRegex.test(telefono)) {
        return { ok: false, message: 'El formato del teléfono es incorrecto. Debe ser "11-xxxx-xxxx" o "15-xxxx-xxxx".' };
    }
    return { ok: true };
}

function validarHorarios(horarios) {
    const horariosRegex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (!horariosRegex.test(horarios)) {
        return { ok: false, message: 'El formato de horarios es incorrecto. Debe ser "hh:mm-hh:mm".' };
    }
    if (horarios.length !== 11) {
        return { ok: false, message: 'Los horarios deben tener una longitud de 11 caracteres.' };
    }
    return { ok: true };
}

function validarDiasAbiertos(dias_abiertos) {
    const diasAbiertosRegex = /^(LUN|MAR|MIE|JUE|VIE|SAB|DOM)(-(LUN|MAR|MIE|JUE|VIE|SAB|DOM)){0,6}$/;
    const diasValidos = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
    if (!diasAbiertosRegex.test(dias_abiertos)) {
        return { ok: false, message: 'El formato de días abiertos es incorrecto. Debe ser una combinación de LUN, MAR, MIE, JUE, VIE, SAB, DOM separados por guiones.' };
    }
    const dias = dias_abiertos.split('-');
    const diasUnicos = new Set(dias);
    if (diasUnicos.size !== dias.length) {
        return { ok: false, message: 'Los días abiertos no pueden contener días repetidos.' };
    }
    const indices = dias.map(dia => diasValidos.indexOf(dia));
    for (let i = 1; i < indices.length; i++) {
        if (indices[i] <= indices[i - 1]) {
            return { ok: false, message: 'Los días abiertos deben estar en orden cronológico.' };
        }
    }
    return { ok: true };
}

function validarDiasRestock(dias_restock) {
    const diasRestockRegex = /^(LUN|MAR|MIE|JUE|VIE|SAB|DOM)(,(LUN|MAR|MIE|JUE|VIE|SAB|DOM)){0,3}$/;
    const diasRestockValidos = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
    if (!diasRestockRegex.test(dias_restock)) {
        return { ok: false, message: 'El formato de días de restock es incorrecto. Debe ser una combinación de LUN, MAR, MIE, JUE, VIE, SAB, DOM separados por comas.' };
    }
    const dias = dias_restock.split(',');
    const diasUnicos = new Set(dias);
    if (diasUnicos.size !== dias.length) {
        return { ok: false, message: 'Los días de restock no pueden contener días repetidos.' };
    }
    const indices = dias.map(dia => diasRestockValidos.indexOf(dia));
    for (let i = 1; i < indices.length; i++) {
        if (indices[i] <= indices[i - 1]) {
            return { ok: false, message: 'Los días de restock deben estar en orden cronológico.' };
        }
    }
    return { ok: true };
}

function validarDireccion(direccion) {
    const direccionRegex = /^[\w\s\.,#-]+$/;
    if (!direccionRegex.test(direccion)) {
        return { ok: false, message: 'El formato de la dirección es incorrecto. Debe contener letras, números, espacios, puntos, comas y guiones.' };
    }
    if (!/[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(direccion) || !/\d/.test(direccion)) {
        return { ok: false, message: 'La dirección debe contener al menos una letra y un número.' };
    }
    return { ok: true };
}

function validarNombre(nombre) {
    const nombreRegex = /^[\w\sÁÉÍÓÚáéíóúñÑ-]*$/;
    if (!nombreRegex.test(nombre)) {
        return { ok: false, message: 'El nombre de la sede debe comenzar con "Sede" y contener letras, números, espacios, guiones y acentos.' };
    }
    if (nombre.length > 50) {
        return { ok: false, message: 'El nombre de la sede no puede exceder los 50 caracteres.' };
    }
    return { ok: true };
}

function validarNumeroNatural(numero) {
    const numeroRegex = /^\d+$/;
    if (!numeroRegex.test(numero)) {
        return { ok: false, message: 'El número debe ser un entero positivo.' };
    }
    return { ok: true };
}

function validarNumeroRacionalPositivo(numero) {
    const numeroRegex = /^\d+(\.\d{1,2})?$/;
    if (!numeroRegex.test(numero)) {
        return { ok: false, message: 'El número debe ser un número racional positivo.' };
    }
    return { ok: true };
}

function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { ok: false, message: 'El formato del correo electrónico es incorrecto.' };
    }
    if (email.length > 50) {
        return { ok: false, message: 'El correo electrónico no puede exceder los 50 caracteres.' };
    }
    return { ok: true };
}

function validarContrasena(contrasena) {
    const contrasenaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/
    if (!contrasenaRegex.test(contrasena)) {
        return { ok: false, message: 'La contraseña debe tener entre 8 y 16 caracteres, al menos una letra mayúscula y un número.' };
    }
    return { ok: true };
}

function validarFecha(fecha) {
    const fechaRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!fechaRegex.test(fecha)) {
        return { ok: false, message: 'El formato de la fecha es incorrecto. Debe ser "AAAA-MM-DD".' };
    }
}

function validarMetodoPago(metodo_pago) {
    const metodosValidos = ['Efectivo', 'Crédito', 'Débito', 'Transferencia bancaria', 'QR', 'Mercado Pago'];
    if (!metodosValidos.includes(metodo_pago)) {
        return { ok: false, message: 'El método de pago debe ser uno de los siguientes: Efectivo, Crédito, Débito, Transferencia bancaria, QR o Mercado Pago.' };
    }
    if (metodo_pago.length > 30) {
        return { ok: false, message: 'El método de pago no puede exceder los 30 caracteres.' };
    }
    return { ok: true };
}

function validarDescripcion(descripcion) {
    const descripcionRegex = /^[\w\s.,-]+$/;
    if (!descripcionRegex.test(descripcion)) {
        return { ok: false, message: 'La descripción debe contener letras, números, espacios, puntos, comas y guiones.' };
    }
    if (descripcion.length > 60) {
        return { ok: false, message: 'La descripción no puede exceder los 60 caracteres.' };
    }
    return { ok: true };
}

module.exports = {
    validarTelefono,
    validarHorarios,
    validarDiasAbiertos,
    validarDiasRestock,
    validarDireccion,
    validarNombre,
    validarNumeroNatural,
    validarNumeroRacionalPositivo,
    validarEmail,
    validarContrasena,
    validarFecha,
    validarMetodoPago,
    validarDescripcion
};