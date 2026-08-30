export const removerMascara = (valor) => {
    if (!valor) return "";
    return valor.replace(/\D/g, "");
};