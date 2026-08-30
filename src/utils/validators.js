export const validarEmail = (email) => {
    if (!email) return false;
    return email.includes("@") && email.includes(".com");
};

export const validarSenha = (senha) => {
    if (!senha) return false;
    
    const temOitoCaracteres = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /\d/.test(senha);
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    return temOitoCaracteres && temMaiuscula && temMinuscula && temNumero && temCaractereEspecial;
};