export const cpfIsValid = (strCPF)=>{
    let soma,resto,i;
    soma = 0;
    if (strCPF == "00000000000") return false;
     
    for (i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10)) ) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;

}

export const cnpjIsValid = (s)=>{
    let cnpj = s.replace(/[^\d]+/g, '')

	// Valida a quantidade de caracteres
	if (cnpj.length !== 14)
		return false

	// Elimina inválidos com todos os caracteres iguais
	if (/^(\d)\1+$/.test(cnpj))
		return false

	// Cáculo de validação
	let t = cnpj.length - 2,
		d = cnpj.substring(t),
		d1 = parseInt(d.charAt(0)),
		d2 = parseInt(d.charAt(1)),
		calc = x => {
			let n = cnpj.substring(0, x),
				y = x - 7,
				s = 0,
				r = 0

				for (let i = x; i >= 1; i--) {
					s += n.charAt(x - i) * y--;
					if (y < 2)
						y = 9
				}

				r = 11 - s % 11
				return r > 9 ? 0 : r
		}

	return calc(t) === d1 && calc(t + 1) === d2
}

export const testArea = (a1,a2,at)=>{
    return (a1+a2) > at? false:true;
}

