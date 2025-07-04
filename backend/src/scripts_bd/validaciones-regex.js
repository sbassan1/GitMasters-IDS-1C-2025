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
    const nombreRegex = /^Sede\b[\w\sÁÉÍÓÚáéíóúñÑ-]*$/;
    if (!nombreRegex.test(nombre)) {
        return { ok: false, message: 'El nombre de la sede debe comenzar con "Sede" y contener letras, números, espacios, guiones y acentos.' };
    }
    return { ok: true };
}

module.exports = {
    validarTelefono,
    validarHorarios,
    validarDiasAbiertos,
    validarDiasRestock,
    validarDireccion,
    validarNombre
};